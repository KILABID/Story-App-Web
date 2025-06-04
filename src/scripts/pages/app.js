import routes from "../routes/routes";
import { getActiveRoute } from "../routes/url-parser";
import Auth from "../utils/auth";
import { isServiceWorkerAvailable } from "../utils/index.js";
import {
  subscribe,
  unsubscribe,
  isCurrentPushSubscriptionAvailable,
} from "../utils/notification-helper.js";
import {
  generateSubscribeButtonTemplate,
  updatePushNotificationUI,
} from "./templates";

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;
  #navList = null;
  #isTransitioning = false;

  constructor({ navigationDrawer, drawerButton, content }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;
    this.#navList = document.getElementById("nav-list");

    this.#setupDrawer();
    this.#renderNavigation();
  }

  async #renderNavigation() {
    const isLoggedIn = Auth.isLoggedIn();
    const isSubscribed = isServiceWorkerAvailable()
      ? await isCurrentPushSubscriptionAvailable()
      : false;

    // Clear previous nav items
    this.#navList.innerHTML = "";

    if (isLoggedIn) {
      // Navigation items for logged-in users
      this.#navList.innerHTML = `
        <li role="menuitem"><a href="#/" aria-describedby="home-desc">🏠 Beranda</a><span id="home-desc" class="sr-only">Halaman utama aplikasi</span></li>
        <li role="menuitem"><a href="#/all-stories" aria-describedby="stories-desc">📚 All Stories</a><span id="stories-desc" class="sr-only">Lihat semua cerita yang telah dibagikan</span></li>
        <li role="menuitem"><a href="#/add-story" aria-describedby="add-desc">➕ Add Story</a><span id="add-desc" class="sr-only">Tambahkan cerita baru</span></li>
        <li role="menuitem"><a href="#/bookmarks" aria-describedby="bookmarks-desc">📖 My Bookmarks</a><span id="bookmarks-desc" class="sr-only">Lihat daftar cerita yang disimpan</span></li>
        <li role="menuitem">
          <a href="#" id="notification-toggle-link" class="${
            isSubscribed ? "subscribed" : ""
          }" aria-describedby="notification-desc">
            ${isSubscribed ? "🔕 Matikan Notifikasi" : "🔔 Aktifkan Notifikasi"}
          </a>
          <span id="notification-desc" class="sr-only">${
            isSubscribed
              ? "Matikan push notification"
              : "Aktifkan push notification"
          }</span>
        </li>
        <li role="menuitem"><a href="#/" id="logout-button" aria-describedby="logout-desc">🚪 Logout</a><span id="logout-desc" class="sr-only">Keluar dari akun Anda</span></li>
        `;

      // Add logout functionality
      const logoutButton = document.getElementById("logout-button");
      if (logoutButton) {
        logoutButton.addEventListener("click", (event) => {
          event.preventDefault();
          Auth.clearUserData();
          this.#renderNavigation();
          window.location.hash = "#/";
        });
      }

      // Add notification toggle functionality
      if (isServiceWorkerAvailable()) {
        this.#setupNotificationToggle();
      }
    } else {
      // Navigation items for guests
      this.#navList.innerHTML = `
        <li role="menuitem"><a href="#/login" aria-describedby="login-desc">🔑 Login</a><span id="login-desc" class="sr-only">Masuk ke akun Anda</span></li>
        <li role="menuitem"><a href="#/register" aria-describedby="register-desc">📝 Register</a><span id="register-desc" class="sr-only">Daftar akun baru</span></li>
        <li role="menuitem"><a href="#/add-story-guest" aria-describedby="guest-desc">✍️ Add Story Guest</a><span id="guest-desc" class="sr-only">Tambah cerita sebagai tamu</span></li>
        <li role="menuitem">
          <a href="#" id="notification-toggle-link" class="${
            isSubscribed ? "subscribed" : ""
          }" aria-describedby="notification-desc">
            ${isSubscribed ? "🔕 Matikan Notifikasi" : "🔔 Aktifkan Notifikasi"}
          </a>
          <span id="notification-desc" class="sr-only">${
            isSubscribed
              ? "Matikan push notification"
              : "Aktifkan push notification"
          }</span>
        </li>
      `;
    }
  }

  #setupNotificationToggle() {
    const notificationToggle = document.getElementById(
      "notification-toggle-link"
    );

    if (notificationToggle) {
      notificationToggle.addEventListener("click", async (event) => {
        event.preventDefault();

        const isCurrentlySubscribed =
          await isCurrentPushSubscriptionAvailable();
        const link = event.target;

        // Disable temporarily via pointer events
        link.style.pointerEvents = "none";
        link.style.opacity = "0.6";

        if (isCurrentlySubscribed) {
          link.textContent = "⏳ Menonaktifkan...";
          const success = await unsubscribe();

          if (success) {
            link.textContent = "🔔 Aktifkan Notifikasi";
            link.classList.remove("subscribed");
            document.getElementById("notification-desc").textContent =
              "Aktifkan push notification";
          } else {
            link.textContent = "🔕 Matikan Notifikasi";
          }
        } else {
          link.textContent = "⏳ Mengaktifkan...";
          const success = await subscribe();

          if (success) {
            link.textContent = "🔕 Matikan Notifikasi";
            link.classList.add("subscribed");
            document.getElementById("notification-desc").textContent =
              "Matikan push notification";
          } else {
            link.textContent = "🔔 Aktifkan Notifikasi";
          }
        }

        // Enable back
        link.style.pointerEvents = "";
        link.style.opacity = "1";
      });
    }
  }

  #setupDrawer() {
    this.#drawerButton.addEventListener("click", () => {
      const isOpen = this.#navigationDrawer.classList.contains("open");

      if (isOpen) {
        this.#navigationDrawer.classList.remove("open");
        this.#drawerButton.setAttribute("aria-expanded", "false");
        this.#drawerButton.setAttribute("aria-label", "Buka menu navigasi");
      } else {
        this.#navigationDrawer.classList.add("open");
        this.#drawerButton.setAttribute("aria-expanded", "true");
        this.#drawerButton.setAttribute("aria-label", "Tutup menu navigasi");

        // Focus first menu item when opening
        const firstMenuItem = this.#navigationDrawer.querySelector("a, button");
        if (firstMenuItem) {
          setTimeout(() => firstMenuItem.focus(), 300);
        }
      }
    });

    // Handle Escape key to close drawer
    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        this.#navigationDrawer.classList.contains("open")
      ) {
        this.#navigationDrawer.classList.remove("open");
        this.#drawerButton.setAttribute("aria-expanded", "false");
        this.#drawerButton.setAttribute("aria-label", "Buka menu navigasi");
        this.#drawerButton.focus();
      }
    });

    document.body.addEventListener("click", (event) => {
      if (
        !this.#navigationDrawer.contains(event.target) &&
        !this.#drawerButton.contains(event.target)
      ) {
        this.#navigationDrawer.classList.remove("open");
        this.#drawerButton.setAttribute("aria-expanded", "false");
        this.#drawerButton.setAttribute("aria-label", "Buka menu navigasi");
      }

      this.#navigationDrawer
        .querySelectorAll("a, button")
        .forEach((element) => {
          if (
            element.contains(event.target) &&
            element.id !== "notification-toggle-link"
          ) {
            this.#navigationDrawer.classList.remove("open");
            this.#drawerButton.setAttribute("aria-expanded", "false");
            this.#drawerButton.setAttribute("aria-label", "Buka menu navigasi");
          }
        });
    });
  }

  // Remove the old #setupPushNotification method since we're handling it in navbar now

  async renderPage() {
    // Prevent multiple transitions from running simultaneously
    if (this.#isTransitioning) {
      console.warn("Transition already in progress, skipping");
      return;
    }

    // Update navigation on each page render
    await this.#renderNavigation();

    const url = getActiveRoute();
    const page = routes[url];

    if (!page) {
      console.error(`Route not found: ${url}`);
      this.#content.innerHTML = "<p>Page not found</p>";
      return;
    }

    // Use View Transition API if supported
    if (document.startViewTransition) {
      try {
        this.#isTransitioning = true;

        // Specify that only the main content should transition, not the header
        const transition = document.startViewTransition(async () => {
          // Apply transitions only to main content
          document.documentElement.classList.add("view-transition-active");

          this.#content.innerHTML = await page.render();
          await page.afterRender();

          // Remove the class after transition
          setTimeout(() => {
            document.documentElement.classList.remove("view-transition-active");
          }, 500);
        });

        // Handle transition completion and errors
        transition.finished
          .catch((error) => {
            console.warn("View transition was interrupted:", error);
            // Clean up any transition classes
            document.documentElement.classList.remove("view-transition-active");
          })
          .finally(() => {
            this.#isTransitioning = false;
          });

        await transition.ready;
      } catch (error) {
        console.warn(
          "View transition failed, falling back to normal rendering:",
          error
        );
        // Fallback to normal rendering if transition fails
        this.#content.innerHTML = await page.render();
        await page.afterRender();
        // Ensure cleanup
        document.documentElement.classList.remove("view-transition-active");
        this.#isTransitioning = false;
      }
    } else {
      // Fallback for browsers that don't support View Transition API
      this.#content.innerHTML = await page.render();
      await page.afterRender();
    }
  }
}

export default App;
