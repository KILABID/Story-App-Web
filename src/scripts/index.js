// CSS imports
import "../styles/styles.css";

import App from "./pages/app";
// Import PWA registration
import { registerSW } from 'virtual:pwa-register'

document.addEventListener("DOMContentLoaded", async () => {
  // Create and show loading animation
  const mainContent = document.querySelector("#main-content");
  const loadingElement = document.createElement("div");
  loadingElement.id = "loading-indicator";
  loadingElement.innerHTML = `
    <div class="spinner"></div>
    <p>Loading content...</p>
  `;
  mainContent.appendChild(loadingElement);


  const app = new App({
    content: mainContent,
    drawerButton: document.querySelector("#drawer-button"),
    navigationDrawer: document.querySelector("#navigation-drawer"),
  });

  try {
    await app.renderPage();
  } finally {
    // Remove loading animation when content is loaded
    const loadingIndicator = document.getElementById("loading-indicator");
    if (loadingIndicator) {
      loadingIndicator.classList.add("fade-out");
      setTimeout(() => {
        loadingIndicator.remove();
      }, 500);
    }
  }
  
  // Register PWA service worker
  const updateSW = registerSW({
    onNeedRefresh() {
      if (confirm('New content available. Reload?')) {
        updateSW(true)
      }
    },
    onOfflineReady() {
      console.log('App ready to work offline')
    },
  })

  window.addEventListener("hashchange", async () => {
    // Only show loading indicator if View Transition API is not supported
    if (!document.startViewTransition) {
      mainContent.appendChild(loadingElement.cloneNode(true));
    }

    try {
      await app.renderPage();
      
    } catch (error) {
      console.error("Error rendering page:", error);
      // Show error message to user
      const errorElement = document.createElement("div");
      errorElement.innerHTML = `
        <div class="error-message">
          <h2>Something went wrong</h2>
          <p>Please try refreshing the page or navigate to a different section.</p>
          <button onclick="window.location.reload()">Refresh Page</button>
        </div>
      `;
      mainContent.innerHTML = "";
      mainContent.appendChild(errorElement);
    } finally {
      // Only need to remove loading indicator if we added it (when View Transition API is not supported)
      if (!document.startViewTransition) {
        const loadingIndicator = document.getElementById("loading-indicator");
        if (loadingIndicator) {
          loadingIndicator.classList.add("fade-out");
          setTimeout(() => {
            if (loadingIndicator.parentNode) {
              loadingIndicator.remove();
            }
          }, 500);
        }
      }
    }
  });
});
