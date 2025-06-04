import { register } from '../../data/api.js';

export default class RegisterPresenter {
  #view;

  constructor({ view }) {
    this.#view = view;
  }

  async register(name, email, password) {
    try {
      this.#view.showLoading();
      
      // Basic validation
      if (!name || name.trim().length < 2) {
        this.#view.showError('Nama harus diisi minimal 2 karakter.');
        return;
      }
      
      if (!email || !this.#isValidEmail(email)) {
        this.#view.showError('Format email tidak valid.');
        return;
      }
      
      if (!password || password.length < 8) {
        this.#view.showError('Password harus minimal 8 karakter.');
        return;
      }
      
      const response = await register(name.trim(), email.trim(), password);
        if (response.error) {
        this.#view.showError(response.message || 'Pendaftaran gagal. Silakan coba lagi.');
      } else {
        this.#view.showSuccess('Pendaftaran berhasil! Anda akan segera dialihkan ke halaman login.');
        this.#view.redirectToLogin();
      }
    } catch (error) {
      console.error('Register error:', error);
      this.#view.showError('Terjadi kesalahan saat mendaftar. Silakan coba lagi.');
    } finally {
      this.#view.hideLoading();
    }
  }

  #isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}