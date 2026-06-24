/* ═══════════════════════════════════════════════════════════
   BILINGUAL TRANSLATIONS
═══════════════════════════════════════════════════════════ */
const TRANSLATIONS = {
  en: {
    botName: 'CIVA',
    hdrSub: 'CDOT intelligent virtual assistant',
    inputPlaceholder: 'Ask me…',
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
    exportOptionsLabel: 'Export Options',
    exportFullLabel: '💬 Export Chat',
    exportFullBtn: '📄 Export Chat',
    exportSelLabel: '📄 User + CIVA Messages',
    exportSelBtn: 'Select Messages to Export',
    todayLabel: 'Today',
    selCount: (n) => `${n} selected`,
    chips: { about:'About C-DOT', products:'Products', consult:'Consultancy', awards:'Awards', faqs:'FAQs' },
    sqChips: ['Products','Career','Board Members','Awards & Accolades','Consultation','About C-DOT','Mission & Vision'],
    langMismatch: 'You are in English mode. Please type in English, or switch to Hindi using the हिंदी button.',
    feedbackLangWarn: 'English mode: please type in English.',
    btnSwitchLang: 'Switch Language',
    btnBack: 'Back',
    btnMaximize: 'Maximize',
    btnRestore: 'Restore',
    btnMinimize: 'Minimize',
    btnClose: 'Close',
    btnExport: 'Export',
    btnMic: 'Voice input',
    btnSend: 'Send',
    btnCopy: 'Copy',
    btnLike: 'Like',
    btnDislike: 'Dislike',
    btnReadAloud: 'Read aloud',
    btnStop: 'Stop',
    launcherTitle: 'Chat with CIVA',
    launcherSub: 'Your Telecom Guide',
    footerBrand: 'Powered by <strong>C-DOT</strong> · CIVA v2.0',
    selAll: 'Select All',
    selCancel: 'Cancel',
    selExport: 'Export',
    alertOk: 'OK',
    alertCancel: 'Cancel',
    copiedTitle: 'Copied',
    likedTitle: 'Liked 👍',
    clearChatTitle: 'Clear Chat',
    langMismatchTitle: 'Language Mismatch',
    notSupportedTitle: 'Not Supported',
    noSelectionTitle: 'No Selection',
    feedbackReceivedTitle: 'Feedback Received',
    feedbackThankYou: 'Thank you for your feedback! We\'ll use it to improve CIVA.',
    timeJustNow: 'just now',
    timeMinAgo: (n) => `${n}m ago`,
    timeHrAgo:  (n) => `${n}h ago`,
    timeDayAgo: (n) => `${n}d ago`
  },
  hi: {
    botName: 'सीवा',
    hdrSub: 'सी-डॉट बुद्धिमान आभासी सहायक',
    inputPlaceholder: 'यहाँ अपना संदेश लिखें…',
    readMore: 'और पढ़ें',
    readLess: 'कम पढ़ें',
    feedbackTitle: '📝 अपनी प्रतिक्रिया दें',
    feedbackSub: 'आपका फीडबैक सीवा को बेहतर बनाने में मदद करता है।',
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
    exportOptionsLabel: 'निर्यात विकल्प',
    exportFullBtn: 'पूरी बातचीत निर्यात करें',
    exportSelLabel: '📄 उपयोगकर्ता + CIVA संदेश',
    exportSelBtn: 'निर्यात के लिए संदेश चुनें',
    todayLabel: 'आज',
    selCount: (n) => `${n} चुना गया`,
    chips: { about:'C-DOT के बारे में', products:'उत्पाद', consult:'परामर्श', awards:'पुरस्कार', faqs:'FAQs' },
    sqChips: ['उत्पाद','करियर','बोर्ड सदस्य','पुरस्कार एवं सम्मान','परामर्श','C-DOT के बारे में','मिशन और विजन'],
    langMismatch: '',
    feedbackLangWarn: 'हिंदी मोड में कृपया हिंदी में लिखें।',
    btnSwitchLang: 'भाषा बदलें',
    btnBack: 'वापस',
    btnMaximize: 'बड़ा करें',
    btnRestore: 'पुनर्स्थापित करें',
    btnMinimize: 'छोटा करें',
    btnClose: 'बंद करें',
    btnExport: 'निर्यात',
    btnMic: 'वॉयस इनपुट',
    btnSend: 'भेजें',
    btnCopy: 'कॉपी करें',
    btnLike: 'पसंद',
    btnDislike: 'नापसंद',
    btnReadAloud: 'ज़ोर से पढ़ें',
    btnStop: 'रोकें',
    launcherTitle: 'सीवा से बात करें',
    launcherSub: 'आपका टेलीकॉम गाइड',
    footerBrand: 'संचालित: <strong>सी-डॉट</strong> · सीवा v2.0',
    selAll: 'सभी चुनें',
    selCancel: 'रद्द करें',
    selExport: 'निर्यात करें',
    alertOk: 'ठीक है',
    alertCancel: 'रद्द करें',
    copiedTitle: 'कॉपी किया गया',
    likedTitle: 'पसंद किया 👍',
    clearChatTitle: 'चैट साफ करें',
    langMismatchTitle: 'भाषा मेल नहीं',
    notSupportedTitle: 'समर्थित नहीं',
    noSelectionTitle: 'कोई चयन नहीं',
    feedbackReceivedTitle: 'फीडबैक प्राप्त हुआ',
    feedbackThankYou: 'आपकी प्रतिक्रिया के लिए धन्यवाद! हम इसे सीवा को बेहतर बनाने में उपयोग करेंगे।',
    timeJustNow: 'अभी',
    timeMinAgo: (n) => `${n} मिनट पहले`,
    timeHrAgo:  (n) => `${n} घंटे पहले`,
    timeDayAgo: (n) => `${n} दिन पहले`
  }
};

/* ═══════════════════════════════════════════════════════════
   QUERY TRANSLATIONS (en ↔ hi) for tile / sq-chip data-query
═══════════════════════════════════════════════════════════ */
const QUERY_TRANSLATIONS_EN_HI = {
  'Product Section':                   'उत्पाद अनुभाग',
  'Mission & Vision':                  'मिशन और विजन',
  'About C-DOT':                       'C-DOT के बारे में',
  'Board Members':                     'बोर्ड सदस्य',
  'Consultancy':                       'परामर्श',
  'Awards and Accolades':              'पुरस्कार एवं सम्मान',
  'Career at C-DOT':                   'C-DOT में करियर',
  'Research and Development at C-DOT': 'C-DOT में अनुसंधान एवं विकास',
  'News and Updates of C-DOT':         'C-DOT की समाचार और अपडेट',
};
const QUERY_TRANSLATIONS_HI_EN = Object.fromEntries(
  Object.entries(QUERY_TRANSLATIONS_EN_HI).map(([en, hi]) => [hi, en])
);

/* ═══════════════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════════════ */
let chatOpen = false, isMaximized = false, inChat = false;
let alertResolve = null;
let _activeSpeakerBtn = null;
let _cachedVoices = [];
let recognition, micActive = false;
let selectionMode = false;
/* Language control:
   - Parent (window.lang) controls chatbot by default.
   - If user manually toggles chatbot language, override mode activates (chatbot self-controlled).
   - Override is cleared on chat reset → chatbot follows parent again. */
