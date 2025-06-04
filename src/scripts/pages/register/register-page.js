import RegisterPresenter from './register-presenter.js';

export default class RegisterPage {
  #presenter;
  
  constructor() {
    this.#presenter = new RegisterPresenter({ view: this });
  }
  async render() {
    return `
      <section class="container">
        <div class="login-container">
          <div class="login-card" role="form" aria-labelledby="register-title">
            <div class="login-header">
              <h1 id="register-title">📝 Daftar Akun</h1>
              <p class="login-subtitle">Buat akun baru untuk bergabung dengan StoryApp dan mulai berbagi cerita</p>
            </div>
            <form id="register-form" novalidate aria-describedby="register-form-description">
              <p id="register-form-description" class="sr-only">Formulir pendaftaran akun dengan validasi nama, email, dan password</p>
              
              <div class="form-group">
                <label for="name">Nama Lengkap:</label>
                <div class="input-wrapper">
                  <i class="fa fa-user input-icon" aria-hidden="true"></i>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Masukkan nama lengkap Anda" 
                    required 
                    minlength="2"
                    aria-describedby="name-error name-help"
                    aria-invalid="false"
                    autocomplete="name"
                  >
                </div>
                <span id="name-help" class="sr-only">Nama harus minimal 2 karakter</span>
                <span class="error-message" id="name-error" role="alert" aria-live="polite"></span>
              </div>
              
              <div class="form-group">
                <label for="email">Email:</label>
                <div class="input-wrapper">
                  <i class="fa fa-envelope input-icon" aria-hidden="true"></i>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="Masukkan email Anda" 
                    required
                    aria-describedby="email-error email-help"
                    aria-invalid="false"
                    autocomplete="email"
                  >
                </div>
                <span id="email-help" class="sr-only">Masukkan alamat email yang valid</span>
                <span class="error-message" id="email-error" role="alert" aria-live="polite"></span>
              </div>
              
              <div class="form-group">
                <label for="password">Password:</label>
                <div class="input-wrapper">
                  <i class="fa fa-lock input-icon" aria-hidden="true"></i>
                  <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="Masukkan password (minimal 8 karakter)" 
                    required 
                    minlength="8"
                    aria-describedby="password-error password-help"
                    aria-invalid="false"
                    autocomplete="new-password"
                  >
                </div>
                <span id="password-help" class="sr-only">Password harus minimal 8 karakter</span>
                <span class="error-message" id="password-error" role="alert" aria-live="polite"></span>
              </div>
              
              <button type="submit" id="register-button" class="primary-button" aria-describedby="register-status">
                <span id="button-text">Daftar</span>
                <span id="loading-spinner" class="spinner" style="display: none;" aria-hidden="true"></span>
              </button>
              <div id="register-status" class="sr-only" aria-live="polite"></div>
              
              <p class="register-link">
                Sudah punya akun? 
                <a href="#/login" aria-label="Login ke akun yang sudah ada">Login di sini</a>
              </p>
            </form>
          </div>
        </div>
      </section>

      <!-- Modal untuk respons -->
      <div id="response-modal" class="modal" style="display: none;" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal-content">
          <button class="close" aria-label="Tutup dialog">&times;</button>
          <h2 id="modal-title"></h2>
          <p id="modal-message"></p>
        </div>
      </div>      <style>
        /* Background for the entire page */
        body {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          margin: 0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .container {
          background: transparent;
        }

        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20px;
          position: relative;
        }

        /* Floating particles background */
        .login-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
          animation: float 25s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-30px) rotate(2deg); }
          66% { transform: translateY(-15px) rotate(-1deg); }
        }
        
        .login-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          box-shadow: 
            0 30px 60px rgba(0, 0, 0, 0.15),
            0 0 0 1px rgba(255, 255, 255, 0.2);
          width: 100%;
          max-width: 480px;
          padding: 45px;
          position: relative;
          overflow: hidden;
          animation: slideInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(100px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Enhanced gradient border effect */
        .login-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 24px;
          padding: 2px;
          background: linear-gradient(135deg, #667eea, #764ba2, #f093fb, #667eea);
          background-size: 400% 400%;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          animation: gradientBorder 6s ease-in-out infinite;
        }

        @keyframes gradientBorder {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .login-header {
          text-align: center;
          margin-bottom: 40px;
          animation: fadeInDown 0.8s ease-out 0.2s both;
        }
        
        .login-header h1 {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: #333;
          margin-bottom: 15px;
          font-size: 2.5rem;
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .login-subtitle {
          color: #6b7280;
          font-size: 16px;
          margin-top: 0;
          line-height: 1.6;
          font-weight: 400;
          max-width: 350px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .form-group {
          margin-bottom: 28px;
          animation: fadeInUp 0.6s ease-out both;
        }

        .form-group:nth-child(1) { animation-delay: 0.3s; }
        .form-group:nth-child(2) { animation-delay: 0.4s; }
        .form-group:nth-child(3) { animation-delay: 0.5s; }
        .form-group:nth-child(4) { animation-delay: 0.6s; }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .form-group label {
          display: block;
          margin-bottom: 12px;
          font-weight: 600;
          color: #374151;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .input-wrapper {
          position: relative;
          transition: transform 0.3s ease;
        }

        .input-wrapper:focus-within {
          transform: translateY(-2px);
        }
        
        .input-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          font-size: 18px;
          transition: color 0.3s ease;
        }

        .input-wrapper:focus-within .input-icon {
          color: #667eea;
        }
          .form-group input,
        .form-group input[type="text"],
        .form-group input[type="email"],
        .form-group input[type="password"] {
          width: 100%;
          padding: 18px 18px 18px 52px;
          border: 2px solid #e5e7eb;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 500;
          background: rgba(255, 255, 255, 0.8);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          color: #1f2937;
          box-sizing: border-box;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
        }
          .form-group input:focus,
        .form-group input[type="text"]:focus,
        .form-group input[type="email"]:focus,
        .form-group input[type="password"]:focus {
          border-color: #667eea;
          box-shadow: 
            0 0 0 3px rgba(102, 126, 234, 0.1),
            0 12px 28px rgba(102, 126, 234, 0.15);
          outline: none;
          background: rgba(255, 255, 255, 0.95);
          transform: translateY(-1px);
        }        .form-group input::placeholder,
        .form-group input[type="text"]::placeholder,
        .form-group input[type="email"]::placeholder,
        .form-group input[type="password"]::placeholder {
          color: #9ca3af;
          font-weight: 400;
        }
        
        .error-message {
          color: #ef4444;
          font-size: 13px;
          margin-top: 10px;
          display: block;
          font-weight: 500;
          padding-left: 6px;
          animation: shake 0.3s ease-in-out;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .primary-button {
          width: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 14px;
          padding: 18px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
          animation: fadeInUp 0.6s ease-out 0.7s both;
        }

        .primary-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transition: left 0.5s ease;
        }
        
        .primary-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 40px rgba(102, 126, 234, 0.4);
          background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
        }

        .primary-button:hover::before {
          left: 100%;
        }
        
        .primary-button:disabled {
          background: linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%);
          cursor: not-allowed;
          transform: none;
          box-shadow: 0 4px 12px rgba(156, 163, 175, 0.2);
        }

        .primary-button:active {
          transform: translateY(-1px);
        }
        
        .register-link {
          text-align: center;
          margin-top: 35px;
          color: #6b7280;
          font-size: 15px;
          animation: fadeInUp 0.6s ease-out 0.8s both;
        }
        
        .register-link a {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          position: relative;
          transition: all 0.3s ease;
        }

        .register-link a::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transition: width 0.3s ease;
        }
        
        .register-link a:hover {
          color: #5a67d8;
          transform: translateY(-1px);
        }

        .register-link a:hover::after {
          width: 100%;
        }
        
        .spinner {
          width: 22px;
          height: 22px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 1s linear infinite;
          display: inline-block;
          margin-left: 10px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .modal {
          display: none;
          position: fixed;
          z-index: 10000;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(5px);
          animation: fadeIn 0.3s ease;
        }

        .modal-content {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          margin: 8% auto;
          padding: 35px;
          border-radius: 24px;
          width: 85%;
          max-width: 480px;
          box-shadow: 
            0 30px 60px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(255, 255, 255, 0.2);
          text-align: center;
          position: relative;
          animation: modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-50px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
          
        .modal-content h2 {
          margin-top: 15px;
          margin-bottom: 25px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: 26px;
          font-weight: 700;
        }
        
        .modal-content p {
          color: #6b7280;
          margin: 25px 0;
          line-height: 1.6;
          font-size: 16px;
        }
        
        .close {
          color: #9ca3af;
          float: right;
          font-size: 28px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          position: absolute;
          top: 18px;
          right: 22px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        .close:hover {
          color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
          transform: rotate(90deg);
        }
        
        /* Enhanced Responsive Design */
        @media (max-width: 600px) {
          .login-container {
            padding: 15px;
            min-height: 100vh;
          }

          .login-card {
            padding: 35px 28px;
            margin: 0;
            max-width: 100%;
          }

          .login-header h1 {
            font-size: 2.2rem;
          }

          .login-subtitle {
            font-size: 15px;
          }
          
          .form-group {
            margin-bottom: 24px;
          }

          .form-group input {
            padding: 16px 16px 16px 48px;
            font-size: 16px;
          }

          .input-icon {
            left: 16px;
            font-size: 17px;
          }
          
          .modal-content {
            width: 92%;
            margin: 15% auto;
            padding: 28px;
          }
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 30px 22px;
            border-radius: 20px;
          }

          .login-header h1 {
            font-size: 2rem;
          }

          .primary-button {
            padding: 16px;
            font-size: 15px;
          }

          .form-group input {
            padding: 15px 15px 15px 45px;
          }

          .input-icon {
            left: 15px;
            font-size: 16px;
          }
        }

        /* Accessibility and Motion Preferences */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .login-card {
            background: #ffffff;
            border: 3px solid #000000;
          }

          .form-group input:focus {
            border-color: #000000;
            box-shadow: 0 0 0 4px #ffff00;
          }

          .primary-button {
            background: #000000;
            border: 2px solid #ffffff;
          }
        }

        /* Success/Error states for better UX */
        .modal.success .modal-content h2 {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .modal.error .modal-content h2 {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      </style>
    `;
  }

