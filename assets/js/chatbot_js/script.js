/* ═══════════════════════════════════════════════════════════
   BILINGUAL TRANSLATIONS
═══════════════════════════════════════════════════════════ */
const TRANSLATIONS = {
  en: {
    botName: 'CIVA',
    hdrSub: 'CDOT intelligence virtual assistant',
    inputPlaceholder: 'Ask me anything…',
    readMore: 'Read More',
    readLess: 'Read Less',
    feedbackTitle: '📝 Share your feedback',
    feedbackSub: 'Help us improve CIVA with your thoughts.',
    feedbackPlaceholder: 'Describe the issue or suggestion…',
    submitFeedback: 'Submit Feedback',
    messageCopied: 'Copied to clipboard!',
    likedMsg: 'Thanks for your feedback!',
    clearChatConfirm: 'Clear chat history and close?',
    selectMessageAlert: 'Please select at least one message to export.',
    serviceUnavailable: 'The chatbot service is currently unavailable. Please try again later.',
    noInformation: 'The context provided does not contain information related to',
    micListening: 'Listening…',
    micDenied: 'Microphone access denied.',
    speechNotSupported: 'Speech recognition not supported.',
    exportFullLabel: '💬 Export Chat',
    exportSelLabel: '📄 User + CIVA Messages',
    exportSelBtn: 'Select Messages to Export',
    todayLabel: 'Today',
    selCount: (n) => `${n} selected`,
    chips: { about:'About C-DOT', products:'Products', consult:'Consultancy', awards:'Awards', faqs:'FAQs' },
    sqChips: ['Products','Career','Board Members','Awards & Accolades','Consultation','About C-DOT','Mission & Vision']
  },
  hi: {
    botName: 'सी-बॉट',
    hdrSub: 'ऑनलाइन · सी-डॉट AI सहायक',
    inputPlaceholder: 'यहाँ अपना संदेश लिखें…',
    readMore: 'और पढ़ें',
    readLess: 'कम पढ़ें',
    feedbackTitle: '📝 अपनी प्रतिक्रिया दें',
    feedbackSub: 'आपका फीडबैक CIVA को बेहतर बनाने में मदद करता है।',
    feedbackPlaceholder: 'समस्या या सुझाव यहाँ लिखें…',
    submitFeedback: 'प्रतिक्रिया भेजें',
    messageCopied: 'संदेश क्लिपबोर्ड पर कॉपी किया गया!',
    likedMsg: 'आपकी प्रतिक्रिया के लिए धन्यवाद!',
    clearChatConfirm: 'चैट इतिहास साफ करके बंद करें?',
    selectMessageAlert: 'कृपया निर्यात के लिए कम से कम एक संदेश चुनें।',
    serviceUnavailable: 'चैटबॉट सेवा वर्तमान में उपलब्ध नहीं है। कृपया बाद में पुनः प्रयास करें।',
    noInformation: 'प्रदान किए गए संदर्भ में इससे संबंधित कोई जानकारी नहीं है',
    micListening: 'सुन रहा हूँ…',
    micDenied: 'माइक्रोफोन एक्सेस अस्वीकृत।',
    speechNotSupported: 'स्पीच रिकग्निशन समर्थित नहीं है।',
    exportFullLabel: '💬 पूरी चैट निर्यात',
    exportFullBtn: 'पूरी बातचीत निर्यात करें',
    exportSelLabel: '📄 उपयोगकर्ता + CIVA संदेश',
    exportSelBtn: 'निर्यात के लिए संदेश चुनें',
    todayLabel: 'आज',
    selCount: (n) => `${n} चुना गया`,
    chips: { about:'C-DOT के बारे में', products:'उत्पाद', consult:'परामर्श', awards:'पुरस्कार', faqs:'FAQs' },
    sqChips: ['उत्पाद','करियर','बोर्ड सदस्य','पुरस्कार एवं सम्मान','परामर्श','C-DOT के बारे में','मिशन और दृष्टि']
  }
};

/* ═══════════════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════════════ */
let chatOpen = false, isMaximized = false, inChat = false;
let alertResolve = null;
let _activeSpeakerBtn = null;
let _cachedVoices = [];
let recognition, micActive = false;
let selectionMode = false;
const lang = window.lang || 'en';
const T = TRANSLATIONS[lang] || TRANSLATIONS['en'];

/* ── Thread / token management ── */
const getThreadId = () => {
  let id = localStorage.getItem('thread_id');
  if (!id) { id = `${Math.floor(Math.random()*1000000)}`; localStorage.setItem('thread_id', id); }
  return id;
};
const getToken = () => localStorage.getItem('authToken');

async function authenticateAndStoreToken() {
  try {
    const fd = new FormData();
    fd.append('email','admin@cdot.in');
    fd.append('password','admin');
    const r = await fetch('http://chatbot.cdot.in/api/auth-token/', { method:'POST', body:fd });
    if (r.ok) {
      const d = await r.json();
      localStorage.setItem('authToken', d.access_token);
      return d.access_token;
    }
  } catch(e) { console.error('Auth error:', e); }
  return null;
}

/* ═══════════════════════════════════════════════════════════
   APPLY TRANSLATIONS ON LOAD
═══════════════════════════════════════════════════════════ */
function applyTranslations() {
  document.getElementById('hdr-name').textContent = T.botName;
  document.getElementById('hdr-sub').textContent = T.hdrSub;
  document.getElementById('user-input').placeholder = T.inputPlaceholder;
  document.getElementById('fb-title').textContent = T.feedbackTitle;
  document.getElementById('fb-sub').textContent = T.feedbackSub;
  document.getElementById('feedback-text').placeholder = T.feedbackPlaceholder;
  document.getElementById('submit-feedback').textContent = T.submitFeedback;
  document.getElementById('today-divider').textContent = T.todayLabel;
  const elLbl = document.getElementById('lbl-export-full'); if (elLbl) elLbl.textContent = T.exportFullLabel;
  const elSel = document.getElementById('lbl-export-sel'); if (elSel) elSel.textContent = T.exportSelLabel;
  const elSelBtn = document.getElementById('btn-export-sel'); if (elSelBtn) elSelBtn.textContent = T.exportSelBtn;
}