const CIVA_LANG_KEY            = 'civa_lang';
const CIVA_LANG_OVERRIDE_KEY   = 'civa_lang_override';
const CIVA_LAST_PARENT_LANG_KEY = 'civa_last_parent_lang';
const _parentLang     = (typeof window.lang === 'string' && window.lang === 'hi') ? 'hi' : 'en';
const _lastParentLang = localStorage.getItem(CIVA_LAST_PARENT_LANG_KEY) || 'en';
/* If parent lang changed since last page load, parent wins — clear any user override */
if (_parentLang !== _lastParentLang) localStorage.removeItem(CIVA_LANG_OVERRIDE_KEY);
localStorage.setItem(CIVA_LAST_PARENT_LANG_KEY, _parentLang);
if (!localStorage.getItem(CIVA_LANG_OVERRIDE_KEY)) localStorage.setItem(CIVA_LANG_KEY, _parentLang);
const lang = localStorage.getItem(CIVA_LANG_KEY) || 'en';
const T = TRANSLATIONS[lang] || TRANSLATIONS['en'];
/* ct() always returns translations for the CURRENT active language.
   Use T only for one-time startup calls; use ct() everywhere else. */
const ct = () => TRANSLATIONS[_currentLang] || TRANSLATIONS['en'];

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
    const r = await fetch('http://chatbot..cdot.in/api/auth-token/', { method:'POST', body:fd });
    if (r.ok) {
      const d = await r.json();
      localStorage.setItem('authToken', d.access_token);
      return d.access_token;
    }
  } catch(e) { console.error('Auth error:', e); }
  return null;
}

/* ═══════════════════════════════════════════════════════════
   SHARED: update tiles, sq-chips, and speech-recognition lang
   Called both on initial load (applyTranslations) and on toggle.
═══════════════════════════════════════════════════════════ */
function applyTileChipTranslations(activeLang) {
  const isHi = activeLang === 'hi';
  const T2   = TRANSLATIONS[activeLang] || TRANSLATIONS['en'];
  const tileMap = {
    'civa-tile-about-lbl':    isHi?'C-DOT के बारे में':'About C-DOT',
    'civa-tile-about-desc':   isHi?'C-DOT का टेलीकॉम अनुसंधान, विजन और इतिहास।':'Explore C-DOT\'s telecom research, vision for India & history.',
    'civa-tile-products-lbl': isHi?'उत्पाद':'Products',
    'civa-tile-products-desc':isHi?'50+ स्वदेशी C-DOT उत्पाद और प्रणालियाँ।':'50+ homegrown C-DOT products & systems.',
    'civa-tile-awards-lbl':   isHi?'पुरस्कार एवं सम्मान':'Awards & Accolades',
    'civa-tile-awards-desc':  isHi?'C-DOT की उपलब्धियाँ और पुरस्कार।':'Recognitions & achievements of C-DOT.',
    'civa-tile-board-lbl':    isHi?'बोर्ड सदस्य':'Board Members',
    'civa-tile-board-desc':   isHi?'C-DOT का नेतृत्व और शासन बोर्ड।':'C-DOT\'s leadership & governance board.',
    'civa-tile-consult-lbl':  isHi?'परामर्श':'Consultation',
    'civa-tile-consult-desc': isHi?'विशेषज्ञ परियोजना प्रबंधन और तकनीकी सलाह।':'Expert project management & global advisory.',
    'civa-tile-career-lbl':   isHi?'करियर':'Career',
    'civa-tile-career-desc':  isHi?'C-DOT में शामिल हों – अवसर और रिक्तियाँ।':'Join C-DOT – opportunities & openings.',
    'civa-tile-mission-lbl':  isHi?'मिशन और विजन':'Mission & Vision',
    'civa-tile-mission-desc': isHi?'कनेक्टिविटी और डिजिटल भारत की हमारी रूपरेखा।':'Our blueprint for connectivity & India\'s digital future.',
    'civa-tile-research-lbl': isHi?'अनुसंधान एवं विकास':'R&D',
    'civa-tile-research-desc':isHi?'C-DOT में नवाचार और दूरसंचार अनुसंधान।':'Innovation & telecom research at C-DOT.',
    'civa-tile-news-lbl':     isHi?'समाचार':'News',
    'civa-tile-news-desc':    isHi?'नवीनतम अपडेट और घोषणाएँ।':'Latest updates & announcements.',
  };
  Object.entries(tileMap).forEach(([id, text]) => {
    const el = document.getElementById(id); if (el) el.textContent = text;
  });
  const sqLabels = T2.sqChips || [];
  document.querySelectorAll('#civa-suggested-questions .civa-sq-chip').forEach((chip, i) => {
    if (sqLabels[i]) chip.textContent = sqLabels[i];
  });
  if (typeof recognition !== 'undefined' && recognition) {
    recognition.lang = isHi ? 'hi-IN' : 'en-IN';
  }
}

/* ═══════════════════════════════════════════════════════════
   APPLY BUTTON TITLES (header + input bar)
═══════════════════════════════════════════════════════════ */
function applyHeaderBtnTitles(T2) {
  const set = (id, title) => { const el = document.getElementById(id); if (el) el.title = title; };
  set('civa-lang-toggle-btn', T2.btnSwitchLang);
  set('civa-back-btn',        T2.btnBack);
  set('civa-maximize-btn',    T2.btnMaximize);
  set('civa-export-btn',      T2.btnExport);
  set('civa-minimize-btn',    T2.btnMinimize);
  set('civa-close-btn',       T2.btnClose);
  set('civa-mic-btn',         T2.btnMic);
  set('civa-send-btn',        T2.btnSend);
}

/* ═══════════════════════════════════════════════════════════
   APPLY TRANSLATIONS ON LOAD
═══════════════════════════════════════════════════════════ */
function applyTranslations() {
  /* lang button — "हिंदी" when active lang is EN (offers Hindi), "English" when active is HI */
  document.getElementById('civa-lang-label').textContent = lang === 'hi' ? 'English' : 'हिंदी';
  document.getElementById('civa-hdr-name').textContent = T.botName;
  document.getElementById('civa-hdr-sub').textContent = T.hdrSub;
  document.getElementById('civa-user-input').placeholder = T.inputPlaceholder;
  document.getElementById('civa-fb-title').textContent = T.feedbackTitle;
  document.getElementById('civa-fb-sub').textContent = T.feedbackSub;
  document.getElementById('civa-feedback-text').placeholder = T.feedbackPlaceholder;
  document.getElementById('civa-submit-feedback').textContent = T.submitFeedback;
  document.getElementById('civa-today-divider').textContent = T.todayLabel;
  const elExpOpts = document.getElementById('civa-export-options-lbl'); if (elExpOpts) elExpOpts.textContent = T.exportOptionsLabel;
  const elLbl = document.getElementById('civa-lbl-export-full'); if (elLbl) elLbl.textContent = T.exportFullLabel;
  const elFullBtn = document.getElementById('civa-btn-export-pdf'); if (elFullBtn) elFullBtn.textContent = T.exportFullBtn;
  const elSel = document.getElementById('civa-lbl-export-sel'); if (elSel) elSel.textContent = T.exportSelLabel;
  const elSelBtn = document.getElementById('civa-btn-export-sel'); if (elSelBtn) elSelBtn.textContent = T.exportSelBtn;
  const elCLTitle = document.getElementById('civa-cl-title'); if (elCLTitle) elCLTitle.textContent = T.launcherTitle;
  const elCLSub   = document.getElementById('civa-cl-sub');   if (elCLSub)   elCLSub.textContent   = T.launcherSub;
  const elFB = document.getElementById('civa-footer-brand');  if (elFB)      elFB.innerHTML        = T.footerBrand;
  const elSelAll = document.getElementById('civa-sel-btn-all');    if (elSelAll)    elSelAll.textContent    = T.selAll;
  const elSelCancel = document.getElementById('civa-sel-btn-cancel'); if (elSelCancel) elSelCancel.textContent = T.selCancel;
  const elSelExport = document.getElementById('civa-sel-btn-export'); if (elSelExport) elSelExport.textContent = T.selExport;
  applyHeaderBtnTitles(T);
  /* Tiles, chips, and (if Hindi) data-query attributes */
  applyTileChipTranslations(lang);
  if (lang === 'hi') {
    document.querySelectorAll('[data-query]').forEach(el => {
      const cur = el.getAttribute('data-query');
      if (QUERY_TRANSLATIONS_EN_HI[cur]) el.setAttribute('data-query', QUERY_TRANSLATIONS_EN_HI[cur]);
    });
  }
}

