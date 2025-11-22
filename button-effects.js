/**
 * Advanced Button Effects
 * Ripple effect, enhanced loading states, button groups, FAB
 */

// ============================================
// RIPPLE EFFECT
// ============================================

/**
 * Tạo ripple effect khi click button
 * @param {Event} event - Click event
 * @param {HTMLElement} button - Button element
 */
function createRipple(event, button) {
  // Chỉ tạo ripple nếu button có class 'ripple'
  if (!button.classList.contains('ripple')) {
    return;
  }

  // Xóa ripple cũ nếu có
  const existingRipple = button.querySelector('.ripple-effect');
  if (existingRipple) {
    existingRipple.remove();
  }

  // Lấy vị trí click
  const rect = button.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // Tạo ripple element
  const ripple = document.createElement('span');
  ripple.classList.add('ripple-effect');
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';

  // Thêm vào button
  button.appendChild(ripple);

  // Xóa sau animation
  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.parentNode.removeChild(ripple);
    }
  }, 600);
}

/**
 * Thêm ripple effect cho tất cả buttons có class 'ripple'
 */
function initRippleEffects() {
  const buttons = document.querySelectorAll('.btn-glass.ripple, .btn.ripple');
  
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      createRipple(e, button);
    });
  });
}

// ============================================
// ENHANCED LOADING STATES
// ============================================

/**
 * Set loading state với animated dots
 * @param {HTMLElement} button - Button element
 * @param {boolean} isLoading - Loading state
 * @param {string} type - 'spinner' | 'dots' | 'dots-alt'
 */
function setButtonLoadingAdvanced(button, isLoading, type = 'spinner') {
  if (!button) return;

  // Remove existing loading classes
  button.classList.remove('loading', 'loading-dots', 'loading-dots-alt');

  if (isLoading) {
    // Store original text
    if (!button.dataset.originalText) {
      button.dataset.originalText = button.textContent;
    }

    // Add appropriate loading class
    if (type === 'dots') {
      button.classList.add('loading-dots');
    } else if (type === 'dots-alt') {
      button.classList.add('loading-dots-alt');
    } else {
      button.classList.add('loading');
    }

    button.disabled = true;
  } else {
    // Remove loading classes
    button.classList.remove('loading', 'loading-dots', 'loading-dots-alt');
    button.disabled = false;

    // Restore original text
    if (button.dataset.originalText) {
      button.textContent = button.dataset.originalText;
      delete button.dataset.originalText;
    }
  }
}

// ============================================
// BUTTON GROUPS
// ============================================

/**
 * Tạo button group (segmented buttons)
 * @param {HTMLElement} container - Container element
 * @param {Array} buttons - Array of button configs
 * @param {Object} options - Options
 */
function createButtonGroup(container, buttons, options = {}) {
  const {
    variant = 'primary',
    vertical = false,
    multiple = false,
    onSelect = null
  } = options;

  // Create group element
  const group = document.createElement('div');
  group.className = `btn-group ${vertical ? 'btn-group-vertical' : ''} btn-group-${variant}`;

  // Create buttons
  buttons.forEach((btnConfig, index) => {
    const button = document.createElement('button');
    button.className = `btn-glass btn-glass-${btnConfig.variant || 'secondary'} ripple`;
    button.textContent = btnConfig.text;
    button.dataset.value = btnConfig.value || index;
    
    if (btnConfig.icon) {
      const icon = document.createElement('span');
      icon.className = 'icon';
      icon.textContent = btnConfig.icon;
      button.insertBefore(icon, button.firstChild);
    }

    if (btnConfig.active) {
      button.classList.add('active');
    }

    // Click handler
    button.addEventListener('click', () => {
      if (!multiple) {
        // Single selection - remove active from all
        group.querySelectorAll('button').forEach(btn => {
          btn.classList.remove('active');
        });
      }
      
      // Toggle active
      button.classList.toggle('active');
      
      // Callback
      if (onSelect) {
        onSelect(button.dataset.value, button.classList.contains('active'));
      }
    });

    group.appendChild(button);
  });

  container.appendChild(group);
  return group;
}

/**
 * Get selected values from button group
 * @param {HTMLElement} group - Button group element
 * @returns {Array} Selected values
 */
function getButtonGroupSelection(group) {
  const selected = [];
  group.querySelectorAll('button.active').forEach(btn => {
    selected.push(btn.dataset.value);
  });
  return selected;
}

// ============================================
// FLOATING ACTION BUTTON (FAB)
// ============================================

/**
 * Tạo Floating Action Button
 * @param {Object} config - FAB configuration
 * @returns {HTMLElement} FAB element
 */
function createFAB(config) {
  const {
    icon = '➕',
    text = null,
    position = 'bottom-right',
    size = 'normal',
    variant = 'primary',
    onClick = null,
    tooltip = null
  } = config;

  // Create FAB
  const fab = document.createElement('button');
  fab.className = `fab fab-glass fab-glass-${variant} fab-${position} ripple`;
  
  if (size !== 'normal') {
    fab.classList.add(`fab-${size}`);
  }

  if (text) {
    fab.classList.add('fab-extended');
  }

  // Icon
  const iconEl = document.createElement('span');
  iconEl.className = 'icon';
  iconEl.textContent = icon;
  fab.appendChild(iconEl);

  // Text (if extended)
  if (text) {
    const textEl = document.createTextNode(text);
    fab.appendChild(textEl);
  }

  // Tooltip
  if (tooltip) {
    fab.setAttribute('title', tooltip);
    fab.setAttribute('aria-label', tooltip);
  }

  // Click handler
  if (onClick) {
    fab.addEventListener('click', onClick);
  }

  // Add to body
  document.body.appendChild(fab);

  return fab;
}

/**
 * Remove FAB
 * @param {HTMLElement} fab - FAB element
 */
function removeFAB(fab) {
  if (fab && fab.parentNode) {
    fab.parentNode.removeChild(fab);
  }
}

// ============================================
// INITIALIZATION
// ============================================

// Initialize ripple effects when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRippleEffects);
} else {
  initRippleEffects();
}

// Re-initialize when new buttons are added
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1) { // Element node
        const newButtons = node.querySelectorAll?.('.btn-glass.ripple, .btn.ripple') || [];
        newButtons.forEach(button => {
          button.addEventListener('click', (e) => {
            createRipple(e, button);
          });
        });
      }
    });
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createRipple,
    initRippleEffects,
    setButtonLoadingAdvanced,
    createButtonGroup,
    getButtonGroupSelection,
    createFAB,
    removeFAB
  };
}

