import BookmarksPresenter from "./bookmarks-presenter.js";
import Auth from "../../utils/auth.js";

export default class BookmarksPage {
  #presenter;

  constructor() {
    this.#presenter = null;
  }

  async render() {
    return `
      <section class="container">
        <div class="page-header">
          <button id="back-button" class="back-button">← Back</button>
          <h1>My Bookmarks</h1>
          <button id="clear-bookmarks-button" class="clear-button" title="Clear all bookmarks">
            <span class="clear-icon">🗑️</span>
            <span class="clear-text">Clear All</span>
          </button>
        </div>
        <div id="bookmarks-container"></div>
      </section>
    `;
  }

  async afterRender() {
    // Add back button functionality
    const backButton = document.getElementById("back-button");
    if (backButton) {
      backButton.addEventListener("click", () => {
        window.history.back();
      });
    }

    // Add clear bookmarks button functionality
    const clearButton = document.getElementById("clear-bookmarks-button");
    if (clearButton) {
      clearButton.addEventListener("click", () => {
        this.showClearConfirmation();
      });
    }

    const token = Auth.getToken();

    if (!token) {
      this.showError("Anda belum login. Silakan login terlebih dahulu.");
      setTimeout(() => {
        window.location.hash = "#/login";
      }, 2000);
      return;
    }

    this.#presenter = new BookmarksPresenter({
      view: this
    });

    await this.#presenter.loadBookmarks();
  }

  displayBookmarks(bookmarks) {
    const container = document.getElementById("bookmarks-container");
    
    if (!bookmarks || bookmarks.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📖</div>
          <h3>No Bookmarks Yet</h3>
          <p>Start bookmarking your favorite stories to see them here.</p>
          <a href="#/home" class="primary-button">Browse Stories</a>
        </div>
      `;
      return;
    }

    const bookmarksHTML = bookmarks.map(story => `
      <article class="bookmark-card" data-story-id="${story.id}">
        <div class="bookmark-card__image-container">
          <img 
            class="bookmark-card__image" 
            src="${story.photoUrl}" 
            alt="${story.name}'s story"
            loading="lazy"
          >
        </div>
        <div class="bookmark-card__content">
          <div class="bookmark-card__header">
            <h3 class="bookmark-card__author">${story.name}</h3>
            <button 
              class="remove-bookmark-button" 
              data-story-id="${story.id}"
              title="Remove bookmark"
            >
              ✕
            </button>
          </div>
          <p class="bookmark-card__description">${this.truncateText(story.description, 150)}</p>
          <div class="bookmark-card__footer">
            <span class="bookmark-card__date">${new Date(story.createdAt).toLocaleDateString()}</span>
            <a href="#/detail/${story.id}" class="view-story-link">View Story</a>
          </div>
        </div>
      </article>
    `).join('');

    container.innerHTML = `
      <div class="bookmarks-grid">
        ${bookmarksHTML}
      </div>
    `;

    // Add event listeners for remove bookmark buttons
    this.attachRemoveBookmarkListeners();
  }

  attachRemoveBookmarkListeners() {
    const removeButtons = document.querySelectorAll('.remove-bookmark-button');
    removeButtons.forEach(button => {
      button.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const storyId = button.dataset.storyId;
        await this.removeBookmark(storyId);
      });
    });
  }

  async removeBookmark(storyId) {
    try {
      await this.#presenter.removeBookmark(storyId);
      this.showToast('Bookmark removed successfully!', 'success');
      
      // Remove the bookmark card from UI with animation
      const bookmarkCard = document.querySelector(`[data-story-id="${storyId}"]`);
      if (bookmarkCard) {
        bookmarkCard.style.transform = 'translateX(-100%)';
        bookmarkCard.style.opacity = '0';
        setTimeout(() => {
          bookmarkCard.remove();
          
          // Check if any bookmarks remain
          const remainingBookmarks = document.querySelectorAll('.bookmark-card');
          if (remainingBookmarks.length === 0) {
            this.displayBookmarks([]);
          }
        }, 300);
      }
    } catch (error) {
      console.error('Error removing bookmark:', error);
      this.showToast('Failed to remove bookmark. Please try again.', 'error');
    }
  }

  showClearConfirmation() {
    const confirmation = document.createElement('div');
    confirmation.className = 'confirmation-overlay';
    confirmation.innerHTML = `
      <div class="confirmation-dialog">
        <div class="confirmation-icon">⚠️</div>
        <h3>Clear All Bookmarks?</h3>
        <p>This action cannot be undone. All your bookmarked stories will be removed.</p>
        <div class="confirmation-buttons">
          <button class="cancel-button">Cancel</button>
          <button class="confirm-button">Clear All</button>
        </div>
      </div>
    `;

    document.body.appendChild(confirmation);

    // Add event listeners
    const cancelButton = confirmation.querySelector('.cancel-button');
    const confirmButton = confirmation.querySelector('.confirm-button');

    cancelButton.addEventListener('click', () => {
      confirmation.remove();
    });

    confirmButton.addEventListener('click', async () => {
      confirmation.remove();
      await this.clearAllBookmarks();
    });

    // Close on overlay click
    confirmation.addEventListener('click', (e) => {
      if (e.target === confirmation) {
        confirmation.remove();
      }
    });
  }

  async clearAllBookmarks() {
    try {
      await this.#presenter.clearAllBookmarks();
      this.showToast('All bookmarks cleared successfully!', 'success');
      this.displayBookmarks([]);
    } catch (error) {
      console.error('Error clearing bookmarks:', error);
      this.showToast('Failed to clear bookmarks. Please try again.', 'error');
    }
  }

  showLoading() {
    const container = document.getElementById("bookmarks-container");
    container.innerHTML = `
      <div class="loading-indicator">
        <div class="loading-spinner"></div>
        <p>Loading your bookmarks...</p>
      </div>
    `;
  }

  hideLoading() {
    const loadingIndicator = document.querySelector(".loading-indicator");
    if (loadingIndicator) {
      loadingIndicator.remove();
    }
  }

  showError(message) {
    const container = document.getElementById("bookmarks-container");
    container.innerHTML = `
      <div class="error-state">
        <div class="error-icon">❌</div>
        <h3>Error</h3>
        <p>${message}</p>
        <button onclick="location.reload()" class="retry-button">Try Again</button>
      </div>
    `;
  }

  truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  }

  showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Add toast to body
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }
}
