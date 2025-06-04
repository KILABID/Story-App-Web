import { postStory } from '../../data/api.js';
import Auth from '../../utils/auth.js';

export default class AddStoryPresenter {
  #view;

  constructor({ view }) {
    this.#view = view;
  }
  async submitStory(description, photoFile, lat = null, lon = null) {
    try {
      this.#view.showLoading();
      
      // Get token from Auth class
      const authToken = Auth.getToken();
        if (!authToken) {
        this.#view.showError('Authentication token not found. Please login again.');
        this.#view.redirectToLogin();
        return;
      }
      const response = await postStory(authToken, description, photoFile, lat, lon);
      
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