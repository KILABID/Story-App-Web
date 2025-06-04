import { getStoriesDetail } from "../../data/api.js";
import { addBookmark, removeBookmark, isBookmarked } from "../../data/database.js";

export default class DetailStoryPresenter {
  #view;
  #storyId;
  #token;

  constructor({ view, storyId, token }) {
    this.#view = view;
    this.#storyId = storyId;
    this.#token = token;
  }

  async getStoryDetail() {
    try {
      this.#view.showLoading();
      
      const response = await getStoriesDetail(this.#token, this.#storyId);
      
      if (response.error) {
        this.#view.showError(response.message || 'Failed to load story details');
        return;
      }
      
      this.#view.displayStoryDetail(response.story);
    } catch (error) {
      console.error('Error fetching story detail:', error);
      this.#view.showError('An error occurred while loading the story details. Please try again.');
    } finally {
      this.#view.hideLoading();
    }
  }

  async toggleBookmark(story) {
    try {
      const bookmarked = await isBookmarked(story.id);
      
      if (bookmarked) {
        await removeBookmark(story.id);
        return false; // Not bookmarked anymore
      } else {
        await addBookmark(story);
        return true; // Now bookmarked
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      throw error;
    }
  }

  async checkBookmarkStatus(storyId) {
    try {
      return await isBookmarked(storyId);
    } catch (error) {
      console.error('Error checking bookmark status:', error);
      return false;
    }
  }
}