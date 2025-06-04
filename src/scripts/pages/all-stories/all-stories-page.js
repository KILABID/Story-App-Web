import { getStories } from "../../data/api.js";
import Auth from "../../utils/auth.js";
import Map from "../../utils/map.js";
import AllStoriesPresenter from "./all-stories-presenter.js";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../../styles/map.css";
import "../../../styles/map-responsive.css";

export default class AllStories {
  #map = null;
  #stories = [];
  #presenter = null;
  #markers = [];

  async render() {
    return `
      <section class="container">
        <header class="page-header">
          <h1 id="all-stories-title">🗺️ All Stories Map</h1>
          <p class="page-description">Jelajahi semua cerita pengguna di peta interaktif dan lihat lokasi tempat cerita dibagikan</p>
        </header>
        
        <div class="map-filter-controls" role="toolbar" aria-label="Kontrol peta">
          <button 
            id="refresh-map-btn" 
            class="map-control-btn"
            aria-label="Muat ulang peta dan data cerita"
            title="Muat ulang peta"
          >
            <span aria-hidden="true">🔄</span> Refresh Map
          </button>
        </div>
        
        <div class="all-stories-map-container">
          <div 
            id="all-stories-map" 
            class="all-stories-map"
            role="application"
            aria-label="Peta interaktif lokasi cerita"
            aria-describedby="map-description"
            tabindex="0"
          >
            <div id="map-description" class="sr-only">
              Peta interaktif yang menampilkan lokasi-lokasi di mana cerita telah dibagikan. 
              Gunakan tombol panah atau mouse untuk menavigasi peta.
            </div>
            <div class="map-loading" role="status" aria-live="polite">
              <div class="loading-spinner" aria-hidden="true"></div>
              <p>Memuat peta dan lokasi cerita...</p>
            </div>
          </div>
        </div>
        
        <div class="stories-list-container">
          <header>
            <h2 id="stories-list-title">📋 Daftar Cerita</h2>
          </header>
          <div 
            id="stories-list" 
            class="stories-container"
            role="region"
            aria-labelledby="stories-list-title"
            aria-live="polite"
          >
            <div class="loading-spinner" aria-hidden="true"></div>
            <span class="sr-only">Memuat daftar cerita...</span>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new AllStoriesPresenter({
      view: this,
    });

    // Get auth token
    const token = Auth.getToken();

    if (!token) {
      this.showAuthError();
      return;
    }

    // Wait for DOM to be fully ready before initializing map
    await this.#waitForElement("#all-stories-map");
    
    // Add a small delay to ensure view transition is complete
    setTimeout(async () => {
      try {
        // Initialize map only if element exists and is visible
        const mapElement = document.getElementById("all-stories-map");
        if (!mapElement || mapElement.offsetWidth === 0) {
          console.warn("Map element not ready, retrying...");
          setTimeout(() => this.#initializeMap(token), 500);
          return;
        }

        await this.#initializeMap(token);
      } catch (error) {
        console.error("Error in afterRender:", error);
        this.showMapError("Failed to initialize page. Please refresh.");
      }
    }, 300);
  }

  async #waitForElement(selector, timeout = 3000) {
    return new Promise((resolve, reject) => {
      const element = document.querySelector(selector);
      if (element && element.offsetWidth > 0) {
        resolve(element);
        return;
      }

      const observer = new MutationObserver(() => {
        const element = document.querySelector(selector);
        if (element && element.offsetWidth > 0) {
          observer.disconnect();
          resolve(element);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      setTimeout(() => {
        observer.disconnect();
        reject(new Error(`Element ${selector} not found within ${timeout}ms`));
      }, timeout);
    });
  }

  async #initializeMap(token) {
    try {
      // Double check element exists
      const mapElement = document.getElementById("all-stories-map");
      if (!mapElement) {
        throw new Error("Map element not found");
      }

      // Clear loading state before creating map
      this.#clearMapLoading();

      this.#map = await Map.build("#all-stories-map", {
        zoom: 5,
      });

      // Load stories with location data
      await this.#presenter.getAllStories(token, 1, 50, 1);

      // Set up event listeners for map controls
      this.#setupMapControls();
    } catch (error) {
      console.error("Error initializing map:", error);
      this.showMapError("Failed to load map. Please refresh the page.");
    }
  }

  #clearMapLoading() {
    const mapElement = document.getElementById("all-stories-map");
    if (mapElement) {
      // Remove any loading content
      const loadingContent = mapElement.querySelector('.map-loading');
      if (loadingContent) {
        loadingContent.remove();
      }
      
      // Clear any existing content if no map is present
      if (!this.#map) {
        mapElement.innerHTML = '';
      }
    }
  }

  showMapError(message) {
    const mapElement = document.getElementById("all-stories-map");
    if (mapElement && !this.#map) {
      // Only show error message if no map is initialized
      mapElement.innerHTML = `<p class="map-error">${message}</p>`;
    } else if (mapElement && this.#map) {
      // If map exists, show error as overlay without destroying map
      const existingError = mapElement.querySelector('.map-error-overlay');
      if (!existingError) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'map-error-overlay';
        errorDiv.innerHTML = `<p class="map-error">${message}</p>`;
        errorDiv.style.position = 'absolute';
        errorDiv.style.top = '10px';
        errorDiv.style.left = '10px';
        errorDiv.style.right = '10px';
        errorDiv.style.zIndex = '1000';
        errorDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        errorDiv.style.padding = '10px';
        errorDiv.style.borderRadius = '4px';
        mapElement.appendChild(errorDiv);
      }
    }
  }

  #setupMapControls() {
    const refreshMapBtn = document.getElementById("refresh-map-btn");

    if (refreshMapBtn) {
      refreshMapBtn.addEventListener("click", () => {
        this.#refreshMap();
      });
    }
  }

  #refreshMap() {
    if (!this.#map || !this.#markers.length) return;

    // Remove error overlay if it exists, but don't clear map container
    const mapEl = document.getElementById("all-stories-map");
    if (mapEl) {
      const errorOverlay = mapEl.querySelector('.map-error-overlay');
      if (errorOverlay) {
        errorOverlay.remove();
      }
    }

    // Fit map to markers again
    this.fitMapToMarkers();
  }

  showAuthError() {
    const storiesListEl = document.getElementById("stories-list");
    const mapEl = document.getElementById("all-stories-map");

    if (storiesListEl) {
      storiesListEl.innerHTML = `
        <div class="auth-error">
          <p>You need to be logged in to view all stories.</p>
          <a href="#/login" class="btn-primary">Login</a>
        </div>
      `;
    }

    if (mapEl) {
      mapEl.innerHTML = `
        <div class="auth-error">
          <p>You need to be logged in to view the stories map.</p>
        </div>
      `;
    }
  }

  displayStories(stories) {
    this.#stories = stories;
    this.#markers = []; // Reset markers array
    const storiesListEl = document.getElementById("stories-list");
    const mapEl = document.getElementById("all-stories-map");

    if (!storiesListEl || !mapEl) return;

    // Clear any loading states
    this.#clearMapLoading();

    if (stories.length === 0) {
      storiesListEl.innerHTML =
        '<p class="no-stories-message">No stories found.</p>';
      // Only show error in map if map is not initialized
      if (!this.#map) {
        mapEl.innerHTML =
          '<p class="map-error">No stories available to display on map.</p>';
      }
      return;
    }

    // Don't clear map container if map is already initialized
    // Only clear if there's an error message
    if (!this.#map && mapEl.querySelector('.map-error')) {
      mapEl.innerHTML = "";
    }

    let storiesHTML = "";
    let storiesWithLocation = 0;
    let storiesWithoutLocation = 0;

    // Prepare marker data for batch processing
    const markerPoints = [];

    stories.forEach((story) => {
      const hasLocation =
        story.lat !== null &&
        story.lon !== null &&
        !isNaN(parseFloat(story.lat)) &&
        !isNaN(parseFloat(story.lon));

      storiesHTML += `
        <article class="story-item ${
          hasLocation ? "has-location" : "no-location"
        }">
          <a href="#/detail/${story.id}" class="story-item__link">
            <img 
              class="story-item__image" 
              src="${story.photoUrl}" 
              alt="${story.name}'s story" 
              loading="lazy"
            >
            <h2 class="story-item__title">${story.name}'s Story</h2>
            <div class="story-item__meta">
              <p class="story-item__date">${new Date(
                story.createdAt
              ).toLocaleDateString()}</p>
              ${
                hasLocation
                  ? `
                <div class="story-item__location">
                  <span class="location-icon">📍</span> Has location
                </div>
              `
                  : `
                <div class="story-item__no-location">
                  <span class="no-location-icon">ⓘ</span> No location data
                </div>
              `
              }
            </div>
          </a>
        </article>
      `;

      // Prepare marker data if story has location
      if (hasLocation) {
        const latitude = parseFloat(story.lat);
        const longitude = parseFloat(story.lon);

        if (!isNaN(latitude) && !isNaN(longitude)) {
          // Format date
          const createdAt = new Date(story.createdAt);
          const formattedDate = createdAt.toLocaleDateString();

          markerPoints.push({
            coordinates: [latitude, longitude],
            popupOptions: {
              content: `
                <div class="map-popup">
                  <div class="map-popup__image">
                    <img src="${story.photoUrl}" alt="${
                story.name
              }'s story" loading="lazy">
                  </div>
                  <h4>${story.name}'s Story</h4>
                  <p class="popup-date">Posted on: ${formattedDate}</p>
                  <p class="popup-coordinates">📍 ${latitude.toFixed(
                    6
                  )}, ${longitude.toFixed(6)}</p>
                  <a href="#/detail/${
                    story.id
                  }" class="popup-link">View Full Story</a>
                </div>
              `,
            },
          });

          storiesWithLocation++;
        } else {
          storiesWithoutLocation++;
        }
      } else {
        storiesWithoutLocation++;
      }
    });

    storiesListEl.innerHTML = storiesHTML;

    // Add stats above the stories list
    const statsHTML = `
      <div class="stories-stats">
        <p>Total: <strong>${stories.length} stories</strong></p>
        <p>With location: <strong>${storiesWithLocation} stories</strong></p>
        <p>Without location: <strong>${storiesWithoutLocation} stories</strong></p>
      </div>
    `;

    document
      .querySelector(".stories-list-container h2")
      .insertAdjacentHTML("afterend", statsHTML);

    // Add all markers at once for better performance
    if (markerPoints.length > 0 && this.#map) {
      this.#markers = this.#map.addMultipleMarkers(markerPoints);

      // After all markers are added, fit bounds if we have any markers
      if (this.#markers.length > 0) {
        try {
          this.fitMapToMarkers();

          // Auto open a random marker's popup for better UX
          const randomIndex = Math.floor(Math.random() * this.#markers.length);
          this.#markers[randomIndex].openPopup();
        } catch (error) {
          console.error("Error fitting map to markers:", error);
        }
      } else {
        // Don't clear map container, just show a console warning
        console.warn("No stories with location data found to display on map.");
      }
    } else if (!this.#map) {
      // Only show error message if map is not initialized yet
      mapEl.innerHTML =
        '<p class="map-error">No stories with location data found to display on map.</p>';
    } else {
      // Map exists but no marker points - just show console warning
      console.warn("No stories with location data found to display on map.");
    }
  }

  addStoryMarker(story) {
    if (!this.#map) return;

    try {
      const latitude = parseFloat(story.lat);
      const longitude = parseFloat(story.lon);

      if (isNaN(latitude) || isNaN(longitude)) return;

      // Format date
      const createdAt = new Date(story.createdAt);
      const formattedDate = createdAt.toLocaleDateString();

      const marker = this.#map.addMarker(
        [latitude, longitude],
        {},
        {
          content: `
          <div class="map-popup">
            <div class="map-popup__image">
              <img src="${story.photoUrl}" alt="${
            story.name
          }'s story" loading="lazy">
            </div>
            <h4>${story.name}'s Story</h4>
            <p class="popup-description">${this.truncateText(
              story.description,
              80
            )}</p>
            <p class="popup-date">Posted on: ${formattedDate}</p>
            <p class="popup-coordinates">📍 ${latitude.toFixed(
              6
            )}, ${longitude.toFixed(6)}</p>
            <a href="#/detail/${
              story.id
            }" class="popup-link">View Full Story</a>
          </div>
        `,
        }
      );

      // Store the marker reference for fitBounds
      this.#markers.push(marker);
    } catch (error) {
      console.error("Error adding marker for story:", error);
    }
  }

  fitMapToMarkers() {
    if (!this.#map || this.#markers.length === 0) return;

    // Check if map is still valid
    if (!this.#map.isReady()) {
      console.warn("Map is no longer valid, attempting to reinitialize...");
      this.#handleMapDestroyed();
      return;
    }

    try {
      // Use the map's fitBounds method to adjust the view
      this.#map.fitBounds(this.#markers);
    } catch (error) {
      console.error("Error fitting map to markers:", error);
      // Try to recover by reinitializing the map
      this.#handleMapDestroyed();
    }
  }

  async #handleMapDestroyed() {
    this.#map = null;
    
    const token = Auth.getToken();
    if (token) {
      try {
        setTimeout(async () => {
          await this.#initializeMap(token);
        }, 500);
      } catch (error) {
        console.error("Failed to recover map:", error);
        this.showMapError("Map was destroyed. Please refresh the page.");
      }
    }
  }

  truncateText(text, maxLength) {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  }

  showLoading() {
    const storiesListEl = document.getElementById("stories-list");
    if (storiesListEl) {
      storiesListEl.innerHTML = '<div class="loading-spinner"></div>';
    }
    
    // Also show loading in map if not initialized
    const mapEl = document.getElementById("all-stories-map");
    if (mapEl && !this.#map) {
      mapEl.innerHTML = `
        <div class="map-loading">
          <div class="loading-spinner"></div>
          <p>Loading map and story locations...</p>
        </div>
      `;
    }
  }

  clearLoading() {
    const storiesListEl = document.getElementById("stories-list");
    if (storiesListEl) {
      const loadingSpinner = storiesListEl.querySelector('.loading-spinner');
      if (loadingSpinner) {
        loadingSpinner.remove();
      }
    }
    
    this.#clearMapLoading();
  }

  showError(message) {
    const storiesListEl = document.getElementById("stories-list");
    if (storiesListEl) {
      storiesListEl.innerHTML = `<p class="error-message">${message}</p>`;
    }
  }
}
