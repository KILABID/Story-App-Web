import LoginPagePresenter from './login-page-presenter.js';

export default class LoginPage {
  #presenter;
  
  constructor() {
    this.#presenter = new LoginPagePresenter({ view: this });
  }    async render() {
    return `
    <section class="container">
      <div class="login-container">
        <div class="login-card" role="form" aria-labelledby="login-title">
          <div class="login-header">
            <h1 id="login-title">🔑 Login</h1>
            <p class="login-subtitle">Silakan masuk untuk melanjutkan menggunakan StoryApp</p>
          </div>
          <form id="login-form" novalidate aria-describedby="form-description">
            <p id="form-description" class="sr-only">Formulir login dengan validasi email dan password</p>
            
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
                  aria-describedby="email-error"
                  aria-invalid="false"
                  autocomplete="email"
                >
              </div>
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
                  placeholder="Masukkan password Anda" 
                  required
                  aria-describedby="password-error"
                  aria-invalid="false"
                  autocomplete="current-password"
                >
              </div>
              <span class="error-message" id="password-error" role="alert" aria-live="polite"></span>
            </div>
            
            <button type="submit" id="login-button" class="primary-button" aria-describedby="login-status">
              <span id="button-text">Login</span>
              <span id="loading-spinner" class="spinner" style="display: none;" aria-hidden="true"></span>
            </button>
            <div id="login-status" class="sr-only" aria-live="polite"></div>
            
            <p class="register-link">
              Belum punya akun? 
              <a href="#/register" aria-label="Daftar akun baru di StoryApp">Daftar di sini</a>
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
    </div>    <style>
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
          radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
        animation: float 20s ease-in-out infinite;
        pointer-events: none;
      }

      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33% { transform: translateY(-20px) rotate(1deg); }
        66% { transform: translateY(-10px) rotate(-1deg); }
      }
      
      .login-card {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        border-radius: 20px;
        box-shadow: 
          0 25px 50px rgba(0, 0, 0, 0.15),
          0 0 0 1px rgba(255, 255, 255, 0.2);
        width: 100%;
        max-width: 450px;
        padding: 40px;
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

      /* Gradient border effect */
      .login-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 20px;
        padding: 2px;
        background: linear-gradient(135deg, #667eea, #764ba2, #667eea);
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask-composite: exclude;
        animation: gradientBorder 4s ease-in-out infinite;
      }

      @keyframes gradientBorder {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      
      .login-header {
        text-align: center;
        margin-bottom: 35px;
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
        line-height: 1.5;
        font-weight: 400;
      }
      
      .form-group {
        margin-bottom: 25px;
        animation: fadeInUp 0.6s ease-out both;
      }

      .form-group:nth-child(1) { animation-delay: 0.3s; }
      .form-group:nth-child(2) { animation-delay: 0.4s; }
      .form-group:nth-child(3) { animation-delay: 0.5s; }

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
        margin-bottom: 10px;
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
        left: 16px;
        top: 50%;
        transform: translateY(-50%);
        color: #9ca3af;
        font-size: 18px;
        transition: color 0.3s ease;
      }

      .input-wrapper:focus-within .input-icon {
        color: #667eea;
      }
      
      .form-group input {
        width: 100%;
        padding: 16px 16px 16px 50px;
        border: 2px solid #e5e7eb;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 500;
        background: rgba(255, 255, 255, 0.8);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        color: #1f2937;
      }
      
      .form-group input:focus {
        border-color: #667eea;
        box-shadow: 
          0 0 0 3px rgba(102, 126, 234, 0.1),
          0 10px 25px rgba(102, 126, 234, 0.15);
        outline: none;
        background: rgba(255, 255, 255, 0.95);
        transform: translateY(-1px);
      }

      .form-group input::placeholder {
        color: #9ca3af;
        font-weight: 400;
      }
      
      .error-message {
        color: #ef4444;
        font-size: 13px;
        margin-top: 8px;
        display: block;
        font-weight: 500;
        padding-left: 4px;
        animation: shake 0.3s ease-in-out;
      }

      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-4px); }
        75% { transform: translateX(4px); }
      }
      
      .primary-button {
        width: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 12px;
        padding: 16px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        overflow: hidden;
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        animation: fadeInUp 0.6s ease-out 0.6s both;
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
        transform: translateY(-2px);
        box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
        background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
      }

      .primary-button:hover::before {
        left: 100%;
      }
      
      .primary-button:disabled {
        background: linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%);
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
      }

      .primary-button:active {
        transform: translateY(0);
      }
      
      .register-link {
        text-align: center;
        margin-top: 30px;
        color: #6b7280;
        font-size: 15px;
        animation: fadeInUp 0.6s ease-out 0.7s both;
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
        margin: 10% auto;
        padding: 30px;
        border-radius: 20px;
        width: 85%;
        max-width: 450px;
        box-shadow: 
          0 25px 50px rgba(0, 0, 0, 0.25),
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
        margin-top: 10px;
        margin-bottom: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-size: 24px;
        font-weight: 700;
      }
      
      .modal-content p {
        color: #6b7280;
        margin: 20px 0;
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
        top: 15px;
        right: 20px;
        width: 32px;
        height: 32px;
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
      
      /* Responsive Design */
      @media (max-width: 600px) {
        .login-container {
          padding: 15px;
          min-height: 100vh;
        }

        .login-card {
          padding: 30px 25px;
          margin: 0;
        }

        .login-header h1 {
          font-size: 2rem;
        }
        
        .form-group input {
          padding: 14px 14px 14px 45px;
          font-size: 16px;
        }

        .input-icon {
          left: 14px;
          font-size: 16px;
        }
        
        .modal-content {
          width: 90%;
          margin: 20% auto;
          padding: 25px;
        }
      }

      @media (max-width: 480px) {
        .login-card {
          padding: 25px 20px;
        }

        .primary-button {
          padding: 14px;
          font-size: 15px;
        }
      }

      /* Accessibility improvements */
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
          border: 2px solid #000000;
        }

        .form-group input:focus {
          border-color: #000000;
          box-shadow: 0 0 0 3px #ffff00;
        }
      }
    </style>
        `;
  }
  afterRender() {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const loginButton = document.getElementById('login-button');
    const buttonText = document.getElementById('button-text');
    const loadingSpinner = document.getElementById('loading-spinner');
    const modal = document.getElementById('response-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const closeBtn = document.querySelector('.close');
    
    // Close modal when clicking the X
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
    
    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
    
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      // Reset error messages
      emailError.textContent = '';
      passwordError.textContent = '';
      
      const email = emailInput.value;
      const password = passwordInput.value;
      
      await this.#presenter.login(email, password);
    });
  }
  
  showLoading() {
    const loginButton = document.getElementById('login-button');
    const buttonText = document.getElementById('button-text');
    const loadingSpinner = document.getElementById('loading-spinner');
    
    buttonText.textContent = 'Logging in...';
    loadingSpinner.style.display = 'inline-block';
    loginButton.disabled = true;
  }
  
  hideLoading() {
    const loginButton = document.getElementById('login-button');
    const buttonText = document.getElementById('button-text');
    const loadingSpinner = document.getElementById('loading-spinner');
    
    buttonText.textContent = 'Login';
    loadingSpinner.style.display = 'none';
    loginButton.disabled = false;
  }
  
  showError(message) {
    const modal = document.getElementById('response-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    
    modalTitle.textContent = 'Login Gagal';
    modalMessage.textContent = message;
    modal.style.display = 'block';
  }
  
  showSuccess(message) {
    const modal = document.getElementById('response-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    
    modalTitle.textContent = 'Login Berhasil!';
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

  redirectToHome() {
    // Redirect to home page after a short delay
    setTimeout(() => {
      window.location.hash = '#/';
    }, 2000);
  }
}