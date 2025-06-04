import { login } from '../../data/api.js';
import Auth from '../../utils/auth.js';

export default class LoginPagePresenter {
  #view;

  constructor({ view }) {
    this.#view = view;
  }

  async login(email, password) {
    try {
      this.#view.showLoading();
      
      const response = await login(email, password);
      
      if (response.error) {
        this.#view.showError(response.message || 'Login gagal. Silakan coba lagi.');
      } else {
        this.#view.showSuccess('Login berhasil! Anda akan segera dialihkan ke halaman utama.');
          // Save user data and token using Auth class
        Auth.setUserData({
          token: response.loginResult.token,
          userId: response.loginResult.userId,
          name: response.loginResult.name
        });
        
        this.#view.redirectToHome();
      }
    } catch (error) {
      console.error('Login error:', error);
      this.#view.showError('Terjadi kesalahan saat login. Silakan coba lagi.');
    } finally {
      this.#view.hideLoading();
    }
  }
}