// Settings management
const defaultSettings = {
  repeatCount: 1,
  startIndex: 1,
  delayMin: 10,
  delayMax: 15,
  characterDescription: '',
  sceneDescription: '',
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
  
  // Get validation limits from constants if available
  const VALIDATION = typeof CONSTANTS !== 'undefined' && CONSTANTS.VALIDATION ? CONSTANTS.VALIDATION : {
    REPEAT_COUNT_MIN: 1,
    REPEAT_COUNT_MAX: 10,
    START_INDEX_MIN: 1,
    DELAY_MIN_SECONDS: 5,
    CHARACTER_DESC_MAX_LENGTH: 500,
    SCENE_DESC_MAX_LENGTH: 500
  };
  
  if (settings.repeatCount < VALIDATION.REPEAT_COUNT_MIN || settings.repeatCount > VALIDATION.REPEAT_COUNT_MAX) {
    const errorKey = 'errorInvalidRepeat';
    const errorMsg = typeof getText === 'function' ? getText(errorKey) : `Repeat count must be between ${VALIDATION.REPEAT_COUNT_MIN} and ${VALIDATION.REPEAT_COUNT_MAX}`;
    errors.push(errorMsg);
  }
  
  if (settings.startIndex < VALIDATION.START_INDEX_MIN) {
    const errorKey = 'errorInvalidStartIndex';
    const errorMsg = typeof getText === 'function' ? getText(errorKey) : `Start index must be at least ${VALIDATION.START_INDEX_MIN}`;
    errors.push(errorMsg);
  }
  
  if (settings.delayMin < VALIDATION.DELAY_MIN_SECONDS) {
    const errorKey = 'errorInvalidDelayMin';
    const errorMsg = typeof getText === 'function' ? getText(errorKey) : `Minimum delay must be at least ${VALIDATION.DELAY_MIN_SECONDS} seconds`;
    errors.push(errorMsg);
  }
  
  if (settings.delayMax < settings.delayMin) {
    const errorKey = 'errorInvalidDelayMax';
    const errorMsg = typeof getText === 'function' ? getText(errorKey) : 'Maximum delay must be greater than minimum delay';
    errors.push(errorMsg);
  }
  
  // Validate character description
  if (settings.characterDescription && settings.characterDescription.length > VALIDATION.CHARACTER_DESC_MAX_LENGTH) {
    const errorKey = 'errorCharacterDescTooLong';
    const errorMsg = typeof getText === 'function' ? getText(errorKey) : `Character description too long (max ${VALIDATION.CHARACTER_DESC_MAX_LENGTH} characters)`;
    errors.push(errorMsg);
  }
  
  // Validate scene description
  if (settings.sceneDescription && settings.sceneDescription.length > VALIDATION.SCENE_DESC_MAX_LENGTH) {
    const errorKey = 'errorSceneDescTooLong';
    const errorMsg = typeof getText === 'function' ? getText(errorKey) : `Scene description too long (max ${VALIDATION.SCENE_DESC_MAX_LENGTH} characters)`;
    errors.push(errorMsg);
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

async function getSettingsFromUI() {
  const repeatCount = parseInt(document.getElementById('repeatCount')?.value || 1);
  const startIndex = parseInt(document.getElementById('startIndex')?.value || 1);
  const delayMin = parseInt(document.getElementById('delayMin')?.value || 10);
  const delayMax = parseInt(document.getElementById('delayMax')?.value || 15);
  const characterDescription = (document.getElementById('characterDescription')?.value || '').trim();
  const sceneDescription = (document.getElementById('sceneDescription')?.value || '').trim();
  
  return {
    repeatCount,
    startIndex,
    delayMin,
    delayMax,
    characterDescription,
    sceneDescription
  };
}

async function applySettingsToUI(settings) {
  const repeatCountInput = document.getElementById('repeatCount');
  const startIndexInput = document.getElementById('startIndex');
  const delayMinInput = document.getElementById('delayMin');
  const delayMaxInput = document.getElementById('delayMax');
  const characterDescriptionInput = document.getElementById('characterDescription');
  const sceneDescriptionInput = document.getElementById('sceneDescription');
  
  if (repeatCountInput) repeatCountInput.value = settings.repeatCount || 1;
  if (startIndexInput) startIndexInput.value = settings.startIndex || 1;
  if (delayMinInput) delayMinInput.value = settings.delayMin || 10;
  if (delayMaxInput) delayMaxInput.value = settings.delayMax || 15;
  if (characterDescriptionInput) characterDescriptionInput.value = settings.characterDescription || '';
  if (sceneDescriptionInput) sceneDescriptionInput.value = settings.sceneDescription || '';
}
