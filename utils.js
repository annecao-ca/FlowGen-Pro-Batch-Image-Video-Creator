// Utility functions

/**
 * Parse prompt list from text
 * @param {string} text - Text containing prompts (one per line)
 * @returns {string[]} Array of prompts
 */
function parsePrompts(text) {
  if (!text || !text.trim()) {
    return [];
  }
  
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);
}

/**
 * Parse prompts from file
 * @param {File} file - File object
 * @returns {Promise<string[]>} Array of prompts
 */
function parsePromptsFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const prompts = parsePrompts(text);
        resolve(prompts);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsText(file);
  });
}

/**
 * Generate random delay between min and max
 * @param {number} min - Minimum delay in seconds
 * @param {number} max - Maximum delay in seconds
 * @returns {number} Random delay in milliseconds
 */
function getRandomDelay(min, max) {
  const delaySeconds = Math.floor(Math.random() * (max - min + 1)) + min;
  return delaySeconds * 1000;
}

/**
 * Format time duration
 * @param {number} milliseconds - Duration in milliseconds
 * @returns {string} Formatted time string
 */
function formatDuration(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
}

/**
 * Generate filename for download
 * @param {string} prompt - Prompt text
 * @param {number} index - Prompt index
 * @param {string} type - 'image' or 'video'
 * @returns {string} Filename
 */
function generateFilename(prompt, index, type) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const sanitizedPrompt = prompt
    .slice(0, 50)
    .replace(/[^a-z0-9]/gi, '_')
    .toLowerCase();
  const extension = type === 'image' ? 'png' : 'mp4';
  
  return `flow_${type}_${index}_${sanitizedPrompt}_${timestamp}.${extension}`;
}

/**
 * Validate prompt
 * @param {string} prompt - Prompt text
 * @returns {object} Validation result
 */
function validatePrompt(prompt) {
  if (!prompt || prompt.trim().length === 0) {
    return { valid: false, error: 'Prompt cannot be empty' };
  }
  
  if (prompt.length > 1000) {
    return { valid: false, error: 'Prompt is too long (max 1000 characters)' };
  }
  
  return { valid: true };
}

/**
 * Get current timestamp string
 * @returns {string} Timestamp string
 */
function getTimestamp() {
  const now = new Date();
  return now.toLocaleTimeString();
}

/**
 * Sleep/delay function
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} Promise that resolves after delay
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
