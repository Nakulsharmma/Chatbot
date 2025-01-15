document.addEventListener("DOMContentLoaded", () => {
  const optionsDiv = document.querySelector(".options");
  const toggleOptionsBtn = document.getElementById("toggle-options-btn");
  const chatbot = document.getElementById("chatbot");
  const chatIcon = document.querySelector("#chat-icon img[alt='Chatbot Icon']");
  const chatDownIcon = document.querySelector(
    "#chat-icon img[alt='Chatbot down icon']"
  );
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
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default form submission if necessary
      console.log("Enter key pressed");
      triggerEnterAction(); // Trigger Enter action on key press
    }
  });
 
  

  chatbot.style.display = "none";
  chatDownIcon.style.display = "none";
  chatIcon.style.display = "block";
  arrowButton.style.display = "none";
  // Function to toggle chatbot visibility
  const toggleChatbotVisibility = (showChatbot) => {
    if (showChatbot) {
      chatbot.style.display = "block";
      chatIcon.style.display = "none";
      chatDownIcon.style.display = "block";
    } else {
      chatbot.style.display = "none";
      chatIcon.style.display = "block";
      chatDownIcon.style.display = "none";
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

  const getThreadId = () => {
    let threadId = localStorage.getItem("thread_id");
    if (!threadId) {
      threadId = `${Math.floor(Math.random() * 1000000)}`; // Generate random ID
      localStorage.setItem("thread_id", threadId);
    }
    return threadId;
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
      `http://192.168.109.222:8000/api/clear-chat-history?thread_id=${threadId}`,
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
    Consultancy:
      "C-DOT provides consultancy services for telecommunication technology.",
    "About Cdot": "C-DOT is an R&D organization under the Government of India.",
    // "6 G": "6G is the future of wireless communication technology.",
    "Products":
      "Wireless technology enables communication without physical cables.",
    "Directors": "PM-WANI is an initiative to provide Wi-Fi access across India.",
    // FAQs: "Check our FAQ section for common queries.",
    "Awards and Achievements": "Explore the gallery for event photos and updates.",
  };

  const questionImages = {
    "About Cdot": "assests/img/events.svg",
    Consultancy: "assests/img/consultancy.svg",
    "6G": "assests/img/wifi.svg",
    "Products": "assests/img/Sell.svg",
    "Directors": "assests/img/Supplier.svg",
    FAQs: "assests/img/Faq.svg",
    "Awards and Achievements": "assests/img/gallery.svg",
  };

  // Event listeners for chat icons
  chatIcon.addEventListener("click", () => {
    toggleChatbotVisibility(true); // Show the chatbot
    scrollToBottom(); // Scroll to the bottom
  });

  chatDownIcon.addEventListener("click", () => toggleChatbotVisibility(false));
  minimizedownicon.addEventListener("click", () => toggleChatbotVisibility(false));


  // Event listeners for the close buttons in chatbot header
  const exportBtn = document.getElementById("export-btn");
  exportBtn.addEventListener("click", () => {
    // if (confirm("Do you want to export the chat?")) {
      exportChat();
    // }
  });

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
      chatMessages.style.maxHeight = "370px";
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
      // Add click listener to each button
      button.addEventListener("click", () => handleUserQuery(question));
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
    if (typeof marked.marked === "function") {
      return marked.marked(message);
    } else if (typeof marked === "function") {
      return marked(message);
    } else {
      console.error("Marked.js is not loaded correctly.");
      return message; // Fallback to raw message
    }
  };
  

  const appendMessage = (
    sender,
    message,
    timestamp = null,
    skipLocalStorage = false,
    isStreaming = false
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

    // Set class based on sender
    messageDiv.className = sender === "You" ? "user-message" : "bot-message";

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
    const timestampDiv = document.createElement("div");
    timestampDiv.className = "timestamp";
    timestampDiv.textContent = timeLapse;
    timestampDiv.setAttribute("data-timestamp", messageTimestamp);

    if (sender !== "You") {
      // Add copy button for bot messages
      const copyButton = document.createElement("button");
      copyButton.className = "copy-button";

      const copyIcon = document.createElement("img");
      copyIcon.src = "assests/img/copy.svg"; // Replace with the actual path to your image
      copyIcon.alt = "Copy";
      copyIcon.style.width = "16px"; // Set size of the icon
      copyIcon.style.height = "16px";
      copyIcon.style.cursor = "pointer"
      copyButton.appendChild(copyIcon);
      copyButton.onclick = () => copyMessage(message.replace(/[=*#@%&]/g, ""));

      // Add speaker button for bot messages
      const speakerButton = document.createElement("button");
      speakerButton.className = "speaker-button";

      const speakerIcon = document.createElement("img");
      speakerIcon.src = "assests/img/Voice.svg"; // Replace with the actual path to your speaker icon
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
          speakerIcon.src = "assests/img/Voice.svg"; // Reset to speaker icon
          speakerIcon.alt = "Speak";
          isSpeaking = false;
        } else {
          // Create a new utterance and start speaking
          currentUtterance = new SpeechSynthesisUtterance(message.replace(/[=*#@%&]/g, ""));
          currentUtterance.lang = "en-US"; // Set language
          currentUtterance.rate = 1.5; // Adjust speech rate if needed

          currentUtterance.onend = () => {
            // When speech ends, reset the button state
            speakerIcon.src = "assests/img/Voice.svg";
            speakerIcon.alt = "Speak";
            isSpeaking = false;
          };

          window.speechSynthesis.speak(currentUtterance);
          speakerIcon.src = "assests/img/mute.svg"; // Change to mute icon
          speakerIcon.alt = "Mute";
          isSpeaking = true;
        }
      };

      // Wrap timestamp and copy button together
      const timestampCopyDiv = document.createElement("div");
      timestampCopyDiv.className = "timestamp-copy";
      timestampCopyDiv.appendChild(timestampDiv);
      timestampCopyDiv.appendChild(copyButton);
      timestampCopyDiv.appendChild(speakerButton);

      messageDiv.appendChild(timestampCopyDiv);
    } else {
      messageDiv.appendChild(timestampDiv);
    }

    // Add the new message to the chat container
    chatMessages.appendChild(messageDiv);

    // Scroll to the latest message
    chatMessages.scrollTop = chatMessages.scrollHeight;

    if (!skipLocalStorage) {
      const storedChat = JSON.parse(localStorage.getItem("chatHistory")) || [];
      storedChat.push({ sender, message, timestamp: messageTimestamp });
      localStorage.setItem("chatHistory", JSON.stringify(storedChat));
    }
  };

  setInterval(() => {
    console.log("Updating timestamps...");
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
    if (storedChat.length > 0) {
      storedChat.forEach((chat) => {
        const sanitizedMessage = sanitizeInput(chat.message);
        appendMessage(chat.sender, sanitizedMessage, chat.timestamp, true);
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

  const exportChat = () => {
    const { jsPDF } = window.jspdf; // Access jsPDF
    const doc = new jsPDF();
  
    // Set general styles and margins
    const marginLeft = 15;
    const marginRight = 15;
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const maxLineWidth = pageWidth - marginLeft - marginRight;
    const lineHeight = 10; // Line height for text
    const sectionSpacing = 5; // Extra spacing between chat messages
    let yPosition = 20; // Start position for text
  
    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Chat Export", pageWidth / 2, yPosition, { align: "center" });
    yPosition += 15;
  
    // Get chat history from localStorage
    const chatMessages = JSON.parse(localStorage.getItem("chatHistory")) || [];
  
    // Regular expression to remove unwanted symbols
    const cleanText = (text) => text.replace(/[=*#$%]/g, "").trim();
  
    // Process and format each message
    chatMessages.forEach((msg, index) => {
      const sender = msg.sender;
      const message = cleanText(msg.message); // Clean message content
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
      yPosition += lineHeight; // Space below header
      wrappedMessage.forEach((line) => {
        if (yPosition + lineHeight > pageHeight - 10) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(line, marginLeft, yPosition);
        yPosition += lineHeight;
      });
  
      yPosition += sectionSpacing; // Add spacing between messages
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

  async function authenticateAndStoreToken(email, password) {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      const response = await fetch("http://192.168.109.222:8000/api/auth-token/", 
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        const token = data.access_token;
        localStorage.setItem("authToken", token); // Store token in localStorage
        console.log("Token stored in localStorage:", token);
        return token;
      } else {
        console.error("Failed to fetch token:", await response.text());
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  }

  // Handle user query
  const handleUserQuery = async (query) => {
    userInput.disabled = true;
    sendBtn.disabled = true;
    micBtn.disabled = true;
    optionsButtons.forEach((button) => (button.disabled = true));
    userInput.style.backgroundColor = "#d3d3d3";
    userInput.style.color = "#a9a9a9";
    userInput.style.cursor = "not-allowed";
    if (chatData[query]) {
      moveChatMessageBelowInput();
      createchatmessage();
    }
    appendMessage("You", query);
    const threadId = getThreadId();
    // if (chatData[query]) {
    //   const response =
    //     chatData[query] || "Sorry, I don't have an answer for that.";
    //   appendMessage("Bot", response);
    //   userInput.disabled = false;
    //   sendBtn.disabled = false;
    //   micBtn.disabled = false;
    //   optionsButtons.forEach((button) => (button.disabled = false));
    //   userInput.style.backgroundColor = ""; // Resets to default
    //   userInput.style.color = ""; // Resets to default
    //   userInput.style.cursor = "";
    // } else {
      // If not found, fallback to the API
      const streamingMessageId = appendTemporaryMessage("Bot", "");
      try {
        //   const typingMessageId = appendTemporaryMessage("Bot", "Gathering the information for you...");

          const typingIndicator = document.createElement("div");
          typingIndicator.className = "typing-indicator";
          typingIndicator.innerHTML = `
              <span>.</span><span>.</span><span>.</span>
          `;
          document.getElementById(streamingMessageId).appendChild(typingIndicator);

        // const data = await response.json();
        let token = localStorage.getItem("authToken");
        if (!token) {
          const email = "admin@cdot.in";
          const password = "admin";
          token  = await authenticateAndStoreToken(email, password);
        }
        const response = await fetch(
          "http://192.168.109.222:8000/api/chatbot/",
          {
            method: "POST",
            headers: {
              Authorization:`Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              human_text: query,
              thread_id: threadId,
            }),
          }
        );
        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let streamingMessage = "";

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          // Decode the chunk and append to the message
          const chunk = decoder.decode(value, { stream: true });
          streamingMessage += chunk;

          // Update the temporary message with the new content
          const tempMessageDiv = document.getElementById(streamingMessageId);
          if (tempMessageDiv) {
            tempMessageDiv.innerHTML = parseMarkdown(streamingMessage);
            scrollToBottom();
          }
        }

        const lastWord = streamingMessage.trim().split(/\s+/).pop();
        if (lastWord === "NO") {
          streamingMessage = "The context provided does not contain any information related to “" + query + "”. Therefore, Please try again with a refined question or ask a different question.";
        }
        //   const data = await response.text();
        removeTemporaryMessage(streamingMessageId);
        appendMessage("Bot", streamingMessage, null, false, true);
        userInput.disabled = false;
        sendBtn.disabled = false;
        micBtn.disabled = false;
        optionsButtons.forEach((button) => (button.disabled = false));
        userInput.style.backgroundColor = ""; // Resets to default
        userInput.style.color = ""; // Resets to default
        userInput.style.cursor = "";
      } catch (error) {
        console.error("Error calling the API:", error);
        removeTemporaryMessage(streamingMessageId);
        appendMessage("Bot", "Something went wrong. Please try again.");
      }finally {
        // Always re-enable input and buttons
        userInput.disabled = false;
        sendBtn.disabled = false;
        micBtn.disabled = false;
        optionsButtons.forEach((button) => (button.disabled = false));
        userInput.style.backgroundColor = ""; // Reset to default
        userInput.style.color = ""; // Reset to default
        userInput.style.cursor = "";
    
        // Automatically focus the input field
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
    userInput.value = userInput.value.replace(/[^a-zA-Z0-9\s.,?!]/g, "");
  });
  function adjustChatBodyHeight() {
    const chatBody = document.getElementById('chat-body');
    const visualViewportHeight = window.visualViewport.height; // Get the actual height of the visible viewport
  
    // Check if the search bar (browser navbar) is visible or hidden
    const isNavbarVisible = visualViewportHeight < window.innerHeight;
  
    if (isNavbarVisible) {
      // Browser navbar is visible
      chatBody.style.height = `calc(${visualViewportHeight}px - 210px - env(safe-area-inset-bottom))`;
    } else {
      // Browser navbar is hidden
      chatBody.style.height = `calc(${visualViewportHeight}px - 150px - env(safe-area-inset-bottom))`;
    }
  }
  
  // Function to check if the viewport is mobile
  function isMobileView() {
    return window.innerWidth <= 768; // Adjust the breakpoint as needed
  }
  
  // Run on load if in mobile view
  if (isMobileView()) {
    adjustChatBodyHeight();
  }
  
  // Run whenever the viewport changes, but only in mobile view
  window.visualViewport.addEventListener('resize', () => {
    if (isMobileView()) {
      adjustChatBodyHeight();
    }
  });
  window.addEventListener("beforeunload", () => {
    // localStorage.removeItem(CHAT_HISTORY_KEY); 
  });
  
});