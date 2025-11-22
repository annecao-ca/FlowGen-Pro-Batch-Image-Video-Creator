/**
 * Constants Configuration
 * Tập trung tất cả magic numbers và configuration values
 */

const CONSTANTS = {
  // Timeouts (milliseconds)
  TIMEOUTS: {
    CONTENT_SCRIPT_INJECT: 5000,
    CONTENT_SCRIPT_VERIFY: 3000,
    ELEMENT_WAIT: 10000,
    MEDIA_WAIT_IMAGE: 180000,      // 3 minutes for images
    MEDIA_WAIT_VIDEO: 300000,      // 5 minutes for videos
    NO_PROGRESS_TIMEOUT: 120000,   // 2 minutes without progress
    RETRY_DELAY: 5000,             // 5 seconds between retries
    TOAST_DURATION: 4000,          // 4 seconds default toast
    TOAST_ERROR_DURATION: 6000     // 6 seconds for errors
  },

  // Delays (milliseconds)
  DELAYS: {
    MIN_DEFAULT: 2000,             // 2 seconds minimum
    MAX_DEFAULT: 5000,             // 5 seconds maximum
    BETWEEN_RETRIES: 100,          // 100ms between retry attempts
    AFTER_INJECT: 150,             // 150ms after script injection
    AFTER_CLICK: 200,               // 200ms after button click
    AFTER_FILL: 1000,              // 1 second after filling input
    AFTER_SCROLL: 500,              // 500ms after scroll
    MENU_WAIT: 1500,               // 1.5 seconds for menu to appear
    HOVER_WAIT: 500                // 500ms for hover effects
  },

  // Retry counts
  RETRIES: {
    CONTENT_SCRIPT_PING: 3,
    INPUT_FIND: 5,
    BUTTON_FIND: 5,
    PROCESSING_VERIFY: 3,
    BUTTON_ENABLE_WAIT: 3
  },

  // Media tracking limits
  MEDIA: {
    MAX_TRACKED_SOURCES: 100,       // Maximum media sources to track
    MIN_IMAGE_SIZE: 200,           // Minimum image dimensions (px)
    MIN_VIDEO_DURATION: 0.5,       // Minimum video duration (seconds)
    MIN_CANVAS_SIZE: 100,          // Minimum canvas size (px)
    MIN_PREVIEW_SIZE: 300          // Minimum preview element size (px)
  },

  // Input validation
  VALIDATION: {
    PROMPT_MAX_LENGTH: 1000,
    PROMPT_MIN_LENGTH: 1,
    CHARACTER_DESC_MAX_LENGTH: 500,
    SCENE_DESC_MAX_LENGTH: 500,
    REPEAT_COUNT_MIN: 1,
    REPEAT_COUNT_MAX: 10,
    START_INDEX_MIN: 1,
    DELAY_MIN_SECONDS: 5,
    DELAY_MAX_SECONDS: 300
  },

  // UI limits
  UI: {
    MAX_TOASTS: 5,
    MAX_LOG_ENTRIES: 1000,          // Maximum log entries to keep
    PROGRESS_UPDATE_INTERVAL: 1000  // Update progress every 1 second
  },

  // Selector priorities (for scoring)
  SELECTOR_SCORES: {
    TEXTAREA_BASE: 10,
    SIZE_BONUS_MAX: 5,
    PLACEHOLDER_MATCH: 20,
    ARIA_LABEL_MATCH: 20,
    ID_MATCH: 10,
    CLASS_MATCH: 10,
    CONTENTEDITABLE_TEXTBOX: 15,
    BUTTON_NEAR_INPUT: 25,
    BUTTON_HAS_ARROW: 15,
    BUTTON_PROMINENT: 10,
    BUTTON_TYPE_ACTION: 40,
    BUTTON_ACTION_TERM: 30
  },

  // Button finding thresholds
  BUTTON: {
    MIN_SCORE_TO_USE: 30,
    MIN_SCORE_RELIABLE: 50,
    MIN_HEIGHT: 20,
    MIN_WIDTH: 50,
    PROMINENT_HEIGHT: 40,
    PROMINENT_WIDTH: 100,
    NEAR_INPUT_DISTANCE: 200       // pixels
  },

  // Check intervals
  INTERVALS: {
    MEDIA_CHECK: 1000,             // Check media every 1 second
    PROGRESS_LOG: 15000,           // Log progress every 15 seconds
    STATUS_UPDATE: 30000           // Update status every 30 seconds
  },

  // File extensions
  FILE_EXTENSIONS: {
    IMAGE: 'png',
    VIDEO: 'mp4',
    TEXT: 'txt'
  },

  // Notification priorities
  NOTIFICATION_PRIORITY: {
    ERROR: 2,
    SUCCESS: 1,
    WARNING: 0,
    INFO: 0
  },

  // Badge colors
  BADGE_COLORS: {
    RUNNING: '#06b6d4',            // Cyan
    PAUSED: '#f59e0b',             // Orange
    COMPLETED: '#10b981',          // Green
    ERROR: '#ef4444'               // Red
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONSTANTS;
}