/* ═══════════════════════════════════════════════════════════
   ALERT SYSTEM
═══════════════════════════════════════════════════════════ */
function cdotAlert(msg, title='Notice', icon='ℹ️') {
  return new Promise(res => {
    document.getElementById('alert-msg').textContent = msg;
    document.getElementById('alert-title').textContent = title;
    document.getElementById('alert-icon').textContent = icon;
    document.getElementById('alert-cancel').style.display = 'none';
    document.getElementById('alert-overlay').style.display = 'flex';
    alertResolve = v => { document.getElementById('alert-overlay').style.display='none'; res(v); };
  });
}
function cdotConfirm(msg, title='Confirm', icon='⚠️') {
  return new Promise(res => {
    document.getElementById('alert-msg').textContent = msg;
    document.getElementById('alert-title').textContent = title;
    document.getElementById('alert-icon').textContent = icon;
    document.getElementById('alert-cancel').style.display = 'inline-block';
    document.getElementById('alert-overlay').style.display = 'flex';
    alertResolve = v => { document.getElementById('alert-overlay').style.display='none'; res(v); };
  });
}

/* ═══════════════════════════════════════════════════════════
   CHAT VISIBILITY
═══════════════════════════════════════════════════════════ */
function toggleChat() {
  chatOpen = !chatOpen;
  document.getElementById('chatbot').classList.toggle('hidden', !chatOpen);
}
function toggleMaximize() {
  isMaximized = !isMaximized;
  const c = document.getElementById('chatbot');
  const btn = document.getElementById('maximize-btn');
  if (isMaximized) {
    const backdrop = document.createElement('div');
    backdrop.id = 'maximize-backdrop';
    backdrop.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.55);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);z-index:9998;animation:fadeIn .2s ease';
    backdrop.onclick = () => toggleMaximize();
    document.body.appendChild(backdrop);
    c.style.position='fixed'; c.style.top='50%'; c.style.left='50%';
    c.style.transform='translate(-50%, -50%)'; c.style.bottom='auto'; c.style.right='auto';
    c.style.width='min(960px, 94vw)'; c.style.height='min(88vh, 900px)';
    c.style.maxHeight='88vh'; c.style.borderRadius='18px';
    c.style.boxShadow='0 30px 80px rgba(0,0,0,.45)'; c.style.zIndex='9999';
    btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>`;
    btn.title = 'Restore';
  } else {
    const bd = document.getElementById('maximize-backdrop');
    if (bd) bd.remove();
    c.style.cssText = '';
    btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>`;
    btn.title = 'Maximize';
  }
}
async function clearAndClose() {
  const ok = await cdotConfirm(T.clearChatConfirm,'Clear Chat','🗑️');
  if (ok) {
    toggleChat(); showWelcome();
    document.getElementById('chat-messages').innerHTML=`<div class="date-divider">${T.todayLabel}</div>`;
    localStorage.removeItem('chatHistory');
    try { await resetThreadIdAPI(); } catch(e){}
  }
}
async function resetThreadIdAPI() {
  const threadId = getThreadId();
  let token = getToken();
  if (!token) token = await authenticateAndStoreToken();
  if (token && threadId) {
    await fetch(`http://chatbot.cdot.in/api/clear-chat-history?thread_id=${threadId}`,{
      method:'GET', headers:{Authorization:`Bearer ${token}`}
    });
    localStorage.removeItem('authToken');
    localStorage.removeItem('thread_id');
  }
}

/* ═══════════════════════════════════════════════════════════
   SCREEN SWITCHING
═══════════════════════════════════════════════════════════ */
function showWelcome() {
  document.getElementById('welcome-screen').style.display='flex';
  document.getElementById('chat-screen').style.display='none';
  document.getElementById('back-btn').style.display='none';
  document.getElementById('export-btn-wrap').style.display='none';
  document.getElementById('suggested-questions').style.display='none';
  cancelSelection();
  inChat = false;
}
function enterChat() {
  if (inChat) return;
  document.getElementById('welcome-screen').style.display='none';
  document.getElementById('chat-screen').style.display='flex';
  document.getElementById('back-btn').style.display='flex';
  document.getElementById('export-btn-wrap').style.display='block';
  document.getElementById('suggested-questions').style.display='flex';
  inChat = true;
}

/* ═══════════════════════════════════════════════════════════
   TILE & CHIP CLICK HANDLERS
═══════════════════════════════════════════════════════════ */
document.querySelectorAll('.tile[data-query]').forEach(tile => {
  tile.addEventListener('click', () => sendQuery(tile.getAttribute('data-query')));
});
document.querySelectorAll('.sq-chip[data-query]').forEach(chip => {
  chip.addEventListener('click', () => sendQuery(chip.getAttribute('data-query')));
});

