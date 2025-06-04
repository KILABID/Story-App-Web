class Auth {
  /**
   * Menyimpan token pengguna ke localStorage
   * @param {string} token - Token autentikasi
   */
  static setToken(token) {
    localStorage.setItem('token', token);
  }

  /**
   * Mengambil token pengguna dari localStorage
   * @returns {string|null} Token pengguna atau null jika tidak ada
   */
  static getToken() {
    return localStorage.getItem('token');
  }

  /**
   * Menyimpan data user ID ke localStorage
   * @param {string} userId - ID pengguna
   */
  static setUserId(userId) {
    localStorage.setItem('userId', userId);
  }

  /**
   * Mengambil user ID dari localStorage
   * @returns {string|null} User ID atau null jika tidak ada
   */
  static getUserId() {
    return localStorage.getItem('userId');
  }

  /**
   * Menyimpan nama pengguna ke localStorage
   * @param {string} name - Nama pengguna
   */
  static setName(name) {
    localStorage.setItem('name', name);
  }

  /**
   * Mengambil nama pengguna dari localStorage
   * @returns {string|null} Nama pengguna atau null jika tidak ada
   */
  static getName() {
    return localStorage.getItem('name');
  }

  /**
   * Menyimpan seluruh data pengguna ke localStorage
   * @param {Object} userData - Object yang berisi data pengguna
   * @param {string} userData.token - Token autentikasi
   * @param {string} userData.userId - ID pengguna
   * @param {string} userData.name - Nama pengguna
   */
  static setUserData(userData) {
    this.setToken(userData.token);
    this.setUserId(userData.userId);
    this.setName(userData.name);
  }

  /**
   * Mengambil seluruh data pengguna dari localStorage
   * @returns {Object} Object yang berisi data pengguna
   */
  static getUserData() {
    return {
      token: this.getToken(),
      userId: this.getUserId(),
      name: this.getName(),
    };
  }

  /**
   * Memeriksa apakah pengguna sudah login
   * @returns {boolean} True jika pengguna sudah login, false jika belum
   */
  static isLoggedIn() {
    return !!this.getToken();
  }

  /**
   * Menghapus seluruh data autentikasi pengguna dari localStorage (logout)
   */
  static clearUserData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('name');
  }
}

export default Auth;