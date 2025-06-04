/**
 * Focus Manager Utility for Enhanced Accessibility
 * Manages focus states, skip links, and keyboard navigation
 */

class FocusManager {
  constructor() {
    this.focusHistory = [];
    this.init();
  }

  init() {
    this.setupFocusVisiblePolyfill();
    this.setupKeyboardNavigation();
    this.setupSkipLinks();
  }

  /**
   * Setup focus-visible polyfill for better focus indicators
   */
  setupFocusVisiblePolyfill() {
    // Add focus-visible polyfill behavior
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }

  /**
   * Setup keyboard navigation helpers
   */
  setupKeyboardNavigation() {
    // Handle escape key to close modals/drawers
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.handleEscapeKey();
      }
    });

    // Handle arrow key navigation for grid layouts
    document.addEventListener('keydown', (e) => {
      const target = e.target;
      if (target.classList.contains('story-detail') || target.closest('.story-list')) {
        this.handleArrowNavigation(e);
      }
    });
  }

  /**
   * Setup skip links functionality
   */
  setupSkipLinks() {
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = skipLink.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
          target.focus();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  /**
   * Handle escape key press
   */
  handleEscapeKey() {
    // Close any open modals
    const openModal = document.querySelector('.modal[style*="block"]');
    if (openModal) {
      openModal.style.display = 'none';
      this.restoreFocus();
      return;
    }

    // Close navigation drawer
    const drawer = document.querySelector('.navigation-drawer.open');
    if (drawer) {
      drawer.classList.remove('open');
      const drawerButton = document.getElementById('drawer-button');
      if (drawerButton) {
        drawerButton.setAttribute('aria-expanded', 'false');
        drawerButton.focus();
      }
      return;
    }
  }

  /**
   * Handle arrow key navigation in grid/list layouts
   */
  handleArrowNavigation(e) {
    const currentElement = e.target;
    const container = currentElement.closest('.story-list');
    
    if (!container) return;

    const items = Array.from(container.querySelectorAll('.story-detail[tabindex="0"]'));
    const currentIndex = items.indexOf(currentElement);
    
    let targetIndex = currentIndex;

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        targetIndex = Math.min(currentIndex + 1, items.length - 1);
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        targetIndex = Math.max(currentIndex - 1, 0);
        break;
      case 'Home':
        e.preventDefault();
        targetIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        targetIndex = items.length - 1;
        break;
      default:
        return;
    }

    if (targetIndex !== currentIndex && items[targetIndex]) {
      items[targetIndex].focus();
    }
  }

  /**
   * Save current focus for later restoration
   */
  saveFocus() {
    const activeElement = document.activeElement;
    if (activeElement && activeElement !== document.body) {
      this.focusHistory.push(activeElement);
    }
  }

  /**
   * Restore previously saved focus
   */
  restoreFocus() {
    const lastFocused = this.focusHistory.pop();
    if (lastFocused && document.contains(lastFocused)) {
      lastFocused.focus();
    }
  }

  /**
   * Set focus to main content area
   */
  focusMainContent() {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /**
   * Announce message to screen readers
   */
  announce(message, priority = 'polite') {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  }

  /**
   * Trap focus within a container (useful for modals)
   */
  trapFocus(container) {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    container.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }
    });

    // Focus first element
    if (firstFocusable) {
      firstFocusable.focus();
    }
  }

  /**
   * Check if an element is visible on screen
   */
  isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  /**
   * Scroll element into view if not visible
   */
  ensureVisible(element) {
    if (!this.isElementVisible(element)) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }
}

// Create and export a singleton instance
const focusManager = new FocusManager();
export default focusManager;