/* ═══════════════════════════════════════════════════════════
   SEND QUERY — STREAMING API
═══════════════════════════════════════════════════════════ */
async function sendQuery(q) {
  if (!chatOpen) toggleChat();
  enterChat();
  if (selectionMode) cancelSelection();
  appendMsg('user', q);
  setInputLock(true);
  const typingId = appendTyping();
  try {
    let token = getToken();
    if (!token) token = await authenticateAndStoreToken();
    const threadId = getThreadId();
    const response = await fetch('http://chatbot.cdot.in/api/chatbot/', {
      method:'POST',
      headers: { Authorization:`Bearer ${token}`, 'Content-Type':'application/json' },
      body: JSON.stringify({ human_text: q, thread_id: threadId })
    });
    removeTyping(typingId);
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    const msgId = 'msg-' + Date.now();
    const { row, contentSpan } = appendStreamingBubble(msgId);
    const wrap = document.getElementById('chat-messages');
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let fullText = '';
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      fullText += chunk;
      contentSpan.innerHTML = parseMarkdown(fullText);
      contentSpan.classList.add('streaming-cursor');
      wrap.scrollTop = wrap.scrollHeight;
    }
    contentSpan.classList.remove('streaming-cursor');
    if (fullText.trim().endsWith('NO')) {
      fullText = `${T.noInformation} "${q}". ${lang==='hi' ? 'कृपया एक परिष्कृत प्रश्न के साथ पुनः प्रयास करें।' : 'Please try again with a refined question.'}`;
      contentSpan.innerHTML = parseMarkdown(fullText);
    }
    finaliseBubble(row, contentSpan, fullText, q, msgId);
    wrap.scrollTop = wrap.scrollHeight;
    saveToHistory('Bot', fullText, q, msgId);
  } catch (err) {
    console.error('API error:', err);
    removeTyping(typingId);
    appendMsg('bot', T.serviceUnavailable, q);
  } finally {
    setInputLock(false);
    document.getElementById('user-input').focus();
  }
}

/* ═══════════════════════════════════════════════════════════
   MESSAGE RENDERING
═══════════════════════════════════════════════════════════ */
function appendMsg(sender, rawContent, query='', msgId=null, ts=null, skipHistory=false) {
  const wrap = document.getElementById('chat-messages');
  const id = msgId || ('msg-' + Date.now());
  const html = (sender === 'bot') ? parseMarkdown(rawContent) : rawContent;
  const row = document.createElement('div');
  row.className = 'msg-row ' + sender;
  const av = document.createElement('div');
  av.className = 'msg-avatar ' + (sender==='user' ? 'user-av' : '');
  av.innerHTML = sender==='bot'
    ? '<img src="assets/img/chatbot_img/bot.jpeg" alt="CIVA">'
    : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
  const bub = document.createElement('div');
  bub.className = 'bubble';
  bub.setAttribute('data-id', id);
  const contentSpan = document.createElement('span');
  contentSpan.innerHTML = html;
  bub.appendChild(contentSpan);
  const wordCount = html.replace(/<[^>]*>/g,'').split(/\s+/).length;
  if (wordCount > 45) addReadMoreToggle(bub, contentSpan, html);
  if (sender === 'bot') {
    bub.appendChild(buildMetaBar(html, rawContent, query, id, ts));
  } else {
    bub.appendChild(buildUserMetaBar(rawContent, id, ts));
  }
  row.append(av, bub);
  wrap.appendChild(row);
  wrap.scrollTop = wrap.scrollHeight;
  if (!skipHistory && sender === 'user') saveToHistory('You', rawContent, '', id, ts);
}

function appendStreamingBubble(msgId) {
  const wrap = document.getElementById('chat-messages');
  const row = document.createElement('div');
  row.className = 'msg-row bot';
  const av = document.createElement('div');
  av.className = 'msg-avatar';
  av.innerHTML = '<img src="assets/img/chatbot_img/bot.jpeg" alt="CIVA">';
  const bub = document.createElement('div');
  bub.className = 'bubble';
  bub.setAttribute('data-id', msgId);
  const contentSpan = document.createElement('span');
  bub.appendChild(contentSpan);
  row.append(av, bub);
  wrap.appendChild(row);
  return { row, contentSpan };
}

function finaliseBubble(row, contentSpan, rawText, query, msgId) {
  const bub = row.querySelector('.bubble');
  const parsedHtml = parseMarkdown(rawText);
  contentSpan.innerHTML = parsedHtml;
  const wordCount = parsedHtml.replace(/<[^>]*>/g,'').split(/\s+/).length;
  if (wordCount > 45) addReadMoreToggle(bub, contentSpan, parsedHtml);
  bub.appendChild(buildMetaBar(parsedHtml, rawText, query, msgId));
}

function addReadMoreToggle(bub, contentSpan, fullHtml) {
  let expanded = false;
  const short = trimHTML(fullHtml, 45);
  contentSpan.innerHTML = short;
  const rmBtn = document.createElement('button');
  rmBtn.className = 'read-more-btn';
  rmBtn.textContent = T.readMore;
  rmBtn.onclick = () => {
    expanded = !expanded;
    contentSpan.innerHTML = expanded ? fullHtml : short;
    rmBtn.textContent = expanded ? T.readLess : T.readMore;
  };
  bub.appendChild(rmBtn);
}

function buildMetaBar(html, rawText, query, msgId, ts=null) {
  const meta = document.createElement('div');
  meta.className = 'bubble-meta';
  const time = document.createElement('span');
  time.className = 'meta-time';
  time.textContent = 'just now';
  time.dataset.ts = ts || Date.now();
  const spacer = document.createElement('span');
  spacer.className = 'meta-spacer';
  const plainText = stripMarkdown(rawText || html);
  const copyBtn = mkMetaBtn('M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2M8 4h8a2 2 0 0 1 2 2v2M8 4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2','Copy', () => {
    navigator.clipboard?.writeText(plainText);
    cdotAlert(T.messageCopied,'Copied','✅');
  });
  const likeBtn = mkMetaBtn('M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14zm-7 11H6.7A2.23 2.23 0 0 1 5 18V11a2 2 0 0 1 2-2h.3','Like',() => {
    if (!likeBtn.classList.contains('liked')) {
      likeBtn.classList.add('liked');
      submitLikeDislike(query, plainText, 1, msgId);
      cdotAlert(T.likedMsg,'Liked 👍','✅');
    }
  });
  const dislikeBtn = mkMetaBtn('M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2 2 0 0 1-2 2h-3','Dislike',() => {
    openFeedback(query, plainText, msgId);
  });
  const speakerBtn = document.createElement('button');
  speakerBtn.className = 'meta-btn';
  speakerBtn.title = 'Read aloud';
  speakerBtn.innerHTML = `
    <span class="speaker-icon-play"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg></span>
    <span class="speaker-icon-stop"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12" rx="2"/></svg></span>`;
  speakerBtn.onclick = () => queueSpeak(plainText, speakerBtn);
  meta.append(time, spacer, copyBtn, likeBtn, dislikeBtn, speakerBtn);
  return meta;
}

