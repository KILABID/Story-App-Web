import { postStoryAsGuest } from '../../data/api.js';

export default class AddStoryGuestPresenter {
  #view;

  constructor({ view }) {
    this.#view = view;
  }
  async submitStory(description, photoFile, lat = null, lon = null) {
    try {
      this.#view.showLoading();
      const response = await postStoryAsGuest(description, photoFile, lat, lon);
      
      if (response.error) {
        this.#view.showError(response.message || 'Failed to submit story. Please try again.');
      } else {
        this.#view.showSuccess('Story submitted successfully!');
        this.#view.resetForm();
      }
    } catch (error) {
      console.error('Error submitting story:', error);
      this.#view.showError('An error occurred while submitting your story. Please try again.');
    } finally {
      this.#view.hideLoading();
    }
  }
}