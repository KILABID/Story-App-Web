import { getStories } from '../../data/api.js';

export default class AllStoriesPresenter {
  #view;

  constructor({ view }) {
    this.#view = view;
  }
  async getAllStories(token, page = 1, size = 10, location = 1) {
    try {
      this.#view.showLoading();
      
      const response = await getStories(token, page, size, location);
      
      // Clear loading state before processing response
      if (this.#view.clearLoading) {
        this.#view.clearLoading();
      }
      
      if (response.error) {
        this.#view.showError(response.message || 'Failed to load stories with location data');
        return;
      }
      
      this.#view.displayStories(response.listStory);
    } catch (error) {
      console.error('Error fetching stories:', error);
      // Clear loading state on error as well
      if (this.#view.clearLoading) {
        this.#view.clearLoading();
      }
      this.#view.showError('An error occurred while loading stories. Please try again.');
    }
  }
}
