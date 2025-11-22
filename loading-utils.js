/**
 * Loading States & Toast Utilities
 * Hệ thống quản lý loading states và toast notifications
 */

// ============================================
// TOAST NOTIFICATION SYSTEM
// ============================================

class ToastManager {
  constructor() {
    this.container = null;
    this.toasts = new Map();
    this.maxToasts = 5;
    this.defaultDuration = 4000; // 4 seconds
  }

  init() {
    this.container = document.getElementById('toastContainer');
    if (!this.container) {
      // Create container if it doesn't exist
      this.container = document.createElement('div');
      this.container.id = 'toastContainer';
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
  }

  /**
   * Hiển thị toast notification
   * @param {string} type - 'success', 'error', 'warning', 'info'
   * @param {string} message - Nội dung thông báo
   * @param {string} title - Tiêu đề (optional)
   * @param {number} duration - Thời gian hiển thị (ms, 0 = không tự đóng)
   * @returns {string} toastId
   */
  show(type, message, title = null, duration = this.defaultDuration) {
    if (!this.container) this.init();

    const toastId = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Remove oldest toast if at max
    if (this.toasts.size >= this.maxToasts) {
      const firstToast = this.toasts.values().next().value;
      if (firstToast) {
        this.remove(firstToast.id);
      }
    }

    const toast = document.createElement('div');
    toast.id = toastId;
    toast.className = `toast ${type}`;
    
    // Icons
    const icons = {
      success: '✓',
      error: '✗',
      warning: '⚠',
      info: 'ℹ'
    };

    // Set animation duration for progress bar
    if (duration > 0) {
      toast.style.setProperty('--toast-duration', `${duration}ms`);
    }

    toast.innerHTML = `
      <div class="toast-icon">${icons[type] || icons.info}</div>
      <div class="toast-content">
        ${title ? `<div class="toast-title">${title}</div>` : ''}
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" aria-label="Đóng">×</button>
    `;

    // Close button handler
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
      this.remove(toastId);
    });

    // Auto remove after duration
    let timeoutId = null;
    if (duration > 0) {
      timeoutId = setTimeout(() => {
        this.remove(toastId);
      }, duration);
    }

    // Store toast info
    this.toasts.set(toastId, {
      element: toast,
      timeoutId: timeoutId
    });

    // Add to container
    this.container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('fade-in');
    });

    return toastId;
  }

  /**
   * Xóa toast
   * @param {string} toastId 
   */
  remove(toastId) {
    const toastInfo = this.toasts.get(toastId);
    if (!toastInfo) return;

    const { element, timeoutId } = toastInfo;

    // Clear timeout if exists
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Add removing class for animation
    element.classList.add('removing');

    // Remove from DOM after animation
    setTimeout(() => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
      this.toasts.delete(toastId);
    }, 300);
  }

  /**
   * Xóa tất cả toasts
   */
  clear() {
    this.toasts.forEach((_, toastId) => {
      this.remove(toastId);
    });
  }

  // Convenience methods
  success(message, title = null, duration = this.defaultDuration) {
    return this.show('success', message, title, duration);
  }

  error(message, title = null, duration = this.defaultDuration * 1.5) {
    return this.show('error', message, title, duration);
  }

  warning(message, title = null, duration = this.defaultDuration) {
    return this.show('warning', message, title, duration);
  }

  info(message, title = null, duration = this.defaultDuration) {
    return this.show('info', message, title, duration);
  }
}

// Global toast manager instance
const toastManager = new ToastManager();

// ============================================
// LOADING STATES UTILITIES
// ============================================

/**
 * Set loading state cho button
 * @param {HTMLElement} button 
 * @param {boolean} isLoading 
 */
function setButtonLoading(button, isLoading) {
  if (!button) return;

  if (isLoading) {
    button.classList.add('loading');
    button.disabled = true;
    // Store original text
    if (!button.dataset.originalText) {
      button.dataset.originalText = button.textContent;
    }
  } else {
    button.classList.remove('loading');
    button.disabled = false;
    // Restore original text
    if (button.dataset.originalText) {
      button.textContent = button.dataset.originalText;
      delete button.dataset.originalText;
    }
  }
}

