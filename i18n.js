// Internationalization support
const i18n = {
  vi: {
    promptLabel: "Danh sách Prompt (mỗi dòng một prompt):",
    promptPlaceholder: "Nhập hoặc dán danh sách prompt của bạn...",
    importBtn: "Import từ file .txt",
    typeLabel: "Chọn loại tạo:",
    imageBtn: "Image",
    videoBtn: "Video",
    settingsLabel: "Cài đặt:",
    repeatLabel: "Số lần lặp lại mỗi prompt:",
    startIndexLabel: "Bắt đầu từ prompt số:",
    delayMinLabel: "Delay tối thiểu (giây):",
    delayMaxLabel: "Delay tối đa (giây):",
    startBtn: "Bắt đầu",
    pauseBtn: "Tạm dừng",
    resumeBtn: "Tiếp tục",
    stopBtn: "Dừng",
    progressLabel: "Tiến trình:",
    logLabel: "Log:",
    clearLogBtn: "Xóa log",
    selectedImage: "Đã chọn: Tạo Hình ảnh",
    selectedVideo: "Đã chọn: Tạo Video",
    logStarting: "Bắt đầu xử lý...",
    logPaused: "Đã tạm dừng",
    logResumed: "Đã tiếp tục",
    logStopped: "Đã dừng",
    logPromptSent: "Đã gửi prompt",
    logProcessing: "Đang xử lý...",
    logCompleted: "Hoàn thành",
    logError: "Lỗi",
    logDownloaded: "Đã tải về",
    statusReady: "Sẵn sàng",
    statusProcessing: "Đang xử lý",
    statusPaused: "Đã tạm dừng",
    statusCompleted: "Hoàn thành",
    statusError: "Lỗi"
  },
  en: {
    promptLabel: "Prompt List (one prompt per line):",
    promptPlaceholder: "Enter or paste your prompt list...",
    importBtn: "Import from .txt file",
    typeLabel: "Select creation type:",
    imageBtn: "Image",
    videoBtn: "Video",
    settingsLabel: "Settings:",
    repeatLabel: "Repeat count per prompt:",
    startIndexLabel: "Start from prompt number:",
    delayMinLabel: "Minimum delay (seconds):",
    delayMaxLabel: "Maximum delay (seconds):",
    startBtn: "Start",
    pauseBtn: "Pause",
    resumeBtn: "Resume",
    stopBtn: "Stop",
    progressLabel: "Progress:",
    logLabel: "Log:",
    clearLogBtn: "Clear log",
    selectedImage: "Selected: Create Image",
    selectedVideo: "Selected: Create Video",
    logStarting: "Starting processing...",
    logPaused: "Paused",
    logResumed: "Resumed",
    logStopped: "Stopped",
    logPromptSent: "Prompt sent",
    logProcessing: "Processing...",
    logCompleted: "Completed",
    logError: "Error",
    logDownloaded: "Downloaded",
    statusReady: "Ready",
    statusProcessing: "Processing",
    statusPaused: "Paused",
    statusCompleted: "Completed",
    statusError: "Error"
  }
};

let currentLang = 'vi';

function setLanguage(lang) {
  currentLang = lang;
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (i18n[lang] && i18n[lang][key]) {
      // Handle placeholder for input and textarea
      if (element.hasAttribute('data-i18n-placeholder')) {
        element.placeholder = i18n[lang][key];
      } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        // Check if it's a placeholder key
        if (key.includes('Placeholder') || key.includes('placeholder')) {
          element.placeholder = i18n[lang][key];
        } else {
          // For other input/textarea, update textContent if it's a label
          if (element.type !== 'text' && element.type !== 'number') {
            element.textContent = i18n[lang][key];
          }
        }
      } else {
        element.textContent = i18n[lang][key];
      }
    }
  });
  
  // Update language toggle button
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.textContent = lang === 'vi' ? 'EN' : 'VI';
  }
  
  // Save language preference
  chrome.storage.local.set({ language: lang });
}

function getText(key) {
  return i18n[currentLang][key] || key;
}

// Load saved language preference
chrome.storage.local.get(['language'], (result) => {
  if (result.language) {
    currentLang = result.language;
  }
  setLanguage(currentLang);
});

// Language toggle handler
document.addEventListener('DOMContentLoaded', () => {
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const newLang = currentLang === 'vi' ? 'en' : 'vi';
      setLanguage(newLang);
    });
  }
});
