import { defineConfig } from "vite";
import { resolve } from "path";
import { VitePWA } from "vite-plugin-pwa";

const GITHUB_REPO_NAME = "Story-App-Web";

export default defineConfig({
  base: `/${GITHUB_REPO_NAME}/`,
  root: resolve(__dirname, "src"),
  publicDir: resolve(__dirname, "src", "public"),
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      strategies: "generateSW",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        navigateFallback: "index.html",
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/story-api\.dicoding\.dev\//,
            handler: "NetworkFirst",
            options: {
              cacheName: "story-api",
              networkTimeoutSeconds: 3,
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: ({ url }) =>
              url.origin === "https://story-api.dicoding.dev" &&
              url.pathname.startsWith("/images/stories/"),
            handler: "CacheFirst",
            options: {
              cacheName: "story-api-images",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
        // Membersihkan aset lama dari precache
        cleanupOutdatedCaches: true,
      },
      includeAssets: ["favicon.png", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "StoryApp",
        short_name: "StoryApp",
        description: "Aplikasi berbagi cerita dan lokasi",
        theme_color: "#3b82f6",
        background_color: "#ffffff",
        display: "standalone",
        start_url: ".",
        scope: ".",
        icons: [
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/iconku2-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "screenshots/home-desktop.png",
            sizes: "1031x579",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "screenshots/home-mobile.png",
            sizes: "723x833",
            type: "image/png",
            form_factor: "narrow",
          },
        ],
      },
    }),
  ],
});
