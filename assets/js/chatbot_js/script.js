document.addEventListener("DOMContentLoaded", () => {
  const optionsDiv = document.querySelector(".options");
  const toggleOptionsBtn = document.getElementById("toggle-options-btn");
  const chatbot = document.getElementById("chatbot");
  const chatIcon = document.querySelector("#chat-icon img[alt='Chatbot Icon']");
  const minimizedownicon = document.querySelector(
    "#minimize-btn img[alt='minimize down icon']"
  );
  const optionsBtns = document.getElementById("close-btn");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");
  const micBtn = document.getElementById("mic-btn");
  const chatBody = document.getElementById("chat-body");
  const chatMessage = document.querySelector("#chat-message"); // Chat message container
  const chatMessages = document.createElement("div");
  const optionsButtons = document.querySelectorAll(".options");
  const arrowButton = document.getElementById("toggle-options-btn");
  const cover_img = document.querySelector(".cover_img"); // Chat message container
  let isFirstInteraction = true;
  let optionsExpanded = false;
  const SESSION_KEY = "browserSession"; // Key for session tracking
  const CHAT_HISTORY_KEY = "chatHistory";

// On page load
  window.addEventListener("load", () => {
    if (!sessionStorage.getItem(SESSION_KEY)) {
      // If session is new, initialize the session key
      sessionStorage.setItem(SESSION_KEY, Date.now());
    }
    loadChatFromLocalStorage(); // Load chat history from localStorage
  });


  document.getElementById("close-feedback").addEventListener("click", function() {
    let popup = document.getElementById("feedback-popup");
    popup.style.bottom = "-300px";
    document.getElementById("chat-body").classList.remove("backdrop");
    setTimeout(() => popup.style.display = "none", 300);
  });

  const textarea = document.getElementById("feedback-text");
  const submitButton = document.getElementById("submit-feedback");
  const popupMessage = document.getElementById("confirmation-popup"); // Popup message element

  // Textarea validation
  if (textarea) {
      textarea.addEventListener("input", function () {
          updateSubmitButtonState();
      });
  } else {
      console.error("Textarea not found!");
  }

  function updateSubmitButtonState() {
    const feedbackText = textarea.value.trim(); 
    const wordCount = feedbackText.split(/\s+/).filter(word => word.length > 0).length; // Count words
    
      if (wordCount >= 1) {
          submitButton.removeAttribute("disabled");
          submitButton.classList.add("enabled");
      } else {
          submitButton.setAttribute("disabled", "true");
          submitButton.classList.remove("enabled");
      }
  }
  const getThreadId = () => {
    let threadId = localStorage.getItem("thread_id");
    if (!threadId) {
      threadId = `${Math.floor(Math.random() * 1000000)}`; // Generate random ID
      localStorage.setItem("thread_id", threadId);
    }
    return threadId;
  };
  async function authenticateAndStoreToken(email, password) {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      const response = await fetch("api/auth-token/", 
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        const token = data.access_token;
        localStorage.setItem("authToken", token); // Store token in localStorage
        return token;
      } else {
        console.error("Failed to fetch token:", await response.text());
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  }

  function showPopup(message) {
      if(message = "Feedback submitted successfully"){
        popupMessage.innerText = "Thank You"; // Set the message
        const img = document.createElement("img");
        img.src = "assets/img/chatbot_img/thumbsup.svg";
        img.alt = "Feedback Submit Logo";
        img.className = "shake";
        img.style.Width = "30%"; 
        img.style.display = "block"; 
        img.style.margin = "3px auto"; // Center image
        popupMessage.appendChild(img);
        popupMessage.style.display = "block"; // Show popup
      }

      // Auto-close popup after 2 seconds
  }

  // Submit feedback
  



  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition;

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = true; // Keep recognition active for longer speeches
    recognition.interimResults = true; // Show intermediate results as the speech is recognized

    let micBtn = document.getElementById("mic-btn");
    let inputField = document.getElementById("user-input");
    let recognitionTimeout;
    const originalPlaceholder = inputField.placeholder; // Store the original placeholder text
    let permissionGranted = false; // Track whether permission has been granted

    const triggerEnterAction = () => {
      const userText = userInput.value.trim();
      if (userText !== "") {
        moveChatMessageBelowInput();
        createchatmessage();
        handleUserQuery(userText);
        userInput.value = ""; // Clear input
      }
    };

    // Function to reset microphone UI state
    const resetMic = () => {
      micBtn.classList.remove("active");
      inputField.placeholder = originalPlaceholder; // Restore the original placeholder
      clearTimeout(recognitionTimeout);
    };

    // Function to request permission and start listening
    const requestPermissionAndStart = () => {
      inputField.placeholder = "Please Allow microphone...";
      recognition.start(); // Start recognition, browser will request permission
      console.log("Requesting microphone permission...");
    };

    // Start listening when the mic button is clicked
    micBtn.addEventListener("click", () => {
      if (micBtn.classList.contains("active")) {
        recognition.stop(); // Stop recognition if already active
        resetMic();
        triggerEnterAction(); // Trigger Enter action on mic stop
      } else if (!permissionGranted) {
        requestPermissionAndStart(); // Request permission and start recognition
      } else {
        recognition.start(); // Start speech recognition
        micBtn.classList.add("active"); // Highlight mic button
        inputField.placeholder = "Speak up, I'm listening..."; // Change placeholder
        console.log("Speech recognition started...");
      }
    });

    // Event when permission is granted, and recognition starts
    recognition.onaudiostart = () => {
      permissionGranted = true;
      micBtn.classList.add("active");
      inputField.placeholder = "Speak up, I'm listening...";
      console.log("Microphone access granted.");
    };

    // Event when speech is recognized
    recognition.onresult = (event) => {
      let transcript = "";
      // Iterate through results and append the transcript
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      // Update the input field with the recognized speech
      inputField.value = transcript;

      // Reset the inactivity timeout
      clearTimeout(recognitionTimeout);
      recognitionTimeout = setTimeout(() => {
        recognition.stop(); // Stop recognition after 3 seconds of inactivity
        resetMic();
        triggerEnterAction(); // Trigger Enter action on inactivity stop
        console.log("Speech recognition stopped due to inactivity.");
      }, 3000);
    };

    // Event when speech recognition ends
    recognition.onend = () => {
      resetMic();
      triggerEnterAction(); // Trigger Enter action when recognition ends
      console.log("Speech recognition ended.");
    };

    // Handle errors
    recognition.onerror = (event) => {
      if (event.error === "not-allowed" || event.error === "denied") {
        inputField.placeholder = "Microphone access denied.";
        console.error("Microphone permission denied.");
      } else {
        console.error("Speech recognition error: ", event.error);
      }
      resetMic();
    };
  } else {
    console.log("Speech recognition is not supported in this browser.");
    document.getElementById("user-input").placeholder =
      "Speech recognition is not supported in this browser.";
    setTimeout(() => {
      document.getElementById("user-input").placeholder =
      "Type your message here...";
    }, 5000);
  }

  // Listen for the Enter key to trigger the action
  document.getElementById("user-input").addEventListener("keydown", (event) => {
    disableMessageSelection();
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default form submission if necessary
      triggerEnterAction(); // Trigger Enter action on key press
    }
  });

  document.getElementById("chat-header").addEventListener("click", (event) => {
    // Prevent collapsing when clicking inside the '.option' div
    if (!event.target.closest(".option")) {
        disableMessageSelection();
        document.getElementById("chatbot").classList.toggle("chat-collapsed");
    }
  });
  document.addEventListener("click", (event) => {
    const chatbot = document.getElementById("chatbot");

    // Check if the clicked element is outside the chatbot
    if (!chatbot.contains(event.target) && !chatIcon.contains(event.target)) {
        disableMessageSelection();
        chatbot.classList.add("chat-collapsed"); // Minimize the chatbot

    }
  });

 
  

  chatbot.style.display = "none";
  chatIcon.style.display = "block";
  arrowButton.style.display = "none";
  // Function to toggle chatbot visibility
  const toggleChatbotVisibility = (showChatbot) => {
    if (showChatbot) {
      chatbot.style.display = "block";
      chatIcon.style.display = "none";
    } else {
      chatbot.style.display = "none";
      chatIcon.style.display = "block";
    }
  };
  const toggleOptions = () => {
    optionsExpanded = !optionsExpanded;
    if (optionsExpanded) {
      optionsDiv.classList.add("expanded");
      toggleOptionsBtn.classList.remove("arrow-up");
      toggleOptionsBtn.classList.add("arrow-down");
    } else {
      optionsDiv.classList.remove("expanded");
      toggleOptionsBtn.classList.remove("arrow-down");
      toggleOptionsBtn.classList.add("arrow-up");
    }
  };



  async function resetThreadId () {
    const threadId = localStorage.getItem("thread_id");
    const token = localStorage.getItem("authToken");
    if (!token) {
      const email = "admin@cdot.in";
      const password = "admin";
      token  = await authenticateAndStoreToken(email, password);
    }

    const response = await fetch(
      `api/clear-chat-history?thread_id=${threadId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    localStorage.removeItem("authToken"); // Clear the token
    localStorage.removeItem("thread_id");
  };

  // Chat JSON data
  const chatData = {
    "About C-DOT": "C-DOT is an R&D organization under the Government of India.",
    // "6 G": "6G is the future of wireless communication technology.",
    "Product Section":
    "Wireless technology enables communication without physical cables.",
    "Awards and Achievements": "Explore the gallery for event photos and updates.",
    "EVP": "PM-WANI is an initiative to provide Wi-Fi access across India.",
    Consultancy:
      "C-DOT provides consultancy services for telecommunication technology.",
    // FAQs: "Check our FAQ section for common queries.",
  };

  const questionImages = {
    "About C-DOT": "assets/img/chatbot_img/events.svg",
    Consultancy: "assets/img/chatbot_img/consultancy.svg",
    "6G": "assets/img/chatbot_img/wifi.svg",
    "Product Section": "assets/img/chatbot_img/Sell.svg",
    "EVP": "assets/img/chatbot_img/Supplier.svg",
    FAQs: "assets/img/chatbot_img/Faq.svg",
    "Awards and Achievements": "assets/img/chatbot_img/gallery.svg",
  };

  // Event listeners for chat icons
  chatIcon.addEventListener("click", () => {
    toggleChatbotVisibility(true); // Show the chatbot
    scrollToBottom(); // Scroll to the bottom
  });

  minimizedownicon.addEventListener("click", () => toggleChatbotVisibility(false));


  // Event listeners for the close buttons in chatbot header
  const exportBtn = document.getElementById("export-btn");
  exportBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    showExportOptions();
  });
  // exportBtn.addEventListener("click", () => {
  //   // if (confirm("Do you want to export the chat?")) {
  //     exportChat();
  //   // }
  // });
  function showExportOptions() {
    const dropdown = document.getElementById("export-popup-content");
    dropdown.innerHTML = `
      <div class="export-options">
        <button id="export-full-chat" class="export-option-btn">Export Chat</button>
        <button id="export-selected" class="export-option-btn">Export Messages</button>
      </div>
    `;
    
    const closeDropdown = (e) => {
      if (!dropdown.contains(e.target) && e.target !== exportBtn) {
        dropdown.innerHTML = '';
        document.removeEventListener("click", closeDropdown);
      }
    };
  
    setTimeout(() => {
      document.addEventListener("click", closeDropdown);
    }, 0);
    
    document.getElementById("export-full-chat").addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.innerHTML = '';
      exportChat();
    });
    
    document.getElementById("export-selected").addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.innerHTML = '';
      enableMessageSelection();
    });
    dropdown.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  function enableMessageSelection() {
    // Hide original header content
    const headerContent = document.querySelector(".logo-section");
    if (headerContent) headerContent.style.display = "none";
    
    const headerContentButtons = document.querySelector(".option"); // Changed from #header-optiions-button
    if (headerContentButtons) headerContentButtons.style.display = "none";

    // Create selection header
    const selectionHeader = document.createElement("div");
    selectionHeader.className = "selection-header";
    selectionHeader.style.width = "100%";
    selectionHeader.style.margin = "2%";
    selectionHeader.innerHTML = `
      <div class="selection-actions">
        <img id="cancel-selection-btn" src="assets/img/chatbot_img/Chevron Left.svg" alt="Back icon" class="header-selection-btn cancel logo_header_export">
        <img id="select-all-btn" style="margin-left: auto;" src="assets/img/chatbot_img/Check All.svg" alt="Check_all icon" class="header-selection-btn logo_header_export">
        <img id="export-selected-btn" style="margin-left: 5px;" src="assets/img/chatbot_img/export.svg" alt="export icon" class="header-selection-btn primary logo_header_export">
        </div>
    `;
    
    document.getElementById("chat-header").appendChild(selectionHeader);

    // Add checkboxes to all messages
    const userMessages = document.querySelectorAll(".user-message");
    userMessages.forEach(msg => {
        if (!msg.querySelector(".export-checkbox")) {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "export-checkbox";
            checkbox.checked = false;
            checkbox.style.marginRight = "10px";
            checkbox.addEventListener("click", (e) => e.stopPropagation());

            // Link answer on click
            checkbox.addEventListener("change", () => {
                const nextSibling = msg.nextElementSibling;
                if (nextSibling && nextSibling.classList.contains("bot-message")) {
                    nextSibling.classList.toggle("linked-selected", checkbox.checked);
                }
            });

            msg.insertBefore(checkbox, msg.firstChild);
        }
    });

    // Add event listeners
    document.getElementById("select-all-btn").addEventListener("click", function(e) {
        e.stopPropagation();
        document.querySelectorAll(".export-checkbox").forEach(checkbox => {
            checkbox.checked = true;
        });
    });

    // Note: You had deselect-all-btn in the HTML but not in your new header
    // Either add the button or remove this event listener
    const deselectAllBtn = document.getElementById("deselect-all-btn");
    if (deselectAllBtn) {
        deselectAllBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            document.querySelectorAll(".export-checkbox").forEach(checkbox => {
                checkbox.checked = false;
            });
        });
    }

    document.getElementById("export-selected-btn").addEventListener("click", function(e) {
        e.stopPropagation();
        const selectedMessages = [];
        const messages = document.querySelectorAll(".user-message, .bot-message");
        
        messages.forEach((msg, index) => {
            const checkbox = msg.querySelector(".export-checkbox");
            if (checkbox && checkbox.checked) {
              const sender = "You";
              const messageText = msg.textContent.trim();
              selectedMessages.push({ index, sender, message: messageText });
          
              // Include next bot message if exists
              const next = msg.nextElementSibling;
              if (next && next.classList.contains("bot-message")) {
                  selectedMessages.push({
                      index: Array.from(messages).indexOf(next),
                      sender: "Bot",
                      message: next.textContent.trim()
                  });
              }
          }          
        });
        
        if (selectedMessages.length === 0) {
            alert("Please select at least one message to export.");
            return;
        }
        
        exportChat(selectedMessages.map(msg => msg.index));
        disableMessageSelection();
    });

    document.getElementById("cancel-selection-btn").addEventListener("click", function(e) {
        e.stopPropagation();
        disableMessageSelection();
    });
}
  
    // Add cancel button

    function disableMessageSelection() {
      // Remove all checkboxes
      document.querySelectorAll(".export-checkbox").forEach(checkbox => {
        checkbox.remove();
      });
      
      // Remove selection header
      const selectionHeader = document.querySelector(".selection-header");
      if (selectionHeader) selectionHeader.remove();
      
      // Show original header content
      const headerContent = document.querySelector(".logo-section");
      headerContent.style.display = "flex";
      const headerContentbutton = document.querySelector("#header-optiions-button");
      headerContentbutton.style.display = "flex";
    }

  optionsBtns.addEventListener("click", () => {
    if (confirm("Do you want to clear chat history and close the chatbot?")) {
      localStorage.removeItem("chatHistory"); // Clear chat history
      resetThreadId();
      const chatMessages = document.getElementById("chat-message");
      if (chatMessages) {
        chatMessages.innerHTML = "";
        chatMessages.remove();
      }
      toggleChatbotVisibility(false);
      resetOptions();
    }
  });

  window.addEventListener("beforeunload", resetThreadId);

  const resetOptions = () => {
    isFirstInteraction = true;
    optionsExpanded = false;
    optionsDiv.classList.remove("expanded");
    cover_img.style.display = "block";
    toggleOptionsBtn.classList.remove("arrow-down");
    toggleOptionsBtn.classList.add("arrow-up");
    arrowButton.style.display = "none"; // Hide the arrow button when chatbot is closed
    const inputSection = document.querySelector(".options-container");
    optionsDiv.classList.remove("options-side");
    chatBody.classList.add("chat-body");
    const optionsallButtons = document.querySelectorAll(".optionallbuttoncommon");
    const optionbuttonimg = document.querySelectorAll(".optionbuttonimg");
    optionbuttonimg.forEach((img) => {
      if (img.classList.contains("option-button-img-down")) {
        img.classList.replace("option-button-img-down", "option-button-img");
      }
    });
    optionsallButtons.forEach((button) => {
      if (button.classList.contains("option-all-button-down")) {
        button.classList.replace("option-all-button-down", "option-all-button");
      }
    });
    if (inputSection && optionsDiv) {
      inputSection.appendChild(optionsDiv); // Move the options div back to its original position
    }
  };

  const moveChatMessageBelowInput = () => {
    if (isFirstInteraction) {
      const optionsallButtons = document.querySelectorAll(".optionallbuttoncommon");
      const optionbuttonimg = document.querySelectorAll(".optionbuttonimg");
      optionbuttonimg.forEach((img) => {
        if (img.classList.contains("option-button-img")) {
          img.classList.replace("option-button-img", "option-button-img-down");
        }
      });
      optionsallButtons.forEach((button) => {
        if (button.classList.contains("option-all-button")) {
          button.classList.replace("option-all-button", "option-all-button-down");
        }
      });
      const inputSection = document.querySelector(".chat-footer");
      if (inputSection && optionsDiv) {
        inputSection.insertBefore(optionsDiv, inputSection.firstChild);
        chatBody.classList.remove("chat-body");
        isFirstInteraction = false; // Ensure it only happens on/.,ujhty5ytj/.ce
        cover_img.style.display = "none";
      } else {
        console.error("Options or Input Section not found.");
      }
    }
    arrowButton.style.display = "block";
    optionsDiv.classList.add("options-side");
    toggleOptionsBtn.addEventListener("click", toggleOptions);
  };

  // Event Listener for User Input Send Button
  sendBtn.addEventListener("click", () => {
    const userText = userInput.value.trim();
    if (userText !== "") {
      moveChatMessageBelowInput();
      createchatmessage();
      handleUserQuery(userText);
      userInput.value = ""; // Clear input
    }
  });

  // Chat log div
  const createchatmessage = () => {
    let chatMessages = document.getElementById("chat-message");

    if (!chatMessages) {
      // Only create the div if it doesn't already exist
      chatMessages = document.createElement("div");
      chatMessages.setAttribute("id", "chat-message");
      chatMessages.style.marginBottom = "10px";
      chatBody.prepend(chatMessages);
    }
  };

  // Populate questions in the options div
  const populateQuestions = (questions) => {
    questions.forEach((question) => {
      const button = document.createElement("button");
      button.classList.add("option-all-button"); // Add class to the span for styling
      button.classList.add("optionallbuttoncommon"); // Add class to the span for styling
      button.setAttribute("aria-label", `Option for ${question}`);
      const span = document.createElement("span");
      span.classList.add("option-button-text"); // Add class to the span for styling
      span.textContent = question;

      if (questionImages[question]) {
        const img = document.createElement("img");
        img.src = questionImages[question];
        img.alt = `${question} image`;
        img.classList.add("option-button-img"); // Add class to the span for styling
        img.classList.add("optionbuttonimg"); // Add class to the span for styling
        button.insertBefore(img, button.firstChild); // Insert the image before the text
      }
      button.appendChild(span);
      optionsDiv.appendChild(button);
      disableMessageSelection();
      // Add click listener to each button
      button.addEventListener("click", () => 
        handleUserQuery(question)
    );
    });
  };

  // Load questions and add them to options
  const loadQuestions = async () => {
    try {
      const response = {
        questions: Object.keys(chatData),
      };
      populateQuestions(response.questions);
    } catch (error) {
      console.error("Error loading questions:", error);
    }
  };
  loadQuestions();

  window.submitFeedback = function () {
    const feedbackText = textarea.value.trim();
    let feedback_question = document.getElementById("question-text");
    let feedback_answer = document.getElementById("answer-text");
    let feedback_message = document.getElementById("message-text");
    const question = feedback_question.value.trim();
    const answer = feedback_answer.value.trim();
    const messageId = feedback_message.value.trim();
    let threadId = localStorage.getItem("thread_id");
    let token = localStorage.getItem("authToken");
    submitFeedbackToAPI(question,answer,0,token, feedbackText, threadId,messageId);
  };

  function submitFeedbackToAPI(question,answer,rating,token, feedbackText, threadId,messageId) {
    fetch("api/submit-feedback/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(
        { question:question,
          answer:answer,
          feedback_type: rating, 
          feedback: feedbackText, 
          thread_id: threadId })
    })
    .then(response => response.json())
    .then(data => {
      showPopup("Feedback submitted successfully");
      removeFeedbackButtons(messageId);
      saveRemovedButtons(messageId);
      
      if(rating == 0){
        textarea.value = "";
        submitButton.setAttribute("disabled", "true");
        submitButton.classList.remove("enabled");
        setTimeout(() => {
          popupMessage.style.display = "none";
           document.getElementById("feedback-popup").style.display = "none";
           document.getElementById("chat-body").classList.remove("backdrop");
        }, 2000);
      }
      setTimeout(() => {
        popupMessage.style.display = "none";
         document.getElementById("chat-body").classList.remove("backdrop");
      }, 2000);    
      })
    .catch(error => {
      console.error("Error submitting feedback:", error);
    });
  }

  const saveRemovedButtons = (messageId) => {
      let removedButtons = JSON.parse(localStorage.getItem("removedButtons")) || [];
      
      if (!removedButtons.includes(messageId)) {
          removedButtons.push(messageId);
          localStorage.setItem("removedButtons", JSON.stringify(removedButtons));
      }
  };


  

  const copyMessage = (message) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(message)
        .then(() => alert("Message copied to clipboard!"))
        .catch((err) => console.error("Failed to copy message:", err));
    } else {
      // Fallback for unsupported browsers
      const textArea = document.createElement("textarea");
      textArea.value = message;
      textArea.style.position = "fixed"; // Avoid scrolling
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        alert("Message copied to clipboard!");
      } catch (err) {
        console.error("Fallback: Unable to copy", err);
      }
      document.body.removeChild(textArea);
    }
  };  

  const calculateTimeLapse = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const timeDiff = Math.floor((now - messageTime) / 1000); // Difference in seconds

    if (timeDiff < 60) return "just now";
    if (timeDiff < 3600) return `${Math.floor(timeDiff / 60)} min ago`;
    if (timeDiff < 86400) return `${Math.floor(timeDiff / 3600)} hr ago`;
    if (timeDiff < 172800) return `1 day ago`;
    return `${Math.floor(timeDiff / 86400)} days ago`;
  };

  const updateTimestamps = () => {
    const timestampElements = document.querySelectorAll(".timestamp");
    timestampElements.forEach((element) => {
      const timestamp = element.getAttribute("data-timestamp");
      if (timestamp) {
        element.textContent = calculateTimeLapse(timestamp);
      }
    });
  };

  const parseMarkdown = (message) => {
    // Match markdown table patterns
    const tableRegex = /^(\|.+\|)\n(\|[-:\s]+)+\n((\|.*\|\n?)+)/gm;
    
    // Replace table markdown with escaped characters
    message = message.replace(tableRegex, (match) => {
      return match.replace(/\|/g, "\\|").replace(/---/g, "\\-\\-\\-");
    });
  
    // Parse the markdown safely
    if (typeof marked.marked === "function") {
      return marked.marked(message);
    } else if (typeof marked === "function") {
      return marked(message);
    } else {
      console.error("Marked.js is not loaded correctly.");
      return message; // Return raw text if marked.js fails
    }
  };
  
  

  const appendMessage = (
    sender,
    message,
    timestamp = null,
    skipLocalStorage = false, 
    query = "",
    message_Id,
  ) => {
    let chatMessages = document.getElementById("chat-message");

    if (!chatMessages) {
      chatMessages = document.createElement("div");
      chatMessages.setAttribute("id", "chat-message");
      chatMessages.style.maxHeight = "370px";
      chatMessages.style.marginBottom = "10px";
      chatBody.prepend(chatMessages);
    }

    //   if (!messageDiv) {
    const messageDiv = document.createElement("div");
    const now = new Date();
    const messageTimestamp = timestamp || now.toISOString();
    // const timeString = timestamp || now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const timeLapse = calculateTimeLapse(messageTimestamp);
    const botmessageicon = document.createElement("div");
    botmessageicon.className = sender === "You" ? "user-image" : "bot-image";
    const botimg = document.createElement("img");
    botimg.src = sender === "You" ? "assets/img/chatbot_img/User.svg" : "assets/img/chatbot_img/logo.png"; // Replace with the actual path to your image
    botimg.alt = "Logo";
    botimg.style.width = sender === "You" ? "20px" : "16px"; 
    botimg.style.height = sender === "You" ? "20px" : "16px";
    botimg.style.cursor = "pointer"
    botmessageicon.appendChild(botimg);
    // Set class based on sender
    messageDiv.className = sender === "You" ? "user-message" : "bot-message";
    messageDiv.role = "article";


    // Function to truncate a message
    const truncateMessage = (msg, wordLimit) => {
      const words = msg.split(" ");
      if (words.length > wordLimit) {
        return {
          truncated: words.slice(0, wordLimit).join(" ") + " ...",
          original: msg,
          isTruncated: true,
        };
      }
      return { truncated: null, original: msg, isTruncated: false };
    };
    // Add message content
    const messageContent = document.createElement("span");
    const { truncated, original, isTruncated } = truncateMessage(message, 40);
    messageContent.innerHTML = isTruncated ? parseMarkdown(truncated) : parseMarkdown(original);
    messageDiv.appendChild(messageContent);

    if (isTruncated) {
      const toggleButton = document.createElement("button");
      toggleButton.textContent = "Read More";
      toggleButton.style.border = "none";
      toggleButton.style.backgroundColor = "transparent";
      toggleButton.style.color = "blue";
      toggleButton.style.cursor = "pointer";
      toggleButton.style.marginLeft = "5px";

      let isExpanded = false; // Track toggle state

      toggleButton.addEventListener("click", () => {
        if (isExpanded) {
          messageContent.innerHTML = parseMarkdown(truncated);
          toggleButton.textContent = "Read More";
        } else {
          messageContent.innerHTML = parseMarkdown(original);
          toggleButton.textContent = "Read Less";
        }
        isExpanded = !isExpanded; // Toggle the state
      });

      messageDiv.appendChild(toggleButton);
    }

    // Add timestamp

    if (sender !== "You") {
      // Add copy button for bot messages
      const timestampDiv = document.createElement("div");
      timestampDiv.className = "timestamp";
      timestampDiv.textContent = timeLapse;
      timestampDiv.setAttribute("data-timestamp", messageTimestamp);
      const copyButton = document.createElement("button");
      copyButton.className = "copy-button";

      if(!message_Id){
      var message_Id = `message-${Date.now()}`;
      }
      messageDiv.setAttribute("data-id", message_Id);
      const copyIcon = document.createElement("img");
      copyIcon.src = "assets/img/chatbot_img/copy.svg"; // Replace with the actual path to your image
      copyIcon.alt = "Copy";
      copyIcon.style.width = "16px"; // Set size of the icon
      copyIcon.style.height = "16px";
      copyIcon.style.cursor = "pointer"

      const LikeButton = document.createElement("button");
      LikeButton.className = "like-button";

      const LikeIcon = document.createElement("img");
      LikeIcon.src = "assets/img/chatbot_img/like.svg"; // Replace with the actual path to your image
      LikeIcon.alt = "Like";
      LikeIcon.style.width = "16px"; // Set size of the icon
      LikeIcon.style.height = "16px";
      LikeIcon.style.cursor = "pointer"

      const DislikeButton = document.createElement("button");
      DislikeButton.className = "dislike-button";

      const dislikeIcon = document.createElement("img");
      dislikeIcon.src = "assets/img/chatbot_img/dislike.svg"; // Replace with the actual path to your image
      dislikeIcon.alt = "Dislike";
      dislikeIcon.style.width = "16px"; // Set size of the icon
      dislikeIcon.style.height = "16px";
      dislikeIcon.style.cursor = "pointer"

      copyButton.appendChild(copyIcon);
      LikeButton.appendChild(LikeIcon);
      DislikeButton.appendChild(dislikeIcon);

      copyButton.onclick = () => copyMessage(message.replace(/[=*#@%&]/g, ""));

      LikeButton.onclick = () => likeMessage(query,message.replace(/[=*#@%&]/g), message_Id);

      DislikeButton.onclick = () => dislikeMessage(query,message.replace(/[=*#@%&]/g), message_Id);


      // Add speaker button for bot messages
      const speakerButton = document.createElement("button");
      speakerButton.className = "speaker-button";

      const speakerIcon = document.createElement("img");
      speakerIcon.src = "assets/img/chatbot_img/Voice.svg"; // Replace with the actual path to your speaker icon
      speakerIcon.alt = "Speak";
      speakerIcon.style.width = "16px";
      speakerIcon.style.height = "16px";
      speakerIcon.style.cursor = "pointer";
      speakerButton.appendChild(speakerIcon);

      let isSpeaking = false; // To track if it's currently speaking
      let currentUtterance = null;
      // Add speech synthesis functionality
      speakerButton.onclick = () => {
        if (isSpeaking) {
          // If currently speaking, stop the speech and update the icon
          window.speechSynthesis.cancel();
          speakerIcon.src = "assets/img/chatbot_img/Voice.svg"; // Reset to speaker icon
          speakerIcon.alt = "Speak";
          isSpeaking = false;
        } else {
          // Create a new utterance and start speaking
          currentUtterance = new SpeechSynthesisUtterance(message.replace(/[=*#@%&]/g, ""));
          currentUtterance.lang = "en-US"; // Set language
          currentUtterance.rate = 1; // Adjust speech rate if needed

          currentUtterance.onend = () => {
            // When speech ends, reset the button state
            speakerIcon.src = "assets/img/chatbot_img/Voice.svg";
            speakerIcon.alt = "Speak";
            isSpeaking = false;
          };

          window.speechSynthesis.speak(currentUtterance);
          speakerIcon.src = "assets/img/chatbot_img/mute.svg"; // Change to mute icon
          speakerIcon.alt = "Mute";
          isSpeaking = true;
        }
      };

      // Wrap timestamp and copy button together
      const timestampCopyDiv = document.createElement("div");
      timestampCopyDiv.className = "timestamp-copy";
      timestampCopyDiv.appendChild(timestampDiv);
      timestampCopyDiv.appendChild(copyButton);
      timestampCopyDiv.appendChild(LikeButton);
      timestampCopyDiv.appendChild(DislikeButton);
      timestampCopyDiv.appendChild(speakerButton);

      messageDiv.appendChild(timestampCopyDiv);
      messageDiv.appendChild(botmessageicon);
    } else {
      const timestampDiv = document.createElement("div");
      timestampDiv.className = "timestampquery";
      timestampDiv.textContent = timeLapse;
      timestampDiv.setAttribute("data-timestamp", messageTimestamp);
      const copyButton = document.createElement("button");
      copyButton.className = "copy-button-query";
      if(!message_Id){
        var message_Id = `message-${Date.now()}`;
      }
      messageDiv.setAttribute("data-id", message_Id);
      const copyIcon = document.createElement("img");
      copyIcon.src = "assets/img/chatbot_img/copy.svg"; 
      copyIcon.alt = "Copy";
      copyIcon.style.width = "16px"; 
      copyIcon.style.height = "16px";
      copyIcon.style.cursor = "pointer";
      copyButton.appendChild(copyIcon);
      copyButton.onclick = () => copyMessage(message.replace(/[=*#@%&]/g, ""));
      const timestampCopyDiv = document.createElement("div");
      timestampCopyDiv.className = "timestamp-copy";
      timestampCopyDiv.appendChild(timestampDiv);
      timestampCopyDiv.appendChild(copyButton);
      messageDiv.appendChild(timestampCopyDiv);
      messageDiv.appendChild(timestampDiv);
      messageDiv.appendChild(botmessageicon);
    }

    // Add the new message to the chat container
    chatMessages.appendChild(messageDiv);

    // Scroll to the latest message
    chatMessages.scrollTop = chatMessages.scrollHeight;

    if (!skipLocalStorage) {
      const storedChat = JSON.parse(localStorage.getItem("chatHistory")) || [];
      storedChat.push({ sender, message, timestamp: messageTimestamp, query,message_Id });
      localStorage.setItem("chatHistory", JSON.stringify(storedChat));
    }
  };

  const removeFeedbackButtons = (messageId) => {
    const messageDiv = document.querySelector(`.bot-message[data-id="${messageId}"]`);
    if (messageDiv) {
        const likeButton = messageDiv.querySelector(".like-button");
        const dislikeButton = messageDiv.querySelector(".dislike-button");
        const copyButton = messageDiv.querySelector(".copy-button");

        if (likeButton) likeButton.remove();
        if (dislikeButton) dislikeButton.remove();

        // ✅ Add class to copy button's parent div
        if (copyButton) {
              copyButton.classList.add("remove_feedback_button");
        }
    }
};


  const likeMessage = (question,answer,messageId) => {
    event.stopPropagation(); 
    console.log("question:",question);
    console.log("answer:",answer);
    console.log("Message ID:", messageId); // Debugging log
    document.getElementById("chat-body").classList.add("backdrop");
    let threadId = localStorage.getItem("thread_id");
    let token = localStorage.getItem("authToken");
    submitFeedbackToAPI(question,answer,1,token, "", threadId,messageId);
}

const dislikeMessage = (question,answer,messageId) => {
  let feedback_question = document.getElementById("question-text");
  let feedback_answer = document.getElementById("answer-text");
  let feedback_message = document.getElementById("message-text");
  feedback_question.value = question;
  feedback_answer.value = answer;
  feedback_message.value = messageId;  
  let popup = document.getElementById("feedback-popup");
  popup.style.bottom = "5px";
  popup.style.display = "block";
  document.getElementById("chat-body").classList.add("backdrop");
}

  setInterval(() => {
    updateTimestamps();
  }, 60000);

  const sanitizeInput = (input) => {
    const div = document.createElement("div");
    div.textContent = input; // Prevent script injection
    return div.innerHTML;
  };
  function scrollToBottom() {
    const chatMessageContainer = document.getElementById("chat-message");
    chatMessageContainer.scrollTop = chatMessageContainer.scrollHeight;
  }
  const loadChatFromLocalStorage = () => {
    const storedChat = JSON.parse(localStorage.getItem("chatHistory")) || [];
    const removedButtons = JSON.parse(localStorage.getItem("removedButtons")) || [];

    if (storedChat.length > 0) { 
      storedChat.forEach((chat) => {
        // const sanitizedMessage = sanitizeInput(chat.message);
        appendMessage(chat.sender, chat.message, chat.timestamp, true,chat.query,chat.message_Id);
        
        setTimeout(() => {
          if (chat.message_Id && removedButtons.includes(chat.message_Id)) {
            removeFeedbackButtons(chat.message_Id);
          }
        }, 100);
      });
      moveChatMessageBelowInput();
      setTimeout(() => {
        const chatMessages = document.getElementById("chat-message");
        if (chatMessages) {
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }
      }, 0);
    }
    updateTimestamps();
    // scrollToBottom();
  };

  const exportChat = (selectedIndices = null) => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Set general styles and margins
    const marginLeft = 15;
    const marginRight = 15;
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const maxLineWidth = pageWidth - marginLeft - marginRight;
    const lineHeight = 10;
    const sectionSpacing = 5;
    let yPosition = 20;
  
    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Chat Export", pageWidth / 2, yPosition, { align: "center" });
    yPosition += 15;
  
    // Get chat history
    const chatMessages = JSON.parse(localStorage.getItem("chatHistory")) || [];
    
    // If selectedIndices is provided, filter messages
    const messagesToExport = selectedIndices 
      ? chatMessages.filter((_, index) => selectedIndices.includes(index))
      : chatMessages;
  
    const cleanText = (text) => text.replace(/[=*#$%]/g, "").trim();
  
    // Process and format each message
    messagesToExport.forEach((msg) => {
      const sender = msg.sender;
      const message = cleanText(msg.message);
      const timestamp = new Date(msg.timestamp).toLocaleString();
  
      // Set sender and timestamp styles
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(40, 40, 40);
  
      const formattedHeader = `[${timestamp}] ${sender}:`;
      doc.text(formattedHeader, marginLeft, yPosition);
  
      // Wrap and add the message text
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(60, 60, 60);
  
      const wrappedMessage = doc.splitTextToSize(message, maxLineWidth);
      yPosition += lineHeight;
      wrappedMessage.forEach((line) => {
        if (yPosition + lineHeight > pageHeight - 10) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(line, marginLeft, yPosition);
        yPosition += lineHeight;
      });
  
      yPosition += sectionSpacing;
    });
  
    // Save the PDF
    doc.save("chat_export.pdf");
  };  


  // Append a temporary message and return its unique ID
  const appendTemporaryMessage = (sender, message) => {
    const chatMessages = document.getElementById("chat-message");

    const tempMessageDiv = document.createElement("div");
    const tempMessageId = `temp-${Date.now()}`; // Unique ID for the temporary message
    tempMessageDiv.id = tempMessageId;
    tempMessageDiv.className =
      sender === "You" ? "user-message" : "bot-message";
    tempMessageDiv.innerHTML = parseMarkdown(message);

    chatMessages.appendChild(tempMessageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the latest message

    return tempMessageId; // Return the ID for further manipulation
  };

  // Remove a temporary message by its ID
  const removeTemporaryMessage = (messageId) => {
    const tempMessageDiv = document.getElementById(messageId);
    if (tempMessageDiv) {
      tempMessageDiv.remove();
    }
  };



  // Handle user query
  const handleUserQuery = async (query) => {
    disableMessageSelection();
    let isUserScrolling = false; // Flag to track user scrolling
    let autoScrollTimeout;
    // Disable user input and buttons
    const disableElements = (state) => {
      userInput.disabled = state;
      sendBtn.disabled = state;
      micBtn.disabled = state;
      userInput.style.backgroundColor = state ? "#d3d3d3" : "";
      userInput.style.color = state ? "#a9a9a9" : "";
      userInput.style.cursor = state ? "not-allowed" : "";
  
      const optionsAllButtons = document.querySelectorAll(".optionallbuttoncommon");
      optionsAllButtons.forEach((button) => {
        button.disabled = state;
        button.style.backgroundColor = state ? "#d3d3d3" : "";
        button.style.color = state ? "#a9a9a9" : "";
      });
    };
    if (!isFirstInteraction) {
    const chatMessage = document.getElementById("chat-message");
    chatMessage.addEventListener("scroll", () => {
      clearTimeout(autoScrollTimeout);
      isUserScrolling = true;
  
      autoScrollTimeout = setTimeout(() => {
        isUserScrolling = false; // Reset after user stops interacting
      }, 2000); // Adjust timeout as needed
    });
  
    const scrollToBottom = () => {
      if (!isUserScrolling) {
        chatMessage.scrollTop = chatMessage.scrollHeight;
      }
    };
  }
  
    disableElements(true);
  
    if (chatData[query]) {
      moveChatMessageBelowInput();
      createchatmessage();
    }
  
    appendMessage("You", query);
    const chatMessage = document.getElementById("chat-message");
    chatMessage.addEventListener("scroll", () => {
      clearTimeout(autoScrollTimeout);
      isUserScrolling = true;
  
      autoScrollTimeout = setTimeout(() => {
        isUserScrolling = false; // Reset after user stops interacting
      }, 2000); // Adjust timeout as needed
    });
  
    const scrollToBottom = () => {
      if (!isUserScrolling) {
        chatMessage.scrollTop = chatMessage.scrollHeight;
      }
    };
    const threadId = getThreadId();
    const streamingMessageId = appendTemporaryMessage("Bot", "");
  
    try {
      const typingIndicator = document.createElement("div");
      typingIndicator.className = "typing-indicator";
      typingIndicator.innerHTML = `<span>.</span><span>.</span><span>.</span>`;
      document.getElementById(streamingMessageId).appendChild(typingIndicator);
      const botmessageicon = document.createElement("div");
      botmessageicon.className = "bot-image";
      const botimg = document.createElement("img");
      botimg.src = sender = "assets/img/chatbot_img/logo.png"; // Replace with the actual path to your image
      botimg.alt = "Logo";
      botimg.style.width =  "16px"; 
      botimg.style.height =  "16px";
      botimg.style.cursor = "pointer"
      botmessageicon.appendChild(botimg);
      document.getElementById(streamingMessageId).appendChild(botmessageicon);
  
      let token = localStorage.getItem("authToken");
      if (!token) {
        const email = "admin@cdot.in";
        const password = "admin";
        token = await authenticateAndStoreToken(email, password);
      }
  
      const response = await fetch("api/chatbot/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          human_text: query,
          thread_id: threadId,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let streamingMessage = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
  
        const chunk = decoder.decode(value, { stream: true });
        streamingMessage += chunk;
  
        const tempMessageDiv = document.querySelector(`#${streamingMessageId} > div.typing-indicator`);
        if (tempMessageDiv) {
          tempMessageDiv.innerHTML = parseMarkdown(streamingMessage);
          scrollToBottom();
          document.querySelector(`.typing-indicator`).style.display = "unset";
        }
      }
  
      if (streamingMessage.trim().endsWith("NO")) {
        streamingMessage = `The context provided does not contain any information related to “${query}”. Therefore, please try again with a refined question or ask a different question.`;
      }
  
      removeTemporaryMessage(streamingMessageId);
      appendMessage("Bot", streamingMessage, null, false,query);
    } catch (error) {
      console.error("Error calling the API:", error);
      removeTemporaryMessage(streamingMessageId);
      appendMessage("Bot", "The chatbot service is currently unavailable. Please try again later.");
    } finally {
      disableElements(false);
  
      setTimeout(() => {
        userInput.focus();
      }, 50);
  
      scrollToBottom();
    }
  };

  userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default behavior (e.g., form submission)
      const query = userInput.value.trim();

      if (query) {
        moveChatMessageBelowInput();
        createchatmessage();
        handleUserQuery(query);
        userInput.value = ""; // Clear the input field after sending
      }
    }
  });
  userInput.addEventListener("input", () => {
      userInput.value = userInput.value.replace(/[^\u0900-\u097F\s.,?!-a-zA-Z0-9]/g, "");
      // if (userInput.value.length > 60) {
      //   userInput.value = userInput.value.slice(0, 60);
      // }
  });
  function adjustChatBodyHeight() {
    const chatBody = document.getElementById('chat-body');
    const visualViewportHeight = window.visualViewport.height; // Get the actual height of the visible viewport

    // Check if the search bar (browser navbar) is visible or hidden
    const isNavbarVisible = visualViewportHeight < window.innerHeight;

    if (isMobileView()) {
        // Apply height adjustments for mobile view
        if (isNavbarVisible) {
            chatBody.style.height = `calc(${visualViewportHeight}px - 210px - env(safe-area-inset-bottom))`;
        } else {
            chatBody.style.height = `calc(${visualViewportHeight}px - 150px - env(safe-area-inset-bottom))`;
        }
    } else {
        // Restore default height for desktop
        chatBody.style.height = "359px"; // Reset to original height
    }
}

// Function to check if the viewport is mobile
function isMobileView() {
    return window.innerWidth <= 768; // Adjust the breakpoint as needed
}

// Run on load
adjustChatBodyHeight();

// Run whenever the viewport changes
window.visualViewport.addEventListener('resize', adjustChatBodyHeight);
window.addEventListener('resize', adjustChatBodyHeight);
  
});