/* ═══════════════════════════════════════════════════════════
   ALERT SYSTEM
═══════════════════════════════════════════════════════════ */
function cdotAlert(msg, title='Notice', icon='ℹ️') {
  return new Promise(res => {
    document.getElementById('civa-alert-msg').textContent = msg;
    document.getElementById('civa-alert-title').textContent = title;
    document.getElementById('civa-alert-icon').textContent = icon;
    document.getElementById('civa-alert-cancel').style.display = 'none';
    const okBtn = document.getElementById('civa-alert-ok'); if (okBtn) okBtn.textContent = ct().alertOk;
    document.getElementById('civa-alert-overlay').style.display = 'flex';
    alertResolve = v => { document.getElementById('civa-alert-overlay').style.display='none'; res(v); };
  });
}
function cdotConfirm(msg, title='Confirm', icon='⚠️') {
  return new Promise(res => {
    document.getElementById('civa-alert-msg').textContent = msg;
    document.getElementById('civa-alert-title').textContent = title;
    document.getElementById('civa-alert-icon').textContent = icon;
    const cancelBtn = document.getElementById('civa-alert-cancel');
    cancelBtn.textContent = ct().alertCancel;
    cancelBtn.style.display = 'inline-block';
    const okBtn = document.getElementById('civa-alert-ok'); if (okBtn) okBtn.textContent = ct().alertOk;
    document.getElementById('civa-alert-overlay').style.display = 'flex';
    alertResolve = v => { document.getElementById('civa-alert-overlay').style.display='none'; res(v); };
  });
}

