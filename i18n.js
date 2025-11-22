// Internationalization support
const i18n = {
  vi: {
    promptLabel: "Danh sách Prompt (mỗi dòng một prompt):",
    promptPlaceholder: "Nhập hoặc dán danh sách prompt của bạn...",
    importBtn: "Import từ file .txt",
    clearBtn: "Xóa",
    clearSuccess: "Đã xóa!",
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
    statusError: "Lỗi",
    // Error messages
    errorNoType: "Vui lòng chọn loại tạo (Image hoặc Video)",
    errorNoPrompts: "Vui lòng nhập ít nhất một prompt",
    errorInvalidRepeat: "Số lần lặp lại phải từ 1 đến 10",
    errorInvalidStartIndex: "Điểm bắt đầu phải từ 1 trở lên",
    errorInvalidDelayMin: "Delay tối thiểu phải ít nhất 5 giây",
    errorInvalidDelayMax: "Delay tối đa phải lớn hơn delay tối thiểu",
    errorCharacterDescTooLong: "Mô tả nhân vật quá dài (tối đa 500 ký tự)",
    errorSceneDescTooLong: "Mô tả cảnh quá dài (tối đa 500 ký tự)",
    errorPromptTooLong: "Prompt quá dài (tối đa 1000 ký tự)",
    errorPromptEmpty: "Prompt không được để trống",
    errorNoTab: "Không tìm thấy tab Google Flow/Veo3. Vui lòng mở trang https://flow.google.com",
    errorContentScript: "Content script chưa sẵn sàng. Vui lòng refresh trang Google Flow/Veo3",
    errorInputNotFound: "Không tìm thấy ô nhập prompt",
    errorButtonNotFound: "Không tìm thấy nút tạo",
    errorProcessingFailed: "Website không bắt đầu xử lý sau khi click button",
    errorMediaNotFound: "Không tìm thấy media sau khi xử lý",
    errorDownloadFailed: "Lỗi khi tải về file",
    errorConnectionLost: "Mất kết nối với background script. Vui lòng reload extension"
  },
  en: {
    promptLabel: "Prompt List (one prompt per line):",
    promptPlaceholder: "Enter or paste your prompt list...",
    importBtn: "Import from .txt file",
    clearBtn: "Clear",
    clearSuccess: "Cleared!",
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
    statusError: "Error",
    // Error messages
    errorNoType: "Please select creation type (Image or Video)",
    errorNoPrompts: "Please enter at least one prompt",
    errorInvalidRepeat: "Repeat count must be between 1 and 10",
    errorInvalidStartIndex: "Start index must be at least 1",
    errorInvalidDelayMin: "Minimum delay must be at least 5 seconds",
    errorInvalidDelayMax: "Maximum delay must be greater than minimum delay",
    errorCharacterDescTooLong: "Character description too long (max 500 characters)",
    errorSceneDescTooLong: "Scene description too long (max 500 characters)",
    errorPromptTooLong: "Prompt too long (max 1000 characters)",
    errorPromptEmpty: "Prompt cannot be empty",
    errorNoTab: "Google Flow/Veo3 tab not found. Please open https://flow.google.com",
    errorContentScript: "Content script not ready. Please refresh Google Flow/Veo3 page",
    errorInputNotFound: "Prompt input field not found",
    errorButtonNotFound: "Create button not found",
    errorProcessingFailed: "Website did not start processing after clicking button",
    errorMediaNotFound: "Media not found after processing",
    errorDownloadFailed: "Download failed",
    errorConnectionLost: "Connection lost with background script. Please reload extension"
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
