export default class HomePresenter {
  #model;
  #view;

  constructor({ model, view }) {
    this.#model = model;
    this.#view = view;
  }

  async showStories() {
    try {
      const stories = await this.#model;
      this.#view.showStories(stories);
    } catch (error) {
      console.error('Failed to load stories:', error);
      this.#view.showError("Failed to load stories.");
    }
  }
}