import { generateStoryItemTemplate } from "../templates";
import HomePresenter from "./home-presenter";
import { getStories } from "../../data/api";
import Auth from "../../utils/auth";

export default class HomePage {
  #presenter;

  async render() {
    return `
      <section class="container">
        <header class="page-header">
          <h1 id="page-title">📚 Stories</h1>
          <p class="page-description">Jelajahi cerita-cerita menarik yang telah dibagikan oleh pengguna StoryApp</p>
        </header>
      </section>
      <div id="list-stories" role="main" aria-labelledby="page-title" aria-live="polite"></div>
    `;
  }


  async afterRender() {
    const token = Auth.getToken();
    
    if (!token) {
      this.showError("Anda belum login. Silakan login terlebih dahulu.");
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        window.location.hash = '#/login';
      }, 2000);
      
      return;
    }
    
    this.showLoading();
    
    this.#presenter = new HomePresenter({
      model: getStories(token, 1, 10),
      view: this,
    });
    
    await this.#presenter.showStories();
  }

  showStories(stories) {
    if (!stories || !stories.listStory) {
      this.showError("Tidak ada cerita yang tersedia saat ini");
      return;
    }

    const html = stories.listStory.reduce(
      (accumulator, story) =>
        accumulator.concat(
          generateStoryItemTemplate({
            username: story.name,
            image: story.photoUrl,
            description: story.description,
            id: story.id,
            createdAt: story.createdAt
          })
        ),
      ""
    );

    document.getElementById("list-stories").innerHTML = `
      <section class="stories-section" role="region" aria-labelledby="stories-heading">
        <h2 id="stories-heading" class="sr-only">Daftar Cerita</h2>
        <ul class="story-list" role="list" aria-label="Daftar ${stories.listStory.length} cerita">
          ${html}
        </ul>
      </section>`;
      
    // Add view transition name to each story item for smoother transitions
    const storyItems = document.querySelectorAll('.story-detail');
    storyItems.forEach((item, index) => {
      const storyId = item.dataset.id;
      if (storyId) {
        item.style.viewTransitionName = `story-${storyId}`;
        // Add proper role and aria attributes
        item.setAttribute('role', 'listitem');
        item.setAttribute('tabindex', '0');
        item.setAttribute('aria-label', `Baca cerita ${item.querySelector('.story-title')?.textContent || 'tanpa judul'}`);
      }
    });
      
    // Add click event listeners to each story item
    this.addStoryItemClickListeners();
    
    // Announce to screen readers
    const announcement = `${stories.listStory.length} cerita berhasil dimuat`;
    this.announceToScreenReader(announcement);
  }

  showError(message) {
    document.getElementById("list-stories").innerHTML = `
      <div class="error-container" role="alert" aria-live="assertive">
        <p class="error-message">⚠️ ${message}</p>
      </div>`;
  }
  
  showLoading() {
    document.getElementById("list-stories").innerHTML = `
      <div class="loading-indicator" role="status" aria-live="polite" aria-label="Memuat cerita">
        <span class="sr-only">Sedang memuat cerita...</span>
        <div class="loading-spinner" aria-hidden="true"></div>
        <p>Memuat cerita...</p>
      </div>`;
  }

  hideLoading() {
    const loadingIndicator = document.querySelector(".loading-indicator");
    if (loadingIndicator) {
      loadingIndicator.remove();
    }
  }
  
  announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove the announcement after a brief delay
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
  
  addStoryItemClickListeners() {
    const storyItems = document.querySelectorAll('.story-detail');
    
    storyItems.forEach(item => {
      // Handle click events
      item.addEventListener('click', () => {
        this.navigateToStory(item);
      });
      
      // Handle keyboard navigation
      item.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          this.navigateToStory(item);
        }
      });
      
      // Handle focus for better accessibility
      item.addEventListener('focus', () => {
        item.classList.add('focused');
      });
      
      item.addEventListener('blur', () => {
        item.classList.remove('focused');
      });
    });
  }
  
  navigateToStory(item) {
    const storyId = item.dataset.id;
    if (!storyId) {
      console.error('Story ID not found');
      return;
    }
    
    // Announce navigation to screen readers
    this.announceToScreenReader(`Membuka detail cerita`);
    
    // Navigate to the detail page with the story ID
    window.location.hash = `#/detail/${storyId}`;
  }
}