function buildUserMetaBar(rawText, msgId, ts=null) {
  const meta = document.createElement('div');
  meta.className = 'bubble-meta';
  const time = document.createElement('span');
  time.className = 'meta-time';
  time.textContent = 'just now';
  time.dataset.ts = ts || Date.now();
  const spacer = document.createElement('span');
  spacer.className = 'meta-spacer';
  const copyBtn = mkMetaBtn('M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2M8 4h8a2 2 0 0 1 2 2v2M8 4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2','Copy', () => {
    navigator.clipboard?.writeText(rawText);
    cdotAlert(T.messageCopied,'Copied','✅');
  });
  meta.append(time, spacer, copyBtn);
  return meta;
}

function stripMarkdown(raw) {
  if (!raw) return '';
  return raw
    .replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]*>/g, '')
    .replace(/\*{1,3}|_{1,3}/g, '').replace(/^#{1,6}\s+/gm, '')
    .replace(/^[-*_]{3,}$/gm, '').replace(/^[-*+•]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '').replace(/`{1,3}[^`]*`{1,3}/g, '')
    .replace(/^>\s?/gm, '').replace(/~~(.*?)~~/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/https?:\/\/\S+/g, '')
    .replace(/\n{2,}/g, '. ').replace(/\n/g, ' ').replace(/\s{2,}/g, ' ').trim();
}

function mkMetaBtn(pathD, title, onClick) {
  const btn = document.createElement('button');
  btn.className = 'meta-btn';
  btn.title = title;
  btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${pathD}"/></svg>`;
  btn.onclick = onClick;
  return btn;
}

function trimHTML(html, wordLimit) {
  const plain = html.replace(/<br\s*\/?>/gi,' ').replace(/<[^>]*>/g,'');
  const words = plain.split(/\s+/).filter(Boolean);
  if (words.length <= wordLimit) return html;
  let count = 0, result = '', inTag = false, tagBuf = '';
  const openTags = [];
  const selfClose = /^<(br|hr|img|input|meta|link)([\s>]|\/)/i;
  for (let i = 0; i < html.length; i++) {
    const ch = html[i];
    if (ch === '<') { inTag = true; tagBuf = '<'; }
    else if (inTag) {
      tagBuf += ch;
      if (ch === '>') {
        inTag = false; result += tagBuf;
        if (!selfClose.test(tagBuf)) {
          if (tagBuf[1] === '/') { openTags.pop(); }
          else { const m = tagBuf.match(/^<([a-z][a-z0-9]*)/i); if (m) openTags.push(m[1].toLowerCase()); }
        }
        tagBuf = '';
      }
    } else {
      result += ch;
      if (/\s/.test(ch)) {
        const w = result.replace(/<[^>]*>/g,'').trim().split(/\s+/).filter(Boolean).length;
        if (w >= wordLimit) {
          [...openTags].reverse().forEach(t => { result += `</${t}>`; });
          return result + '…';
        }
      }
    }
  }
  return result;
}

