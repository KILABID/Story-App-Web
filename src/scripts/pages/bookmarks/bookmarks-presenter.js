import { getBookmarks, removeBookmark, addBookmark, initDB } from "../../data/database.js";

export default class BookmarksPresenter {
  #view;

  constructor({ view }) {
    this.#view = view;
  }

  async loadBookmarks() {
    try {
      this.#view.showLoading();
      
      // Initialize database first
      await initDB();
      
      // Get all bookmarks from IndexedDB
      const bookmarks = await getBookmarks();
      
      // Sort bookmarks by creation date (newest first)
      const sortedBookmarks = bookmarks.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      
      this.#view.displayBookmarks(sortedBookmarks);
    } catch (error) {
      console.error('Error loading bookmarks:', error);
      this.#view.showError('Failed to load bookmarks. Please try again.');
    } finally {
      this.#view.hideLoading();
    }
  }

  async removeBookmark(storyId) {
    try {
      await removeBookmark(storyId);
      return true;
    } catch (error) {
      console.error('Error removing bookmark:', error);
      throw error;
    }
  }

  async clearAllBookmarks() {
    try {
      // Get all bookmarks first
      const bookmarks = await getBookmarks();
      
      // Remove each bookmark
      const removePromises = bookmarks.map(bookmark => removeBookmark(bookmark.id));
      await Promise.all(removePromises);
      
      return true;
    } catch (error) {
      console.error('Error clearing all bookmarks:', error);
      throw error;
    }
  }

  async getBookmarkCount() {
    try {
      const bookmarks = await getBookmarks();
      return bookmarks.length;
    } catch (error) {
      console.error('Error getting bookmark count:', error);
      return 0;
    }
  }

  async refreshBookmarks() {
    await this.loadBookmarks();
  }
}
