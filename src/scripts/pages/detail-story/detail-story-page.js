import { getStoriesDetail } from "../../data/api.js";
import { addBookmark, removeBookmark, isBookmarked } from "../../data/database.js";
import DetailStoryPresenter from "./detail-story-presenter.js";
import Auth from "../../utils/auth.js";
import { parseActivePathname } from "../../routes/url-parser.js";
import Map from "../../utils/map.js";
import "leaflet/dist/leaflet.css";
import "../../../styles/map.css";

export default class DetailStoryPage {
  #presenter;
  #map = null;
  #currentStory = null;

  constructor() {
    this.#presenter = null;
  }async render() {
    return `
      <section class="container">
        <div class="detail-header">
          <button id="back-button" class="back-button">← Back</button>
          <h1>Story Detail</h1>
          <button id="bookmark-button" class="bookmark-button" title="Bookmark this story">
            <span class="bookmark-icon">🔖</span>
            <span class="bookmark-text">Bookmark</span>
          </button>
        </div>
        <div id="story-detail-container"></div>
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

    // Set up bookmark button
    const bookmarkButton = document.getElementById("bookmark-button");
    if (bookmarkButton) {
      bookmarkButton.addEventListener("click", () => {
        this.toggleBookmark();
      });
    }

    const token = Auth.getToken();

    if (!token) {
      this.showError("Anda belum login. Silakan login terlebih dahulu.");

      // Redirect to login page after a short delay
      setTimeout(() => {
        window.location.hash = "#/login";
      }, 2000);

      return;
    }
    this.showLoading();

    // Get story ID from URL using the URL parser
    const { id: storyId } = parseActivePathname();

    if (!storyId) {
      this.showError("Story ID not found");
      return;
    }

    this.#presenter = new DetailStoryPresenter({
      view: this,
      storyId,
      token,
    });

    await this.#presenter.getStoryDetail();
  }  async displayStoryDetail(story) {
    const detailContainer = document.getElementById("story-detail-container");

    if (!story) {
      this.showError("Story not found");
      return;
    }

    // Store current story for bookmark functionality
    this.#currentStory = story;

    // Update bookmark button state
    await this.updateBookmarkButton(story.id);

    // Process location data
    const processedStory = await this.processStoryLocation(story);
    const hasLocation = processedStory.location !== null;const html = `
      <article class="story-detail-full" data-story-id="${processedStory.id}">
        <div class="story-detail-full__image-container">
          <img 
            class="story-detail-full__image" 
            src="${processedStory.photoUrl}" 
            alt="${processedStory.name}'s story" 
            loading="lazy"
          >
        </div>
        <div class="story-detail-full__content">
          <h2 class="story-detail-full__author">Author: ${
            processedStory.name
          }</h2>
          <div class="story-detail-full__description">
            <p>${processedStory.description}</p>
          </div>
          <p class="story-detail-full__date">Posted on: ${new Date(
            processedStory.createdAt
          ).toLocaleDateString()}</p>          ${
      hasLocation
        ? `
            <div class="story-detail-full__location">
              <h3>Location: ${processedStory.location.placeName}</h3>
              <p class="location-coordinates">Coordinates: ${processedStory.location.latitude.toFixed(
                6
              )}, ${processedStory.location.longitude.toFixed(6)}</p>
              <div id="story-map" class="story-map"></div>
            </div>
          `
        : ""
    }
        </div>
      </article>
    `;    detailContainer.innerHTML = html;
    
    // Set view transition name after the content is rendered to avoid conflicts
    setTimeout(() => {
      const storyElement = detailContainer.querySelector('.story-detail-full');
      if (storyElement) {
        storyElement.style.viewTransitionName = `story-${processedStory.id}`;
      }
    }, 100);
    
    // Initialize map if location exists
    if (hasLocation) {
      setTimeout(async () => {
        try {
          const { latitude, longitude, placeName } = processedStory.location;
          const mapElement = document.getElementById("story-map");

          if (mapElement) {
            // Build map with the story location as center
            this.#map = await Map.build("#story-map", {
              center: [latitude, longitude],
              zoom: 13,
            });

            // Add marker at the story location
            this.#map.addMarker(
              [latitude, longitude],
              {},
              {
                content: `
                <div class="map-popup">
                  <h4>${processedStory.name}'s Story</h4>
                  <p>${placeName}</p>
                </div>
              `,
              }
            );

            // Add popup listener to open it by default
            setTimeout(() => {
              const markers = document.querySelectorAll(".leaflet-marker-icon");
              if (markers.length > 0) {
                markers[0].click();
              }
            }, 500);
          }
        } catch (error) {
          console.error("Error initializing map:", error);
          const mapElement = document.getElementById("story-map");
          if (mapElement) {
            mapElement.innerHTML =
              '<p class="map-error">Failed to load map</p>';
          }
        }
      }, 300); // Small delay to ensure the DOM is ready
    }
  }

  showError(message) {
    const detailContainer = document.getElementById("story-detail-container");
    detailContainer.innerHTML = `<p class="error-message">${message}</p>`;
  }

  showLoading() {
    const detailContainer = document.getElementById("story-detail-container");
    detailContainer.innerHTML = `<div class="loading-indicator">Loading story details...</div>`;
  }

  hideLoading() {
    const loadingIndicator = document.querySelector(".loading-indicator");
    if (loadingIndicator) {
      loadingIndicator.remove();
    }
  }
  async processStoryLocation(story) {
    // Check if lat and lon exist and are numbers
    if (
      story.lat !== null &&
      story.lon !== null &&
      !isNaN(parseFloat(story.lat)) &&
      !isNaN(parseFloat(story.lon))
    ) {
      try {
        // Convert to proper numeric values
        const latitude = parseFloat(story.lat);
        const longitude = parseFloat(story.lon);

        // Try to get place name using reverse geocoding
        let placeName;
        try {
          placeName = await Map.getPlaceNameByCoordinate(latitude, longitude);
        } catch (error) {
          console.warn("Error getting place name:", error);
          placeName = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
        }

        return {
          ...story,
          location: {
            latitude,
            longitude,
            placeName,
          },
        };
      } catch (error) {
        console.error("Error processing location:", error);
        // Return story with coordinates but without place name
        return {
          ...story,
          location: {
            latitude: parseFloat(story.lat),
            longitude: parseFloat(story.lon),
            placeName: "Unknown location",
          },
        };
      }
    } else {
      // If lat/lon are not valid, return story with null location
      return {
        ...story,
        location: null,      };
    }
  }

  async toggleBookmark() {
    if (!this.#currentStory) {
      console.error('No story available to bookmark');
      return;
    }

    const bookmarkButton = document.getElementById("bookmark-button");
    const bookmarkIcon = bookmarkButton.querySelector('.bookmark-icon');
    const bookmarkText = bookmarkButton.querySelector('.bookmark-text');
    
    try {
      // Show loading state
      bookmarkButton.disabled = true;
      bookmarkIcon.textContent = '⏳';
      bookmarkText.textContent = 'Processing...';

      const storyId = this.#currentStory.id;
      const bookmarked = await isBookmarked(storyId);

      if (bookmarked) {
        // Remove bookmark
        await removeBookmark(storyId);
        this.showToast('Bookmark removed successfully!', 'success');
      } else {
        // Add bookmark
        await addBookmark(this.#currentStory);
        this.showToast('Story bookmarked successfully!', 'success');
      }

      // Update button state
      await this.updateBookmarkButton(storyId);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      this.showToast('Failed to update bookmark. Please try again.', 'error');
      
      // Reset button state on error
      bookmarkButton.disabled = false;
      bookmarkIcon.textContent = '🔖';
      bookmarkText.textContent = 'Bookmark';
    }
  }

  async updateBookmarkButton(storyId) {
    const bookmarkButton = document.getElementById("bookmark-button");
    const bookmarkIcon = bookmarkButton.querySelector('.bookmark-icon');
    const bookmarkText = bookmarkButton.querySelector('.bookmark-text');
    
    if (!bookmarkButton) return;

    try {
      const bookmarked = await isBookmarked(storyId);
      
      bookmarkButton.disabled = false;
      
      if (bookmarked) {
        bookmarkButton.classList.add('bookmarked');
        bookmarkIcon.textContent = '📖';
        bookmarkText.textContent = 'Bookmarked';
        bookmarkButton.title = 'Remove from bookmarks';
      } else {
        bookmarkButton.classList.remove('bookmarked');
        bookmarkIcon.textContent = '🔖';
        bookmarkText.textContent = 'Bookmark';
        bookmarkButton.title = 'Add to bookmarks';
      }
    } catch (error) {
      console.error('Error updating bookmark button:', error);
      bookmarkButton.disabled = false;
    }
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