/**
 * Set loading state cho input
 * @param {HTMLElement} input 
 * @param {boolean} isLoading 
 */
function setInputLoading(input, isLoading) {
  if (!input) return;

  const container = input.closest('.section') || input.parentElement;
  
  if (isLoading) {
    input.classList.add('input-loading');
    if (container) {
      container.classList.add('section-loading');
    }
  } else {
    input.classList.remove('input-loading');
    if (container) {
      container.classList.remove('section-loading');
    }
  }
}

/**
 * Set loading state cho section
 * @param {HTMLElement} section 
 * @param {boolean} isLoading 
 */
function setSectionLoading(section, isLoading) {
  if (!section) return;

  if (isLoading) {
    section.classList.add('section-loading');
  } else {
    section.classList.remove('section-loading');
  }
}

/**
 * Hiển thị spinner inline
 * @param {string} type - 'spinner', 'dots', 'pulse', 'bars'
 * @param {string} size - 'sm', '', 'lg'
 * @returns {HTMLElement}
 */
function createSpinner(type = 'spinner', size = '') {
  const container = document.createElement('div');
  container.className = 'spinner-container';

  let spinner;
  
  switch (type) {
    case 'dots':
      spinner = document.createElement('div');
      spinner.className = 'spinner-dots';
      spinner.innerHTML = '<span></span><span></span><span></span>';
      break;
    
    case 'pulse':
      spinner = document.createElement('div');
      spinner.className = 'spinner-pulse';
      break;
    
    case 'bars':
      spinner = document.createElement('div');
      spinner.className = 'spinner-bars';
      spinner.innerHTML = '<span></span><span></span><span></span><span></span>';
      break;
    
    default: // 'spinner'
      spinner = document.createElement('div');
      spinner.className = `spinner ${size ? `spinner-${size}` : ''}`;
      break;
  }

  container.appendChild(spinner);
  return container;
}

/**
 * Wrapper function để thực thi async với loading state
 * @param {HTMLElement} button - Button element
 * @param {Function} asyncFn - Async function to execute
 * @param {Object} options - Options
 * @returns {Promise}
 */
async function withLoading(button, asyncFn, options = {}) {
  const {
    loadingText = null,
    successToast = null,
    errorToast = null,
    onSuccess = null,
    onError = null
  } = options;

  try {
    // Set loading state
    setButtonLoading(button, true);
    if (loadingText && button) {
      button.textContent = loadingText;
    }

    // Execute async function
    const result = await asyncFn();

    // Success handling
    if (successToast) {
      toastManager.success(successToast);
    }
    if (onSuccess) {
      onSuccess(result);
    }

    return result;
  } catch (error) {
    // Error handling
    const errorMessage = error.message || 'Đã xảy ra lỗi';
    if (errorToast) {
      toastManager.error(errorToast);
    } else {
      toastManager.error(errorMessage);
    }
    if (onError) {
      onError(error);
    }
    throw error;
  } finally {
    // Always remove loading state
    setButtonLoading(button, false);
  }
}

/**
 * Smooth show/hide element
 * @param {HTMLElement} element 
 * @param {boolean} show 
 * @param {string} animation - 'fade', 'slide', 'scale'
 */
function toggleElement(element, show, animation = 'fade') {
  if (!element) return;

  if (show) {
    element.style.display = '';
    element.classList.remove('hidden', 'invisible');
    requestAnimationFrame(() => {
      element.classList.add(`${animation}-in`);
    });
  } else {
    element.classList.add(`${animation}-out`);
    setTimeout(() => {
      element.style.display = 'none';
      element.classList.remove(`${animation}-in`, `${animation}-out`);
    }, 300);
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    toastManager,
    setButtonLoading,
    setInputLoading,
    setSectionLoading,
    createSpinner,
    withLoading,
    toggleElement
  };
}