/* ═══════════════════════════════════════════════════════════
   CHAT VISIBILITY
═══════════════════════════════════════════════════════════ */
function toggleChat() {
  chatOpen = !chatOpen;
  if (!chatOpen && isMaximized) {
    // Remove backdrop and reset maximize before hiding so the overlay doesn't linger
    const bd = document.getElementById('civa-maximize-backdrop');
    if (bd) bd.remove();
    isMaximized = false;
    const c = document.getElementById('civa-chatbot');
    c.style.cssText = '';
    const btn = document.getElementById('civa-maximize-btn');
    if (btn) {
      btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>`;
      btn.title = ct().btnMaximize;
    }
  }
  const chatEl = document.getElementById('civa-chatbot');
  chatEl.classList.toggle('civa-hidden', !chatOpen);
  chatEl.style.display = chatOpen ? '' : 'none';
  // On mobile hide the launcher while chat is open so it doesn't overlap
  const launcher = document.getElementById('civa-chat-launcher');
  if (launcher) launcher.classList.toggle('civa-launcher-hidden', chatOpen);
}
function toggleMaximize() {
  isMaximized = !isMaximized;
  const c = document.getElementById('civa-chatbot');
  const btn = document.getElementById('civa-maximize-btn');
  if (isMaximized) {
    const backdrop = document.createElement('div');
    backdrop.id = 'civa-maximize-backdrop';
    backdrop.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.55);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);z-index:9998;animation:civa-fadeIn .2s ease';
    backdrop.onclick = () => toggleMaximize();
    document.body.appendChild(backdrop);
    c.style.position='fixed'; c.style.top='50%'; c.style.left='50%';
    c.style.transform='translate(-50%, -50%)'; c.style.bottom='auto'; c.style.right='auto';
    c.style.width='min(960px, 94vw)'; c.style.height='min(88vh, 900px)';
    c.style.maxHeight='88vh'; c.style.borderRadius='18px';
    c.style.boxShadow='0 30px 80px rgba(0,0,0,.45)'; c.style.zIndex='9999';
    btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>`;
    btn.title = ct().btnRestore;
  } else {
    const bd = document.getElementById('civa-maximize-backdrop');
    if (bd) bd.remove();
    c.style.cssText = '';
    btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>`;
    btn.title = ct().btnMaximize;
  }
}
async function clearAndClose() {
  const ok = await cdotConfirm(ct().clearChatConfirm, ct().clearChatTitle,'🗑️');
  if (ok) {
    toggleChat(); showWelcome();
    document.getElementById('civa-chat-messages').innerHTML=`<div class="civa-date-divider">${ct().todayLabel}</div>`;
    localStorage.removeItem('chatHistory');
    /* Clear language override so chatbot follows parent website again after reset */
    localStorage.removeItem(CIVA_LANG_OVERRIDE_KEY);
    try { await resetThreadIdAPI(); } catch(e){}
  }
}
async function resetThreadIdAPI() {
  const threadId = getThreadId();
  let token = getToken();
  if (!token) token = await authenticateAndStoreToken();
  if (token && threadId) {
    await fetch(`http://chatbot..cdot.in/api/clear-chat-history?thread_id=${threadId}`,{
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
  document.getElementById('civa-welcome-screen').style.display='flex';
  document.getElementById('civa-chat-screen').style.display='none';
  document.getElementById('civa-back-btn').style.display='none';
  document.getElementById('civa-export-btn-wrap').style.display='none';
  document.getElementById('civa-suggested-questions').style.display='none';
  cancelSelection();
  inChat = false;
}
function enterChat() {
  if (inChat) return;
  document.getElementById('civa-welcome-screen').style.display='none';
  document.getElementById('civa-chat-screen').style.display='flex';
  document.getElementById('civa-back-btn').style.display='flex';
  document.getElementById('civa-export-btn-wrap').style.display='block';
  document.getElementById('civa-suggested-questions').style.display='flex';
  inChat = true;
}

/* ═══════════════════════════════════════════════════════════
   TILE & CHIP CLICK HANDLERS
═══════════════════════════════════════════════════════════ */
document.querySelectorAll('.civa-tile[data-query]').forEach(tile => {
  tile.addEventListener('click', () => sendQuery(tile.getAttribute('data-query')));
});
document.querySelectorAll('.civa-sq-chip[data-query]').forEach(chip => {
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
    const response = await fetch('http://chatbot..cdot.in/api/chatbot/', {
      method:'POST',
      headers: { Authorization:`Bearer ${token}`, 'Content-Type':'application/json' },
      body: JSON.stringify({ human_text: q, thread_id: threadId })
    });
    removeTyping(typingId);
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    const msgId = 'msg-' + Date.now();
    const { row, contentSpan } = appendStreamingBubble(msgId);
    const wrap = document.getElementById('civa-chat-messages');
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let fullText = '';
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      fullText += chunk;
      contentSpan.innerHTML = parseMarkdown(fullText);
      contentSpan.classList.add('civa-streaming-cursor');
      wrap.scrollTop = wrap.scrollHeight;
    }
    contentSpan.classList.remove('civa-streaming-cursor');
    if (fullText.trim().endsWith('NO')) {
      fullText = `${ct().noInformation} "${q}". ${_currentLang==='hi' ? 'कृपया एक परिष्कृत प्रश्न के साथ पुनः प्रयास करें।' : 'Please try again with a refined question.'}`;
      contentSpan.innerHTML = parseMarkdown(fullText);
    }
    finaliseBubble(row, contentSpan, fullText, q, msgId);
    wrap.scrollTop = wrap.scrollHeight;
    saveToHistory('Bot', fullText, q, msgId);
  } catch (err) {
    console.error('API error:', err);
    removeTyping(typingId);
    appendMsg('bot', ct().serviceUnavailable, q);
  } finally {
    setInputLock(false);
    document.getElementById('civa-user-input').focus();
  }
}

/* ═══════════════════════════════════════════════════════════
   MESSAGE RENDERING
═══════════════════════════════════════════════════════════ */
function appendMsg(sender, rawContent, query='', msgId=null, ts=null, skipHistory=false) {
  const wrap = document.getElementById('civa-chat-messages');
  const id = msgId || ('msg-' + Date.now());
  const html = (sender === 'bot') ? parseMarkdown(rawContent) : escHtml(rawContent);
  const row = document.createElement('div');
  row.className = 'civa-msg-row civa-' + sender;
  const av = document.createElement('div');
  av.className = 'civa-msg-avatar ' + (sender==='user' ? 'civa-user-av' : '');
  av.innerHTML = sender==='bot'
    ? '<img src="assets/img/chatbot_img/bot.jpeg" alt="CIVA">'
    : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
  const bub = document.createElement('div');
  bub.className = 'civa-bubble';
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
  const wrap = document.getElementById('civa-chat-messages');
  const row = document.createElement('div');
  row.className = 'civa-msg-row civa-bot';
  const av = document.createElement('div');
  av.className = 'civa-msg-avatar';
  av.innerHTML = '<img src="assets/img/chatbot_img/bot.jpeg" alt="CIVA">';
  const bub = document.createElement('div');
  bub.className = 'civa-bubble';
  bub.setAttribute('data-id', msgId);
  const contentSpan = document.createElement('span');
  bub.appendChild(contentSpan);
  row.append(av, bub);
  wrap.appendChild(row);
  return { row, contentSpan };
}

function finaliseBubble(row, contentSpan, rawText, query, msgId) {
  const bub = row.querySelector('.civa-bubble');
  const parsedHtml = parseMarkdown(rawText);
  contentSpan.innerHTML = parsedHtml;
  const wordCount = parsedHtml.replace(/<[^>]*>/g,'').split(/\s+/).length;
  if (wordCount > 45) addReadMoreToggle(bub, contentSpan, parsedHtml);
  bub.appendChild(buildMetaBar(parsedHtml, rawText, query, msgId));
}

function addReadMoreToggle(bub, contentSpan, fullHtml) {
  bub._civaFullHtml = fullHtml;   // kept for export — always the complete message
  let expanded = false;
  const short = trimHTML(fullHtml, 45);
  contentSpan.innerHTML = short;
  const rmBtn = document.createElement('button');
  rmBtn.className = 'civa-read-more-btn';
  rmBtn.textContent = ct().readMore;
  rmBtn.onclick = () => {
    expanded = !expanded;
    contentSpan.innerHTML = expanded ? fullHtml : short;
    rmBtn.textContent = expanded ? ct().readLess : ct().readMore;
  };
  bub.appendChild(rmBtn);
}

function buildMetaBar(html, rawText, query, msgId, ts=null) {
  const meta = document.createElement('div');
  meta.className = 'civa-bubble-meta';
  const time = document.createElement('span');
  time.className = 'civa-meta-time';
  time.textContent = ct().timeJustNow;
  time.dataset.ts = ts || Date.now();
  const spacer = document.createElement('span');
  spacer.className = 'civa-meta-spacer';
  const plainText = stripMarkdown(rawText || html);
  const copyBtn = mkMetaBtn('M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2M8 4h8a2 2 0 0 1 2 2v2M8 4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2', ct().btnCopy, () => {
    navigator.clipboard?.writeText(plainText);
    cdotAlert(ct().messageCopied, ct().copiedTitle,'✅');
  });
  const likeBtn = mkMetaBtn('M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14zm-7 11H6.7A2.23 2.23 0 0 1 5 18V11a2 2 0 0 1 2-2h.3', ct().btnLike, () => {
    if (!likeBtn.classList.contains('civa-liked')) {
      likeBtn.classList.add('civa-liked');
      submitLikeDislike(query, plainText, 1, msgId);
      cdotAlert(ct().likedMsg, ct().likedTitle,'✅');
    }
  });
  const dislikeBtn = mkMetaBtn('M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2 2 0 0 1-2 2h-3', ct().btnDislike, () => {
    openFeedback(query, plainText, msgId);
  });
  const speakerBtn = document.createElement('button');
  speakerBtn.className = 'civa-meta-btn';
  speakerBtn.title = ct().btnReadAloud;
  speakerBtn.innerHTML = `
    <span class="civa-speaker-icon-play"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg></span>
    <span class="civa-speaker-icon-stop"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12" rx="2"/></svg></span>`;
  speakerBtn.onclick = () => queueSpeak(plainText, speakerBtn);
  meta.append(time, spacer, copyBtn, likeBtn, dislikeBtn, speakerBtn);
  return meta;
}

function buildUserMetaBar(rawText, msgId, ts=null) {
  const meta = document.createElement('div');
  meta.className = 'civa-bubble-meta';
  const time = document.createElement('span');
  time.className = 'civa-meta-time';
  time.textContent = ct().timeJustNow;
  time.dataset.ts = ts || Date.now();
  const spacer = document.createElement('span');
  spacer.className = 'civa-meta-spacer';
  const copyBtn = mkMetaBtn('M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2M8 4h8a2 2 0 0 1 2 2v2M8 4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2', ct().btnCopy, () => {
    navigator.clipboard?.writeText(rawText);
    cdotAlert(ct().messageCopied, ct().copiedTitle,'✅');
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
  btn.className = 'civa-meta-btn';
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

  // Step 1: Extract fenced code blocks → placeholders (content HTML-escaped)
  const codeBlocks = [];
  msg = msg.replace(/```[\w]*\n?([\s\S]*?)```/g, (_, code) => {
    const i = codeBlocks.length;
    codeBlocks.push(`<pre style="background:rgba(0,86,167,.07);border:1px solid var(--civa-border);border-radius:8px;padding:10px 12px;overflow-x:auto;font-size:12px;font-family:monospace;white-space:pre-wrap;margin:6px 0">${escHtml(code.trim())}</pre>`);
    return `\x02BLK${i}\x03`;
  });

  // Step 2: Strip XSS vectors — targeted removal, NOT blanket escaping
  // (blanket escaping would turn <br/> from the API into literal text)
  msg = msg.replace(/<script[\s\S]*?<\/script>/gi, '');
  msg = msg.replace(/<style[\s\S]*?<\/style>/gi, '');
  msg = msg.replace(/<\/?(iframe|object|embed|form|input|meta|link|base|applet|img)[^>]*>/gi, '');
  msg = msg.replace(/\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*)/gi, '');
  msg = msg.replace(/javascript\s*:/gi, '');

  // Step 3: Normalize <br/> tags from bot API into newlines so markdown can process them
  msg = msg.replace(/<br\s*\/?>/gi, '\n');

  // Step 4: Apply markdown patterns
  msg = msg.replace(/^#### (.+)$/gm, '<h5 style="font-size:12.5px;font-weight:700;color:var(--civa-brand-dark);margin:7px 0 3px">$1</h5>');
  msg = msg.replace(/^### (.+)$/gm,  '<h4 style="font-size:13px;font-weight:700;color:var(--civa-brand-dark);margin:8px 0 4px">$1</h4>');
  msg = msg.replace(/^## (.+)$/gm,   '<h3 style="font-size:14px;font-weight:700;color:var(--civa-brand-dark);margin:8px 0 4px">$1</h3>');
  msg = msg.replace(/^# (.+)$/gm,    '<h2 style="font-size:15px;font-weight:800;color:var(--civa-brand-dark);margin:8px 0 4px">$1</h2>');
  msg = msg.replace(/^[-*_]{3,}$/gm, '<hr style="border:none;border-top:1px solid var(--civa-border);margin:8px 0">');
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

  // Step 5: Links — URL must begin with https?:// (prevents javascript: injection)
  const LINK_STYLE = 'color:var(--civa-brand);text-decoration:underline;text-underline-offset:2px;word-break:break-all';
  msg = msg.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, `<a href="$2" target="_blank" rel="noopener noreferrer" style="${LINK_STYLE}">$1</a>`);
  msg = msg.replace(/href="(https?:\/\/[^"]+)"/g, (m, u) => `href="${u.replace(/https?/g,'PROTO')}"`);
  msg = msg.replace(/(^|[\s\n(,;])(https?:\/\/[^\s<)"'\]]+)/g, (_, pre, url) => `${pre}<a href="${url}" target="_blank" rel="noopener noreferrer" style="${LINK_STYLE}">${url}</a>`);
  msg = msg.replace(/href="([^"]+PROTO[^"]+)"/g, (_, u) => `href="${u.replace(/PROTO/g,'https')}"`);

  // Step 6: Blockquote
  msg = msg.replace(/^>\s?(.+)$/gm, '<blockquote style="border-left:3px solid var(--civa-accent);padding:4px 10px;margin:4px 0;color:var(--civa-text-2);font-style:italic;background:rgba(0,194,224,.05);border-radius:0 6px 6px 0">$1</blockquote>');

  // Step 7: Newlines → <br>
  msg = msg.replace(/\n/g, '<br>');
  msg = msg.replace(/(<\/(?:h[2-5]|ul|ol|pre|hr|blockquote)>)<br>/g, '$1');
  msg = msg.replace(/<br>(<(?:ul|ol|pre|h[2-5]|blockquote))/g, '$1');

  // Step 8: Restore fenced code blocks
  msg = msg.replace(/\x02BLK(\d+)\x03/g, (_, i) => codeBlocks[parseInt(i)]);

  return msg;
}

function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ═══════════════════════════════════════════════════════════
   TYPING INDICATOR
═══════════════════════════════════════════════════════════ */
function appendTyping() {
  const wrap = document.getElementById('civa-chat-messages');
  const id = 'typing-' + Date.now();
  const row = document.createElement('div');
  row.className = 'civa-msg-row civa-bot'; row.id = id;
  const av = document.createElement('div');
  av.className = 'civa-msg-avatar';
  av.innerHTML = '<img src="assets/img/chatbot_img/bot.jpeg" alt="CIVA">';
  const bub = document.createElement('div');
  bub.className = 'civa-bubble';
  bub.innerHTML = '<div class="civa-typing-bubble"><span></span><span></span><span></span></div>';
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
  const inp = document.getElementById('civa-user-input');
  const send = document.getElementById('civa-send-btn');
  const mic = document.getElementById('civa-mic-btn');
  inp.disabled = locked; send.disabled = locked; mic.disabled = locked;
  mic.style.opacity = locked ? '0.45' : '';
  mic.style.cursor = locked ? 'not-allowed' : '';
  document.querySelectorAll('.civa-sq-chip').forEach(chip => {
    chip.style.pointerEvents = locked ? 'none' : '';
    chip.style.opacity = locked ? '0.45' : '';
  });
}
function hasDevanagari(text) {
  return /[ऀ-ॿ]/.test(text);
}
function sanitizeInput(text) {
  // Strip HTML tags and script-injectable patterns from user input
  return text
    .replace(/<[^>]*>/g, '')          // remove HTML tags
    .replace(/javascript\s*:/gi, '')  // remove javascript: protocol
    .replace(/on\w+\s*=/gi, '')       // remove event handlers (onerror=, onclick=, etc.)
    .trim();
}

function sendFromInput() {
  const inp = document.getElementById('civa-user-input');
  const raw = inp.value.trim();
  if (!raw) return;
  if (raw.length > 2000) return;

  const q = sanitizeInput(raw);
  if (!q) {
    inp.value = '';
    cdotAlert('Invalid input detected. Please type a plain text question.', 'Invalid Input', '🚫');
    return;
  }

  if (_currentLang === 'en' && hasDevanagari(q)) {
    cdotAlert(ct().langMismatch, ct().langMismatchTitle, '⚠️');
    return;
  }
  if (_currentLang === 'hi' && !hasDevanagari(q)) {
    cdotAlert(ct().feedbackLangWarn, ct().langMismatchTitle, '⚠️');
    return;
  }
  inp.value = '';
  sendQuery(q);
}
document.getElementById('civa-send-btn').onclick = sendFromInput;
document.getElementById('civa-user-input').addEventListener('keydown', e => {
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
  const curLang = _currentLang || 'en';

  // Female Indian names — covers Google, Microsoft and system voices
  const femaleIndian = ['aditi','priya','heera','raveena','veena','lekha','neerja','sunita',
    'kajal','kalpana','swara','divya','ananya','meera','pooja','sita','radha','madhuri','ankita'];
  const femaleGeneric = ['female','woman','aria','zira','susan','karen','samantha','victoria',
    'fiona','moira','tessa','natasha','catharine','google uk english female'];
  const maleNames = ['david','mark','daniel','alex','tom','james','oliver','george','rishi',
    'male','man','guy','fred'];

  const score = v => {
    let s = 0;
    const n = v.name.toLowerCase();
    const l = v.lang.toLowerCase();
    // Hindi mode — prefer hi-IN voices first
    if (curLang === 'hi') {
      if (l === 'hi-in') s += 600;
      else if (l.startsWith('hi')) s += 480;
    }
    // Indian English accent (highest priority for English mode)
    if (l === 'en-in') s += 500;
    else if (l.startsWith('en-in')) s += 460;
    // Female Indian name — strong bonus
    if (femaleIndian.some(k => n.includes(k))) s += 400;
    // Google voices are typically higher quality
    if (n.startsWith('google') || n.includes('google')) s += 150;
    // Neural/enhanced voices sound more natural
    if (n.includes('neural') || n.includes('natural') || n.includes('enhanced') || n.includes('premium')) s += 140;
    // Generic female signals
    if (femaleGeneric.some(k => n.includes(k))) s += 80;
    // British / Australian English as fallback (closer to Indian cadence than US)
    if (l === 'en-gb') s += 30;
    if (l === 'en-au') s += 20;
    if (l.startsWith('en')) s += 10;
    // Penalise known male voices
    if (maleNames.some(k => n.includes(k))) s -= 300;
    return s;
  };

  const ranked = [...pool].sort((a, b) => score(b) - score(a));
  return ranked[0] || null;
}

let _keepAlive = null;

// Split long text into sentence-sized chunks so Chrome's 15-second TTS limit is never hit
function _splitIntoChunks(text, maxChars = 180) {
  // Split on sentence boundaries first, then on clause boundaries
  const sentenceRe = /(?<=[.!?।\n])\s+/;
  const clauseRe   = /(?<=[,;:])\s+/;
  const parts = [];
  const sentences = text.split(sentenceRe).filter(Boolean);
  for (const s of sentences) {
    if (s.length <= maxChars) { parts.push(s); continue; }
    // Long sentence — split on clause boundaries
    const clauses = s.split(clauseRe).filter(Boolean);
    let buf = '';
    for (const c of clauses) {
      if ((buf + ' ' + c).trim().length <= maxChars) {
        buf = (buf + ' ' + c).trim();
      } else {
        if (buf) parts.push(buf);
        buf = c;
      }
    }
    if (buf) parts.push(buf);
  }
  return parts.length ? parts : [text];
}

function queueSpeak(text, btn) {
  if (_activeSpeakerBtn === btn) { _stopSpeaker(); return; }
  _stopSpeaker();
  if (!window.speechSynthesis) return;

  _activeSpeakerBtn = btn;
  btn.classList.add('civa-speaker-active');
  btn.title = ct().btnStop;

  const curLang = _currentLang || 'en';
  const voice   = pickVoice();
  const chunks  = _splitIntoChunks(text);
  let idx = 0;

  const _done = () => {
    clearInterval(_keepAlive);
    btn.classList.remove('civa-speaker-active');
    btn.title = ct().btnReadAloud;
    if (_activeSpeakerBtn === btn) _activeSpeakerBtn = null;
  };

  const speakChunk = () => {
    if (idx >= chunks.length || _activeSpeakerBtn !== btn) { _done(); return; }
    const u = new SpeechSynthesisUtterance(chunks[idx++]);
    u.lang   = curLang === 'hi' ? 'hi-IN' : 'en-IN';
    u.rate   = 0.88;   // slightly slower — sounds more natural for Indian English
    u.pitch  = 1.08;   // slightly higher pitch → female feel
    u.volume = 1;
    if (voice) { u.voice = voice; u.lang = voice.lang; }
    u.onend   = speakChunk;          // chain next chunk automatically
    u.onerror = _done;
    // Keep-alive: Chrome cancels synthesis after ~15 s without this
    u.onstart = () => {
      clearInterval(_keepAlive);
      _keepAlive = setInterval(() => {
        if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }, 9000);
    };
    window.speechSynthesis.speak(u);
  };

  window.speechSynthesis.cancel();
  // Small delay so cancel() flushes before first utterance
  setTimeout(speakChunk, 150);
}

function _stopSpeaker() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  clearInterval(_keepAlive);
  if (_activeSpeakerBtn) {
    _activeSpeakerBtn.classList.remove('civa-speaker-active');
    _activeSpeakerBtn.title = ct().btnReadAloud;
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
    document.getElementById('civa-user-input').value = t;
    if (e.results[e.results.length-1].isFinal) { finalT = t; }
  };
  recognition.onend = () => {
    document.getElementById('civa-mic-btn').classList.remove('civa-active');
    document.getElementById('civa-user-input').placeholder = ct().inputPlaceholder;
    micActive = false;
    if (finalT.trim()) { sendFromInput(); finalT=''; }
  };
  recognition.onerror = e => {
    document.getElementById('civa-mic-btn').classList.remove('civa-active');
    document.getElementById('civa-user-input').placeholder = e.error==='not-allowed' ? ct().micDenied : ct().inputPlaceholder;
    micActive = false;
  };
}
document.getElementById('civa-mic-btn').onclick = () => {
  if (!SpeechRecognition) { cdotAlert(ct().speechNotSupported, ct().notSupportedTitle,'🎤'); return; }
  if (micActive) { recognition.stop(); return; }
  recognition.start();
  micActive = true;
  document.getElementById('civa-mic-btn').classList.add('civa-active');
  document.getElementById('civa-user-input').placeholder = ct().micListening;
};

/* ═══════════════════════════════════════════════════════════
   LIKE / DISLIKE API
═══════════════════════════════════════════════════════════ */
async function submitLikeDislike(question, answer, rating, messageId) {
  let token = getToken();
  if (!token) token = await authenticateAndStoreToken();
  const threadId = getThreadId();
  try {
    await fetch('http://chatbot..cdot.in/api/submit-feedback/', {
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
  document.getElementById('civa-fb-question').value = q;
  document.getElementById('civa-fb-answer').value = a;
  document.getElementById('civa-fb-msgid').value = id;
  document.getElementById('civa-feedback-popup').classList.add('civa-open');
}
function closeFeedback() {
  document.getElementById('civa-feedback-popup').classList.remove('civa-open');
  const warn = document.getElementById('civa-fb-lang-warn');
  if (warn) { warn.style.display = 'none'; warn.textContent = ''; }
}
document.getElementById('civa-feedback-text').oninput = function() {
  const val = this.value.trim();
  const warn = document.getElementById('civa-fb-lang-warn');
  const hasHindi = hasDevanagari(val);
  const langInvalid = val.length > 0 && (
    (_currentLang === 'hi' && !hasHindi) ||
    (_currentLang === 'en' && hasHindi)
  );
  if (warn) { warn.textContent = langInvalid ? ct().feedbackLangWarn : ''; warn.style.display = langInvalid ? 'block' : 'none'; }
  document.getElementById('civa-submit-feedback').disabled = val.length < 2 || langInvalid;
};
function submitFeedback() {
  const feedbackText = document.getElementById('civa-feedback-text').value.trim();
  const hasHindi = hasDevanagari(feedbackText);
  if ((_currentLang === 'hi' && !hasHindi) || (_currentLang === 'en' && hasHindi)) {
    cdotAlert(ct().feedbackLangWarn, ct().langMismatchTitle, '⚠️');
    return;
  }
  const question = document.getElementById('civa-fb-question').value;
  const answer = document.getElementById('civa-fb-answer').value;
  const threadId = getThreadId();
  const token = getToken();
  fetch('http://chatbot..cdot.in/api/submit-feedback/', {
    method:'POST',
    headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` },
    body: JSON.stringify({ question, answer, feedback_type:0, feedback:feedbackText, thread_id:threadId })
  }).catch(e => console.error('Feedback submit error:', e));
  cdotAlert(ct().feedbackThankYou, ct().feedbackReceivedTitle,'🙏');
  closeFeedback();
  document.getElementById('civa-feedback-text').value = '';
  document.getElementById('civa-submit-feedback').disabled = true;
}

/* ═══════════════════════════════════════════════════════════
   EXPORT
═══════════════════════════════════════════════════════════ */
function toggleExportMenu(e) {
  e.stopPropagation();
  const menu = document.getElementById('civa-export-menu');
  menu.style.display = menu.style.display==='none'||!menu.style.display ? 'block' : 'none';
}
document.addEventListener('click', () => {
  const menu = document.getElementById('civa-export-menu');
  if (menu) menu.style.display = 'none';
});

function startSelectiveExport() {
  document.getElementById('civa-export-menu').style.display = 'none';
  selectionMode = true;
  document.getElementById('civa-selection-header').classList.add('civa-active');
  updateSelCount();
  document.querySelectorAll('.civa-msg-row').forEach((row, idx) => {
    row.classList.add('civa-selectable');
    row.dataset.selIdx = idx;
    if (!row.querySelector('.civa-msg-checkbox')) {
      const cb = document.createElement('input');
      cb.type = 'checkbox'; cb.className = 'civa-msg-checkbox';
      cb.addEventListener('change', () => {
        row.classList.toggle('civa-selected', cb.checked);
        const next = row.nextElementSibling;
        if (next && next.classList.contains('civa-bot')) {
          next.classList.toggle('civa-selected', cb.checked);
          const nextCb = next.querySelector('.civa-msg-checkbox');
          if (nextCb) nextCb.checked = cb.checked;
        }
        updateSelCount();
      });
      row.insertBefore(cb, row.firstChild);
    }
  });
}

function updateSelCount() {
  const n = document.querySelectorAll('.civa-msg-row.civa-selected').length;
  document.getElementById('civa-sel-count').textContent = ct().selCount(n);
}
function selectAll() {
  document.querySelectorAll('.civa-msg-row.civa-selectable').forEach(row => {
    row.classList.add('civa-selected');
    const cb = row.querySelector('.civa-msg-checkbox');
    if (cb) cb.checked = true;
  });
  updateSelCount();
}
function cancelSelection() {
  selectionMode = false;
  document.getElementById('civa-selection-header').classList.remove('civa-active');
  document.querySelectorAll('.civa-msg-row').forEach(row => {
    row.classList.remove('civa-selectable','civa-selected');
    const cb = row.querySelector('.civa-msg-checkbox');
    if (cb) cb.remove();
  });
}
function exportSelected() {
  const selected = [...document.querySelectorAll('.civa-msg-row.civa-selected')];
  if (!selected.length) { cdotAlert(ct().selectMessageAlert, ct().noSelectionTitle,'📋'); return; }
  let html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{font-family:Arial,sans-serif;max-width:700px;margin:40px auto;color:#1a2233;font-size:14px}h1{color:#0056A7;border-bottom:2px solid #0056A7;padding-bottom:8px;font-size:20px}.ts{color:#888;font-size:11px;margin-bottom:20px}.msg{margin:10px 0;padding:10px 14px;border-radius:10px;max-width:80%}.bot-msg{background:#e8f4fd;border:1px solid #c5e0f5;margin-right:auto}.user-msg{background:#0056A7;color:#fff;margin-left:auto;text-align:right}.sender{font-size:10px;font-weight:700;margin-bottom:4px;opacity:.7;text-transform:uppercase;letter-spacing:.5px}hr{border:none;border-top:1px solid #e2e8f0;margin:16px 0}</style></head><body><h1>CIVA – Selected Messages Export</h1><div class="ts">Exported on ${new Date().toLocaleString()}</div><hr>`;
  selected.forEach(row => {
    const isUser = row.classList.contains('civa-user');
    const bub = row.querySelector('.civa-bubble');
    if (!bub) return;
    const clone = bub.cloneNode(true);
    // If the bubble was truncated, restore the full content for the export
    if (bub._civaFullHtml) {
      const cs = clone.querySelector('span');
      if (cs) cs.innerHTML = bub._civaFullHtml;
    }
    clone.querySelectorAll('button,.civa-bubble-meta,.civa-msg-checkbox').forEach(b=>b.remove());
    html += `<div class="msg ${isUser?'user-msg':'bot-msg'}"><div class="sender">${isUser?'You':'CIVA'}</div><div>${clone.innerHTML}</div></div>`;
  });
  html += `</body></html>`;
  const win = window.open('','_blank','width=800,height=600');
  win.document.write(html); win.document.close();
  win.onload = () => { win.print(); };
  cancelSelection();
}

function exportChatAsPDF() {
  document.getElementById('civa-export-menu').style.display = 'none';
  const msgs = [...document.querySelectorAll('.civa-msg-row')];
  let html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{font-family:Arial,sans-serif;max-width:700px;margin:40px auto;color:#1a2233;font-size:14px}h1{color:#0056A7;border-bottom:2px solid #0056A7;padding-bottom:8px;font-size:20px}.ts{color:#888;font-size:11px;margin-bottom:20px}.msg{margin:10px 0;padding:10px 14px;border-radius:10px;max-width:80%}.bot-msg{background:#e8f4fd;border:1px solid #c5e0f5;margin-right:auto}.user-msg{background:#0056A7;color:#fff;margin-left:auto;text-align:right}.sender{font-size:10px;font-weight:700;margin-bottom:4px;opacity:.7;text-transform:uppercase;letter-spacing:.5px}hr{border:none;border-top:1px solid #e2e8f0;margin:16px 0}</style></head><body><h1>CIVA – Chat Export</h1><div class="ts">Exported on ${new Date().toLocaleString()}</div><hr>`;
  msgs.forEach(row => {
    const isUser = row.classList.contains('civa-user');
    const bub = row.querySelector('.civa-bubble');
    if (!bub) return;
    const clone = bub.cloneNode(true);
    // If the bubble was truncated, restore the full content for the export
    if (bub._civaFullHtml) {
      const cs = clone.querySelector('span');
      if (cs) cs.innerHTML = bub._civaFullHtml;
    }
    clone.querySelectorAll('button,.civa-bubble-meta').forEach(b=>b.remove());
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
let _currentLang = localStorage.getItem(CIVA_LANG_KEY) || 'en';

function toggleLanguage() {
  _currentLang = _currentLang === 'en' ? 'hi' : 'en';
  localStorage.setItem(CIVA_LANG_KEY, _currentLang);
  /* Mark that the user has manually chosen a language — chatbot now self-controlled */
  localStorage.setItem(CIVA_LANG_OVERRIDE_KEY, '1');

  const T2 = TRANSLATIONS[_currentLang] || TRANSLATIONS['en'];
  document.getElementById('civa-lang-label').textContent = _currentLang === 'en' ? 'हिंदी' : 'English';
  document.getElementById('civa-hdr-name').textContent = T2.botName;
  document.getElementById('civa-hdr-sub').textContent = T2.hdrSub;
  document.getElementById('civa-user-input').placeholder = T2.inputPlaceholder;
  document.getElementById('civa-fb-title').textContent = T2.feedbackTitle;
  document.getElementById('civa-fb-sub').textContent = T2.feedbackSub;
  document.getElementById('civa-feedback-text').placeholder = T2.feedbackPlaceholder;
  document.getElementById('civa-submit-feedback').textContent = T2.submitFeedback;
  document.getElementById('civa-today-divider').textContent = T2.todayLabel;
  const el2ExpOpts = document.getElementById('civa-export-options-lbl'); if (el2ExpOpts) el2ExpOpts.textContent = T2.exportOptionsLabel;
  const el2Lbl = document.getElementById('civa-lbl-export-full'); if (el2Lbl) el2Lbl.textContent = T2.exportFullLabel;
  const el2FullBtn = document.getElementById('civa-btn-export-pdf'); if (el2FullBtn) el2FullBtn.textContent = T2.exportFullBtn;
  const el2Sel = document.getElementById('civa-lbl-export-sel'); if (el2Sel) el2Sel.textContent = T2.exportSelLabel;
  const el2SelBtn = document.getElementById('civa-btn-export-sel'); if (el2SelBtn) el2SelBtn.textContent = T2.exportSelBtn;
  const el2CLTitle = document.getElementById('civa-cl-title'); if (el2CLTitle) el2CLTitle.textContent = T2.launcherTitle;
  const el2CLSub   = document.getElementById('civa-cl-sub');   if (el2CLSub)   el2CLSub.textContent   = T2.launcherSub;
  const el2FB = document.getElementById('civa-footer-brand');  if (el2FB)      el2FB.innerHTML        = T2.footerBrand;
  const el2SelAll = document.getElementById('civa-sel-btn-all');    if (el2SelAll)    el2SelAll.textContent    = T2.selAll;
  const el2SelCancel = document.getElementById('civa-sel-btn-cancel'); if (el2SelCancel) el2SelCancel.textContent = T2.selCancel;
  const el2SelExport = document.getElementById('civa-sel-btn-export'); if (el2SelExport) el2SelExport.textContent = T2.selExport;
  applyHeaderBtnTitles(T2);
  applyTileChipTranslations(_currentLang);

  // Update data-query on all tiles and sq-chips so the sent message matches the displayed language
  const qMap = _currentLang === 'hi' ? QUERY_TRANSLATIONS_EN_HI : QUERY_TRANSLATIONS_HI_EN;
  document.querySelectorAll('[data-query]').forEach(el => {
    const cur = el.getAttribute('data-query');
    if (qMap[cur]) el.setAttribute('data-query', qMap[cur]);
  });
}

/* ═══════════════════════════════════════════════════════════
   PARENT → CHATBOT LANGUAGE SYNC
   Polls window.lang (set by PHP host page) every 500 ms.
   Always follows when parent actively CHANGES, regardless of user override.
═══════════════════════════════════════════════════════════ */
let _lastKnownParentLang = (typeof window.lang === 'string' && window.lang === 'hi') ? 'hi' : 'en';
setInterval(() => {
  const parentLang = (typeof window.lang === 'string' && window.lang === 'hi') ? 'hi' : 'en';
  if (parentLang !== _lastKnownParentLang) {
    _lastKnownParentLang = parentLang;
    if (_currentLang !== parentLang) {
      /* Silently switch chatbot language to match parent without setting override */
      _currentLang = parentLang;
      localStorage.setItem(CIVA_LANG_KEY, _currentLang);
      const T2 = TRANSLATIONS[_currentLang] || TRANSLATIONS['en'];
      document.getElementById('civa-lang-label').textContent = _currentLang === 'en' ? 'हिंदी' : 'English';
      document.getElementById('civa-hdr-name').textContent = T2.botName;
      document.getElementById('civa-hdr-sub').textContent = T2.hdrSub;
      document.getElementById('civa-user-input').placeholder = T2.inputPlaceholder;
      document.getElementById('civa-fb-title').textContent = T2.feedbackTitle;
      document.getElementById('civa-fb-sub').textContent = T2.feedbackSub;
      document.getElementById('civa-feedback-text').placeholder = T2.feedbackPlaceholder;
      document.getElementById('civa-submit-feedback').textContent = T2.submitFeedback;
      document.getElementById('civa-today-divider').textContent = T2.todayLabel;
      const elExpOpts = document.getElementById('civa-export-options-lbl'); if (elExpOpts) elExpOpts.textContent = T2.exportOptionsLabel;
      const elLbl = document.getElementById('civa-lbl-export-full'); if (elLbl) elLbl.textContent = T2.exportFullLabel;
      const elFullBtn = document.getElementById('civa-btn-export-pdf'); if (elFullBtn) elFullBtn.textContent = T2.exportFullBtn;
      const elSel = document.getElementById('civa-lbl-export-sel'); if (elSel) elSel.textContent = T2.exportSelLabel;
      const elSelBtn = document.getElementById('civa-btn-export-sel'); if (elSelBtn) elSelBtn.textContent = T2.exportSelBtn;
      const elCLTitle = document.getElementById('civa-cl-title'); if (elCLTitle) elCLTitle.textContent = T2.launcherTitle;
      const elCLSub   = document.getElementById('civa-cl-sub');   if (elCLSub)   elCLSub.textContent   = T2.launcherSub;
      const elFB = document.getElementById('civa-footer-brand');  if (elFB)      elFB.innerHTML        = T2.footerBrand;
      const elSelAll = document.getElementById('civa-sel-btn-all');    if (elSelAll)    elSelAll.textContent    = T2.selAll;
      const elSelCancel = document.getElementById('civa-sel-btn-cancel'); if (elSelCancel) elSelCancel.textContent = T2.selCancel;
      const elSelExport = document.getElementById('civa-sel-btn-export'); if (elSelExport) elSelExport.textContent = T2.selExport;
      applyHeaderBtnTitles(T2);
      applyTileChipTranslations(_currentLang);
      const qMap = _currentLang === 'hi' ? QUERY_TRANSLATIONS_EN_HI : QUERY_TRANSLATIONS_HI_EN;
      document.querySelectorAll('[data-query]').forEach(el => {
        const cur = el.getAttribute('data-query');
        if (qMap[cur]) el.setAttribute('data-query', qMap[cur]);
      });
    }
  }
}, 500);

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
  const wrap = document.getElementById('civa-chat-messages');
  wrap.innerHTML = `<div class="civa-date-divider" id="civa-today-divider">${T.todayLabel}</div>`;
  stored.forEach(item => {
    const sender = (item.sender === 'You' || item.sender === 'user') ? 'user' : 'bot';
    const ts = item.timestamp ? new Date(item.timestamp).getTime() : Date.now();
    appendMsg(sender, item.message, item.query || '', item.message_Id || null, ts, true);
  });
  wrap.scrollTop = wrap.scrollHeight;
  chatOpen = false;
  const chatEl2 = document.getElementById('civa-chatbot');
  chatEl2.classList.add('civa-hidden');
  chatEl2.style.display = 'none';
}

/* ═══════════════════════════════════════════════════════════
   TIMESTAMP UPDATER
═══════════════════════════════════════════════════════════ */
function calcTimeLapse(ts) {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return ct().timeJustNow;
  if (diff < 3600) return ct().timeMinAgo(Math.floor(diff/60));
  if (diff < 86400) return ct().timeHrAgo(Math.floor(diff/3600));
  return ct().timeDayAgo(Math.floor(diff/86400));
}
setInterval(() => {
  document.querySelectorAll('.civa-meta-time[data-ts]').forEach(el => {
    el.textContent = calcTimeLapse(+el.dataset.ts);
  });
}, 30000);

/* ═══════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════ */
applyTranslations();
loadChatFromLocalStorage();