function parseMarkdown(raw) {
  if (!raw) return '';
  let msg = raw.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  msg = msg.replace(/```[\w]*\n?([\s\S]*?)```/g, (_, code) =>
    `<pre style="background:rgba(0,86,167,.07);border:1px solid var(--border);border-radius:8px;padding:10px 12px;overflow-x:auto;font-size:12px;font-family:monospace;white-space:pre-wrap;margin:6px 0">${escHtml(code.trim())}</pre>`
  );
  msg = msg.replace(/^#### (.+)$/gm, '<h5 style="font-size:12.5px;font-weight:700;color:var(--brand-dark);margin:7px 0 3px">$1</h5>');
  msg = msg.replace(/^### (.+)$/gm,  '<h4 style="font-size:13px;font-weight:700;color:var(--brand-dark);margin:8px 0 4px">$1</h4>');
  msg = msg.replace(/^## (.+)$/gm,   '<h3 style="font-size:14px;font-weight:700;color:var(--brand-dark);margin:8px 0 4px">$1</h3>');
  msg = msg.replace(/^# (.+)$/gm,    '<h2 style="font-size:15px;font-weight:800;color:var(--brand-dark);margin:8px 0 4px">$1</h2>');
  msg = msg.replace(/^[-*_]{3,}$/gm, '<hr style="border:none;border-top:1px solid var(--border);margin:8px 0">');
  msg = msg.replace(/^(\d+)\.\s+(.+)$/gm, '<_oli>$2</_oli>');
  msg = msg.replace(/^[-*+•]\s+(.+)$/gm, '<_uli>$1</_uli>');
  msg = msg.replace(/(<_oli>[\s\S]*?<\/_oli>\n?)+/g, m => {
    const items = [...m.matchAll(/<_oli>([\s\S]*?)<\/_oli>/g)].map(x => `<li style="margin-bottom:4px">${x[1]}</li>`).join('');
    return `<ol style="margin:6px 0 6px 20px;padding:0">${items}</ol>`;
  });
  msg = msg.replace(/(<_uli>[\s\S]*?<\/_uli>\n?)+/g, m => {
    const items = [...m.matchAll(/<_uli>([\s\S]*?)<\/_uli>/g)].map(x => `<li style="margin-bottom:4px">${x[1]}</li>`).join('');
    return `<ul style="margin:6px 0 6px 18px;padding:0;list-style:disc">${items}</ul>`;
  });
  msg = msg.replace(/\*\*\*([\s\S]*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  msg = msg.replace(/\*\*([\s\S]*?)\*\*/g,     '<strong>$1</strong>');
  msg = msg.replace(/__([\s\S]*?)__/g,          '<strong>$1</strong>');
  msg = msg.replace(/\*([\s\S]*?)\*/g,          '<em>$1</em>');
  msg = msg.replace(/_([\s\S]*?)_/g,            '<em>$1</em>');
  msg = msg.replace(/~~([\s\S]*?)~~/g,          '<s>$1</s>');
  msg = msg.replace(/`([^`\n]+)`/g,
    '<code style="background:rgba(0,86,167,.1);border-radius:4px;padding:1px 5px;font-size:12px;font-family:monospace;word-break:break-all">$1</code>'
  );
  const LINK_STYLE = 'color:var(--brand);text-decoration:underline;text-underline-offset:2px;word-break:break-all';
  msg = msg.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, `<a href="$2" target="_blank" rel="noopener" style="${LINK_STYLE}">$1</a>`);
  msg = msg.replace(/href="(https?:\/\/[^"]+)"/g, (m, u) => `href="${u.replace(/https?/g,'PROTO')}"`);
  msg = msg.replace(/(^|[\s\n(,;])(https?:\/\/[^\s<)"'\]]+)/g, (_, pre, url) => `${pre}<a href="${url}" target="_blank" rel="noopener" style="${LINK_STYLE}">${url}</a>`);
  msg = msg.replace(/href="([^"]+PROTO[^"]+)"/g, (_, u) => `href="${u.replace(/PROTO/g,'https')}"`);
  msg = msg.replace(/^&gt;\s?(.+)$/gm, '<blockquote style="border-left:3px solid var(--accent);padding:4px 10px;margin:4px 0;color:var(--text-2);font-style:italic;background:rgba(0,194,224,.05);border-radius:0 6px 6px 0">$1</blockquote>');
  msg = msg.replace(/^>\s?(.+)$/gm,    '<blockquote style="border-left:3px solid var(--accent);padding:4px 10px;margin:4px 0;color:var(--text-2);font-style:italic;background:rgba(0,194,224,.05);border-radius:0 6px 6px 0">$1</blockquote>');
  msg = msg.replace(/\n/g, '<br>');
  msg = msg.replace(/(<\/(?:h[2-5]|ul|ol|pre|hr|blockquote)>)<br>/g, '$1');
  msg = msg.replace(/<br>(<(?:ul|ol|pre|h[2-5]|blockquote))/g, '$1');
  return msg;
}

function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ═══════════════════════════════════════════════════════════
   TYPING INDICATOR
═══════════════════════════════════════════════════════════ */
function appendTyping() {
  const wrap = document.getElementById('chat-messages');
  const id = 'typing-' + Date.now();
  const row = document.createElement('div');
  row.className = 'msg-row bot'; row.id = id;
  const av = document.createElement('div');
  av.className = 'msg-avatar';
  av.innerHTML = '<img src="assets/img/chatbot_img/bot.jpeg" alt="CIVA">';
  const bub = document.createElement('div');
  bub.className = 'bubble';
  bub.innerHTML = '<div class="typing-bubble"><span></span><span></span><span></span></div>';
  row.append(av, bub);
  wrap.appendChild(row);
  wrap.scrollTop = wrap.scrollHeight;
  return id;
}
function removeTyping(id) { const el=document.getElementById(id); if(el) el.remove(); }

/* ═══════════════════════════════════════════════════════════
   INPUT / SEND
═══════════════════════════════════════════════════════════ */
function setInputLock(locked) {
  const inp = document.getElementById('user-input');
  const send = document.getElementById('send-btn');
  const mic = document.getElementById('mic-btn');
  inp.disabled = locked; send.disabled = locked; mic.disabled = locked;
  mic.style.opacity = locked ? '0.45' : '';
  mic.style.cursor = locked ? 'not-allowed' : '';
  document.querySelectorAll('.sq-chip').forEach(chip => {
    chip.style.pointerEvents = locked ? 'none' : '';
    chip.style.opacity = locked ? '0.45' : '';
  });
}
function sendFromInput() {
  const inp = document.getElementById('user-input');
  const q = inp.value.trim();
  if (!q) return;
  inp.value = '';
  sendQuery(q);
}
document.getElementById('send-btn').onclick = sendFromInput;
document.getElementById('user-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') { e.preventDefault(); sendFromInput(); }
});

/* ═══════════════════════════════════════════════════════════
   SPEECH SYNTHESIS
═══════════════════════════════════════════════════════════ */
if (window.speechSynthesis) {
  _cachedVoices = speechSynthesis.getVoices();
  speechSynthesis.onvoiceschanged = () => { _cachedVoices = speechSynthesis.getVoices(); };
}

function pickVoice() {
  const synth = window.speechSynthesis;
  if (!synth) return null;
  const voices = synth.getVoices();
  if (voices.length) _cachedVoices = voices;
  const pool = _cachedVoices;
  if (!pool.length) return null;
  const curLang = _currentLang || window.lang || 'en';
  const score = v => {
    let s = 0;
    const n = v.name.toLowerCase();
    const l = v.lang.toLowerCase();
    if (curLang === 'hi') { if (l === 'hi-in') s += 500; else if (l.startsWith('hi')) s += 400; }
    if (l === 'en-in') s += 400;
    if (l.startsWith('en-in')) s += 380;
    const femaleIndian = ['aditi','priya','heera','raveena','veena','lekha','neerja','sunita','kajal','kalpana','swara','divya'];
    if (femaleIndian.some(k => n.includes(k))) s += 300;
    if (n.includes('google') && (n.includes('female') || femaleIndian.some(k => n.includes(k)))) s += 200;
    if (n.includes('google')) s += 80;
    if (n.includes('neural') || n.includes('natural') || n.includes('enhanced')) s += 120;
    const femaleGeneric = ['female','woman','girl','aria','zira','susan','karen','samantha','victoria','fiona','moira'];
    if (femaleGeneric.some(k => n.includes(k))) s += 60;
    if (l === 'en-gb') s += 20;
    if (l === 'en-au') s += 15;
    if (l.startsWith('en')) s += 10;
    const male = ['david','mark','daniel','alex','tom','james','oliver','george','rishi'];
    if (male.some(k => n.includes(k))) s -= 200;
    return s;
  };
  const ranked = [...pool].sort((a, b) => score(b) - score(a));
  return ranked[0] || null;
}

let _keepAlive = null;

function queueSpeak(text, btn) {
  if (_activeSpeakerBtn === btn) { _stopSpeaker(); return; }
  _stopSpeaker();
  if (!window.speechSynthesis) return;
  _activeSpeakerBtn = btn;
  btn.classList.add('speaker-active');
  btn.title = 'Stop';
  const curLang = _currentLang || window.lang || 'en';
  const u = new SpeechSynthesisUtterance(text);
  u.lang = curLang === 'hi' ? 'hi-IN' : 'en-IN';
  u.rate = 0.92; u.pitch = 1.0; u.volume = 1;
  const v = pickVoice();
  if (v) { u.voice = v; u.lang = v.lang; }
  const _done = () => {
    clearInterval(_keepAlive);
    btn.classList.remove('speaker-active');
    btn.title = 'Read aloud';
    if (_activeSpeakerBtn === btn) _activeSpeakerBtn = null;
  };
  u.onend = _done; u.onerror = _done;
  u.onstart = () => {
    _keepAlive = setInterval(() => {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause(); window.speechSynthesis.resume();
      }
    }, 10000);
  };
  window.speechSynthesis.cancel();
  setTimeout(() => window.speechSynthesis.speak(u), 120);
}

function _stopSpeaker() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  clearInterval(_keepAlive);
  if (_activeSpeakerBtn) {
    _activeSpeakerBtn.classList.remove('speaker-active');
    _activeSpeakerBtn.title = 'Read aloud';
    _activeSpeakerBtn = null;
  }
}

/* ═══════════════════════════════════════════════════════════
   SPEECH RECOGNITION
═══════════════════════════════════════════════════════════ */
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
  let finalT = '';
  recognition.onresult = e => {
    let t = '';
    for (let i=e.resultIndex; i<e.results.length; i++) t+=e.results[i][0].transcript;
    document.getElementById('user-input').value = t;
    if (e.results[e.results.length-1].isFinal) { finalT = t; }
  };
  recognition.onend = () => {
    document.getElementById('mic-btn').classList.remove('active');
    document.getElementById('user-input').placeholder = T.inputPlaceholder;
    micActive = false;
    if (finalT.trim()) { sendFromInput(); finalT=''; }
  };
  recognition.onerror = e => {
    document.getElementById('mic-btn').classList.remove('active');
    document.getElementById('user-input').placeholder = e.error==='not-allowed' ? T.micDenied : T.inputPlaceholder;
    micActive = false;
  };
}
document.getElementById('mic-btn').onclick = () => {
  if (!SpeechRecognition) { cdotAlert(T.speechNotSupported,'Not Supported','🎤'); return; }
  if (micActive) { recognition.stop(); return; }
  recognition.start();
  micActive = true;
  document.getElementById('mic-btn').classList.add('active');
  document.getElementById('user-input').placeholder = T.micListening;
};

/* ═══════════════════════════════════════════════════════════
   LIKE / DISLIKE API
═══════════════════════════════════════════════════════════ */
async function submitLikeDislike(question, answer, rating, messageId) {
  let token = getToken();
  if (!token) token = await authenticateAndStoreToken();
  const threadId = getThreadId();
  try {
    await fetch('http://chatbot.cdot.in/api/submit-feedback/', {
      method:'POST',
      headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` },
      body: JSON.stringify({ question, answer, feedback_type:rating, feedback:'', thread_id:threadId })
    });
  } catch(e) { console.error('Feedback API error:', e); }
}

/* ═══════════════════════════════════════════════════════════
   FEEDBACK POPUP
═══════════════════════════════════════════════════════════ */
function openFeedback(q, a, id) {
  document.getElementById('fb-question').value = q;
  document.getElementById('fb-answer').value = a;
  document.getElementById('fb-msgid').value = id;
  document.getElementById('feedback-popup').classList.add('open');
}
function closeFeedback() {
  document.getElementById('feedback-popup').classList.remove('open');
}
document.getElementById('feedback-text').oninput = function() {
  document.getElementById('submit-feedback').disabled = this.value.trim().length < 2;
};
function submitFeedback() {
  const feedbackText = document.getElementById('feedback-text').value.trim();
  const question = document.getElementById('fb-question').value;
  const answer = document.getElementById('fb-answer').value;
  const threadId = getThreadId();
  const token = getToken();
  fetch('http://chatbot.cdot.in/api/submit-feedback/', {
    method:'POST',
    headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` },
    body: JSON.stringify({ question, answer, feedback_type:0, feedback:feedbackText, thread_id:threadId })
  }).catch(e => console.error('Feedback submit error:', e));
  cdotAlert('Thank you for your feedback! We\'ll use it to improve CIVA.','Feedback Received','🙏');
  closeFeedback();
  document.getElementById('feedback-text').value = '';
  document.getElementById('submit-feedback').disabled = true;
}

/* ═══════════════════════════════════════════════════════════
   EXPORT
═══════════════════════════════════════════════════════════ */
function toggleExportMenu(e) {
  e.stopPropagation();
  const menu = document.getElementById('export-menu');
  menu.style.display = menu.style.display==='none'||!menu.style.display ? 'block' : 'none';
}
document.addEventListener('click', () => {
  const menu = document.getElementById('export-menu');
  if (menu) menu.style.display = 'none';
});

function startSelectiveExport() {
  document.getElementById('export-menu').style.display = 'none';
  selectionMode = true;
  document.getElementById('selection-header').classList.add('active');
  updateSelCount();
  document.querySelectorAll('.msg-row').forEach((row, idx) => {
    row.classList.add('selectable');
    row.dataset.selIdx = idx;
    if (!row.querySelector('.msg-checkbox')) {
      const cb = document.createElement('input');
      cb.type = 'checkbox'; cb.className = 'msg-checkbox';
      cb.addEventListener('change', () => {
        row.classList.toggle('selected', cb.checked);
        const next = row.nextElementSibling;
        if (next && next.classList.contains('bot')) {
          next.classList.toggle('selected', cb.checked);
          const nextCb = next.querySelector('.msg-checkbox');
          if (nextCb) nextCb.checked = cb.checked;
        }
        updateSelCount();
      });
      row.insertBefore(cb, row.firstChild);
    }
  });
}

function updateSelCount() {
  const n = document.querySelectorAll('.msg-row.selected').length;
  document.getElementById('sel-count').textContent = T.selCount(n);
}
function selectAll() {
  document.querySelectorAll('.msg-row.selectable').forEach(row => {
    row.classList.add('selected');
    const cb = row.querySelector('.msg-checkbox');
    if (cb) cb.checked = true;
  });
  updateSelCount();
}
function cancelSelection() {
  selectionMode = false;
  document.getElementById('selection-header').classList.remove('active');
  document.querySelectorAll('.msg-row').forEach(row => {
    row.classList.remove('selectable','selected');
    const cb = row.querySelector('.msg-checkbox');
    if (cb) cb.remove();
  });
}
function exportSelected() {
  const selected = [...document.querySelectorAll('.msg-row.selected')];
  if (!selected.length) { cdotAlert(T.selectMessageAlert,'No Selection','📋'); return; }
  let html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{font-family:Arial,sans-serif;max-width:700px;margin:40px auto;color:#1a2233;font-size:14px}h1{color:#0056A7;border-bottom:2px solid #0056A7;padding-bottom:8px;font-size:20px}.ts{color:#888;font-size:11px;margin-bottom:20px}.msg{margin:10px 0;padding:10px 14px;border-radius:10px;max-width:80%}.bot-msg{background:#e8f4fd;border:1px solid #c5e0f5;margin-right:auto}.user-msg{background:#0056A7;color:#fff;margin-left:auto;text-align:right}.sender{font-size:10px;font-weight:700;margin-bottom:4px;opacity:.7;text-transform:uppercase;letter-spacing:.5px}hr{border:none;border-top:1px solid #e2e8f0;margin:16px 0}</style></head><body><h1>CIVA – Selected Messages Export</h1><div class="ts">Exported on ${new Date().toLocaleString()}</div><hr>`;
  selected.forEach(row => {
    const isUser = row.classList.contains('user');
    const bub = row.querySelector('.bubble');
    if (!bub) return;
    const clone = bub.cloneNode(true);
    clone.querySelectorAll('button,.bubble-meta,.msg-checkbox').forEach(b=>b.remove());
    html += `<div class="msg ${isUser?'user-msg':'bot-msg'}"><div class="sender">${isUser?'You':'CIVA'}</div><div>${clone.innerHTML}</div></div>`;
  });
  html += `</body></html>`;
  const win = window.open('','_blank','width=800,height=600');
  win.document.write(html); win.document.close();
  win.onload = () => { win.print(); };
  cancelSelection();
}

function exportChatAsPDF() {
  document.getElementById('export-menu').style.display = 'none';
  const msgs = [...document.querySelectorAll('.msg-row')];
  let html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{font-family:Arial,sans-serif;max-width:700px;margin:40px auto;color:#1a2233;font-size:14px}h1{color:#0056A7;border-bottom:2px solid #0056A7;padding-bottom:8px;font-size:20px}.ts{color:#888;font-size:11px;margin-bottom:20px}.msg{margin:10px 0;padding:10px 14px;border-radius:10px;max-width:80%}.bot-msg{background:#e8f4fd;border:1px solid #c5e0f5;margin-right:auto}.user-msg{background:#0056A7;color:#fff;margin-left:auto;text-align:right}.sender{font-size:10px;font-weight:700;margin-bottom:4px;opacity:.7;text-transform:uppercase;letter-spacing:.5px}hr{border:none;border-top:1px solid #e2e8f0;margin:16px 0}</style></head><body><h1>CIVA – Chat Export</h1><div class="ts">Exported on ${new Date().toLocaleString()}</div><hr>`;
  msgs.forEach(row => {
    const isUser = row.classList.contains('user');
    const bub = row.querySelector('.bubble');
    if (!bub) return;
    const clone = bub.cloneNode(true);
    clone.querySelectorAll('button,.bubble-meta').forEach(b=>b.remove());
    html += `<div class="msg ${isUser?'user-msg':'bot-msg'}"><div class="sender">${isUser?'You':'CIVA'}</div><div>${clone.innerHTML}</div></div>`;
  });
  html += `</body></html>`;
  const win = window.open('','_blank','width=800,height=600');
  win.document.write(html); win.document.close();
  win.onload = () => { win.print(); };
}

/* ═══════════════════════════════════════════════════════════
   LANGUAGE TOGGLE
═══════════════════════════════════════════════════════════ */
let _currentLang = window.lang || 'en';

function toggleLanguage() {
  _currentLang = _currentLang === 'en' ? 'hi' : 'en';
  window.lang = _currentLang;
  const T2 = TRANSLATIONS[_currentLang] || TRANSLATIONS['en'];
  document.getElementById('lang-label').textContent = _currentLang === 'en' ? 'हिंदी' : 'English';
  document.getElementById('hdr-name').textContent = T2.botName;
  document.getElementById('hdr-sub').textContent = T2.hdrSub;
  document.getElementById('user-input').placeholder = T2.inputPlaceholder;
  document.getElementById('fb-title').textContent = T2.feedbackTitle;
  document.getElementById('fb-sub').textContent = T2.feedbackSub;
  document.getElementById('feedback-text').placeholder = T2.feedbackPlaceholder;
  document.getElementById('submit-feedback').textContent = T2.submitFeedback;
  document.getElementById('today-divider').textContent = T2.todayLabel;
  const el2Lbl = document.getElementById('lbl-export-full'); if (el2Lbl) el2Lbl.textContent = T2.exportFullLabel;
  const el2Sel = document.getElementById('lbl-export-sel'); if (el2Sel) el2Sel.textContent = T2.exportSelLabel;
  const el2SelBtn = document.getElementById('btn-export-sel'); if (el2SelBtn) el2SelBtn.textContent = T2.exportSelBtn;
  const tileMap = {
    'tile-about-lbl':    _currentLang==='hi'?'C-DOT के बारे में':'About C-DOT',
    'tile-about-desc':   _currentLang==='hi'?'C-DOT का टेलीकॉम अनुसंधान, दृष्टि और इतिहास।':'Explore C-DOT\'s telecom research, vision for India & history.',
    'tile-products-lbl': _currentLang==='hi'?'उत्पाद':'Products',
    'tile-products-desc':_currentLang==='hi'?'50+ स्वदेशी C-DOT उत्पाद और प्रणालियाँ।':'50+ homegrown C-DOT products & systems.',
    'tile-awards-lbl':   _currentLang==='hi'?'पुरस्कार एवं सम्मान':'Awards & Accolades',
    'tile-awards-desc':  _currentLang==='hi'?'C-DOT की उपलब्धियाँ और पुरस्कार।':'Recognitions & achievements of C-DOT.',
    'tile-board-lbl':    _currentLang==='hi'?'बोर्ड सदस्य':'Board Members',
    'tile-board-desc':   _currentLang==='hi'?'C-DOT का नेतृत्व और शासन बोर्ड।':'C-DOT\'s leadership & governance board.',
    'tile-consult-lbl':  _currentLang==='hi'?'परामर्श':'Consultation',
    'tile-consult-desc': _currentLang==='hi'?'विशेषज्ञ परियोजना प्रबंधन और तकनीकी सलाह।':'Expert project management & global technical advisory.',
    'tile-career-lbl':   _currentLang==='hi'?'करियर':'Career',
    'tile-career-desc':  _currentLang==='hi'?'C-DOT में शामिल हों – अवसर और रिक्तियाँ।':'Join C-DOT – opportunities & openings.',
    'tile-mission-lbl':  _currentLang==='hi'?'मिशन और दृष्टि':'Mission & Vision',
    'tile-mission-desc': _currentLang==='hi'?'कनेक्टिविटी और डिजिटल भारत की हमारी रूपरेखा।':'Our blueprint for connectivity & India\'s digital future.',
    'tile-research-lbl': _currentLang==='hi'?'अनुसंधान एवं विकास':'R&D',
    'tile-research-desc':_currentLang==='hi'?'C-DOT में नवाचार और दूरसंचार अनुसंधान।':'Innovation & telecom research at C-DOT.',
    'tile-news-lbl':     _currentLang==='hi'?'समाचार':'News',
    'tile-news-desc':    _currentLang==='hi'?'नवीनतम अपडेट और घोषणाएँ।':'Latest updates & announcements.',
  };
  Object.entries(tileMap).forEach(([id, text]) => {
    const el = document.getElementById(id); if (el) el.textContent = text;
  });
  const sqLabels = T2.sqChips || [];
  document.querySelectorAll('#suggested-questions .sq-chip').forEach((chip, i) => {
    if (sqLabels[i]) chip.textContent = sqLabels[i];
  });
  if (recognition) recognition.lang = _currentLang === 'hi' ? 'hi-IN' : 'en-IN';
}

/* ═══════════════════════════════════════════════════════════
   LOCAL STORAGE — CHAT HISTORY
═══════════════════════════════════════════════════════════ */
function saveToHistory(sender, message, query='', msgId=null, ts=null) {
  const stored = JSON.parse(localStorage.getItem('chatHistory')||'[]');
  stored.push({ sender, message, query, message_Id: msgId||('msg-'+Date.now()), timestamp: ts||new Date().toISOString() });
  localStorage.setItem('chatHistory', JSON.stringify(stored));
}

function loadChatFromLocalStorage() {
  const stored = JSON.parse(localStorage.getItem('chatHistory') || '[]');
  if (!stored.length) { showWelcome(); return; }
  enterChat();
  const wrap = document.getElementById('chat-messages');
  wrap.innerHTML = `<div class="date-divider" id="today-divider">${T.todayLabel}</div>`;
  stored.forEach(item => {
    const sender = (item.sender === 'You' || item.sender === 'user') ? 'user' : 'bot';
    const ts = item.timestamp ? new Date(item.timestamp).getTime() : Date.now();
    appendMsg(sender, item.message, item.query || '', item.message_Id || null, ts, true);
  });
  wrap.scrollTop = wrap.scrollHeight;
  chatOpen = false;
  document.getElementById('chatbot').classList.add('hidden');
}

/* ═══════════════════════════════════════════════════════════
   TIMESTAMP UPDATER
═══════════════════════════════════════════════════════════ */
function calcTimeLapse(ts) {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return Math.floor(diff/60) + 'm ago';
  if (diff < 86400) return Math.floor(diff/3600) + 'h ago';
  return Math.floor(diff/86400) + 'd ago';
}
setInterval(() => {
  document.querySelectorAll('.meta-time[data-ts]').forEach(el => {
    el.textContent = calcTimeLapse(+el.dataset.ts);
  });
}, 30000);

/* ═══════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════ */
applyTranslations();
loadChatFromLocalStorage();