  async afterRender() {
    this.#setupEventListeners();
  }

  #setupEventListeners() {
    const registerForm = document.getElementById('register-form');
    const modal = document.getElementById('response-modal');
    const closeBtn = document.querySelector('.close');

    // Form submit handler
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.#handleRegister();
    });

    // Modal close handlers
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });

    // Real-time validation
    document.getElementById('name').addEventListener('blur', () => {
      this.#validateName();
    });

    document.getElementById('email').addEventListener('blur', () => {
      this.#validateEmail();
    });

    document.getElementById('password').addEventListener('blur', () => {
      this.#validatePassword();
    });
  }

  #validateName() {
    const nameInput = document.getElementById('name');
    const nameError = document.getElementById('name-error');
    const name = nameInput.value.trim();

    if (!name) {
      this.#showFieldError('name-error', 'Nama harus diisi.');
      return false;
    }

    if (name.length < 2) {
      this.#showFieldError('name-error', 'Nama harus minimal 2 karakter.');
      return false;
    }

    this.#clearFieldError('name-error');
    return true;
  }

  #validateEmail() {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const email = emailInput.value.trim();

    if (!email) {
      this.#showFieldError('email-error', 'Email harus diisi.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.#showFieldError('email-error', 'Format email tidak valid.');
      return false;
    }

    this.#clearFieldError('email-error');
    return true;
  }

  #validatePassword() {
    const passwordInput = document.getElementById('password');
    const passwordError = document.getElementById('password-error');
    const password = passwordInput.value;

    if (!password) {
      this.#showFieldError('password-error', 'Password harus diisi.');
      return false;
    }

    if (password.length < 8) {
      this.#showFieldError('password-error', 'Password harus minimal 8 karakter.');
      return false;
    }

    this.#clearFieldError('password-error');
    return true;
  }

  #showFieldError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  }
  #clearFieldError(errorId) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    }
  }

  #handleRegister() {
    // Clear all previous errors
    this.#clearAllErrors();

    // Validate all fields
    const isNameValid = this.#validateName();
    const isEmailValid = this.#validateEmail();
    const isPasswordValid = this.#validatePassword();

    if (!isNameValid || !isEmailValid || !isPasswordValid) {
      return;
    }

    // Get form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;    // Call presenter
    this.#presenter.register(name, email, password);
  }

  #clearAllErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
      element.textContent = '';
      element.style.display = 'none';
    });
  }

  showLoading() {
    const buttonText = document.getElementById('button-text');
    const loadingSpinner = document.getElementById('loading-spinner');
    const registerButton = document.getElementById('register-button');

    if (buttonText && loadingSpinner && registerButton) {
      buttonText.style.display = 'none';
      loadingSpinner.style.display = 'inline-block';
      registerButton.disabled = true;
    }
  }

  hideLoading() {
    const buttonText = document.getElementById('button-text');
    const loadingSpinner = document.getElementById('loading-spinner');
    const registerButton = document.getElementById('register-button');

    if (buttonText && loadingSpinner && registerButton) {
      buttonText.style.display = 'inline';
      loadingSpinner.style.display = 'none';
      registerButton.disabled = false;
    }
  }
  showSuccess(message) {
    this.#showModal('Berhasil!', message, 'success');
  }

  showError(message) {
    this.#showModal('Error!', message, 'error');
  }

  #showModal(title, message, type) {
    const modal = document.getElementById('response-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.style.display = 'block';
    
    // Add close functionality
    const closeModal = document.querySelector('.close');
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });
    
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  }

  redirectToLogin() {
    // Redirect to login page after a short delay
    setTimeout(() => {
      window.location.hash = '#/login';
    }, 2000);
  }
}