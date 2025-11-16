// Settings management
const defaultSettings = {
  repeatCount: 1,
  startIndex: 1,
  delayMin: 90,
  delayMax: 120,
  language: 'vi'
};

async function loadSettings() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['settings'], (result) => {
      const settings = { ...defaultSettings, ...(result.settings || {}) };
      resolve(settings);
    });
  });
}

async function saveSettings(settings) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ settings }, () => {
      resolve();
    });
  });
}

function validateSettings(settings) {
  const errors = [];
  
  if (settings.repeatCount < 1 || settings.repeatCount > 10) {
    errors.push('Repeat count must be between 1 and 10');
  }
  
  if (settings.startIndex < 1) {
    errors.push('Start index must be at least 1');
  }
  
  if (settings.delayMin < 30) {
    errors.push('Minimum delay must be at least 30 seconds');
  }
  
  if (settings.delayMax < settings.delayMin) {
    errors.push('Maximum delay must be greater than minimum delay');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

async function getSettingsFromUI() {
  const repeatCount = parseInt(document.getElementById('repeatCount')?.value || 1);
  const startIndex = parseInt(document.getElementById('startIndex')?.value || 1);
  const delayMin = parseInt(document.getElementById('delayMin')?.value || 90);
  const delayMax = parseInt(document.getElementById('delayMax')?.value || 120);
  
  return {
    repeatCount,
    startIndex,
    delayMin,
    delayMax
  };
}

async function applySettingsToUI(settings) {
  const repeatCountInput = document.getElementById('repeatCount');
  const startIndexInput = document.getElementById('startIndex');
  const delayMinInput = document.getElementById('delayMin');
  const delayMaxInput = document.getElementById('delayMax');
  
  if (repeatCountInput) repeatCountInput.value = settings.repeatCount;
  if (startIndexInput) startIndexInput.value = settings.startIndex;
  if (delayMinInput) delayMinInput.value = settings.delayMin;
  if (delayMaxInput) delayMaxInput.value = settings.delayMax;
}
