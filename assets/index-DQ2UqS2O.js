var Go=u=>{throw TypeError(u)};var bn=(u,r,a)=>r.has(u)||Go("Cannot "+a);var h=(u,r,a)=>(bn(u,r,"read from private field"),a?a.call(u):r.get(u)),B=(u,r,a)=>r.has(u)?Go("Cannot add the same private member more than once"):r instanceof WeakSet?r.add(u):r.set(u,a),b=(u,r,a,l)=>(bn(u,r,"write to private field"),l?l.call(u,a):r.set(u,a),a),O=(u,r,a)=>(bn(u,r,"access private method"),a);(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))l(c);new MutationObserver(c=>{for(const p of c)if(p.type==="childList")for(const g of p.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&l(g)}).observe(document,{childList:!0,subtree:!0});function a(c){const p={};return c.integrity&&(p.integrity=c.integrity),c.referrerPolicy&&(p.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?p.credentials="include":c.crossOrigin==="anonymous"?p.credentials="omit":p.credentials="same-origin",p}function l(c){if(c.ep)return;c.ep=!0;const p=a(c);fetch(c.href,p)}})();function Va({username:u,image:r,description:a,id:l,createdAt:c}){return`
    <article class="story-detail" data-id="${l}" role="article" tabindex="0">
      <div class="story-detail__image-container">
        <img
          class="story-detail__image"
          src="${r}"
          alt="Foto cerita dari ${u}"
          loading="lazy"
          onerror="this.alt='Gambar tidak dapat dimuat'"
        >
      </div>
      <header class="story-detail__header">
        <h2 class="story-detail__title story-title" id="story-title-${l}">
          👤 ${u}
        </h2>
        ${c?`<time class="story-detail__date" datetime="${c}">
          📅 ${(g=>{if(!g)return"";const k=new Date(g),v={year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"};return k.toLocaleDateString("id-ID",v)})(c)}
        </time>`:""}
      </header>
      <div class="story-detail__description" aria-labelledby="story-title-${l}" role="region">
        <p>${a}</p>
      </div>
      <footer class="story-detail__actions">
        <span class="sr-only">Tekan Enter atau klik untuk membaca cerita lengkap</span>
      </footer>
    </article>
  `}var Qe,Ce;class Ga{constructor({model:r,view:a}){B(this,Qe);B(this,Ce);b(this,Qe,r),b(this,Ce,a)}async showStories(){try{const r=await h(this,Qe);h(this,Ce).showStories(r)}catch(r){console.error("Failed to load stories:",r),h(this,Ce).showError("Failed to load stories.")}}}Qe=new WeakMap,Ce=new WeakMap;const Je={BASE_URL:"https://story-api.dicoding.dev/v1"},Ya="YZ5ZQYEfxRvHEWsc0zzo",Ka="BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk",Oe={LOGIN:`${Je.BASE_URL}/login`,REGISTER:`${Je.BASE_URL}/register`,STORIES:`${Je.BASE_URL}/stories`,STORIES_GUEST:`${Je.BASE_URL}/stories/guest`,NOTIFICATIONS_SUBSCRIBE:`${Je.BASE_URL}/notifications/subscribe`};async function $a(u,r){try{return await(await fetch(Oe.LOGIN,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:u,password:r})})).json()}catch(a){throw console.error("[login] Error:",a),a}}async function Ja(u,r,a){try{return await(await fetch(Oe.REGISTER,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:u,email:r,password:a})})).json()}catch(l){throw console.error("[register] Error:",l),l}}async function nr(u,r=1,a=10,l=0){try{const c=new URL(Oe.STORIES);c.searchParams.append("page",r),c.searchParams.append("size",a),c.searchParams.append("location",l);const p=await fetch(c,{headers:{Authorization:`Bearer ${u}`}});if(!p.ok)throw new Error("Gagal mengambil daftar cerita");return await p.json()}catch(c){throw console.error("[getStories] Error:",c),c}}async function Xa(u,r){try{const a=await fetch(`${Oe.STORIES}/${r}`,{headers:{Authorization:`Bearer ${u}`}});if(!a.ok)throw new Error("Gagal mengambil detail cerita");return await a.json()}catch(a){throw console.error("[getStoriesDetail] Error:",a),a}}async function Qa(u,r,a,l=null,c=null){try{const p=new FormData;p.append("description",r),p.append("photo",a),l!==null&&c!==null&&(p.append("lat",l),p.append("lon",c));const g=await fetch(Oe.STORIES,{method:"POST",headers:{Authorization:`Bearer ${u}`},body:p});if(!g.ok)throw new Error("Gagal mengunggah cerita");return await g.json()}catch(p){throw console.error("[postStory] Error:",p),p}}async function ts(u,r,a=null,l=null){try{const c=new FormData;c.append("description",u),c.append("photo",r),a!==null&&l!==null&&(c.append("lat",a),c.append("lon",l));const p=await fetch(Oe.STORIES_GUEST,{method:"POST",body:c});if(!p.ok)throw new Error("Gagal mengunggah cerita sebagai tamu");return await p.json()}catch(c){throw console.error("[postStoryAsGuest] Error:",c),c}}async function es(u,r){try{const a=new URL(`https://api.maptiler.com/geocoding/${r},${u}.json`);a.searchParams.set("key",Ya),a.searchParams.set("language","id"),a.searchParams.set("limit",1);const l=await fetch(a);if(!l.ok)throw new Error("Failed to fetch place name from geocoding service");const c=await l.json();if(!c.features||c.features.length===0)throw new Error("No place found for the given coordinates");const p=c.features[0].place_name.split(", ");return[p.at(-2),p.at(-1)].map(g=>g).join(", ")}catch(a){throw console.error("[getPlaceNameByCoordinate] Error:",a),a}}async function or(u,r="photo.jpg",a="image/jpeg"){try{const l=await fetch(u);if(!l.ok)throw new Error("Failed to convert data URL to file");const c=await l.blob();return new File([c],r,{type:a})}catch(l){throw console.error("[convertDataUrlToFile] Error:",l),l}}class ne{static setToken(r){localStorage.setItem("token",r)}static getToken(){return localStorage.getItem("token")}static setUserId(r){localStorage.setItem("userId",r)}static getUserId(){return localStorage.getItem("userId")}static setName(r){localStorage.setItem("name",r)}static getName(){return localStorage.getItem("name")}static setUserData(r){this.setToken(r.token),this.setUserId(r.userId),this.setName(r.name)}static getUserData(){return{token:this.getToken(),userId:this.getUserId(),name:this.getName()}}static isLoggedIn(){return!!this.getToken()}static clearUserData(){localStorage.removeItem("token"),localStorage.removeItem("userId"),localStorage.removeItem("name")}}var ti;class is{constructor(){B(this,ti)}async render(){return`
      <section class="container">
        <header class="page-header">
          <h1 id="page-title">📚 Stories</h1>
          <p class="page-description">Jelajahi cerita-cerita menarik yang telah dibagikan oleh pengguna StoryApp</p>
        </header>
      </section>
      <div id="list-stories" role="main" aria-labelledby="page-title" aria-live="polite"></div>
    `}async afterRender(){const r=ne.getToken();if(!r){this.showError("Anda belum login. Silakan login terlebih dahulu."),setTimeout(()=>{window.location.hash="#/login"},2e3);return}this.showLoading(),b(this,ti,new Ga({model:nr(r,1,10),view:this})),await h(this,ti).showStories()}showStories(r){if(!r||!r.listStory){this.showError("Tidak ada cerita yang tersedia saat ini");return}const a=r.listStory.reduce((p,g)=>p.concat(Va({username:g.name,image:g.photoUrl,description:g.description,id:g.id,createdAt:g.createdAt})),"");document.getElementById("list-stories").innerHTML=`
      <section class="stories-section" role="region" aria-labelledby="stories-heading">
        <h2 id="stories-heading" class="sr-only">Daftar Cerita</h2>
        <ul class="story-list" role="list" aria-label="Daftar ${r.listStory.length} cerita">
          ${a}
        </ul>
      </section>`,document.querySelectorAll(".story-detail").forEach((p,g)=>{var v;const k=p.dataset.id;k&&(p.style.viewTransitionName=`story-${k}`,p.setAttribute("role","listitem"),p.setAttribute("tabindex","0"),p.setAttribute("aria-label",`Baca cerita ${((v=p.querySelector(".story-title"))==null?void 0:v.textContent)||"tanpa judul"}`))}),this.addStoryItemClickListeners();const c=`${r.listStory.length} cerita berhasil dimuat`;this.announceToScreenReader(c)}showError(r){document.getElementById("list-stories").innerHTML=`
      <div class="error-container" role="alert" aria-live="assertive">
        <p class="error-message">⚠️ ${r}</p>
      </div>`}showLoading(){document.getElementById("list-stories").innerHTML=`
      <div class="loading-indicator" role="status" aria-live="polite" aria-label="Memuat cerita">
        <span class="sr-only">Sedang memuat cerita...</span>
        <div class="loading-spinner" aria-hidden="true"></div>
        <p>Memuat cerita...</p>
      </div>`}hideLoading(){const r=document.querySelector(".loading-indicator");r&&r.remove()}announceToScreenReader(r){const a=document.createElement("div");a.setAttribute("aria-live","polite"),a.setAttribute("aria-atomic","true"),a.className="sr-only",a.textContent=r,document.body.appendChild(a),setTimeout(()=>{document.body.removeChild(a)},1e3)}addStoryItemClickListeners(){document.querySelectorAll(".story-detail").forEach(a=>{a.addEventListener("click",()=>{this.navigateToStory(a)}),a.addEventListener("keydown",l=>{(l.key==="Enter"||l.key===" ")&&(l.preventDefault(),this.navigateToStory(a))}),a.addEventListener("focus",()=>{a.classList.add("focused")}),a.addEventListener("blur",()=>{a.classList.remove("focused")})})}navigateToStory(r){const a=r.dataset.id;if(!a){console.error("Story ID not found");return}this.announceToScreenReader("Membuka detail cerita"),window.location.hash=`#/detail/${a}`}}ti=new WeakMap;var Rt;class ns{constructor({view:r}){B(this,Rt);b(this,Rt,r)}async login(r,a){try{h(this,Rt).showLoading();const l=await $a(r,a);l.error?h(this,Rt).showError(l.message||"Login gagal. Silakan coba lagi."):(h(this,Rt).showSuccess("Login berhasil! Anda akan segera dialihkan ke halaman utama."),ne.setUserData({token:l.loginResult.token,userId:l.loginResult.userId,name:l.loginResult.name}),h(this,Rt).redirectToHome())}catch(l){console.error("Login error:",l),h(this,Rt).showError("Terjadi kesalahan saat login. Silakan coba lagi.")}finally{h(this,Rt).hideLoading()}}}Rt=new WeakMap;var ei;class os{constructor(){B(this,ei);b(this,ei,new ns({view:this}))}async render(){return`
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
        `}afterRender(){const r=document.getElementById("login-form"),a=document.getElementById("email"),l=document.getElementById("password"),c=document.getElementById("email-error"),p=document.getElementById("password-error");document.getElementById("login-button"),document.getElementById("button-text"),document.getElementById("loading-spinner");const g=document.getElementById("response-modal");document.getElementById("modal-title"),document.getElementById("modal-message"),document.querySelector(".close").addEventListener("click",()=>{g.style.display="none"}),window.addEventListener("click",v=>{v.target===g&&(g.style.display="none")}),r.addEventListener("submit",async v=>{v.preventDefault(),c.textContent="",p.textContent="";const x=a.value,W=l.value;await h(this,ei).login(x,W)})}showLoading(){const r=document.getElementById("login-button"),a=document.getElementById("button-text"),l=document.getElementById("loading-spinner");a.textContent="Logging in...",l.style.display="inline-block",r.disabled=!0}hideLoading(){const r=document.getElementById("login-button"),a=document.getElementById("button-text"),l=document.getElementById("loading-spinner");a.textContent="Login",l.style.display="none",r.disabled=!1}showError(r){const a=document.getElementById("response-modal"),l=document.getElementById("modal-title"),c=document.getElementById("modal-message");l.textContent="Login Gagal",c.textContent=r,a.style.display="block"}showSuccess(r){const a=document.getElementById("response-modal"),l=document.getElementById("modal-title"),c=document.getElementById("modal-message");l.textContent="Login Berhasil!",c.textContent=r,a.style.display="block",document.querySelector(".close").addEventListener("click",()=>{a.style.display="none"}),window.addEventListener("click",g=>{g.target===a&&(a.style.display="none")})}redirectToHome(){setTimeout(()=>{window.location.hash="#/"},2e3)}}ei=new WeakMap;var vt,Ni,rr;class rs{constructor({view:r}){B(this,Ni);B(this,vt);b(this,vt,r)}async register(r,a,l){try{if(h(this,vt).showLoading(),!r||r.trim().length<2){h(this,vt).showError("Nama harus diisi minimal 2 karakter.");return}if(!a||!O(this,Ni,rr).call(this,a)){h(this,vt).showError("Format email tidak valid.");return}if(!l||l.length<8){h(this,vt).showError("Password harus minimal 8 karakter.");return}const c=await Ja(r.trim(),a.trim(),l);c.error?h(this,vt).showError(c.message||"Pendaftaran gagal. Silakan coba lagi."):(h(this,vt).showSuccess("Pendaftaran berhasil! Anda akan segera dialihkan ke halaman login."),h(this,vt).redirectToLogin())}catch(c){console.error("Register error:",c),h(this,vt).showError("Terjadi kesalahan saat mendaftar. Silakan coba lagi.")}finally{h(this,vt).hideLoading()}}}vt=new WeakMap,Ni=new WeakSet,rr=function(r){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r)};var ii,F,ar,Ln,En,Pn,ge,Ii,sr,lr,Tn;class as{constructor(){B(this,F);B(this,ii);b(this,ii,new rs({view:this}))}async render(){return`
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
    `}async afterRender(){O(this,F,ar).call(this)}showLoading(){const r=document.getElementById("button-text"),a=document.getElementById("loading-spinner"),l=document.getElementById("register-button");r&&a&&l&&(r.style.display="none",a.style.display="inline-block",l.disabled=!0)}hideLoading(){const r=document.getElementById("button-text"),a=document.getElementById("loading-spinner"),l=document.getElementById("register-button");r&&a&&l&&(r.style.display="inline",a.style.display="none",l.disabled=!1)}showSuccess(r){O(this,F,Tn).call(this,"Berhasil!",r,"success")}showError(r){O(this,F,Tn).call(this,"Error!",r,"error")}redirectToLogin(){setTimeout(()=>{window.location.hash="#/login"},2e3)}}ii=new WeakMap,F=new WeakSet,ar=function(){const r=document.getElementById("register-form"),a=document.getElementById("response-modal"),l=document.querySelector(".close");r.addEventListener("submit",c=>{c.preventDefault(),O(this,F,sr).call(this)}),l.addEventListener("click",()=>{a.style.display="none"}),window.addEventListener("click",c=>{c.target===a&&(a.style.display="none")}),document.getElementById("name").addEventListener("blur",()=>{O(this,F,Ln).call(this)}),document.getElementById("email").addEventListener("blur",()=>{O(this,F,En).call(this)}),document.getElementById("password").addEventListener("blur",()=>{O(this,F,Pn).call(this)})},Ln=function(){const r=document.getElementById("name");document.getElementById("name-error");const a=r.value.trim();return a?a.length<2?(O(this,F,ge).call(this,"name-error","Nama harus minimal 2 karakter."),!1):(O(this,F,Ii).call(this,"name-error"),!0):(O(this,F,ge).call(this,"name-error","Nama harus diisi."),!1)},En=function(){const r=document.getElementById("email");document.getElementById("email-error");const a=r.value.trim();return a?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a)?(O(this,F,Ii).call(this,"email-error"),!0):(O(this,F,ge).call(this,"email-error","Format email tidak valid."),!1):(O(this,F,ge).call(this,"email-error","Email harus diisi."),!1)},Pn=function(){const r=document.getElementById("password");document.getElementById("password-error");const a=r.value;return a?a.length<8?(O(this,F,ge).call(this,"password-error","Password harus minimal 8 karakter."),!1):(O(this,F,Ii).call(this,"password-error"),!0):(O(this,F,ge).call(this,"password-error","Password harus diisi."),!1)},ge=function(r,a){const l=document.getElementById(r);l&&(l.textContent=a,l.style.display="block")},Ii=function(r){const a=document.getElementById(r);a&&(a.textContent="",a.style.display="none")},sr=function(){O(this,F,lr).call(this);const r=O(this,F,Ln).call(this),a=O(this,F,En).call(this),l=O(this,F,Pn).call(this);if(!r||!a||!l)return;const c=document.getElementById("name").value.trim(),p=document.getElementById("email").value.trim(),g=document.getElementById("password").value;h(this,ii).register(c,p,g)},lr=function(){document.querySelectorAll(".error-message").forEach(a=>{a.textContent="",a.style.display="none"})},Tn=function(r,a,l){const c=document.getElementById("response-modal"),p=document.getElementById("modal-title"),g=document.getElementById("modal-message");p.textContent=r,g.textContent=a,c.style.display="block",document.querySelector(".close").addEventListener("click",()=>{c.style.display="none"}),window.addEventListener("click",v=>{v.target===c&&(c.style.display="none")})};var Ft;class ss{constructor({view:r}){B(this,Ft);b(this,Ft,r)}async submitStory(r,a,l=null,c=null){try{h(this,Ft).showLoading();const p=await ts(r,a,l,c);p.error?h(this,Ft).showError(p.message||"Failed to submit story. Please try again."):(h(this,Ft).showSuccess("Story submitted successfully!"),h(this,Ft).resetForm())}catch(p){console.error("Error submitting story:",p),h(this,Ft).showError("An error occurred while submitting your story. Please try again.")}finally{h(this,Ft).hideLoading()}}}Ft=new WeakMap;var Xe={exports:{}};/* @preserve
 * Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
 * (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */var ls=Xe.exports,Yo;function cs(){return Yo||(Yo=1,function(u,r){(function(a,l){l(r)})(ls,function(a){var l="1.9.4";function c(t){var e,i,n,o;for(i=1,n=arguments.length;i<n;i++){o=arguments[i];for(e in o)t[e]=o[e]}return t}var p=Object.create||function(){function t(){}return function(e){return t.prototype=e,new t}}();function g(t,e){var i=Array.prototype.slice;if(t.bind)return t.bind.apply(t,i.call(arguments,1));var n=i.call(arguments,2);return function(){return t.apply(e,n.length?n.concat(i.call(arguments)):arguments)}}var k=0;function v(t){return"_leaflet_id"in t||(t._leaflet_id=++k),t._leaflet_id}function x(t,e,i){var n,o,s,d;return d=function(){n=!1,o&&(s.apply(i,o),o=!1)},s=function(){n?o=arguments:(t.apply(i,arguments),setTimeout(d,e),n=!0)},s}function W(t,e,i){var n=e[1],o=e[0],s=n-o;return t===n&&i?t:((t-o)%s+s)%s+o}function T(){return!1}function Y(t,e){if(e===!1)return t;var i=Math.pow(10,e===void 0?6:e);return Math.round(t*i)/i}function yt(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function gt(t){return yt(t).split(/\s+/)}function H(t,e){Object.prototype.hasOwnProperty.call(t,"options")||(t.options=t.options?p(t.options):{});for(var i in e)t.options[i]=e[i];return t.options}function At(t,e,i){var n=[];for(var o in t)n.push(encodeURIComponent(i?o.toUpperCase():o)+"="+encodeURIComponent(t[o]));return(!e||e.indexOf("?")===-1?"?":"&")+n.join("&")}var de=/\{ *([\w_ -]+) *\}/g;function zt(t,e){return t.replace(de,function(i,n){var o=e[n];if(o===void 0)throw new Error("No value provided for variable "+i);return typeof o=="function"&&(o=o(e)),o})}var Q=Array.isArray||function(t){return Object.prototype.toString.call(t)==="[object Array]"};function y(t,e){for(var i=0;i<t.length;i++)if(t[i]===e)return i;return-1}var E="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";function N(t){return window["webkit"+t]||window["moz"+t]||window["ms"+t]}var bt=0;function Tt(t){var e=+new Date,i=Math.max(0,16-(e-bt));return bt=e+i,window.setTimeout(t,i)}var xe=window.requestAnimationFrame||N("RequestAnimationFrame")||Tt,di=window.cancelAnimationFrame||N("CancelAnimationFrame")||N("CancelRequestAnimationFrame")||function(t){window.clearTimeout(t)};function rt(t,e,i){if(i&&xe===Tt)t.call(e);else return xe.call(window,g(t,e))}function at(t){t&&di.call(window,t)}var br={__proto__:null,extend:c,create:p,bind:g,get lastId(){return k},stamp:v,throttle:x,wrapNum:W,falseFn:T,formatNum:Y,trim:yt,splitWords:gt,setOptions:H,getParamString:At,template:zt,isArray:Q,indexOf:y,emptyImageUrl:E,requestFn:xe,cancelFn:di,requestAnimFrame:rt,cancelAnimFrame:at};function Vt(){}Vt.extend=function(t){var e=function(){H(this),this.initialize&&this.initialize.apply(this,arguments),this.callInitHooks()},i=e.__super__=this.prototype,n=p(i);n.constructor=e,e.prototype=n;for(var o in this)Object.prototype.hasOwnProperty.call(this,o)&&o!=="prototype"&&o!=="__super__"&&(e[o]=this[o]);return t.statics&&c(e,t.statics),t.includes&&(wr(t.includes),c.apply(null,[n].concat(t.includes))),c(n,t),delete n.statics,delete n.includes,n.options&&(n.options=i.options?p(i.options):{},c(n.options,t.options)),n._initHooks=[],n.callInitHooks=function(){if(!this._initHooksCalled){i.callInitHooks&&i.callInitHooks.call(this),this._initHooksCalled=!0;for(var s=0,d=n._initHooks.length;s<d;s++)n._initHooks[s].call(this)}},e},Vt.include=function(t){var e=this.prototype.options;return c(this.prototype,t),t.options&&(this.prototype.options=e,this.mergeOptions(t.options)),this},Vt.mergeOptions=function(t){return c(this.prototype.options,t),this},Vt.addInitHook=function(t){var e=Array.prototype.slice.call(arguments,1),i=typeof t=="function"?t:function(){this[t].apply(this,e)};return this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(i),this};function wr(t){if(!(typeof L>"u"||!L||!L.Mixin)){t=Q(t)?t:[t];for(var e=0;e<t.length;e++)t[e]===L.Mixin.Events&&console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.",new Error().stack)}}var _t={on:function(t,e,i){if(typeof t=="object")for(var n in t)this._on(n,t[n],e);else{t=gt(t);for(var o=0,s=t.length;o<s;o++)this._on(t[o],e,i)}return this},off:function(t,e,i){if(!arguments.length)delete this._events;else if(typeof t=="object")for(var n in t)this._off(n,t[n],e);else{t=gt(t);for(var o=arguments.length===1,s=0,d=t.length;s<d;s++)o?this._off(t[s]):this._off(t[s],e,i)}return this},_on:function(t,e,i,n){if(typeof e!="function"){console.warn("wrong listener type: "+typeof e);return}if(this._listens(t,e,i)===!1){i===this&&(i=void 0);var o={fn:e,ctx:i};n&&(o.once=!0),this._events=this._events||{},this._events[t]=this._events[t]||[],this._events[t].push(o)}},_off:function(t,e,i){var n,o,s;if(this._events&&(n=this._events[t],!!n)){if(arguments.length===1){if(this._firingCount)for(o=0,s=n.length;o<s;o++)n[o].fn=T;delete this._events[t];return}if(typeof e!="function"){console.warn("wrong listener type: "+typeof e);return}var d=this._listens(t,e,i);if(d!==!1){var f=n[d];this._firingCount&&(f.fn=T,this._events[t]=n=n.slice()),n.splice(d,1)}}},fire:function(t,e,i){if(!this.listens(t,i))return this;var n=c({},e,{type:t,target:this,sourceTarget:e&&e.sourceTarget||this});if(this._events){var o=this._events[t];if(o){this._firingCount=this._firingCount+1||1;for(var s=0,d=o.length;s<d;s++){var f=o[s],m=f.fn;f.once&&this.off(t,m,f.ctx),m.call(f.ctx||this,n)}this._firingCount--}}return i&&this._propagateEvent(n),this},listens:function(t,e,i,n){typeof t!="string"&&console.warn('"string" type argument expected');var o=e;typeof e!="function"&&(n=!!e,o=void 0,i=void 0);var s=this._events&&this._events[t];if(s&&s.length&&this._listens(t,o,i)!==!1)return!0;if(n){for(var d in this._eventParents)if(this._eventParents[d].listens(t,e,i,n))return!0}return!1},_listens:function(t,e,i){if(!this._events)return!1;var n=this._events[t]||[];if(!e)return!!n.length;i===this&&(i=void 0);for(var o=0,s=n.length;o<s;o++)if(n[o].fn===e&&n[o].ctx===i)return o;return!1},once:function(t,e,i){if(typeof t=="object")for(var n in t)this._on(n,t[n],e,!0);else{t=gt(t);for(var o=0,s=t.length;o<s;o++)this._on(t[o],e,i,!0)}return this},addEventParent:function(t){return this._eventParents=this._eventParents||{},this._eventParents[v(t)]=t,this},removeEventParent:function(t){return this._eventParents&&delete this._eventParents[v(t)],this},_propagateEvent:function(t){for(var e in this._eventParents)this._eventParents[e].fire(t.type,c({layer:t.target,propagatedFrom:t.target},t),!0)}};_t.addEventListener=_t.on,_t.removeEventListener=_t.clearAllEventListeners=_t.off,_t.addOneTimeEventListener=_t.once,_t.fireEvent=_t.fire,_t.hasEventListeners=_t.listens;var Ne=Vt.extend(_t);function M(t,e,i){this.x=i?Math.round(t):t,this.y=i?Math.round(e):e}var On=Math.trunc||function(t){return t>0?Math.floor(t):Math.ceil(t)};M.prototype={clone:function(){return new M(this.x,this.y)},add:function(t){return this.clone()._add(I(t))},_add:function(t){return this.x+=t.x,this.y+=t.y,this},subtract:function(t){return this.clone()._subtract(I(t))},_subtract:function(t){return this.x-=t.x,this.y-=t.y,this},divideBy:function(t){return this.clone()._divideBy(t)},_divideBy:function(t){return this.x/=t,this.y/=t,this},multiplyBy:function(t){return this.clone()._multiplyBy(t)},_multiplyBy:function(t){return this.x*=t,this.y*=t,this},scaleBy:function(t){return new M(this.x*t.x,this.y*t.y)},unscaleBy:function(t){return new M(this.x/t.x,this.y/t.y)},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},ceil:function(){return this.clone()._ceil()},_ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},trunc:function(){return this.clone()._trunc()},_trunc:function(){return this.x=On(this.x),this.y=On(this.y),this},distanceTo:function(t){t=I(t);var e=t.x-this.x,i=t.y-this.y;return Math.sqrt(e*e+i*i)},equals:function(t){return t=I(t),t.x===this.x&&t.y===this.y},contains:function(t){return t=I(t),Math.abs(t.x)<=Math.abs(this.x)&&Math.abs(t.y)<=Math.abs(this.y)},toString:function(){return"Point("+Y(this.x)+", "+Y(this.y)+")"}};function I(t,e,i){return t instanceof M?t:Q(t)?new M(t[0],t[1]):t==null?t:typeof t=="object"&&"x"in t&&"y"in t?new M(t.x,t.y):new M(t,e,i)}function j(t,e){if(t)for(var i=e?[t,e]:t,n=0,o=i.length;n<o;n++)this.extend(i[n])}j.prototype={extend:function(t){var e,i;if(!t)return this;if(t instanceof M||typeof t[0]=="number"||"x"in t)e=i=I(t);else if(t=dt(t),e=t.min,i=t.max,!e||!i)return this;return!this.min&&!this.max?(this.min=e.clone(),this.max=i.clone()):(this.min.x=Math.min(e.x,this.min.x),this.max.x=Math.max(i.x,this.max.x),this.min.y=Math.min(e.y,this.min.y),this.max.y=Math.max(i.y,this.max.y)),this},getCenter:function(t){return I((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,t)},getBottomLeft:function(){return I(this.min.x,this.max.y)},getTopRight:function(){return I(this.max.x,this.min.y)},getTopLeft:function(){return this.min},getBottomRight:function(){return this.max},getSize:function(){return this.max.subtract(this.min)},contains:function(t){var e,i;return typeof t[0]=="number"||t instanceof M?t=I(t):t=dt(t),t instanceof j?(e=t.min,i=t.max):e=i=t,e.x>=this.min.x&&i.x<=this.max.x&&e.y>=this.min.y&&i.y<=this.max.y},intersects:function(t){t=dt(t);var e=this.min,i=this.max,n=t.min,o=t.max,s=o.x>=e.x&&n.x<=i.x,d=o.y>=e.y&&n.y<=i.y;return s&&d},overlaps:function(t){t=dt(t);var e=this.min,i=this.max,n=t.min,o=t.max,s=o.x>e.x&&n.x<i.x,d=o.y>e.y&&n.y<i.y;return s&&d},isValid:function(){return!!(this.min&&this.max)},pad:function(t){var e=this.min,i=this.max,n=Math.abs(e.x-i.x)*t,o=Math.abs(e.y-i.y)*t;return dt(I(e.x-n,e.y-o),I(i.x+n,i.y+o))},equals:function(t){return t?(t=dt(t),this.min.equals(t.getTopLeft())&&this.max.equals(t.getBottomRight())):!1}};function dt(t,e){return!t||t instanceof j?t:new j(t,e)}function ht(t,e){if(t)for(var i=e?[t,e]:t,n=0,o=i.length;n<o;n++)this.extend(i[n])}ht.prototype={extend:function(t){var e=this._southWest,i=this._northEast,n,o;if(t instanceof U)n=t,o=t;else if(t instanceof ht){if(n=t._southWest,o=t._northEast,!n||!o)return this}else return t?this.extend(Z(t)||K(t)):this;return!e&&!i?(this._southWest=new U(n.lat,n.lng),this._northEast=new U(o.lat,o.lng)):(e.lat=Math.min(n.lat,e.lat),e.lng=Math.min(n.lng,e.lng),i.lat=Math.max(o.lat,i.lat),i.lng=Math.max(o.lng,i.lng)),this},pad:function(t){var e=this._southWest,i=this._northEast,n=Math.abs(e.lat-i.lat)*t,o=Math.abs(e.lng-i.lng)*t;return new ht(new U(e.lat-n,e.lng-o),new U(i.lat+n,i.lng+o))},getCenter:function(){return new U((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new U(this.getNorth(),this.getWest())},getSouthEast:function(){return new U(this.getSouth(),this.getEast())},getWest:function(){return this._southWest.lng},getSouth:function(){return this._southWest.lat},getEast:function(){return this._northEast.lng},getNorth:function(){return this._northEast.lat},contains:function(t){typeof t[0]=="number"||t instanceof U||"lat"in t?t=Z(t):t=K(t);var e=this._southWest,i=this._northEast,n,o;return t instanceof ht?(n=t.getSouthWest(),o=t.getNorthEast()):n=o=t,n.lat>=e.lat&&o.lat<=i.lat&&n.lng>=e.lng&&o.lng<=i.lng},intersects:function(t){t=K(t);var e=this._southWest,i=this._northEast,n=t.getSouthWest(),o=t.getNorthEast(),s=o.lat>=e.lat&&n.lat<=i.lat,d=o.lng>=e.lng&&n.lng<=i.lng;return s&&d},overlaps:function(t){t=K(t);var e=this._southWest,i=this._northEast,n=t.getSouthWest(),o=t.getNorthEast(),s=o.lat>e.lat&&n.lat<i.lat,d=o.lng>e.lng&&n.lng<i.lng;return s&&d},toBBoxString:function(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(",")},equals:function(t,e){return t?(t=K(t),this._southWest.equals(t.getSouthWest(),e)&&this._northEast.equals(t.getNorthEast(),e)):!1},isValid:function(){return!!(this._southWest&&this._northEast)}};function K(t,e){return t instanceof ht?t:new ht(t,e)}function U(t,e,i){if(isNaN(t)||isNaN(e))throw new Error("Invalid LatLng object: ("+t+", "+e+")");this.lat=+t,this.lng=+e,i!==void 0&&(this.alt=+i)}U.prototype={equals:function(t,e){if(!t)return!1;t=Z(t);var i=Math.max(Math.abs(this.lat-t.lat),Math.abs(this.lng-t.lng));return i<=(e===void 0?1e-9:e)},toString:function(t){return"LatLng("+Y(this.lat,t)+", "+Y(this.lng,t)+")"},distanceTo:function(t){return oe.distance(this,Z(t))},wrap:function(){return oe.wrapLatLng(this)},toBounds:function(t){var e=180*t/40075017,i=e/Math.cos(Math.PI/180*this.lat);return K([this.lat-e,this.lng-i],[this.lat+e,this.lng+i])},clone:function(){return new U(this.lat,this.lng,this.alt)}};function Z(t,e,i){return t instanceof U?t:Q(t)&&typeof t[0]!="object"?t.length===3?new U(t[0],t[1],t[2]):t.length===2?new U(t[0],t[1]):null:t==null?t:typeof t=="object"&&"lat"in t?new U(t.lat,"lng"in t?t.lng:t.lon,t.alt):e===void 0?null:new U(t,e,i)}var Gt={latLngToPoint:function(t,e){var i=this.projection.project(t),n=this.scale(e);return this.transformation._transform(i,n)},pointToLatLng:function(t,e){var i=this.scale(e),n=this.transformation.untransform(t,i);return this.projection.unproject(n)},project:function(t){return this.projection.project(t)},unproject:function(t){return this.projection.unproject(t)},scale:function(t){return 256*Math.pow(2,t)},zoom:function(t){return Math.log(t/256)/Math.LN2},getProjectedBounds:function(t){if(this.infinite)return null;var e=this.projection.bounds,i=this.scale(t),n=this.transformation.transform(e.min,i),o=this.transformation.transform(e.max,i);return new j(n,o)},infinite:!1,wrapLatLng:function(t){var e=this.wrapLng?W(t.lng,this.wrapLng,!0):t.lng,i=this.wrapLat?W(t.lat,this.wrapLat,!0):t.lat,n=t.alt;return new U(i,e,n)},wrapLatLngBounds:function(t){var e=t.getCenter(),i=this.wrapLatLng(e),n=e.lat-i.lat,o=e.lng-i.lng;if(n===0&&o===0)return t;var s=t.getSouthWest(),d=t.getNorthEast(),f=new U(s.lat-n,s.lng-o),m=new U(d.lat-n,d.lng-o);return new ht(f,m)}},oe=c({},Gt,{wrapLng:[-180,180],R:6371e3,distance:function(t,e){var i=Math.PI/180,n=t.lat*i,o=e.lat*i,s=Math.sin((e.lat-t.lat)*i/2),d=Math.sin((e.lng-t.lng)*i/2),f=s*s+Math.cos(n)*Math.cos(o)*d*d,m=2*Math.atan2(Math.sqrt(f),Math.sqrt(1-f));return this.R*m}}),Nn=6378137,Ri={R:Nn,MAX_LATITUDE:85.0511287798,project:function(t){var e=Math.PI/180,i=this.MAX_LATITUDE,n=Math.max(Math.min(i,t.lat),-i),o=Math.sin(n*e);return new M(this.R*t.lng*e,this.R*Math.log((1+o)/(1-o))/2)},unproject:function(t){var e=180/Math.PI;return new U((2*Math.atan(Math.exp(t.y/this.R))-Math.PI/2)*e,t.x*e/this.R)},bounds:function(){var t=Nn*Math.PI;return new j([-t,-t],[t,t])}()};function Fi(t,e,i,n){if(Q(t)){this._a=t[0],this._b=t[1],this._c=t[2],this._d=t[3];return}this._a=t,this._b=e,this._c=i,this._d=n}Fi.prototype={transform:function(t,e){return this._transform(t.clone(),e)},_transform:function(t,e){return e=e||1,t.x=e*(this._a*t.x+this._b),t.y=e*(this._c*t.y+this._d),t},untransform:function(t,e){return e=e||1,new M((t.x/e-this._b)/this._a,(t.y/e-this._d)/this._c)}};function Ze(t,e,i,n){return new Fi(t,e,i,n)}var Hi=c({},oe,{code:"EPSG:3857",projection:Ri,transformation:function(){var t=.5/(Math.PI*Ri.R);return Ze(t,.5,-t,.5)}()}),xr=c({},Hi,{code:"EPSG:900913"});function Zn(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function Dn(t,e){var i="",n,o,s,d,f,m;for(n=0,s=t.length;n<s;n++){for(f=t[n],o=0,d=f.length;o<d;o++)m=f[o],i+=(o?"L":"M")+m.x+" "+m.y;i+=e?P.svg?"z":"x":""}return i||"M0 0"}var Ui=document.documentElement.style,hi="ActiveXObject"in window,kr=hi&&!document.addEventListener,Rn="msLaunchUri"in navigator&&!("documentMode"in document),Wi=Ot("webkit"),Fn=Ot("android"),Hn=Ot("android 2")||Ot("android 3"),Lr=parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1],10),Er=Fn&&Ot("Google")&&Lr<537&&!("AudioNode"in window),qi=!!window.opera,Un=!Rn&&Ot("chrome"),Wn=Ot("gecko")&&!Wi&&!qi&&!hi,Pr=!Un&&Ot("safari"),qn=Ot("phantom"),jn="OTransition"in Ui,Tr=navigator.platform.indexOf("Win")===0,Vn=hi&&"transition"in Ui,ji="WebKitCSSMatrix"in window&&"m11"in new window.WebKitCSSMatrix&&!Hn,Gn="MozPerspective"in Ui,Sr=!window.L_DISABLE_3D&&(Vn||ji||Gn)&&!jn&&!qn,De=typeof orientation<"u"||Ot("mobile"),Br=De&&Wi,Ir=De&&ji,Yn=!window.PointerEvent&&window.MSPointerEvent,Kn=!!(window.PointerEvent||Yn),$n="ontouchstart"in window||!!window.TouchEvent,Mr=!window.L_NO_TOUCH&&($n||Kn),Cr=De&&qi,Ar=De&&Wn,zr=(window.devicePixelRatio||window.screen.deviceXDPI/window.screen.logicalXDPI)>1,Or=function(){var t=!1;try{var e=Object.defineProperty({},"passive",{get:function(){t=!0}});window.addEventListener("testPassiveEventSupport",T,e),window.removeEventListener("testPassiveEventSupport",T,e)}catch{}return t}(),Nr=function(){return!!document.createElement("canvas").getContext}(),Vi=!!(document.createElementNS&&Zn("svg").createSVGRect),Zr=!!Vi&&function(){var t=document.createElement("div");return t.innerHTML="<svg/>",(t.firstChild&&t.firstChild.namespaceURI)==="http://www.w3.org/2000/svg"}(),Dr=!Vi&&function(){try{var t=document.createElement("div");t.innerHTML='<v:shape adj="1"/>';var e=t.firstChild;return e.style.behavior="url(#default#VML)",e&&typeof e.adj=="object"}catch{return!1}}(),Rr=navigator.platform.indexOf("Mac")===0,Fr=navigator.platform.indexOf("Linux")===0;function Ot(t){return navigator.userAgent.toLowerCase().indexOf(t)>=0}var P={ie:hi,ielt9:kr,edge:Rn,webkit:Wi,android:Fn,android23:Hn,androidStock:Er,opera:qi,chrome:Un,gecko:Wn,safari:Pr,phantom:qn,opera12:jn,win:Tr,ie3d:Vn,webkit3d:ji,gecko3d:Gn,any3d:Sr,mobile:De,mobileWebkit:Br,mobileWebkit3d:Ir,msPointer:Yn,pointer:Kn,touch:Mr,touchNative:$n,mobileOpera:Cr,mobileGecko:Ar,retina:zr,passiveEvents:Or,canvas:Nr,svg:Vi,vml:Dr,inlineSvg:Zr,mac:Rr,linux:Fr},Jn=P.msPointer?"MSPointerDown":"pointerdown",Xn=P.msPointer?"MSPointerMove":"pointermove",Qn=P.msPointer?"MSPointerUp":"pointerup",to=P.msPointer?"MSPointerCancel":"pointercancel",Gi={touchstart:Jn,touchmove:Xn,touchend:Qn,touchcancel:to},eo={touchstart:Vr,touchmove:ui,touchend:ui,touchcancel:ui},ke={},io=!1;function Hr(t,e,i){return e==="touchstart"&&jr(),eo[e]?(i=eo[e].bind(this,i),t.addEventListener(Gi[e],i,!1),i):(console.warn("wrong event specified:",e),T)}function Ur(t,e,i){if(!Gi[e]){console.warn("wrong event specified:",e);return}t.removeEventListener(Gi[e],i,!1)}function Wr(t){ke[t.pointerId]=t}function qr(t){ke[t.pointerId]&&(ke[t.pointerId]=t)}function no(t){delete ke[t.pointerId]}function jr(){io||(document.addEventListener(Jn,Wr,!0),document.addEventListener(Xn,qr,!0),document.addEventListener(Qn,no,!0),document.addEventListener(to,no,!0),io=!0)}function ui(t,e){if(e.pointerType!==(e.MSPOINTER_TYPE_MOUSE||"mouse")){e.touches=[];for(var i in ke)e.touches.push(ke[i]);e.changedTouches=[e],t(e)}}function Vr(t,e){e.MSPOINTER_TYPE_TOUCH&&e.pointerType===e.MSPOINTER_TYPE_TOUCH&&st(e),ui(t,e)}function Gr(t){var e={},i,n;for(n in t)i=t[n],e[n]=i&&i.bind?i.bind(t):i;return t=e,e.type="dblclick",e.detail=2,e.isTrusted=!1,e._simulated=!0,e}var Yr=200;function Kr(t,e){t.addEventListener("dblclick",e);var i=0,n;function o(s){if(s.detail!==1){n=s.detail;return}if(!(s.pointerType==="mouse"||s.sourceCapabilities&&!s.sourceCapabilities.firesTouchEvents)){var d=lo(s);if(!(d.some(function(m){return m instanceof HTMLLabelElement&&m.attributes.for})&&!d.some(function(m){return m instanceof HTMLInputElement||m instanceof HTMLSelectElement}))){var f=Date.now();f-i<=Yr?(n++,n===2&&e(Gr(s))):n=1,i=f}}}return t.addEventListener("click",o),{dblclick:e,simDblclick:o}}function $r(t,e){t.removeEventListener("dblclick",e.dblclick),t.removeEventListener("click",e.simDblclick)}var Yi=pi(["transform","webkitTransform","OTransform","MozTransform","msTransform"]),Re=pi(["webkitTransition","transition","OTransition","MozTransition","msTransition"]),oo=Re==="webkitTransition"||Re==="OTransition"?Re+"End":"transitionend";function ro(t){return typeof t=="string"?document.getElementById(t):t}function Fe(t,e){var i=t.style[e]||t.currentStyle&&t.currentStyle[e];if((!i||i==="auto")&&document.defaultView){var n=document.defaultView.getComputedStyle(t,null);i=n?n[e]:null}return i==="auto"?null:i}function R(t,e,i){var n=document.createElement(t);return n.className=e||"",i&&i.appendChild(n),n}function V(t){var e=t.parentNode;e&&e.removeChild(t)}function fi(t){for(;t.firstChild;)t.removeChild(t.firstChild)}function Le(t){var e=t.parentNode;e&&e.lastChild!==t&&e.appendChild(t)}function Ee(t){var e=t.parentNode;e&&e.firstChild!==t&&e.insertBefore(t,e.firstChild)}function Ki(t,e){if(t.classList!==void 0)return t.classList.contains(e);var i=mi(t);return i.length>0&&new RegExp("(^|\\s)"+e+"(\\s|$)").test(i)}function A(t,e){if(t.classList!==void 0)for(var i=gt(e),n=0,o=i.length;n<o;n++)t.classList.add(i[n]);else if(!Ki(t,e)){var s=mi(t);$i(t,(s?s+" ":"")+e)}}function G(t,e){t.classList!==void 0?t.classList.remove(e):$i(t,yt((" "+mi(t)+" ").replace(" "+e+" "," ")))}function $i(t,e){t.className.baseVal===void 0?t.className=e:t.className.baseVal=e}function mi(t){return t.correspondingElement&&(t=t.correspondingElement),t.className.baseVal===void 0?t.className:t.className.baseVal}function wt(t,e){"opacity"in t.style?t.style.opacity=e:"filter"in t.style&&Jr(t,e)}function Jr(t,e){var i=!1,n="DXImageTransform.Microsoft.Alpha";try{i=t.filters.item(n)}catch{if(e===1)return}e=Math.round(e*100),i?(i.Enabled=e!==100,i.Opacity=e):t.style.filter+=" progid:"+n+"(opacity="+e+")"}function pi(t){for(var e=document.documentElement.style,i=0;i<t.length;i++)if(t[i]in e)return t[i];return!1}function he(t,e,i){var n=e||new M(0,0);t.style[Yi]=(P.ie3d?"translate("+n.x+"px,"+n.y+"px)":"translate3d("+n.x+"px,"+n.y+"px,0)")+(i?" scale("+i+")":"")}function $(t,e){t._leaflet_pos=e,P.any3d?he(t,e):(t.style.left=e.x+"px",t.style.top=e.y+"px")}function ue(t){return t._leaflet_pos||new M(0,0)}var He,Ue,Ji;if("onselectstart"in document)He=function(){C(window,"selectstart",st)},Ue=function(){q(window,"selectstart",st)};else{var We=pi(["userSelect","WebkitUserSelect","OUserSelect","MozUserSelect","msUserSelect"]);He=function(){if(We){var t=document.documentElement.style;Ji=t[We],t[We]="none"}},Ue=function(){We&&(document.documentElement.style[We]=Ji,Ji=void 0)}}function Xi(){C(window,"dragstart",st)}function Qi(){q(window,"dragstart",st)}var gi,tn;function en(t){for(;t.tabIndex===-1;)t=t.parentNode;t.style&&(_i(),gi=t,tn=t.style.outlineStyle,t.style.outlineStyle="none",C(window,"keydown",_i))}function _i(){gi&&(gi.style.outlineStyle=tn,gi=void 0,tn=void 0,q(window,"keydown",_i))}function ao(t){do t=t.parentNode;while((!t.offsetWidth||!t.offsetHeight)&&t!==document.body);return t}function nn(t){var e=t.getBoundingClientRect();return{x:e.width/t.offsetWidth||1,y:e.height/t.offsetHeight||1,boundingClientRect:e}}var Xr={__proto__:null,TRANSFORM:Yi,TRANSITION:Re,TRANSITION_END:oo,get:ro,getStyle:Fe,create:R,remove:V,empty:fi,toFront:Le,toBack:Ee,hasClass:Ki,addClass:A,removeClass:G,setClass:$i,getClass:mi,setOpacity:wt,testProp:pi,setTransform:he,setPosition:$,getPosition:ue,get disableTextSelection(){return He},get enableTextSelection(){return Ue},disableImageDrag:Xi,enableImageDrag:Qi,preventOutline:en,restoreOutline:_i,getSizedParentNode:ao,getScale:nn};function C(t,e,i,n){if(e&&typeof e=="object")for(var o in e)rn(t,o,e[o],i);else{e=gt(e);for(var s=0,d=e.length;s<d;s++)rn(t,e[s],i,n)}return this}var Nt="_leaflet_events";function q(t,e,i,n){if(arguments.length===1)so(t),delete t[Nt];else if(e&&typeof e=="object")for(var o in e)an(t,o,e[o],i);else if(e=gt(e),arguments.length===2)so(t,function(f){return y(e,f)!==-1});else for(var s=0,d=e.length;s<d;s++)an(t,e[s],i,n);return this}function so(t,e){for(var i in t[Nt]){var n=i.split(/\d/)[0];(!e||e(n))&&an(t,n,null,null,i)}}var on={mouseenter:"mouseover",mouseleave:"mouseout",wheel:!("onwheel"in window)&&"mousewheel"};function rn(t,e,i,n){var o=e+v(i)+(n?"_"+v(n):"");if(t[Nt]&&t[Nt][o])return this;var s=function(f){return i.call(n||t,f||window.event)},d=s;!P.touchNative&&P.pointer&&e.indexOf("touch")===0?s=Hr(t,e,s):P.touch&&e==="dblclick"?s=Kr(t,s):"addEventListener"in t?e==="touchstart"||e==="touchmove"||e==="wheel"||e==="mousewheel"?t.addEventListener(on[e]||e,s,P.passiveEvents?{passive:!1}:!1):e==="mouseenter"||e==="mouseleave"?(s=function(f){f=f||window.event,ln(t,f)&&d(f)},t.addEventListener(on[e],s,!1)):t.addEventListener(e,d,!1):t.attachEvent("on"+e,s),t[Nt]=t[Nt]||{},t[Nt][o]=s}function an(t,e,i,n,o){o=o||e+v(i)+(n?"_"+v(n):"");var s=t[Nt]&&t[Nt][o];if(!s)return this;!P.touchNative&&P.pointer&&e.indexOf("touch")===0?Ur(t,e,s):P.touch&&e==="dblclick"?$r(t,s):"removeEventListener"in t?t.removeEventListener(on[e]||e,s,!1):t.detachEvent("on"+e,s),t[Nt][o]=null}function fe(t){return t.stopPropagation?t.stopPropagation():t.originalEvent?t.originalEvent._stopped=!0:t.cancelBubble=!0,this}function sn(t){return rn(t,"wheel",fe),this}function qe(t){return C(t,"mousedown touchstart dblclick contextmenu",fe),t._leaflet_disable_click=!0,this}function st(t){return t.preventDefault?t.preventDefault():t.returnValue=!1,this}function me(t){return st(t),fe(t),this}function lo(t){if(t.composedPath)return t.composedPath();for(var e=[],i=t.target;i;)e.push(i),i=i.parentNode;return e}function co(t,e){if(!e)return new M(t.clientX,t.clientY);var i=nn(e),n=i.boundingClientRect;return new M((t.clientX-n.left)/i.x-e.clientLeft,(t.clientY-n.top)/i.y-e.clientTop)}var Qr=P.linux&&P.chrome?window.devicePixelRatio:P.mac?window.devicePixelRatio*3:window.devicePixelRatio>0?2*window.devicePixelRatio:1;function ho(t){return P.edge?t.wheelDeltaY/2:t.deltaY&&t.deltaMode===0?-t.deltaY/Qr:t.deltaY&&t.deltaMode===1?-t.deltaY*20:t.deltaY&&t.deltaMode===2?-t.deltaY*60:t.deltaX||t.deltaZ?0:t.wheelDelta?(t.wheelDeltaY||t.wheelDelta)/2:t.detail&&Math.abs(t.detail)<32765?-t.detail*20:t.detail?t.detail/-32765*60:0}function ln(t,e){var i=e.relatedTarget;if(!i)return!0;try{for(;i&&i!==t;)i=i.parentNode}catch{return!1}return i!==t}var ta={__proto__:null,on:C,off:q,stopPropagation:fe,disableScrollPropagation:sn,disableClickPropagation:qe,preventDefault:st,stop:me,getPropagationPath:lo,getMousePosition:co,getWheelDelta:ho,isExternalTarget:ln,addListener:C,removeListener:q},uo=Ne.extend({run:function(t,e,i,n){this.stop(),this._el=t,this._inProgress=!0,this._duration=i||.25,this._easeOutPower=1/Math.max(n||.5,.2),this._startPos=ue(t),this._offset=e.subtract(this._startPos),this._startTime=+new Date,this.fire("start"),this._animate()},stop:function(){this._inProgress&&(this._step(!0),this._complete())},_animate:function(){this._animId=rt(this._animate,this),this._step()},_step:function(t){var e=+new Date-this._startTime,i=this._duration*1e3;e<i?this._runFrame(this._easeOut(e/i),t):(this._runFrame(1),this._complete())},_runFrame:function(t,e){var i=this._startPos.add(this._offset.multiplyBy(t));e&&i._round(),$(this._el,i),this.fire("step")},_complete:function(){at(this._animId),this._inProgress=!1,this.fire("end")},_easeOut:function(t){return 1-Math.pow(1-t,this._easeOutPower)}}),D=Ne.extend({options:{crs:Hi,center:void 0,zoom:void 0,minZoom:void 0,maxZoom:void 0,layers:[],maxBounds:void 0,renderer:void 0,zoomAnimation:!0,zoomAnimationThreshold:4,fadeAnimation:!0,markerZoomAnimation:!0,transform3DLimit:8388608,zoomSnap:1,zoomDelta:1,trackResize:!0},initialize:function(t,e){e=H(this,e),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._sizeChanged=!0,this._initContainer(t),this._initLayout(),this._onResize=g(this._onResize,this),this._initEvents(),e.maxBounds&&this.setMaxBounds(e.maxBounds),e.zoom!==void 0&&(this._zoom=this._limitZoom(e.zoom)),e.center&&e.zoom!==void 0&&this.setView(Z(e.center),e.zoom,{reset:!0}),this.callInitHooks(),this._zoomAnimated=Re&&P.any3d&&!P.mobileOpera&&this.options.zoomAnimation,this._zoomAnimated&&(this._createAnimProxy(),C(this._proxy,oo,this._catchTransitionEnd,this)),this._addLayers(this.options.layers)},setView:function(t,e,i){if(e=e===void 0?this._zoom:this._limitZoom(e),t=this._limitCenter(Z(t),e,this.options.maxBounds),i=i||{},this._stop(),this._loaded&&!i.reset&&i!==!0){i.animate!==void 0&&(i.zoom=c({animate:i.animate},i.zoom),i.pan=c({animate:i.animate,duration:i.duration},i.pan));var n=this._zoom!==e?this._tryAnimatedZoom&&this._tryAnimatedZoom(t,e,i.zoom):this._tryAnimatedPan(t,i.pan);if(n)return clearTimeout(this._sizeTimer),this}return this._resetView(t,e,i.pan&&i.pan.noMoveStart),this},setZoom:function(t,e){return this._loaded?this.setView(this.getCenter(),t,{zoom:e}):(this._zoom=t,this)},zoomIn:function(t,e){return t=t||(P.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom+t,e)},zoomOut:function(t,e){return t=t||(P.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom-t,e)},setZoomAround:function(t,e,i){var n=this.getZoomScale(e),o=this.getSize().divideBy(2),s=t instanceof M?t:this.latLngToContainerPoint(t),d=s.subtract(o).multiplyBy(1-1/n),f=this.containerPointToLatLng(o.add(d));return this.setView(f,e,{zoom:i})},_getBoundsCenterZoom:function(t,e){e=e||{},t=t.getBounds?t.getBounds():K(t);var i=I(e.paddingTopLeft||e.padding||[0,0]),n=I(e.paddingBottomRight||e.padding||[0,0]),o=this.getBoundsZoom(t,!1,i.add(n));if(o=typeof e.maxZoom=="number"?Math.min(e.maxZoom,o):o,o===1/0)return{center:t.getCenter(),zoom:o};var s=n.subtract(i).divideBy(2),d=this.project(t.getSouthWest(),o),f=this.project(t.getNorthEast(),o),m=this.unproject(d.add(f).divideBy(2).add(s),o);return{center:m,zoom:o}},fitBounds:function(t,e){if(t=K(t),!t.isValid())throw new Error("Bounds are not valid.");var i=this._getBoundsCenterZoom(t,e);return this.setView(i.center,i.zoom,e)},fitWorld:function(t){return this.fitBounds([[-90,-180],[90,180]],t)},panTo:function(t,e){return this.setView(t,this._zoom,{pan:e})},panBy:function(t,e){if(t=I(t).round(),e=e||{},!t.x&&!t.y)return this.fire("moveend");if(e.animate!==!0&&!this.getSize().contains(t))return this._resetView(this.unproject(this.project(this.getCenter()).add(t)),this.getZoom()),this;if(this._panAnim||(this._panAnim=new uo,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),e.noMoveStart||this.fire("movestart"),e.animate!==!1){A(this._mapPane,"leaflet-pan-anim");var i=this._getMapPanePos().subtract(t).round();this._panAnim.run(this._mapPane,i,e.duration||.25,e.easeLinearity)}else this._rawPanBy(t),this.fire("move").fire("moveend");return this},flyTo:function(t,e,i){if(i=i||{},i.animate===!1||!P.any3d)return this.setView(t,e,i);this._stop();var n=this.project(this.getCenter()),o=this.project(t),s=this.getSize(),d=this._zoom;t=Z(t),e=e===void 0?d:e;var f=Math.max(s.x,s.y),m=f*this.getZoomScale(d,e),_=o.distanceTo(n)||1,w=1.42,S=w*w;function z(J){var Bi=J?-1:1,Ua=J?m:f,Wa=m*m-f*f+Bi*S*S*_*_,qa=2*Ua*S*_,yn=Wa/qa,Vo=Math.sqrt(yn*yn+1)-yn,ja=Vo<1e-9?-18:Math.log(Vo);return ja}function ct(J){return(Math.exp(J)-Math.exp(-J))/2}function et(J){return(Math.exp(J)+Math.exp(-J))/2}function kt(J){return ct(J)/et(J)}var ut=z(0);function Me(J){return f*(et(ut)/et(ut+w*J))}function Da(J){return f*(et(ut)*kt(ut+w*J)-ct(ut))/S}function Ra(J){return 1-Math.pow(1-J,1.5)}var Fa=Date.now(),qo=(z(1)-ut)/w,Ha=i.duration?1e3*i.duration:1e3*qo*.8;function jo(){var J=(Date.now()-Fa)/Ha,Bi=Ra(J)*qo;J<=1?(this._flyToFrame=rt(jo,this),this._move(this.unproject(n.add(o.subtract(n).multiplyBy(Da(Bi)/_)),d),this.getScaleZoom(f/Me(Bi),d),{flyTo:!0})):this._move(t,e)._moveEnd(!0)}return this._moveStart(!0,i.noMoveStart),jo.call(this),this},flyToBounds:function(t,e){var i=this._getBoundsCenterZoom(t,e);return this.flyTo(i.center,i.zoom,e)},setMaxBounds:function(t){return t=K(t),this.listens("moveend",this._panInsideMaxBounds)&&this.off("moveend",this._panInsideMaxBounds),t.isValid()?(this.options.maxBounds=t,this._loaded&&this._panInsideMaxBounds(),this.on("moveend",this._panInsideMaxBounds)):(this.options.maxBounds=null,this)},setMinZoom:function(t){var e=this.options.minZoom;return this.options.minZoom=t,this._loaded&&e!==t&&(this.fire("zoomlevelschange"),this.getZoom()<this.options.minZoom)?this.setZoom(t):this},setMaxZoom:function(t){var e=this.options.maxZoom;return this.options.maxZoom=t,this._loaded&&e!==t&&(this.fire("zoomlevelschange"),this.getZoom()>this.options.maxZoom)?this.setZoom(t):this},panInsideBounds:function(t,e){this._enforcingBounds=!0;var i=this.getCenter(),n=this._limitCenter(i,this._zoom,K(t));return i.equals(n)||this.panTo(n,e),this._enforcingBounds=!1,this},panInside:function(t,e){e=e||{};var i=I(e.paddingTopLeft||e.padding||[0,0]),n=I(e.paddingBottomRight||e.padding||[0,0]),o=this.project(this.getCenter()),s=this.project(t),d=this.getPixelBounds(),f=dt([d.min.add(i),d.max.subtract(n)]),m=f.getSize();if(!f.contains(s)){this._enforcingBounds=!0;var _=s.subtract(f.getCenter()),w=f.extend(s).getSize().subtract(m);o.x+=_.x<0?-w.x:w.x,o.y+=_.y<0?-w.y:w.y,this.panTo(this.unproject(o),e),this._enforcingBounds=!1}return this},invalidateSize:function(t){if(!this._loaded)return this;t=c({animate:!1,pan:!0},t===!0?{animate:!0}:t);var e=this.getSize();this._sizeChanged=!0,this._lastCenter=null;var i=this.getSize(),n=e.divideBy(2).round(),o=i.divideBy(2).round(),s=n.subtract(o);return!s.x&&!s.y?this:(t.animate&&t.pan?this.panBy(s):(t.pan&&this._rawPanBy(s),this.fire("move"),t.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(g(this.fire,this,"moveend"),200)):this.fire("moveend")),this.fire("resize",{oldSize:e,newSize:i}))},stop:function(){return this.setZoom(this._limitZoom(this._zoom)),this.options.zoomSnap||this.fire("viewreset"),this._stop()},locate:function(t){if(t=this._locateOptions=c({timeout:1e4,watch:!1},t),!("geolocation"in navigator))return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var e=g(this._handleGeolocationResponse,this),i=g(this._handleGeolocationError,this);return t.watch?this._locationWatchId=navigator.geolocation.watchPosition(e,i,t):navigator.geolocation.getCurrentPosition(e,i,t),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this},_handleGeolocationError:function(t){if(this._container._leaflet_id){var e=t.code,i=t.message||(e===1?"permission denied":e===2?"position unavailable":"timeout");this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:e,message:"Geolocation error: "+i+"."})}},_handleGeolocationResponse:function(t){if(this._container._leaflet_id){var e=t.coords.latitude,i=t.coords.longitude,n=new U(e,i),o=n.toBounds(t.coords.accuracy*2),s=this._locateOptions;if(s.setView){var d=this.getBoundsZoom(o);this.setView(n,s.maxZoom?Math.min(d,s.maxZoom):d)}var f={latlng:n,bounds:o,timestamp:t.timestamp};for(var m in t.coords)typeof t.coords[m]=="number"&&(f[m]=t.coords[m]);this.fire("locationfound",f)}},addHandler:function(t,e){if(!e)return this;var i=this[t]=new e(this);return this._handlers.push(i),this.options[t]&&i.enable(),this},remove:function(){if(this._initEvents(!0),this.options.maxBounds&&this.off("moveend",this._panInsideMaxBounds),this._containerId!==this._container._leaflet_id)throw new Error("Map container is being reused by another instance");try{delete this._container._leaflet_id,delete this._containerId}catch{this._container._leaflet_id=void 0,this._containerId=void 0}this._locationWatchId!==void 0&&this.stopLocate(),this._stop(),V(this._mapPane),this._clearControlPos&&this._clearControlPos(),this._resizeRequest&&(at(this._resizeRequest),this._resizeRequest=null),this._clearHandlers(),this._loaded&&this.fire("unload");var t;for(t in this._layers)this._layers[t].remove();for(t in this._panes)V(this._panes[t]);return this._layers=[],this._panes=[],delete this._mapPane,delete this._renderer,this},createPane:function(t,e){var i="leaflet-pane"+(t?" leaflet-"+t.replace("Pane","")+"-pane":""),n=R("div",i,e||this._mapPane);return t&&(this._panes[t]=n),n},getCenter:function(){return this._checkIfLoaded(),this._lastCenter&&!this._moved()?this._lastCenter.clone():this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var t=this.getPixelBounds(),e=this.unproject(t.getBottomLeft()),i=this.unproject(t.getTopRight());return new ht(e,i)},getMinZoom:function(){return this.options.minZoom===void 0?this._layersMinZoom||0:this.options.minZoom},getMaxZoom:function(){return this.options.maxZoom===void 0?this._layersMaxZoom===void 0?1/0:this._layersMaxZoom:this.options.maxZoom},getBoundsZoom:function(t,e,i){t=K(t),i=I(i||[0,0]);var n=this.getZoom()||0,o=this.getMinZoom(),s=this.getMaxZoom(),d=t.getNorthWest(),f=t.getSouthEast(),m=this.getSize().subtract(i),_=dt(this.project(f,n),this.project(d,n)).getSize(),w=P.any3d?this.options.zoomSnap:1,S=m.x/_.x,z=m.y/_.y,ct=e?Math.max(S,z):Math.min(S,z);return n=this.getScaleZoom(ct,n),w&&(n=Math.round(n/(w/100))*(w/100),n=e?Math.ceil(n/w)*w:Math.floor(n/w)*w),Math.max(o,Math.min(s,n))},getSize:function(){return(!this._size||this._sizeChanged)&&(this._size=new M(this._container.clientWidth||0,this._container.clientHeight||0),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(t,e){var i=this._getTopLeftPoint(t,e);return new j(i,i.add(this.getSize()))},getPixelOrigin:function(){return this._checkIfLoaded(),this._pixelOrigin},getPixelWorldBounds:function(t){return this.options.crs.getProjectedBounds(t===void 0?this.getZoom():t)},getPane:function(t){return typeof t=="string"?this._panes[t]:t},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(t,e){var i=this.options.crs;return e=e===void 0?this._zoom:e,i.scale(t)/i.scale(e)},getScaleZoom:function(t,e){var i=this.options.crs;e=e===void 0?this._zoom:e;var n=i.zoom(t*i.scale(e));return isNaN(n)?1/0:n},project:function(t,e){return e=e===void 0?this._zoom:e,this.options.crs.latLngToPoint(Z(t),e)},unproject:function(t,e){return e=e===void 0?this._zoom:e,this.options.crs.pointToLatLng(I(t),e)},layerPointToLatLng:function(t){var e=I(t).add(this.getPixelOrigin());return this.unproject(e)},latLngToLayerPoint:function(t){var e=this.project(Z(t))._round();return e._subtract(this.getPixelOrigin())},wrapLatLng:function(t){return this.options.crs.wrapLatLng(Z(t))},wrapLatLngBounds:function(t){return this.options.crs.wrapLatLngBounds(K(t))},distance:function(t,e){return this.options.crs.distance(Z(t),Z(e))},containerPointToLayerPoint:function(t){return I(t).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(t){return I(t).add(this._getMapPanePos())},containerPointToLatLng:function(t){var e=this.containerPointToLayerPoint(I(t));return this.layerPointToLatLng(e)},latLngToContainerPoint:function(t){return this.layerPointToContainerPoint(this.latLngToLayerPoint(Z(t)))},mouseEventToContainerPoint:function(t){return co(t,this._container)},mouseEventToLayerPoint:function(t){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))},mouseEventToLatLng:function(t){return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))},_initContainer:function(t){var e=this._container=ro(t);if(e){if(e._leaflet_id)throw new Error("Map container is already initialized.")}else throw new Error("Map container not found.");C(e,"scroll",this._onScroll,this),this._containerId=v(e)},_initLayout:function(){var t=this._container;this._fadeAnimated=this.options.fadeAnimation&&P.any3d,A(t,"leaflet-container"+(P.touch?" leaflet-touch":"")+(P.retina?" leaflet-retina":"")+(P.ielt9?" leaflet-oldie":"")+(P.safari?" leaflet-safari":"")+(this._fadeAnimated?" leaflet-fade-anim":""));var e=Fe(t,"position");e!=="absolute"&&e!=="relative"&&e!=="fixed"&&e!=="sticky"&&(t.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var t=this._panes={};this._paneRenderers={},this._mapPane=this.createPane("mapPane",this._container),$(this._mapPane,new M(0,0)),this.createPane("tilePane"),this.createPane("overlayPane"),this.createPane("shadowPane"),this.createPane("markerPane"),this.createPane("tooltipPane"),this.createPane("popupPane"),this.options.markerZoomAnimation||(A(t.markerPane,"leaflet-zoom-hide"),A(t.shadowPane,"leaflet-zoom-hide"))},_resetView:function(t,e,i){$(this._mapPane,new M(0,0));var n=!this._loaded;this._loaded=!0,e=this._limitZoom(e),this.fire("viewprereset");var o=this._zoom!==e;this._moveStart(o,i)._move(t,e)._moveEnd(o),this.fire("viewreset"),n&&this.fire("load")},_moveStart:function(t,e){return t&&this.fire("zoomstart"),e||this.fire("movestart"),this},_move:function(t,e,i,n){e===void 0&&(e=this._zoom);var o=this._zoom!==e;return this._zoom=e,this._lastCenter=t,this._pixelOrigin=this._getNewPixelOrigin(t),n?i&&i.pinch&&this.fire("zoom",i):((o||i&&i.pinch)&&this.fire("zoom",i),this.fire("move",i)),this},_moveEnd:function(t){return t&&this.fire("zoomend"),this.fire("moveend")},_stop:function(){return at(this._flyToFrame),this._panAnim&&this._panAnim.stop(),this},_rawPanBy:function(t){$(this._mapPane,this._getMapPanePos().subtract(t))},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom()},_panInsideMaxBounds:function(){this._enforcingBounds||this.panInsideBounds(this.options.maxBounds)},_checkIfLoaded:function(){if(!this._loaded)throw new Error("Set map center and zoom first.")},_initEvents:function(t){this._targets={},this._targets[v(this._container)]=this;var e=t?q:C;e(this._container,"click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup",this._handleDOMEvent,this),this.options.trackResize&&e(window,"resize",this._onResize,this),P.any3d&&this.options.transform3DLimit&&(t?this.off:this.on).call(this,"moveend",this._onMoveEnd)},_onResize:function(){at(this._resizeRequest),this._resizeRequest=rt(function(){this.invalidateSize({debounceMoveend:!0})},this)},_onScroll:function(){this._container.scrollTop=0,this._container.scrollLeft=0},_onMoveEnd:function(){var t=this._getMapPanePos();Math.max(Math.abs(t.x),Math.abs(t.y))>=this.options.transform3DLimit&&this._resetView(this.getCenter(),this.getZoom())},_findEventTargets:function(t,e){for(var i=[],n,o=e==="mouseout"||e==="mouseover",s=t.target||t.srcElement,d=!1;s;){if(n=this._targets[v(s)],n&&(e==="click"||e==="preclick")&&this._draggableMoved(n)){d=!0;break}if(n&&n.listens(e,!0)&&(o&&!ln(s,t)||(i.push(n),o))||s===this._container)break;s=s.parentNode}return!i.length&&!d&&!o&&this.listens(e,!0)&&(i=[this]),i},_isClickDisabled:function(t){for(;t&&t!==this._container;){if(t._leaflet_disable_click)return!0;t=t.parentNode}},_handleDOMEvent:function(t){var e=t.target||t.srcElement;if(!(!this._loaded||e._leaflet_disable_events||t.type==="click"&&this._isClickDisabled(e))){var i=t.type;i==="mousedown"&&en(e),this._fireDOMEvent(t,i)}},_mouseEvents:["click","dblclick","mouseover","mouseout","contextmenu"],_fireDOMEvent:function(t,e,i){if(t.type==="click"){var n=c({},t);n.type="preclick",this._fireDOMEvent(n,n.type,i)}var o=this._findEventTargets(t,e);if(i){for(var s=[],d=0;d<i.length;d++)i[d].listens(e,!0)&&s.push(i[d]);o=s.concat(o)}if(o.length){e==="contextmenu"&&st(t);var f=o[0],m={originalEvent:t};if(t.type!=="keypress"&&t.type!=="keydown"&&t.type!=="keyup"){var _=f.getLatLng&&(!f._radius||f._radius<=10);m.containerPoint=_?this.latLngToContainerPoint(f.getLatLng()):this.mouseEventToContainerPoint(t),m.layerPoint=this.containerPointToLayerPoint(m.containerPoint),m.latlng=_?f.getLatLng():this.layerPointToLatLng(m.layerPoint)}for(d=0;d<o.length;d++)if(o[d].fire(e,m,!0),m.originalEvent._stopped||o[d].options.bubblingMouseEvents===!1&&y(this._mouseEvents,e)!==-1)return}},_draggableMoved:function(t){return t=t.dragging&&t.dragging.enabled()?t:this,t.dragging&&t.dragging.moved()||this.boxZoom&&this.boxZoom.moved()},_clearHandlers:function(){for(var t=0,e=this._handlers.length;t<e;t++)this._handlers[t].disable()},whenReady:function(t,e){return this._loaded?t.call(e||this,{target:this}):this.on("load",t,e),this},_getMapPanePos:function(){return ue(this._mapPane)||new M(0,0)},_moved:function(){var t=this._getMapPanePos();return t&&!t.equals([0,0])},_getTopLeftPoint:function(t,e){var i=t&&e!==void 0?this._getNewPixelOrigin(t,e):this.getPixelOrigin();return i.subtract(this._getMapPanePos())},_getNewPixelOrigin:function(t,e){var i=this.getSize()._divideBy(2);return this.project(t,e)._subtract(i)._add(this._getMapPanePos())._round()},_latLngToNewLayerPoint:function(t,e,i){var n=this._getNewPixelOrigin(i,e);return this.project(t,e)._subtract(n)},_latLngBoundsToNewLayerBounds:function(t,e,i){var n=this._getNewPixelOrigin(i,e);return dt([this.project(t.getSouthWest(),e)._subtract(n),this.project(t.getNorthWest(),e)._subtract(n),this.project(t.getSouthEast(),e)._subtract(n),this.project(t.getNorthEast(),e)._subtract(n)])},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(t){return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())},_limitCenter:function(t,e,i){if(!i)return t;var n=this.project(t,e),o=this.getSize().divideBy(2),s=new j(n.subtract(o),n.add(o)),d=this._getBoundsOffset(s,i,e);return Math.abs(d.x)<=1&&Math.abs(d.y)<=1?t:this.unproject(n.add(d),e)},_limitOffset:function(t,e){if(!e)return t;var i=this.getPixelBounds(),n=new j(i.min.add(t),i.max.add(t));return t.add(this._getBoundsOffset(n,e))},_getBoundsOffset:function(t,e,i){var n=dt(this.project(e.getNorthEast(),i),this.project(e.getSouthWest(),i)),o=n.min.subtract(t.min),s=n.max.subtract(t.max),d=this._rebound(o.x,-s.x),f=this._rebound(o.y,-s.y);return new M(d,f)},_rebound:function(t,e){return t+e>0?Math.round(t-e)/2:Math.max(0,Math.ceil(t))-Math.max(0,Math.floor(e))},_limitZoom:function(t){var e=this.getMinZoom(),i=this.getMaxZoom(),n=P.any3d?this.options.zoomSnap:1;return n&&(t=Math.round(t/n)*n),Math.max(e,Math.min(i,t))},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){G(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_tryAnimatedPan:function(t,e){var i=this._getCenterOffset(t)._trunc();return(e&&e.animate)!==!0&&!this.getSize().contains(i)?!1:(this.panBy(i,e),!0)},_createAnimProxy:function(){var t=this._proxy=R("div","leaflet-proxy leaflet-zoom-animated");this._panes.mapPane.appendChild(t),this.on("zoomanim",function(e){var i=Yi,n=this._proxy.style[i];he(this._proxy,this.project(e.center,e.zoom),this.getZoomScale(e.zoom,1)),n===this._proxy.style[i]&&this._animatingZoom&&this._onZoomTransitionEnd()},this),this.on("load moveend",this._animMoveEnd,this),this._on("unload",this._destroyAnimProxy,this)},_destroyAnimProxy:function(){V(this._proxy),this.off("load moveend",this._animMoveEnd,this),delete this._proxy},_animMoveEnd:function(){var t=this.getCenter(),e=this.getZoom();he(this._proxy,this.project(t,e),this.getZoomScale(e,1))},_catchTransitionEnd:function(t){this._animatingZoom&&t.propertyName.indexOf("transform")>=0&&this._onZoomTransitionEnd()},_nothingToAnimate:function(){return!this._container.getElementsByClassName("leaflet-zoom-animated").length},_tryAnimatedZoom:function(t,e,i){if(this._animatingZoom)return!0;if(i=i||{},!this._zoomAnimated||i.animate===!1||this._nothingToAnimate()||Math.abs(e-this._zoom)>this.options.zoomAnimationThreshold)return!1;var n=this.getZoomScale(e),o=this._getCenterOffset(t)._divideBy(1-1/n);return i.animate!==!0&&!this.getSize().contains(o)?!1:(rt(function(){this._moveStart(!0,i.noMoveStart||!1)._animateZoom(t,e,!0)},this),!0)},_animateZoom:function(t,e,i,n){this._mapPane&&(i&&(this._animatingZoom=!0,this._animateToCenter=t,this._animateToZoom=e,A(this._mapPane,"leaflet-zoom-anim")),this.fire("zoomanim",{center:t,zoom:e,noUpdate:n}),this._tempFireZoomEvent||(this._tempFireZoomEvent=this._zoom!==this._animateToZoom),this._move(this._animateToCenter,this._animateToZoom,void 0,!0),setTimeout(g(this._onZoomTransitionEnd,this),250))},_onZoomTransitionEnd:function(){this._animatingZoom&&(this._mapPane&&G(this._mapPane,"leaflet-zoom-anim"),this._animatingZoom=!1,this._move(this._animateToCenter,this._animateToZoom,void 0,!0),this._tempFireZoomEvent&&this.fire("zoom"),delete this._tempFireZoomEvent,this.fire("move"),this._moveEnd(!0))}});function ea(t,e){return new D(t,e)}var St=Vt.extend({options:{position:"topright"},initialize:function(t){H(this,t)},getPosition:function(){return this.options.position},setPosition:function(t){var e=this._map;return e&&e.removeControl(this),this.options.position=t,e&&e.addControl(this),this},getContainer:function(){return this._container},addTo:function(t){this.remove(),this._map=t;var e=this._container=this.onAdd(t),i=this.getPosition(),n=t._controlCorners[i];return A(e,"leaflet-control"),i.indexOf("bottom")!==-1?n.insertBefore(e,n.firstChild):n.appendChild(e),this._map.on("unload",this.remove,this),this},remove:function(){return this._map?(V(this._container),this.onRemove&&this.onRemove(this._map),this._map.off("unload",this.remove,this),this._map=null,this):this},_refocusOnMap:function(t){this._map&&t&&t.screenX>0&&t.screenY>0&&this._map.getContainer().focus()}}),je=function(t){return new St(t)};D.include({addControl:function(t){return t.addTo(this),this},removeControl:function(t){return t.remove(),this},_initControlPos:function(){var t=this._controlCorners={},e="leaflet-",i=this._controlContainer=R("div",e+"control-container",this._container);function n(o,s){var d=e+o+" "+e+s;t[o+s]=R("div",d,i)}n("top","left"),n("top","right"),n("bottom","left"),n("bottom","right")},_clearControlPos:function(){for(var t in this._controlCorners)V(this._controlCorners[t]);V(this._controlContainer),delete this._controlCorners,delete this._controlContainer}});var fo=St.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0,hideSingleBase:!1,sortLayers:!1,sortFunction:function(t,e,i,n){return i<n?-1:n<i?1:0}},initialize:function(t,e,i){H(this,i),this._layerControlInputs=[],this._layers=[],this._lastZIndex=0,this._handlingClick=!1,this._preventClick=!1;for(var n in t)this._addLayer(t[n],n);for(n in e)this._addLayer(e[n],n,!0)},onAdd:function(t){this._initLayout(),this._update(),this._map=t,t.on("zoomend",this._checkDisabledLayers,this);for(var e=0;e<this._layers.length;e++)this._layers[e].layer.on("add remove",this._onLayerChange,this);return this._container},addTo:function(t){return St.prototype.addTo.call(this,t),this._expandIfNotCollapsed()},onRemove:function(){this._map.off("zoomend",this._checkDisabledLayers,this);for(var t=0;t<this._layers.length;t++)this._layers[t].layer.off("add remove",this._onLayerChange,this)},addBaseLayer:function(t,e){return this._addLayer(t,e),this._map?this._update():this},addOverlay:function(t,e){return this._addLayer(t,e,!0),this._map?this._update():this},removeLayer:function(t){t.off("add remove",this._onLayerChange,this);var e=this._getLayer(v(t));return e&&this._layers.splice(this._layers.indexOf(e),1),this._map?this._update():this},expand:function(){A(this._container,"leaflet-control-layers-expanded"),this._section.style.height=null;var t=this._map.getSize().y-(this._container.offsetTop+50);return t<this._section.clientHeight?(A(this._section,"leaflet-control-layers-scrollbar"),this._section.style.height=t+"px"):G(this._section,"leaflet-control-layers-scrollbar"),this._checkDisabledLayers(),this},collapse:function(){return G(this._container,"leaflet-control-layers-expanded"),this},_initLayout:function(){var t="leaflet-control-layers",e=this._container=R("div",t),i=this.options.collapsed;e.setAttribute("aria-haspopup",!0),qe(e),sn(e);var n=this._section=R("section",t+"-list");i&&(this._map.on("click",this.collapse,this),C(e,{mouseenter:this._expandSafely,mouseleave:this.collapse},this));var o=this._layersLink=R("a",t+"-toggle",e);o.href="#",o.title="Layers",o.setAttribute("role","button"),C(o,{keydown:function(s){s.keyCode===13&&this._expandSafely()},click:function(s){st(s),this._expandSafely()}},this),i||this.expand(),this._baseLayersList=R("div",t+"-base",n),this._separator=R("div",t+"-separator",n),this._overlaysList=R("div",t+"-overlays",n),e.appendChild(n)},_getLayer:function(t){for(var e=0;e<this._layers.length;e++)if(this._layers[e]&&v(this._layers[e].layer)===t)return this._layers[e]},_addLayer:function(t,e,i){this._map&&t.on("add remove",this._onLayerChange,this),this._layers.push({layer:t,name:e,overlay:i}),this.options.sortLayers&&this._layers.sort(g(function(n,o){return this.options.sortFunction(n.layer,o.layer,n.name,o.name)},this)),this.options.autoZIndex&&t.setZIndex&&(this._lastZIndex++,t.setZIndex(this._lastZIndex)),this._expandIfNotCollapsed()},_update:function(){if(!this._container)return this;fi(this._baseLayersList),fi(this._overlaysList),this._layerControlInputs=[];var t,e,i,n,o=0;for(i=0;i<this._layers.length;i++)n=this._layers[i],this._addItem(n),e=e||n.overlay,t=t||!n.overlay,o+=n.overlay?0:1;return this.options.hideSingleBase&&(t=t&&o>1,this._baseLayersList.style.display=t?"":"none"),this._separator.style.display=e&&t?"":"none",this},_onLayerChange:function(t){this._handlingClick||this._update();var e=this._getLayer(v(t.target)),i=e.overlay?t.type==="add"?"overlayadd":"overlayremove":t.type==="add"?"baselayerchange":null;i&&this._map.fire(i,e)},_createRadioElement:function(t,e){var i='<input type="radio" class="leaflet-control-layers-selector" name="'+t+'"'+(e?' checked="checked"':"")+"/>",n=document.createElement("div");return n.innerHTML=i,n.firstChild},_addItem:function(t){var e=document.createElement("label"),i=this._map.hasLayer(t.layer),n;t.overlay?(n=document.createElement("input"),n.type="checkbox",n.className="leaflet-control-layers-selector",n.defaultChecked=i):n=this._createRadioElement("leaflet-base-layers_"+v(this),i),this._layerControlInputs.push(n),n.layerId=v(t.layer),C(n,"click",this._onInputClick,this);var o=document.createElement("span");o.innerHTML=" "+t.name;var s=document.createElement("span");e.appendChild(s),s.appendChild(n),s.appendChild(o);var d=t.overlay?this._overlaysList:this._baseLayersList;return d.appendChild(e),this._checkDisabledLayers(),e},_onInputClick:function(){if(!this._preventClick){var t=this._layerControlInputs,e,i,n=[],o=[];this._handlingClick=!0;for(var s=t.length-1;s>=0;s--)e=t[s],i=this._getLayer(e.layerId).layer,e.checked?n.push(i):e.checked||o.push(i);for(s=0;s<o.length;s++)this._map.hasLayer(o[s])&&this._map.removeLayer(o[s]);for(s=0;s<n.length;s++)this._map.hasLayer(n[s])||this._map.addLayer(n[s]);this._handlingClick=!1,this._refocusOnMap()}},_checkDisabledLayers:function(){for(var t=this._layerControlInputs,e,i,n=this._map.getZoom(),o=t.length-1;o>=0;o--)e=t[o],i=this._getLayer(e.layerId).layer,e.disabled=i.options.minZoom!==void 0&&n<i.options.minZoom||i.options.maxZoom!==void 0&&n>i.options.maxZoom},_expandIfNotCollapsed:function(){return this._map&&!this.options.collapsed&&this.expand(),this},_expandSafely:function(){var t=this._section;this._preventClick=!0,C(t,"click",st),this.expand();var e=this;setTimeout(function(){q(t,"click",st),e._preventClick=!1})}}),ia=function(t,e,i){return new fo(t,e,i)},cn=St.extend({options:{position:"topleft",zoomInText:'<span aria-hidden="true">+</span>',zoomInTitle:"Zoom in",zoomOutText:'<span aria-hidden="true">&#x2212;</span>',zoomOutTitle:"Zoom out"},onAdd:function(t){var e="leaflet-control-zoom",i=R("div",e+" leaflet-bar"),n=this.options;return this._zoomInButton=this._createButton(n.zoomInText,n.zoomInTitle,e+"-in",i,this._zoomIn),this._zoomOutButton=this._createButton(n.zoomOutText,n.zoomOutTitle,e+"-out",i,this._zoomOut),this._updateDisabled(),t.on("zoomend zoomlevelschange",this._updateDisabled,this),i},onRemove:function(t){t.off("zoomend zoomlevelschange",this._updateDisabled,this)},disable:function(){return this._disabled=!0,this._updateDisabled(),this},enable:function(){return this._disabled=!1,this._updateDisabled(),this},_zoomIn:function(t){!this._disabled&&this._map._zoom<this._map.getMaxZoom()&&this._map.zoomIn(this._map.options.zoomDelta*(t.shiftKey?3:1))},_zoomOut:function(t){!this._disabled&&this._map._zoom>this._map.getMinZoom()&&this._map.zoomOut(this._map.options.zoomDelta*(t.shiftKey?3:1))},_createButton:function(t,e,i,n,o){var s=R("a",i,n);return s.innerHTML=t,s.href="#",s.title=e,s.setAttribute("role","button"),s.setAttribute("aria-label",e),qe(s),C(s,"click",me),C(s,"click",o,this),C(s,"click",this._refocusOnMap,this),s},_updateDisabled:function(){var t=this._map,e="leaflet-disabled";G(this._zoomInButton,e),G(this._zoomOutButton,e),this._zoomInButton.setAttribute("aria-disabled","false"),this._zoomOutButton.setAttribute("aria-disabled","false"),(this._disabled||t._zoom===t.getMinZoom())&&(A(this._zoomOutButton,e),this._zoomOutButton.setAttribute("aria-disabled","true")),(this._disabled||t._zoom===t.getMaxZoom())&&(A(this._zoomInButton,e),this._zoomInButton.setAttribute("aria-disabled","true"))}});D.mergeOptions({zoomControl:!0}),D.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new cn,this.addControl(this.zoomControl))});var na=function(t){return new cn(t)},mo=St.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0},onAdd:function(t){var e="leaflet-control-scale",i=R("div",e),n=this.options;return this._addScales(n,e+"-line",i),t.on(n.updateWhenIdle?"moveend":"move",this._update,this),t.whenReady(this._update,this),i},onRemove:function(t){t.off(this.options.updateWhenIdle?"moveend":"move",this._update,this)},_addScales:function(t,e,i){t.metric&&(this._mScale=R("div",e,i)),t.imperial&&(this._iScale=R("div",e,i))},_update:function(){var t=this._map,e=t.getSize().y/2,i=t.distance(t.containerPointToLatLng([0,e]),t.containerPointToLatLng([this.options.maxWidth,e]));this._updateScales(i)},_updateScales:function(t){this.options.metric&&t&&this._updateMetric(t),this.options.imperial&&t&&this._updateImperial(t)},_updateMetric:function(t){var e=this._getRoundNum(t),i=e<1e3?e+" m":e/1e3+" km";this._updateScale(this._mScale,i,e/t)},_updateImperial:function(t){var e=t*3.2808399,i,n,o;e>5280?(i=e/5280,n=this._getRoundNum(i),this._updateScale(this._iScale,n+" mi",n/i)):(o=this._getRoundNum(e),this._updateScale(this._iScale,o+" ft",o/e))},_updateScale:function(t,e,i){t.style.width=Math.round(this.options.maxWidth*i)+"px",t.innerHTML=e},_getRoundNum:function(t){var e=Math.pow(10,(Math.floor(t)+"").length-1),i=t/e;return i=i>=10?10:i>=5?5:i>=3?3:i>=2?2:1,e*i}}),oa=function(t){return new mo(t)},ra='<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>',dn=St.extend({options:{position:"bottomright",prefix:'<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">'+(P.inlineSvg?ra+" ":"")+"Leaflet</a>"},initialize:function(t){H(this,t),this._attributions={}},onAdd:function(t){t.attributionControl=this,this._container=R("div","leaflet-control-attribution"),qe(this._container);for(var e in t._layers)t._layers[e].getAttribution&&this.addAttribution(t._layers[e].getAttribution());return this._update(),t.on("layeradd",this._addAttribution,this),this._container},onRemove:function(t){t.off("layeradd",this._addAttribution,this)},_addAttribution:function(t){t.layer.getAttribution&&(this.addAttribution(t.layer.getAttribution()),t.layer.once("remove",function(){this.removeAttribution(t.layer.getAttribution())},this))},setPrefix:function(t){return this.options.prefix=t,this._update(),this},addAttribution:function(t){return t?(this._attributions[t]||(this._attributions[t]=0),this._attributions[t]++,this._update(),this):this},removeAttribution:function(t){return t?(this._attributions[t]&&(this._attributions[t]--,this._update()),this):this},_update:function(){if(this._map){var t=[];for(var e in this._attributions)this._attributions[e]&&t.push(e);var i=[];this.options.prefix&&i.push(this.options.prefix),t.length&&i.push(t.join(", ")),this._container.innerHTML=i.join(' <span aria-hidden="true">|</span> ')}}});D.mergeOptions({attributionControl:!0}),D.addInitHook(function(){this.options.attributionControl&&new dn().addTo(this)});var aa=function(t){return new dn(t)};St.Layers=fo,St.Zoom=cn,St.Scale=mo,St.Attribution=dn,je.layers=ia,je.zoom=na,je.scale=oa,je.attribution=aa;var Zt=Vt.extend({initialize:function(t){this._map=t},enable:function(){return this._enabled?this:(this._enabled=!0,this.addHooks(),this)},disable:function(){return this._enabled?(this._enabled=!1,this.removeHooks(),this):this},enabled:function(){return!!this._enabled}});Zt.addTo=function(t,e){return t.addHandler(e,this),this};var sa={Events:_t},po=P.touch?"touchstart mousedown":"mousedown",re=Ne.extend({options:{clickTolerance:3},initialize:function(t,e,i,n){H(this,n),this._element=t,this._dragStartTarget=e||t,this._preventOutline=i},enable:function(){this._enabled||(C(this._dragStartTarget,po,this._onDown,this),this._enabled=!0)},disable:function(){this._enabled&&(re._dragging===this&&this.finishDrag(!0),q(this._dragStartTarget,po,this._onDown,this),this._enabled=!1,this._moved=!1)},_onDown:function(t){if(this._enabled&&(this._moved=!1,!Ki(this._element,"leaflet-zoom-anim"))){if(t.touches&&t.touches.length!==1){re._dragging===this&&this.finishDrag();return}if(!(re._dragging||t.shiftKey||t.which!==1&&t.button!==1&&!t.touches)&&(re._dragging=this,this._preventOutline&&en(this._element),Xi(),He(),!this._moving)){this.fire("down");var e=t.touches?t.touches[0]:t,i=ao(this._element);this._startPoint=new M(e.clientX,e.clientY),this._startPos=ue(this._element),this._parentScale=nn(i);var n=t.type==="mousedown";C(document,n?"mousemove":"touchmove",this._onMove,this),C(document,n?"mouseup":"touchend touchcancel",this._onUp,this)}}},_onMove:function(t){if(this._enabled){if(t.touches&&t.touches.length>1){this._moved=!0;return}var e=t.touches&&t.touches.length===1?t.touches[0]:t,i=new M(e.clientX,e.clientY)._subtract(this._startPoint);!i.x&&!i.y||Math.abs(i.x)+Math.abs(i.y)<this.options.clickTolerance||(i.x/=this._parentScale.x,i.y/=this._parentScale.y,st(t),this._moved||(this.fire("dragstart"),this._moved=!0,A(document.body,"leaflet-dragging"),this._lastTarget=t.target||t.srcElement,window.SVGElementInstance&&this._lastTarget instanceof window.SVGElementInstance&&(this._lastTarget=this._lastTarget.correspondingUseElement),A(this._lastTarget,"leaflet-drag-target")),this._newPos=this._startPos.add(i),this._moving=!0,this._lastEvent=t,this._updatePosition())}},_updatePosition:function(){var t={originalEvent:this._lastEvent};this.fire("predrag",t),$(this._element,this._newPos),this.fire("drag",t)},_onUp:function(){this._enabled&&this.finishDrag()},finishDrag:function(t){G(document.body,"leaflet-dragging"),this._lastTarget&&(G(this._lastTarget,"leaflet-drag-target"),this._lastTarget=null),q(document,"mousemove touchmove",this._onMove,this),q(document,"mouseup touchend touchcancel",this._onUp,this),Qi(),Ue();var e=this._moved&&this._moving;this._moving=!1,re._dragging=!1,e&&this.fire("dragend",{noInertia:t,distance:this._newPos.distanceTo(this._startPos)})}});function go(t,e,i){var n,o=[1,4,2,8],s,d,f,m,_,w,S,z;for(s=0,w=t.length;s<w;s++)t[s]._code=pe(t[s],e);for(f=0;f<4;f++){for(S=o[f],n=[],s=0,w=t.length,d=w-1;s<w;d=s++)m=t[s],_=t[d],m._code&S?_._code&S||(z=vi(_,m,S,e,i),z._code=pe(z,e),n.push(z)):(_._code&S&&(z=vi(_,m,S,e,i),z._code=pe(z,e),n.push(z)),n.push(m));t=n}return t}function _o(t,e){var i,n,o,s,d,f,m,_,w;if(!t||t.length===0)throw new Error("latlngs not passed");xt(t)||(console.warn("latlngs are not flat! Only the first ring will be used"),t=t[0]);var S=Z([0,0]),z=K(t),ct=z.getNorthWest().distanceTo(z.getSouthWest())*z.getNorthEast().distanceTo(z.getNorthWest());ct<1700&&(S=hn(t));var et=t.length,kt=[];for(i=0;i<et;i++){var ut=Z(t[i]);kt.push(e.project(Z([ut.lat-S.lat,ut.lng-S.lng])))}for(f=m=_=0,i=0,n=et-1;i<et;n=i++)o=kt[i],s=kt[n],d=o.y*s.x-s.y*o.x,m+=(o.x+s.x)*d,_+=(o.y+s.y)*d,f+=d*3;f===0?w=kt[0]:w=[m/f,_/f];var Me=e.unproject(I(w));return Z([Me.lat+S.lat,Me.lng+S.lng])}function hn(t){for(var e=0,i=0,n=0,o=0;o<t.length;o++){var s=Z(t[o]);e+=s.lat,i+=s.lng,n++}return Z([e/n,i/n])}var la={__proto__:null,clipPolygon:go,polygonCenter:_o,centroid:hn};function vo(t,e){if(!e||!t.length)return t.slice();var i=e*e;return t=ha(t,i),t=da(t,i),t}function yo(t,e,i){return Math.sqrt(Ve(t,e,i,!0))}function ca(t,e,i){return Ve(t,e,i)}function da(t,e){var i=t.length,n=typeof Uint8Array<"u"?Uint8Array:Array,o=new n(i);o[0]=o[i-1]=1,un(t,o,e,0,i-1);var s,d=[];for(s=0;s<i;s++)o[s]&&d.push(t[s]);return d}function un(t,e,i,n,o){var s=0,d,f,m;for(f=n+1;f<=o-1;f++)m=Ve(t[f],t[n],t[o],!0),m>s&&(d=f,s=m);s>i&&(e[d]=1,un(t,e,i,n,d),un(t,e,i,d,o))}function ha(t,e){for(var i=[t[0]],n=1,o=0,s=t.length;n<s;n++)ua(t[n],t[o])>e&&(i.push(t[n]),o=n);return o<s-1&&i.push(t[s-1]),i}var bo;function wo(t,e,i,n,o){var s=n?bo:pe(t,i),d=pe(e,i),f,m,_;for(bo=d;;){if(!(s|d))return[t,e];if(s&d)return!1;f=s||d,m=vi(t,e,f,i,o),_=pe(m,i),f===s?(t=m,s=_):(e=m,d=_)}}function vi(t,e,i,n,o){var s=e.x-t.x,d=e.y-t.y,f=n.min,m=n.max,_,w;return i&8?(_=t.x+s*(m.y-t.y)/d,w=m.y):i&4?(_=t.x+s*(f.y-t.y)/d,w=f.y):i&2?(_=m.x,w=t.y+d*(m.x-t.x)/s):i&1&&(_=f.x,w=t.y+d*(f.x-t.x)/s),new M(_,w,o)}function pe(t,e){var i=0;return t.x<e.min.x?i|=1:t.x>e.max.x&&(i|=2),t.y<e.min.y?i|=4:t.y>e.max.y&&(i|=8),i}function ua(t,e){var i=e.x-t.x,n=e.y-t.y;return i*i+n*n}function Ve(t,e,i,n){var o=e.x,s=e.y,d=i.x-o,f=i.y-s,m=d*d+f*f,_;return m>0&&(_=((t.x-o)*d+(t.y-s)*f)/m,_>1?(o=i.x,s=i.y):_>0&&(o+=d*_,s+=f*_)),d=t.x-o,f=t.y-s,n?d*d+f*f:new M(o,s)}function xt(t){return!Q(t[0])||typeof t[0][0]!="object"&&typeof t[0][0]<"u"}function xo(t){return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."),xt(t)}function ko(t,e){var i,n,o,s,d,f,m,_;if(!t||t.length===0)throw new Error("latlngs not passed");xt(t)||(console.warn("latlngs are not flat! Only the first ring will be used"),t=t[0]);var w=Z([0,0]),S=K(t),z=S.getNorthWest().distanceTo(S.getSouthWest())*S.getNorthEast().distanceTo(S.getNorthWest());z<1700&&(w=hn(t));var ct=t.length,et=[];for(i=0;i<ct;i++){var kt=Z(t[i]);et.push(e.project(Z([kt.lat-w.lat,kt.lng-w.lng])))}for(i=0,n=0;i<ct-1;i++)n+=et[i].distanceTo(et[i+1])/2;if(n===0)_=et[0];else for(i=0,s=0;i<ct-1;i++)if(d=et[i],f=et[i+1],o=d.distanceTo(f),s+=o,s>n){m=(s-n)/o,_=[f.x-m*(f.x-d.x),f.y-m*(f.y-d.y)];break}var ut=e.unproject(I(_));return Z([ut.lat+w.lat,ut.lng+w.lng])}var fa={__proto__:null,simplify:vo,pointToSegmentDistance:yo,closestPointOnSegment:ca,clipSegment:wo,_getEdgeIntersection:vi,_getBitCode:pe,_sqClosestPointOnSegment:Ve,isFlat:xt,_flat:xo,polylineCenter:ko},fn={project:function(t){return new M(t.lng,t.lat)},unproject:function(t){return new U(t.y,t.x)},bounds:new j([-180,-90],[180,90])},mn={R:6378137,R_MINOR:6356752314245179e-9,bounds:new j([-2003750834279e-5,-1549657073972e-5],[2003750834279e-5,1876465623138e-5]),project:function(t){var e=Math.PI/180,i=this.R,n=t.lat*e,o=this.R_MINOR/i,s=Math.sqrt(1-o*o),d=s*Math.sin(n),f=Math.tan(Math.PI/4-n/2)/Math.pow((1-d)/(1+d),s/2);return n=-i*Math.log(Math.max(f,1e-10)),new M(t.lng*e*i,n)},unproject:function(t){for(var e=180/Math.PI,i=this.R,n=this.R_MINOR/i,o=Math.sqrt(1-n*n),s=Math.exp(-t.y/i),d=Math.PI/2-2*Math.atan(s),f=0,m=.1,_;f<15&&Math.abs(m)>1e-7;f++)_=o*Math.sin(d),_=Math.pow((1-_)/(1+_),o/2),m=Math.PI/2-2*Math.atan(s*_)-d,d+=m;return new U(d*e,t.x*e/i)}},ma={__proto__:null,LonLat:fn,Mercator:mn,SphericalMercator:Ri},pa=c({},oe,{code:"EPSG:3395",projection:mn,transformation:function(){var t=.5/(Math.PI*mn.R);return Ze(t,.5,-t,.5)}()}),Lo=c({},oe,{code:"EPSG:4326",projection:fn,transformation:Ze(1/180,1,-1/180,.5)}),ga=c({},Gt,{projection:fn,transformation:Ze(1,0,-1,0),scale:function(t){return Math.pow(2,t)},zoom:function(t){return Math.log(t)/Math.LN2},distance:function(t,e){var i=e.lng-t.lng,n=e.lat-t.lat;return Math.sqrt(i*i+n*n)},infinite:!0});Gt.Earth=oe,Gt.EPSG3395=pa,Gt.EPSG3857=Hi,Gt.EPSG900913=xr,Gt.EPSG4326=Lo,Gt.Simple=ga;var Bt=Ne.extend({options:{pane:"overlayPane",attribution:null,bubblingMouseEvents:!0},addTo:function(t){return t.addLayer(this),this},remove:function(){return this.removeFrom(this._map||this._mapToAdd)},removeFrom:function(t){return t&&t.removeLayer(this),this},getPane:function(t){return this._map.getPane(t?this.options[t]||t:this.options.pane)},addInteractiveTarget:function(t){return this._map._targets[v(t)]=this,this},removeInteractiveTarget:function(t){return delete this._map._targets[v(t)],this},getAttribution:function(){return this.options.attribution},_layerAdd:function(t){var e=t.target;if(e.hasLayer(this)){if(this._map=e,this._zoomAnimated=e._zoomAnimated,this.getEvents){var i=this.getEvents();e.on(i,this),this.once("remove",function(){e.off(i,this)},this)}this.onAdd(e),this.fire("add"),e.fire("layeradd",{layer:this})}}});D.include({addLayer:function(t){if(!t._layerAdd)throw new Error("The provided object is not a Layer.");var e=v(t);return this._layers[e]?this:(this._layers[e]=t,t._mapToAdd=this,t.beforeAdd&&t.beforeAdd(this),this.whenReady(t._layerAdd,t),this)},removeLayer:function(t){var e=v(t);return this._layers[e]?(this._loaded&&t.onRemove(this),delete this._layers[e],this._loaded&&(this.fire("layerremove",{layer:t}),t.fire("remove")),t._map=t._mapToAdd=null,this):this},hasLayer:function(t){return v(t)in this._layers},eachLayer:function(t,e){for(var i in this._layers)t.call(e,this._layers[i]);return this},_addLayers:function(t){t=t?Q(t)?t:[t]:[];for(var e=0,i=t.length;e<i;e++)this.addLayer(t[e])},_addZoomLimit:function(t){(!isNaN(t.options.maxZoom)||!isNaN(t.options.minZoom))&&(this._zoomBoundLayers[v(t)]=t,this._updateZoomLevels())},_removeZoomLimit:function(t){var e=v(t);this._zoomBoundLayers[e]&&(delete this._zoomBoundLayers[e],this._updateZoomLevels())},_updateZoomLevels:function(){var t=1/0,e=-1/0,i=this._getZoomSpan();for(var n in this._zoomBoundLayers){var o=this._zoomBoundLayers[n].options;t=o.minZoom===void 0?t:Math.min(t,o.minZoom),e=o.maxZoom===void 0?e:Math.max(e,o.maxZoom)}this._layersMaxZoom=e===-1/0?void 0:e,this._layersMinZoom=t===1/0?void 0:t,i!==this._getZoomSpan()&&this.fire("zoomlevelschange"),this.options.maxZoom===void 0&&this._layersMaxZoom&&this.getZoom()>this._layersMaxZoom&&this.setZoom(this._layersMaxZoom),this.options.minZoom===void 0&&this._layersMinZoom&&this.getZoom()<this._layersMinZoom&&this.setZoom(this._layersMinZoom)}});var Pe=Bt.extend({initialize:function(t,e){H(this,e),this._layers={};var i,n;if(t)for(i=0,n=t.length;i<n;i++)this.addLayer(t[i])},addLayer:function(t){var e=this.getLayerId(t);return this._layers[e]=t,this._map&&this._map.addLayer(t),this},removeLayer:function(t){var e=t in this._layers?t:this.getLayerId(t);return this._map&&this._layers[e]&&this._map.removeLayer(this._layers[e]),delete this._layers[e],this},hasLayer:function(t){var e=typeof t=="number"?t:this.getLayerId(t);return e in this._layers},clearLayers:function(){return this.eachLayer(this.removeLayer,this)},invoke:function(t){var e=Array.prototype.slice.call(arguments,1),i,n;for(i in this._layers)n=this._layers[i],n[t]&&n[t].apply(n,e);return this},onAdd:function(t){this.eachLayer(t.addLayer,t)},onRemove:function(t){this.eachLayer(t.removeLayer,t)},eachLayer:function(t,e){for(var i in this._layers)t.call(e,this._layers[i]);return this},getLayer:function(t){return this._layers[t]},getLayers:function(){var t=[];return this.eachLayer(t.push,t),t},setZIndex:function(t){return this.invoke("setZIndex",t)},getLayerId:function(t){return v(t)}}),_a=function(t,e){return new Pe(t,e)},Yt=Pe.extend({addLayer:function(t){return this.hasLayer(t)?this:(t.addEventParent(this),Pe.prototype.addLayer.call(this,t),this.fire("layeradd",{layer:t}))},removeLayer:function(t){return this.hasLayer(t)?(t in this._layers&&(t=this._layers[t]),t.removeEventParent(this),Pe.prototype.removeLayer.call(this,t),this.fire("layerremove",{layer:t})):this},setStyle:function(t){return this.invoke("setStyle",t)},bringToFront:function(){return this.invoke("bringToFront")},bringToBack:function(){return this.invoke("bringToBack")},getBounds:function(){var t=new ht;for(var e in this._layers){var i=this._layers[e];t.extend(i.getBounds?i.getBounds():i.getLatLng())}return t}}),va=function(t,e){return new Yt(t,e)},Te=Vt.extend({options:{popupAnchor:[0,0],tooltipAnchor:[0,0],crossOrigin:!1},initialize:function(t){H(this,t)},createIcon:function(t){return this._createIcon("icon",t)},createShadow:function(t){return this._createIcon("shadow",t)},_createIcon:function(t,e){var i=this._getIconUrl(t);if(!i){if(t==="icon")throw new Error("iconUrl not set in Icon options (see the docs).");return null}var n=this._createImg(i,e&&e.tagName==="IMG"?e:null);return this._setIconStyles(n,t),(this.options.crossOrigin||this.options.crossOrigin==="")&&(n.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),n},_setIconStyles:function(t,e){var i=this.options,n=i[e+"Size"];typeof n=="number"&&(n=[n,n]);var o=I(n),s=I(e==="shadow"&&i.shadowAnchor||i.iconAnchor||o&&o.divideBy(2,!0));t.className="leaflet-marker-"+e+" "+(i.className||""),s&&(t.style.marginLeft=-s.x+"px",t.style.marginTop=-s.y+"px"),o&&(t.style.width=o.x+"px",t.style.height=o.y+"px")},_createImg:function(t,e){return e=e||document.createElement("img"),e.src=t,e},_getIconUrl:function(t){return P.retina&&this.options[t+"RetinaUrl"]||this.options[t+"Url"]}});function ya(t){return new Te(t)}var Ge=Te.extend({options:{iconUrl:"marker-icon.png",iconRetinaUrl:"marker-icon-2x.png",shadowUrl:"marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],tooltipAnchor:[16,-28],shadowSize:[41,41]},_getIconUrl:function(t){return typeof Ge.imagePath!="string"&&(Ge.imagePath=this._detectIconPath()),(this.options.imagePath||Ge.imagePath)+Te.prototype._getIconUrl.call(this,t)},_stripUrl:function(t){var e=function(i,n,o){var s=n.exec(i);return s&&s[o]};return t=e(t,/^url\((['"])?(.+)\1\)$/,2),t&&e(t,/^(.*)marker-icon\.png$/,1)},_detectIconPath:function(){var t=R("div","leaflet-default-icon-path",document.body),e=Fe(t,"background-image")||Fe(t,"backgroundImage");if(document.body.removeChild(t),e=this._stripUrl(e),e)return e;var i=document.querySelector('link[href$="leaflet.css"]');return i?i.href.substring(0,i.href.length-11-1):""}}),Eo=Zt.extend({initialize:function(t){this._marker=t},addHooks:function(){var t=this._marker._icon;this._draggable||(this._draggable=new re(t,t,!0)),this._draggable.on({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).enable(),A(t,"leaflet-marker-draggable")},removeHooks:function(){this._draggable.off({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).disable(),this._marker._icon&&G(this._marker._icon,"leaflet-marker-draggable")},moved:function(){return this._draggable&&this._draggable._moved},_adjustPan:function(t){var e=this._marker,i=e._map,n=this._marker.options.autoPanSpeed,o=this._marker.options.autoPanPadding,s=ue(e._icon),d=i.getPixelBounds(),f=i.getPixelOrigin(),m=dt(d.min._subtract(f).add(o),d.max._subtract(f).subtract(o));if(!m.contains(s)){var _=I((Math.max(m.max.x,s.x)-m.max.x)/(d.max.x-m.max.x)-(Math.min(m.min.x,s.x)-m.min.x)/(d.min.x-m.min.x),(Math.max(m.max.y,s.y)-m.max.y)/(d.max.y-m.max.y)-(Math.min(m.min.y,s.y)-m.min.y)/(d.min.y-m.min.y)).multiplyBy(n);i.panBy(_,{animate:!1}),this._draggable._newPos._add(_),this._draggable._startPos._add(_),$(e._icon,this._draggable._newPos),this._onDrag(t),this._panRequest=rt(this._adjustPan.bind(this,t))}},_onDragStart:function(){this._oldLatLng=this._marker.getLatLng(),this._marker.closePopup&&this._marker.closePopup(),this._marker.fire("movestart").fire("dragstart")},_onPreDrag:function(t){this._marker.options.autoPan&&(at(this._panRequest),this._panRequest=rt(this._adjustPan.bind(this,t)))},_onDrag:function(t){var e=this._marker,i=e._shadow,n=ue(e._icon),o=e._map.layerPointToLatLng(n);i&&$(i,n),e._latlng=o,t.latlng=o,t.oldLatLng=this._oldLatLng,e.fire("move",t).fire("drag",t)},_onDragEnd:function(t){at(this._panRequest),delete this._oldLatLng,this._marker.fire("moveend").fire("dragend",t)}}),yi=Bt.extend({options:{icon:new Ge,interactive:!0,keyboard:!0,title:"",alt:"Marker",zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250,pane:"markerPane",shadowPane:"shadowPane",bubblingMouseEvents:!1,autoPanOnFocus:!0,draggable:!1,autoPan:!1,autoPanPadding:[50,50],autoPanSpeed:10},initialize:function(t,e){H(this,e),this._latlng=Z(t)},onAdd:function(t){this._zoomAnimated=this._zoomAnimated&&t.options.markerZoomAnimation,this._zoomAnimated&&t.on("zoomanim",this._animateZoom,this),this._initIcon(),this.update()},onRemove:function(t){this.dragging&&this.dragging.enabled()&&(this.options.draggable=!0,this.dragging.removeHooks()),delete this.dragging,this._zoomAnimated&&t.off("zoomanim",this._animateZoom,this),this._removeIcon(),this._removeShadow()},getEvents:function(){return{zoom:this.update,viewreset:this.update}},getLatLng:function(){return this._latlng},setLatLng:function(t){var e=this._latlng;return this._latlng=Z(t),this.update(),this.fire("move",{oldLatLng:e,latlng:this._latlng})},setZIndexOffset:function(t){return this.options.zIndexOffset=t,this.update()},getIcon:function(){return this.options.icon},setIcon:function(t){return this.options.icon=t,this._map&&(this._initIcon(),this.update()),this._popup&&this.bindPopup(this._popup,this._popup.options),this},getElement:function(){return this._icon},update:function(){if(this._icon&&this._map){var t=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(t)}return this},_initIcon:function(){var t=this.options,e="leaflet-zoom-"+(this._zoomAnimated?"animated":"hide"),i=t.icon.createIcon(this._icon),n=!1;i!==this._icon&&(this._icon&&this._removeIcon(),n=!0,t.title&&(i.title=t.title),i.tagName==="IMG"&&(i.alt=t.alt||"")),A(i,e),t.keyboard&&(i.tabIndex="0",i.setAttribute("role","button")),this._icon=i,t.riseOnHover&&this.on({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&C(i,"focus",this._panOnFocus,this);var o=t.icon.createShadow(this._shadow),s=!1;o!==this._shadow&&(this._removeShadow(),s=!0),o&&(A(o,e),o.alt=""),this._shadow=o,t.opacity<1&&this._updateOpacity(),n&&this.getPane().appendChild(this._icon),this._initInteraction(),o&&s&&this.getPane(t.shadowPane).appendChild(this._shadow)},_removeIcon:function(){this.options.riseOnHover&&this.off({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&q(this._icon,"focus",this._panOnFocus,this),V(this._icon),this.removeInteractiveTarget(this._icon),this._icon=null},_removeShadow:function(){this._shadow&&V(this._shadow),this._shadow=null},_setPos:function(t){this._icon&&$(this._icon,t),this._shadow&&$(this._shadow,t),this._zIndex=t.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(t){this._icon&&(this._icon.style.zIndex=this._zIndex+t)},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center).round();this._setPos(e)},_initInteraction:function(){if(this.options.interactive&&(A(this._icon,"leaflet-interactive"),this.addInteractiveTarget(this._icon),Eo)){var t=this.options.draggable;this.dragging&&(t=this.dragging.enabled(),this.dragging.disable()),this.dragging=new Eo(this),t&&this.dragging.enable()}},setOpacity:function(t){return this.options.opacity=t,this._map&&this._updateOpacity(),this},_updateOpacity:function(){var t=this.options.opacity;this._icon&&wt(this._icon,t),this._shadow&&wt(this._shadow,t)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)},_panOnFocus:function(){var t=this._map;if(t){var e=this.options.icon.options,i=e.iconSize?I(e.iconSize):I(0,0),n=e.iconAnchor?I(e.iconAnchor):I(0,0);t.panInside(this._latlng,{paddingTopLeft:n,paddingBottomRight:i.subtract(n)})}},_getPopupAnchor:function(){return this.options.icon.options.popupAnchor},_getTooltipAnchor:function(){return this.options.icon.options.tooltipAnchor}});function ba(t,e){return new yi(t,e)}var ae=Bt.extend({options:{stroke:!0,color:"#3388ff",weight:3,opacity:1,lineCap:"round",lineJoin:"round",dashArray:null,dashOffset:null,fill:!1,fillColor:null,fillOpacity:.2,fillRule:"evenodd",interactive:!0,bubblingMouseEvents:!0},beforeAdd:function(t){this._renderer=t.getRenderer(this)},onAdd:function(){this._renderer._initPath(this),this._reset(),this._renderer._addPath(this)},onRemove:function(){this._renderer._removePath(this)},redraw:function(){return this._map&&this._renderer._updatePath(this),this},setStyle:function(t){return H(this,t),this._renderer&&(this._renderer._updateStyle(this),this.options.stroke&&t&&Object.prototype.hasOwnProperty.call(t,"weight")&&this._updateBounds()),this},bringToFront:function(){return this._renderer&&this._renderer._bringToFront(this),this},bringToBack:function(){return this._renderer&&this._renderer._bringToBack(this),this},getElement:function(){return this._path},_reset:function(){this._project(),this._update()},_clickTolerance:function(){return(this.options.stroke?this.options.weight/2:0)+(this._renderer.options.tolerance||0)}}),bi=ae.extend({options:{fill:!0,radius:10},initialize:function(t,e){H(this,e),this._latlng=Z(t),this._radius=this.options.radius},setLatLng:function(t){var e=this._latlng;return this._latlng=Z(t),this.redraw(),this.fire("move",{oldLatLng:e,latlng:this._latlng})},getLatLng:function(){return this._latlng},setRadius:function(t){return this.options.radius=this._radius=t,this.redraw()},getRadius:function(){return this._radius},setStyle:function(t){var e=t&&t.radius||this._radius;return ae.prototype.setStyle.call(this,t),this.setRadius(e),this},_project:function(){this._point=this._map.latLngToLayerPoint(this._latlng),this._updateBounds()},_updateBounds:function(){var t=this._radius,e=this._radiusY||t,i=this._clickTolerance(),n=[t+i,e+i];this._pxBounds=new j(this._point.subtract(n),this._point.add(n))},_update:function(){this._map&&this._updatePath()},_updatePath:function(){this._renderer._updateCircle(this)},_empty:function(){return this._radius&&!this._renderer._bounds.intersects(this._pxBounds)},_containsPoint:function(t){return t.distanceTo(this._point)<=this._radius+this._clickTolerance()}});function wa(t,e){return new bi(t,e)}var pn=bi.extend({initialize:function(t,e,i){if(typeof e=="number"&&(e=c({},i,{radius:e})),H(this,e),this._latlng=Z(t),isNaN(this.options.radius))throw new Error("Circle radius cannot be NaN");this._mRadius=this.options.radius},setRadius:function(t){return this._mRadius=t,this.redraw()},getRadius:function(){return this._mRadius},getBounds:function(){var t=[this._radius,this._radiusY||this._radius];return new ht(this._map.layerPointToLatLng(this._point.subtract(t)),this._map.layerPointToLatLng(this._point.add(t)))},setStyle:ae.prototype.setStyle,_project:function(){var t=this._latlng.lng,e=this._latlng.lat,i=this._map,n=i.options.crs;if(n.distance===oe.distance){var o=Math.PI/180,s=this._mRadius/oe.R/o,d=i.project([e+s,t]),f=i.project([e-s,t]),m=d.add(f).divideBy(2),_=i.unproject(m).lat,w=Math.acos((Math.cos(s*o)-Math.sin(e*o)*Math.sin(_*o))/(Math.cos(e*o)*Math.cos(_*o)))/o;(isNaN(w)||w===0)&&(w=s/Math.cos(Math.PI/180*e)),this._point=m.subtract(i.getPixelOrigin()),this._radius=isNaN(w)?0:m.x-i.project([_,t-w]).x,this._radiusY=m.y-d.y}else{var S=n.unproject(n.project(this._latlng).subtract([this._mRadius,0]));this._point=i.latLngToLayerPoint(this._latlng),this._radius=this._point.x-i.latLngToLayerPoint(S).x}this._updateBounds()}});function xa(t,e,i){return new pn(t,e,i)}var Kt=ae.extend({options:{smoothFactor:1,noClip:!1},initialize:function(t,e){H(this,e),this._setLatLngs(t)},getLatLngs:function(){return this._latlngs},setLatLngs:function(t){return this._setLatLngs(t),this.redraw()},isEmpty:function(){return!this._latlngs.length},closestLayerPoint:function(t){for(var e=1/0,i=null,n=Ve,o,s,d=0,f=this._parts.length;d<f;d++)for(var m=this._parts[d],_=1,w=m.length;_<w;_++){o=m[_-1],s=m[_];var S=n(t,o,s,!0);S<e&&(e=S,i=n(t,o,s))}return i&&(i.distance=Math.sqrt(e)),i},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return ko(this._defaultShape(),this._map.options.crs)},getBounds:function(){return this._bounds},addLatLng:function(t,e){return e=e||this._defaultShape(),t=Z(t),e.push(t),this._bounds.extend(t),this.redraw()},_setLatLngs:function(t){this._bounds=new ht,this._latlngs=this._convertLatLngs(t)},_defaultShape:function(){return xt(this._latlngs)?this._latlngs:this._latlngs[0]},_convertLatLngs:function(t){for(var e=[],i=xt(t),n=0,o=t.length;n<o;n++)i?(e[n]=Z(t[n]),this._bounds.extend(e[n])):e[n]=this._convertLatLngs(t[n]);return e},_project:function(){var t=new j;this._rings=[],this._projectLatlngs(this._latlngs,this._rings,t),this._bounds.isValid()&&t.isValid()&&(this._rawPxBounds=t,this._updateBounds())},_updateBounds:function(){var t=this._clickTolerance(),e=new M(t,t);this._rawPxBounds&&(this._pxBounds=new j([this._rawPxBounds.min.subtract(e),this._rawPxBounds.max.add(e)]))},_projectLatlngs:function(t,e,i){var n=t[0]instanceof U,o=t.length,s,d;if(n){for(d=[],s=0;s<o;s++)d[s]=this._map.latLngToLayerPoint(t[s]),i.extend(d[s]);e.push(d)}else for(s=0;s<o;s++)this._projectLatlngs(t[s],e,i)},_clipPoints:function(){var t=this._renderer._bounds;if(this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(t))){if(this.options.noClip){this._parts=this._rings;return}var e=this._parts,i,n,o,s,d,f,m;for(i=0,o=0,s=this._rings.length;i<s;i++)for(m=this._rings[i],n=0,d=m.length;n<d-1;n++)f=wo(m[n],m[n+1],t,n,!0),f&&(e[o]=e[o]||[],e[o].push(f[0]),(f[1]!==m[n+1]||n===d-2)&&(e[o].push(f[1]),o++))}},_simplifyPoints:function(){for(var t=this._parts,e=this.options.smoothFactor,i=0,n=t.length;i<n;i++)t[i]=vo(t[i],e)},_update:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),this._updatePath())},_updatePath:function(){this._renderer._updatePoly(this)},_containsPoint:function(t,e){var i,n,o,s,d,f,m=this._clickTolerance();if(!this._pxBounds||!this._pxBounds.contains(t))return!1;for(i=0,s=this._parts.length;i<s;i++)for(f=this._parts[i],n=0,d=f.length,o=d-1;n<d;o=n++)if(!(!e&&n===0)&&yo(t,f[o],f[n])<=m)return!0;return!1}});function ka(t,e){return new Kt(t,e)}Kt._flat=xo;var Se=Kt.extend({options:{fill:!0},isEmpty:function(){return!this._latlngs.length||!this._latlngs[0].length},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return _o(this._defaultShape(),this._map.options.crs)},_convertLatLngs:function(t){var e=Kt.prototype._convertLatLngs.call(this,t),i=e.length;return i>=2&&e[0]instanceof U&&e[0].equals(e[i-1])&&e.pop(),e},_setLatLngs:function(t){Kt.prototype._setLatLngs.call(this,t),xt(this._latlngs)&&(this._latlngs=[this._latlngs])},_defaultShape:function(){return xt(this._latlngs[0])?this._latlngs[0]:this._latlngs[0][0]},_clipPoints:function(){var t=this._renderer._bounds,e=this.options.weight,i=new M(e,e);if(t=new j(t.min.subtract(i),t.max.add(i)),this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(t))){if(this.options.noClip){this._parts=this._rings;return}for(var n=0,o=this._rings.length,s;n<o;n++)s=go(this._rings[n],t,!0),s.length&&this._parts.push(s)}},_updatePath:function(){this._renderer._updatePoly(this,!0)},_containsPoint:function(t){var e=!1,i,n,o,s,d,f,m,_;if(!this._pxBounds||!this._pxBounds.contains(t))return!1;for(s=0,m=this._parts.length;s<m;s++)for(i=this._parts[s],d=0,_=i.length,f=_-1;d<_;f=d++)n=i[d],o=i[f],n.y>t.y!=o.y>t.y&&t.x<(o.x-n.x)*(t.y-n.y)/(o.y-n.y)+n.x&&(e=!e);return e||Kt.prototype._containsPoint.call(this,t,!0)}});function La(t,e){return new Se(t,e)}var $t=Yt.extend({initialize:function(t,e){H(this,e),this._layers={},t&&this.addData(t)},addData:function(t){var e=Q(t)?t:t.features,i,n,o;if(e){for(i=0,n=e.length;i<n;i++)o=e[i],(o.geometries||o.geometry||o.features||o.coordinates)&&this.addData(o);return this}var s=this.options;if(s.filter&&!s.filter(t))return this;var d=wi(t,s);return d?(d.feature=Li(t),d.defaultOptions=d.options,this.resetStyle(d),s.onEachFeature&&s.onEachFeature(t,d),this.addLayer(d)):this},resetStyle:function(t){return t===void 0?this.eachLayer(this.resetStyle,this):(t.options=c({},t.defaultOptions),this._setLayerStyle(t,this.options.style),this)},setStyle:function(t){return this.eachLayer(function(e){this._setLayerStyle(e,t)},this)},_setLayerStyle:function(t,e){t.setStyle&&(typeof e=="function"&&(e=e(t.feature)),t.setStyle(e))}});function wi(t,e){var i=t.type==="Feature"?t.geometry:t,n=i?i.coordinates:null,o=[],s=e&&e.pointToLayer,d=e&&e.coordsToLatLng||gn,f,m,_,w;if(!n&&!i)return null;switch(i.type){case"Point":return f=d(n),Po(s,t,f,e);case"MultiPoint":for(_=0,w=n.length;_<w;_++)f=d(n[_]),o.push(Po(s,t,f,e));return new Yt(o);case"LineString":case"MultiLineString":return m=xi(n,i.type==="LineString"?0:1,d),new Kt(m,e);case"Polygon":case"MultiPolygon":return m=xi(n,i.type==="Polygon"?1:2,d),new Se(m,e);case"GeometryCollection":for(_=0,w=i.geometries.length;_<w;_++){var S=wi({geometry:i.geometries[_],type:"Feature",properties:t.properties},e);S&&o.push(S)}return new Yt(o);case"FeatureCollection":for(_=0,w=i.features.length;_<w;_++){var z=wi(i.features[_],e);z&&o.push(z)}return new Yt(o);default:throw new Error("Invalid GeoJSON object.")}}function Po(t,e,i,n){return t?t(e,i):new yi(i,n&&n.markersInheritOptions&&n)}function gn(t){return new U(t[1],t[0],t[2])}function xi(t,e,i){for(var n=[],o=0,s=t.length,d;o<s;o++)d=e?xi(t[o],e-1,i):(i||gn)(t[o]),n.push(d);return n}function _n(t,e){return t=Z(t),t.alt!==void 0?[Y(t.lng,e),Y(t.lat,e),Y(t.alt,e)]:[Y(t.lng,e),Y(t.lat,e)]}function ki(t,e,i,n){for(var o=[],s=0,d=t.length;s<d;s++)o.push(e?ki(t[s],xt(t[s])?0:e-1,i,n):_n(t[s],n));return!e&&i&&o.length>0&&o.push(o[0].slice()),o}function Be(t,e){return t.feature?c({},t.feature,{geometry:e}):Li(e)}function Li(t){return t.type==="Feature"||t.type==="FeatureCollection"?t:{type:"Feature",properties:{},geometry:t}}var vn={toGeoJSON:function(t){return Be(this,{type:"Point",coordinates:_n(this.getLatLng(),t)})}};yi.include(vn),pn.include(vn),bi.include(vn),Kt.include({toGeoJSON:function(t){var e=!xt(this._latlngs),i=ki(this._latlngs,e?1:0,!1,t);return Be(this,{type:(e?"Multi":"")+"LineString",coordinates:i})}}),Se.include({toGeoJSON:function(t){var e=!xt(this._latlngs),i=e&&!xt(this._latlngs[0]),n=ki(this._latlngs,i?2:e?1:0,!0,t);return e||(n=[n]),Be(this,{type:(i?"Multi":"")+"Polygon",coordinates:n})}}),Pe.include({toMultiPoint:function(t){var e=[];return this.eachLayer(function(i){e.push(i.toGeoJSON(t).geometry.coordinates)}),Be(this,{type:"MultiPoint",coordinates:e})},toGeoJSON:function(t){var e=this.feature&&this.feature.geometry&&this.feature.geometry.type;if(e==="MultiPoint")return this.toMultiPoint(t);var i=e==="GeometryCollection",n=[];return this.eachLayer(function(o){if(o.toGeoJSON){var s=o.toGeoJSON(t);if(i)n.push(s.geometry);else{var d=Li(s);d.type==="FeatureCollection"?n.push.apply(n,d.features):n.push(d)}}}),i?Be(this,{geometries:n,type:"GeometryCollection"}):{type:"FeatureCollection",features:n}}});function To(t,e){return new $t(t,e)}var Ea=To,Ei=Bt.extend({options:{opacity:1,alt:"",interactive:!1,crossOrigin:!1,errorOverlayUrl:"",zIndex:1,className:""},initialize:function(t,e,i){this._url=t,this._bounds=K(e),H(this,i)},onAdd:function(){this._image||(this._initImage(),this.options.opacity<1&&this._updateOpacity()),this.options.interactive&&(A(this._image,"leaflet-interactive"),this.addInteractiveTarget(this._image)),this.getPane().appendChild(this._image),this._reset()},onRemove:function(){V(this._image),this.options.interactive&&this.removeInteractiveTarget(this._image)},setOpacity:function(t){return this.options.opacity=t,this._image&&this._updateOpacity(),this},setStyle:function(t){return t.opacity&&this.setOpacity(t.opacity),this},bringToFront:function(){return this._map&&Le(this._image),this},bringToBack:function(){return this._map&&Ee(this._image),this},setUrl:function(t){return this._url=t,this._image&&(this._image.src=t),this},setBounds:function(t){return this._bounds=K(t),this._map&&this._reset(),this},getEvents:function(){var t={zoom:this._reset,viewreset:this._reset};return this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},setZIndex:function(t){return this.options.zIndex=t,this._updateZIndex(),this},getBounds:function(){return this._bounds},getElement:function(){return this._image},_initImage:function(){var t=this._url.tagName==="IMG",e=this._image=t?this._url:R("img");if(A(e,"leaflet-image-layer"),this._zoomAnimated&&A(e,"leaflet-zoom-animated"),this.options.className&&A(e,this.options.className),e.onselectstart=T,e.onmousemove=T,e.onload=g(this.fire,this,"load"),e.onerror=g(this._overlayOnError,this,"error"),(this.options.crossOrigin||this.options.crossOrigin==="")&&(e.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),this.options.zIndex&&this._updateZIndex(),t){this._url=e.src;return}e.src=this._url,e.alt=this.options.alt},_animateZoom:function(t){var e=this._map.getZoomScale(t.zoom),i=this._map._latLngBoundsToNewLayerBounds(this._bounds,t.zoom,t.center).min;he(this._image,i,e)},_reset:function(){var t=this._image,e=new j(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast())),i=e.getSize();$(t,e.min),t.style.width=i.x+"px",t.style.height=i.y+"px"},_updateOpacity:function(){wt(this._image,this.options.opacity)},_updateZIndex:function(){this._image&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._image.style.zIndex=this.options.zIndex)},_overlayOnError:function(){this.fire("error");var t=this.options.errorOverlayUrl;t&&this._url!==t&&(this._url=t,this._image.src=t)},getCenter:function(){return this._bounds.getCenter()}}),Pa=function(t,e,i){return new Ei(t,e,i)},So=Ei.extend({options:{autoplay:!0,loop:!0,keepAspectRatio:!0,muted:!1,playsInline:!0},_initImage:function(){var t=this._url.tagName==="VIDEO",e=this._image=t?this._url:R("video");if(A(e,"leaflet-image-layer"),this._zoomAnimated&&A(e,"leaflet-zoom-animated"),this.options.className&&A(e,this.options.className),e.onselectstart=T,e.onmousemove=T,e.onloadeddata=g(this.fire,this,"load"),t){for(var i=e.getElementsByTagName("source"),n=[],o=0;o<i.length;o++)n.push(i[o].src);this._url=i.length>0?n:[e.src];return}Q(this._url)||(this._url=[this._url]),!this.options.keepAspectRatio&&Object.prototype.hasOwnProperty.call(e.style,"objectFit")&&(e.style.objectFit="fill"),e.autoplay=!!this.options.autoplay,e.loop=!!this.options.loop,e.muted=!!this.options.muted,e.playsInline=!!this.options.playsInline;for(var s=0;s<this._url.length;s++){var d=R("source");d.src=this._url[s],e.appendChild(d)}}});function Ta(t,e,i){return new So(t,e,i)}var Bo=Ei.extend({_initImage:function(){var t=this._image=this._url;A(t,"leaflet-image-layer"),this._zoomAnimated&&A(t,"leaflet-zoom-animated"),this.options.className&&A(t,this.options.className),t.onselectstart=T,t.onmousemove=T}});function Sa(t,e,i){return new Bo(t,e,i)}var Dt=Bt.extend({options:{interactive:!1,offset:[0,0],className:"",pane:void 0,content:""},initialize:function(t,e){t&&(t instanceof U||Q(t))?(this._latlng=Z(t),H(this,e)):(H(this,t),this._source=e),this.options.content&&(this._content=this.options.content)},openOn:function(t){return t=arguments.length?t:this._source._map,t.hasLayer(this)||t.addLayer(this),this},close:function(){return this._map&&this._map.removeLayer(this),this},toggle:function(t){return this._map?this.close():(arguments.length?this._source=t:t=this._source,this._prepareOpen(),this.openOn(t._map)),this},onAdd:function(t){this._zoomAnimated=t._zoomAnimated,this._container||this._initLayout(),t._fadeAnimated&&wt(this._container,0),clearTimeout(this._removeTimeout),this.getPane().appendChild(this._container),this.update(),t._fadeAnimated&&wt(this._container,1),this.bringToFront(),this.options.interactive&&(A(this._container,"leaflet-interactive"),this.addInteractiveTarget(this._container))},onRemove:function(t){t._fadeAnimated?(wt(this._container,0),this._removeTimeout=setTimeout(g(V,void 0,this._container),200)):V(this._container),this.options.interactive&&(G(this._container,"leaflet-interactive"),this.removeInteractiveTarget(this._container))},getLatLng:function(){return this._latlng},setLatLng:function(t){return this._latlng=Z(t),this._map&&(this._updatePosition(),this._adjustPan()),this},getContent:function(){return this._content},setContent:function(t){return this._content=t,this.update(),this},getElement:function(){return this._container},update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan())},getEvents:function(){var t={zoom:this._updatePosition,viewreset:this._updatePosition};return this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},isOpen:function(){return!!this._map&&this._map.hasLayer(this)},bringToFront:function(){return this._map&&Le(this._container),this},bringToBack:function(){return this._map&&Ee(this._container),this},_prepareOpen:function(t){var e=this._source;if(!e._map)return!1;if(e instanceof Yt){e=null;var i=this._source._layers;for(var n in i)if(i[n]._map){e=i[n];break}if(!e)return!1;this._source=e}if(!t)if(e.getCenter)t=e.getCenter();else if(e.getLatLng)t=e.getLatLng();else if(e.getBounds)t=e.getBounds().getCenter();else throw new Error("Unable to get source layer LatLng.");return this.setLatLng(t),this._map&&this.update(),!0},_updateContent:function(){if(this._content){var t=this._contentNode,e=typeof this._content=="function"?this._content(this._source||this):this._content;if(typeof e=="string")t.innerHTML=e;else{for(;t.hasChildNodes();)t.removeChild(t.firstChild);t.appendChild(e)}this.fire("contentupdate")}},_updatePosition:function(){if(this._map){var t=this._map.latLngToLayerPoint(this._latlng),e=I(this.options.offset),i=this._getAnchor();this._zoomAnimated?$(this._container,t.add(i)):e=e.add(t).add(i);var n=this._containerBottom=-e.y,o=this._containerLeft=-Math.round(this._containerWidth/2)+e.x;this._container.style.bottom=n+"px",this._container.style.left=o+"px"}},_getAnchor:function(){return[0,0]}});D.include({_initOverlay:function(t,e,i,n){var o=e;return o instanceof t||(o=new t(n).setContent(e)),i&&o.setLatLng(i),o}}),Bt.include({_initOverlay:function(t,e,i,n){var o=i;return o instanceof t?(H(o,n),o._source=this):(o=e&&!n?e:new t(n,this),o.setContent(i)),o}});var Pi=Dt.extend({options:{pane:"popupPane",offset:[0,7],maxWidth:300,minWidth:50,maxHeight:null,autoPan:!0,autoPanPaddingTopLeft:null,autoPanPaddingBottomRight:null,autoPanPadding:[5,5],keepInView:!1,closeButton:!0,autoClose:!0,closeOnEscapeKey:!0,className:""},openOn:function(t){return t=arguments.length?t:this._source._map,!t.hasLayer(this)&&t._popup&&t._popup.options.autoClose&&t.removeLayer(t._popup),t._popup=this,Dt.prototype.openOn.call(this,t)},onAdd:function(t){Dt.prototype.onAdd.call(this,t),t.fire("popupopen",{popup:this}),this._source&&(this._source.fire("popupopen",{popup:this},!0),this._source instanceof ae||this._source.on("preclick",fe))},onRemove:function(t){Dt.prototype.onRemove.call(this,t),t.fire("popupclose",{popup:this}),this._source&&(this._source.fire("popupclose",{popup:this},!0),this._source instanceof ae||this._source.off("preclick",fe))},getEvents:function(){var t=Dt.prototype.getEvents.call(this);return(this.options.closeOnClick!==void 0?this.options.closeOnClick:this._map.options.closePopupOnClick)&&(t.preclick=this.close),this.options.keepInView&&(t.moveend=this._adjustPan),t},_initLayout:function(){var t="leaflet-popup",e=this._container=R("div",t+" "+(this.options.className||"")+" leaflet-zoom-animated"),i=this._wrapper=R("div",t+"-content-wrapper",e);if(this._contentNode=R("div",t+"-content",i),qe(e),sn(this._contentNode),C(e,"contextmenu",fe),this._tipContainer=R("div",t+"-tip-container",e),this._tip=R("div",t+"-tip",this._tipContainer),this.options.closeButton){var n=this._closeButton=R("a",t+"-close-button",e);n.setAttribute("role","button"),n.setAttribute("aria-label","Close popup"),n.href="#close",n.innerHTML='<span aria-hidden="true">&#215;</span>',C(n,"click",function(o){st(o),this.close()},this)}},_updateLayout:function(){var t=this._contentNode,e=t.style;e.width="",e.whiteSpace="nowrap";var i=t.offsetWidth;i=Math.min(i,this.options.maxWidth),i=Math.max(i,this.options.minWidth),e.width=i+1+"px",e.whiteSpace="",e.height="";var n=t.offsetHeight,o=this.options.maxHeight,s="leaflet-popup-scrolled";o&&n>o?(e.height=o+"px",A(t,s)):G(t,s),this._containerWidth=this._container.offsetWidth},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center),i=this._getAnchor();$(this._container,e.add(i))},_adjustPan:function(){if(this.options.autoPan){if(this._map._panAnim&&this._map._panAnim.stop(),this._autopanning){this._autopanning=!1;return}var t=this._map,e=parseInt(Fe(this._container,"marginBottom"),10)||0,i=this._container.offsetHeight+e,n=this._containerWidth,o=new M(this._containerLeft,-i-this._containerBottom);o._add(ue(this._container));var s=t.layerPointToContainerPoint(o),d=I(this.options.autoPanPadding),f=I(this.options.autoPanPaddingTopLeft||d),m=I(this.options.autoPanPaddingBottomRight||d),_=t.getSize(),w=0,S=0;s.x+n+m.x>_.x&&(w=s.x+n-_.x+m.x),s.x-w-f.x<0&&(w=s.x-f.x),s.y+i+m.y>_.y&&(S=s.y+i-_.y+m.y),s.y-S-f.y<0&&(S=s.y-f.y),(w||S)&&(this.options.keepInView&&(this._autopanning=!0),t.fire("autopanstart").panBy([w,S]))}},_getAnchor:function(){return I(this._source&&this._source._getPopupAnchor?this._source._getPopupAnchor():[0,0])}}),Ba=function(t,e){return new Pi(t,e)};D.mergeOptions({closePopupOnClick:!0}),D.include({openPopup:function(t,e,i){return this._initOverlay(Pi,t,e,i).openOn(this),this},closePopup:function(t){return t=arguments.length?t:this._popup,t&&t.close(),this}}),Bt.include({bindPopup:function(t,e){return this._popup=this._initOverlay(Pi,this._popup,t,e),this._popupHandlersAdded||(this.on({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!0),this},unbindPopup:function(){return this._popup&&(this.off({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!1,this._popup=null),this},openPopup:function(t){return this._popup&&(this instanceof Yt||(this._popup._source=this),this._popup._prepareOpen(t||this._latlng)&&this._popup.openOn(this._map)),this},closePopup:function(){return this._popup&&this._popup.close(),this},togglePopup:function(){return this._popup&&this._popup.toggle(this),this},isPopupOpen:function(){return this._popup?this._popup.isOpen():!1},setPopupContent:function(t){return this._popup&&this._popup.setContent(t),this},getPopup:function(){return this._popup},_openPopup:function(t){if(!(!this._popup||!this._map)){me(t);var e=t.layer||t.target;if(this._popup._source===e&&!(e instanceof ae)){this._map.hasLayer(this._popup)?this.closePopup():this.openPopup(t.latlng);return}this._popup._source=e,this.openPopup(t.latlng)}},_movePopup:function(t){this._popup.setLatLng(t.latlng)},_onKeyPress:function(t){t.originalEvent.keyCode===13&&this._openPopup(t)}});var Ti=Dt.extend({options:{pane:"tooltipPane",offset:[0,0],direction:"auto",permanent:!1,sticky:!1,opacity:.9},onAdd:function(t){Dt.prototype.onAdd.call(this,t),this.setOpacity(this.options.opacity),t.fire("tooltipopen",{tooltip:this}),this._source&&(this.addEventParent(this._source),this._source.fire("tooltipopen",{tooltip:this},!0))},onRemove:function(t){Dt.prototype.onRemove.call(this,t),t.fire("tooltipclose",{tooltip:this}),this._source&&(this.removeEventParent(this._source),this._source.fire("tooltipclose",{tooltip:this},!0))},getEvents:function(){var t=Dt.prototype.getEvents.call(this);return this.options.permanent||(t.preclick=this.close),t},_initLayout:function(){var t="leaflet-tooltip",e=t+" "+(this.options.className||"")+" leaflet-zoom-"+(this._zoomAnimated?"animated":"hide");this._contentNode=this._container=R("div",e),this._container.setAttribute("role","tooltip"),this._container.setAttribute("id","leaflet-tooltip-"+v(this))},_updateLayout:function(){},_adjustPan:function(){},_setPosition:function(t){var e,i,n=this._map,o=this._container,s=n.latLngToContainerPoint(n.getCenter()),d=n.layerPointToContainerPoint(t),f=this.options.direction,m=o.offsetWidth,_=o.offsetHeight,w=I(this.options.offset),S=this._getAnchor();f==="top"?(e=m/2,i=_):f==="bottom"?(e=m/2,i=0):f==="center"?(e=m/2,i=_/2):f==="right"?(e=0,i=_/2):f==="left"?(e=m,i=_/2):d.x<s.x?(f="right",e=0,i=_/2):(f="left",e=m+(w.x+S.x)*2,i=_/2),t=t.subtract(I(e,i,!0)).add(w).add(S),G(o,"leaflet-tooltip-right"),G(o,"leaflet-tooltip-left"),G(o,"leaflet-tooltip-top"),G(o,"leaflet-tooltip-bottom"),A(o,"leaflet-tooltip-"+f),$(o,t)},_updatePosition:function(){var t=this._map.latLngToLayerPoint(this._latlng);this._setPosition(t)},setOpacity:function(t){this.options.opacity=t,this._container&&wt(this._container,t)},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center);this._setPosition(e)},_getAnchor:function(){return I(this._source&&this._source._getTooltipAnchor&&!this.options.sticky?this._source._getTooltipAnchor():[0,0])}}),Ia=function(t,e){return new Ti(t,e)};D.include({openTooltip:function(t,e,i){return this._initOverlay(Ti,t,e,i).openOn(this),this},closeTooltip:function(t){return t.close(),this}}),Bt.include({bindTooltip:function(t,e){return this._tooltip&&this.isTooltipOpen()&&this.unbindTooltip(),this._tooltip=this._initOverlay(Ti,this._tooltip,t,e),this._initTooltipInteractions(),this._tooltip.options.permanent&&this._map&&this._map.hasLayer(this)&&this.openTooltip(),this},unbindTooltip:function(){return this._tooltip&&(this._initTooltipInteractions(!0),this.closeTooltip(),this._tooltip=null),this},_initTooltipInteractions:function(t){if(!(!t&&this._tooltipHandlersAdded)){var e=t?"off":"on",i={remove:this.closeTooltip,move:this._moveTooltip};this._tooltip.options.permanent?i.add=this._openTooltip:(i.mouseover=this._openTooltip,i.mouseout=this.closeTooltip,i.click=this._openTooltip,this._map?this._addFocusListeners():i.add=this._addFocusListeners),this._tooltip.options.sticky&&(i.mousemove=this._moveTooltip),this[e](i),this._tooltipHandlersAdded=!t}},openTooltip:function(t){return this._tooltip&&(this instanceof Yt||(this._tooltip._source=this),this._tooltip._prepareOpen(t)&&(this._tooltip.openOn(this._map),this.getElement?this._setAriaDescribedByOnLayer(this):this.eachLayer&&this.eachLayer(this._setAriaDescribedByOnLayer,this))),this},closeTooltip:function(){if(this._tooltip)return this._tooltip.close()},toggleTooltip:function(){return this._tooltip&&this._tooltip.toggle(this),this},isTooltipOpen:function(){return this._tooltip.isOpen()},setTooltipContent:function(t){return this._tooltip&&this._tooltip.setContent(t),this},getTooltip:function(){return this._tooltip},_addFocusListeners:function(){this.getElement?this._addFocusListenersOnLayer(this):this.eachLayer&&this.eachLayer(this._addFocusListenersOnLayer,this)},_addFocusListenersOnLayer:function(t){var e=typeof t.getElement=="function"&&t.getElement();e&&(C(e,"focus",function(){this._tooltip._source=t,this.openTooltip()},this),C(e,"blur",this.closeTooltip,this))},_setAriaDescribedByOnLayer:function(t){var e=typeof t.getElement=="function"&&t.getElement();e&&e.setAttribute("aria-describedby",this._tooltip._container.id)},_openTooltip:function(t){if(!(!this._tooltip||!this._map)){if(this._map.dragging&&this._map.dragging.moving()&&!this._openOnceFlag){this._openOnceFlag=!0;var e=this;this._map.once("moveend",function(){e._openOnceFlag=!1,e._openTooltip(t)});return}this._tooltip._source=t.layer||t.target,this.openTooltip(this._tooltip.options.sticky?t.latlng:void 0)}},_moveTooltip:function(t){var e=t.latlng,i,n;this._tooltip.options.sticky&&t.originalEvent&&(i=this._map.mouseEventToContainerPoint(t.originalEvent),n=this._map.containerPointToLayerPoint(i),e=this._map.layerPointToLatLng(n)),this._tooltip.setLatLng(e)}});var Io=Te.extend({options:{iconSize:[12,12],html:!1,bgPos:null,className:"leaflet-div-icon"},createIcon:function(t){var e=t&&t.tagName==="DIV"?t:document.createElement("div"),i=this.options;if(i.html instanceof Element?(fi(e),e.appendChild(i.html)):e.innerHTML=i.html!==!1?i.html:"",i.bgPos){var n=I(i.bgPos);e.style.backgroundPosition=-n.x+"px "+-n.y+"px"}return this._setIconStyles(e,"icon"),e},createShadow:function(){return null}});function Ma(t){return new Io(t)}Te.Default=Ge;var Ye=Bt.extend({options:{tileSize:256,opacity:1,updateWhenIdle:P.mobile,updateWhenZooming:!0,updateInterval:200,zIndex:1,bounds:null,minZoom:0,maxZoom:void 0,maxNativeZoom:void 0,minNativeZoom:void 0,noWrap:!1,pane:"tilePane",className:"",keepBuffer:2},initialize:function(t){H(this,t)},onAdd:function(){this._initContainer(),this._levels={},this._tiles={},this._resetView()},beforeAdd:function(t){t._addZoomLimit(this)},onRemove:function(t){this._removeAllTiles(),V(this._container),t._removeZoomLimit(this),this._container=null,this._tileZoom=void 0},bringToFront:function(){return this._map&&(Le(this._container),this._setAutoZIndex(Math.max)),this},bringToBack:function(){return this._map&&(Ee(this._container),this._setAutoZIndex(Math.min)),this},getContainer:function(){return this._container},setOpacity:function(t){return this.options.opacity=t,this._updateOpacity(),this},setZIndex:function(t){return this.options.zIndex=t,this._updateZIndex(),this},isLoading:function(){return this._loading},redraw:function(){if(this._map){this._removeAllTiles();var t=this._clampZoom(this._map.getZoom());t!==this._tileZoom&&(this._tileZoom=t,this._updateLevels()),this._update()}return this},getEvents:function(){var t={viewprereset:this._invalidateAll,viewreset:this._resetView,zoom:this._resetView,moveend:this._onMoveEnd};return this.options.updateWhenIdle||(this._onMove||(this._onMove=x(this._onMoveEnd,this.options.updateInterval,this)),t.move=this._onMove),this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},createTile:function(){return document.createElement("div")},getTileSize:function(){var t=this.options.tileSize;return t instanceof M?t:new M(t,t)},_updateZIndex:function(){this._container&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(t){for(var e=this.getPane().children,i=-t(-1/0,1/0),n=0,o=e.length,s;n<o;n++)s=e[n].style.zIndex,e[n]!==this._container&&s&&(i=t(i,+s));isFinite(i)&&(this.options.zIndex=i+t(-1,1),this._updateZIndex())},_updateOpacity:function(){if(this._map&&!P.ielt9){wt(this._container,this.options.opacity);var t=+new Date,e=!1,i=!1;for(var n in this._tiles){var o=this._tiles[n];if(!(!o.current||!o.loaded)){var s=Math.min(1,(t-o.loaded)/200);wt(o.el,s),s<1?e=!0:(o.active?i=!0:this._onOpaqueTile(o),o.active=!0)}}i&&!this._noPrune&&this._pruneTiles(),e&&(at(this._fadeFrame),this._fadeFrame=rt(this._updateOpacity,this))}},_onOpaqueTile:T,_initContainer:function(){this._container||(this._container=R("div","leaflet-layer "+(this.options.className||"")),this._updateZIndex(),this.options.opacity<1&&this._updateOpacity(),this.getPane().appendChild(this._container))},_updateLevels:function(){var t=this._tileZoom,e=this.options.maxZoom;if(t!==void 0){for(var i in this._levels)i=Number(i),this._levels[i].el.children.length||i===t?(this._levels[i].el.style.zIndex=e-Math.abs(t-i),this._onUpdateLevel(i)):(V(this._levels[i].el),this._removeTilesAtZoom(i),this._onRemoveLevel(i),delete this._levels[i]);var n=this._levels[t],o=this._map;return n||(n=this._levels[t]={},n.el=R("div","leaflet-tile-container leaflet-zoom-animated",this._container),n.el.style.zIndex=e,n.origin=o.project(o.unproject(o.getPixelOrigin()),t).round(),n.zoom=t,this._setZoomTransform(n,o.getCenter(),o.getZoom()),T(n.el.offsetWidth),this._onCreateLevel(n)),this._level=n,n}},_onUpdateLevel:T,_onRemoveLevel:T,_onCreateLevel:T,_pruneTiles:function(){if(this._map){var t,e,i=this._map.getZoom();if(i>this.options.maxZoom||i<this.options.minZoom){this._removeAllTiles();return}for(t in this._tiles)e=this._tiles[t],e.retain=e.current;for(t in this._tiles)if(e=this._tiles[t],e.current&&!e.active){var n=e.coords;this._retainParent(n.x,n.y,n.z,n.z-5)||this._retainChildren(n.x,n.y,n.z,n.z+2)}for(t in this._tiles)this._tiles[t].retain||this._removeTile(t)}},_removeTilesAtZoom:function(t){for(var e in this._tiles)this._tiles[e].coords.z===t&&this._removeTile(e)},_removeAllTiles:function(){for(var t in this._tiles)this._removeTile(t)},_invalidateAll:function(){for(var t in this._levels)V(this._levels[t].el),this._onRemoveLevel(Number(t)),delete this._levels[t];this._removeAllTiles(),this._tileZoom=void 0},_retainParent:function(t,e,i,n){var o=Math.floor(t/2),s=Math.floor(e/2),d=i-1,f=new M(+o,+s);f.z=+d;var m=this._tileCoordsToKey(f),_=this._tiles[m];return _&&_.active?(_.retain=!0,!0):(_&&_.loaded&&(_.retain=!0),d>n?this._retainParent(o,s,d,n):!1)},_retainChildren:function(t,e,i,n){for(var o=2*t;o<2*t+2;o++)for(var s=2*e;s<2*e+2;s++){var d=new M(o,s);d.z=i+1;var f=this._tileCoordsToKey(d),m=this._tiles[f];if(m&&m.active){m.retain=!0;continue}else m&&m.loaded&&(m.retain=!0);i+1<n&&this._retainChildren(o,s,i+1,n)}},_resetView:function(t){var e=t&&(t.pinch||t.flyTo);this._setView(this._map.getCenter(),this._map.getZoom(),e,e)},_animateZoom:function(t){this._setView(t.center,t.zoom,!0,t.noUpdate)},_clampZoom:function(t){var e=this.options;return e.minNativeZoom!==void 0&&t<e.minNativeZoom?e.minNativeZoom:e.maxNativeZoom!==void 0&&e.maxNativeZoom<t?e.maxNativeZoom:t},_setView:function(t,e,i,n){var o=Math.round(e);this.options.maxZoom!==void 0&&o>this.options.maxZoom||this.options.minZoom!==void 0&&o<this.options.minZoom?o=void 0:o=this._clampZoom(o);var s=this.options.updateWhenZooming&&o!==this._tileZoom;(!n||s)&&(this._tileZoom=o,this._abortLoading&&this._abortLoading(),this._updateLevels(),this._resetGrid(),o!==void 0&&this._update(t),i||this._pruneTiles(),this._noPrune=!!i),this._setZoomTransforms(t,e)},_setZoomTransforms:function(t,e){for(var i in this._levels)this._setZoomTransform(this._levels[i],t,e)},_setZoomTransform:function(t,e,i){var n=this._map.getZoomScale(i,t.zoom),o=t.origin.multiplyBy(n).subtract(this._map._getNewPixelOrigin(e,i)).round();P.any3d?he(t.el,o,n):$(t.el,o)},_resetGrid:function(){var t=this._map,e=t.options.crs,i=this._tileSize=this.getTileSize(),n=this._tileZoom,o=this._map.getPixelWorldBounds(this._tileZoom);o&&(this._globalTileRange=this._pxBoundsToTileRange(o)),this._wrapX=e.wrapLng&&!this.options.noWrap&&[Math.floor(t.project([0,e.wrapLng[0]],n).x/i.x),Math.ceil(t.project([0,e.wrapLng[1]],n).x/i.y)],this._wrapY=e.wrapLat&&!this.options.noWrap&&[Math.floor(t.project([e.wrapLat[0],0],n).y/i.x),Math.ceil(t.project([e.wrapLat[1],0],n).y/i.y)]},_onMoveEnd:function(){!this._map||this._map._animatingZoom||this._update()},_getTiledPixelBounds:function(t){var e=this._map,i=e._animatingZoom?Math.max(e._animateToZoom,e.getZoom()):e.getZoom(),n=e.getZoomScale(i,this._tileZoom),o=e.project(t,this._tileZoom).floor(),s=e.getSize().divideBy(n*2);return new j(o.subtract(s),o.add(s))},_update:function(t){var e=this._map;if(e){var i=this._clampZoom(e.getZoom());if(t===void 0&&(t=e.getCenter()),this._tileZoom!==void 0){var n=this._getTiledPixelBounds(t),o=this._pxBoundsToTileRange(n),s=o.getCenter(),d=[],f=this.options.keepBuffer,m=new j(o.getBottomLeft().subtract([f,-f]),o.getTopRight().add([f,-f]));if(!(isFinite(o.min.x)&&isFinite(o.min.y)&&isFinite(o.max.x)&&isFinite(o.max.y)))throw new Error("Attempted to load an infinite number of tiles");for(var _ in this._tiles){var w=this._tiles[_].coords;(w.z!==this._tileZoom||!m.contains(new M(w.x,w.y)))&&(this._tiles[_].current=!1)}if(Math.abs(i-this._tileZoom)>1){this._setView(t,i);return}for(var S=o.min.y;S<=o.max.y;S++)for(var z=o.min.x;z<=o.max.x;z++){var ct=new M(z,S);if(ct.z=this._tileZoom,!!this._isValidTile(ct)){var et=this._tiles[this._tileCoordsToKey(ct)];et?et.current=!0:d.push(ct)}}if(d.sort(function(ut,Me){return ut.distanceTo(s)-Me.distanceTo(s)}),d.length!==0){this._loading||(this._loading=!0,this.fire("loading"));var kt=document.createDocumentFragment();for(z=0;z<d.length;z++)this._addTile(d[z],kt);this._level.el.appendChild(kt)}}}},_isValidTile:function(t){var e=this._map.options.crs;if(!e.infinite){var i=this._globalTileRange;if(!e.wrapLng&&(t.x<i.min.x||t.x>i.max.x)||!e.wrapLat&&(t.y<i.min.y||t.y>i.max.y))return!1}if(!this.options.bounds)return!0;var n=this._tileCoordsToBounds(t);return K(this.options.bounds).overlaps(n)},_keyToBounds:function(t){return this._tileCoordsToBounds(this._keyToTileCoords(t))},_tileCoordsToNwSe:function(t){var e=this._map,i=this.getTileSize(),n=t.scaleBy(i),o=n.add(i),s=e.unproject(n,t.z),d=e.unproject(o,t.z);return[s,d]},_tileCoordsToBounds:function(t){var e=this._tileCoordsToNwSe(t),i=new ht(e[0],e[1]);return this.options.noWrap||(i=this._map.wrapLatLngBounds(i)),i},_tileCoordsToKey:function(t){return t.x+":"+t.y+":"+t.z},_keyToTileCoords:function(t){var e=t.split(":"),i=new M(+e[0],+e[1]);return i.z=+e[2],i},_removeTile:function(t){var e=this._tiles[t];e&&(V(e.el),delete this._tiles[t],this.fire("tileunload",{tile:e.el,coords:this._keyToTileCoords(t)}))},_initTile:function(t){A(t,"leaflet-tile");var e=this.getTileSize();t.style.width=e.x+"px",t.style.height=e.y+"px",t.onselectstart=T,t.onmousemove=T,P.ielt9&&this.options.opacity<1&&wt(t,this.options.opacity)},_addTile:function(t,e){var i=this._getTilePos(t),n=this._tileCoordsToKey(t),o=this.createTile(this._wrapCoords(t),g(this._tileReady,this,t));this._initTile(o),this.createTile.length<2&&rt(g(this._tileReady,this,t,null,o)),$(o,i),this._tiles[n]={el:o,coords:t,current:!0},e.appendChild(o),this.fire("tileloadstart",{tile:o,coords:t})},_tileReady:function(t,e,i){e&&this.fire("tileerror",{error:e,tile:i,coords:t});var n=this._tileCoordsToKey(t);i=this._tiles[n],i&&(i.loaded=+new Date,this._map._fadeAnimated?(wt(i.el,0),at(this._fadeFrame),this._fadeFrame=rt(this._updateOpacity,this)):(i.active=!0,this._pruneTiles()),e||(A(i.el,"leaflet-tile-loaded"),this.fire("tileload",{tile:i.el,coords:t})),this._noTilesToLoad()&&(this._loading=!1,this.fire("load"),P.ielt9||!this._map._fadeAnimated?rt(this._pruneTiles,this):setTimeout(g(this._pruneTiles,this),250)))},_getTilePos:function(t){return t.scaleBy(this.getTileSize()).subtract(this._level.origin)},_wrapCoords:function(t){var e=new M(this._wrapX?W(t.x,this._wrapX):t.x,this._wrapY?W(t.y,this._wrapY):t.y);return e.z=t.z,e},_pxBoundsToTileRange:function(t){var e=this.getTileSize();return new j(t.min.unscaleBy(e).floor(),t.max.unscaleBy(e).ceil().subtract([1,1]))},_noTilesToLoad:function(){for(var t in this._tiles)if(!this._tiles[t].loaded)return!1;return!0}});function Ca(t){return new Ye(t)}var Ie=Ye.extend({options:{minZoom:0,maxZoom:18,subdomains:"abc",errorTileUrl:"",zoomOffset:0,tms:!1,zoomReverse:!1,detectRetina:!1,crossOrigin:!1,referrerPolicy:!1},initialize:function(t,e){this._url=t,e=H(this,e),e.detectRetina&&P.retina&&e.maxZoom>0?(e.tileSize=Math.floor(e.tileSize/2),e.zoomReverse?(e.zoomOffset--,e.minZoom=Math.min(e.maxZoom,e.minZoom+1)):(e.zoomOffset++,e.maxZoom=Math.max(e.minZoom,e.maxZoom-1)),e.minZoom=Math.max(0,e.minZoom)):e.zoomReverse?e.minZoom=Math.min(e.maxZoom,e.minZoom):e.maxZoom=Math.max(e.minZoom,e.maxZoom),typeof e.subdomains=="string"&&(e.subdomains=e.subdomains.split("")),this.on("tileunload",this._onTileRemove)},setUrl:function(t,e){return this._url===t&&e===void 0&&(e=!0),this._url=t,e||this.redraw(),this},createTile:function(t,e){var i=document.createElement("img");return C(i,"load",g(this._tileOnLoad,this,e,i)),C(i,"error",g(this._tileOnError,this,e,i)),(this.options.crossOrigin||this.options.crossOrigin==="")&&(i.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),typeof this.options.referrerPolicy=="string"&&(i.referrerPolicy=this.options.referrerPolicy),i.alt="",i.src=this.getTileUrl(t),i},getTileUrl:function(t){var e={r:P.retina?"@2x":"",s:this._getSubdomain(t),x:t.x,y:t.y,z:this._getZoomForUrl()};if(this._map&&!this._map.options.crs.infinite){var i=this._globalTileRange.max.y-t.y;this.options.tms&&(e.y=i),e["-y"]=i}return zt(this._url,c(e,this.options))},_tileOnLoad:function(t,e){P.ielt9?setTimeout(g(t,this,null,e),0):t(null,e)},_tileOnError:function(t,e,i){var n=this.options.errorTileUrl;n&&e.getAttribute("src")!==n&&(e.src=n),t(i,e)},_onTileRemove:function(t){t.tile.onload=null},_getZoomForUrl:function(){var t=this._tileZoom,e=this.options.maxZoom,i=this.options.zoomReverse,n=this.options.zoomOffset;return i&&(t=e-t),t+n},_getSubdomain:function(t){var e=Math.abs(t.x+t.y)%this.options.subdomains.length;return this.options.subdomains[e]},_abortLoading:function(){var t,e;for(t in this._tiles)if(this._tiles[t].coords.z!==this._tileZoom&&(e=this._tiles[t].el,e.onload=T,e.onerror=T,!e.complete)){e.src=E;var i=this._tiles[t].coords;V(e),delete this._tiles[t],this.fire("tileabort",{tile:e,coords:i})}},_removeTile:function(t){var e=this._tiles[t];if(e)return e.el.setAttribute("src",E),Ye.prototype._removeTile.call(this,t)},_tileReady:function(t,e,i){if(!(!this._map||i&&i.getAttribute("src")===E))return Ye.prototype._tileReady.call(this,t,e,i)}});function Mo(t,e){return new Ie(t,e)}var Co=Ie.extend({defaultWmsParams:{service:"WMS",request:"GetMap",layers:"",styles:"",format:"image/jpeg",transparent:!1,version:"1.1.1"},options:{crs:null,uppercase:!1},initialize:function(t,e){this._url=t;var i=c({},this.defaultWmsParams);for(var n in e)n in this.options||(i[n]=e[n]);e=H(this,e);var o=e.detectRetina&&P.retina?2:1,s=this.getTileSize();i.width=s.x*o,i.height=s.y*o,this.wmsParams=i},onAdd:function(t){this._crs=this.options.crs||t.options.crs,this._wmsVersion=parseFloat(this.wmsParams.version);var e=this._wmsVersion>=1.3?"crs":"srs";this.wmsParams[e]=this._crs.code,Ie.prototype.onAdd.call(this,t)},getTileUrl:function(t){var e=this._tileCoordsToNwSe(t),i=this._crs,n=dt(i.project(e[0]),i.project(e[1])),o=n.min,s=n.max,d=(this._wmsVersion>=1.3&&this._crs===Lo?[o.y,o.x,s.y,s.x]:[o.x,o.y,s.x,s.y]).join(","),f=Ie.prototype.getTileUrl.call(this,t);return f+At(this.wmsParams,f,this.options.uppercase)+(this.options.uppercase?"&BBOX=":"&bbox=")+d},setParams:function(t,e){return c(this.wmsParams,t),e||this.redraw(),this}});function Aa(t,e){return new Co(t,e)}Ie.WMS=Co,Mo.wms=Aa;var Jt=Bt.extend({options:{padding:.1},initialize:function(t){H(this,t),v(this),this._layers=this._layers||{}},onAdd:function(){this._container||(this._initContainer(),A(this._container,"leaflet-zoom-animated")),this.getPane().appendChild(this._container),this._update(),this.on("update",this._updatePaths,this)},onRemove:function(){this.off("update",this._updatePaths,this),this._destroyContainer()},getEvents:function(){var t={viewreset:this._reset,zoom:this._onZoom,moveend:this._update,zoomend:this._onZoomEnd};return this._zoomAnimated&&(t.zoomanim=this._onAnimZoom),t},_onAnimZoom:function(t){this._updateTransform(t.center,t.zoom)},_onZoom:function(){this._updateTransform(this._map.getCenter(),this._map.getZoom())},_updateTransform:function(t,e){var i=this._map.getZoomScale(e,this._zoom),n=this._map.getSize().multiplyBy(.5+this.options.padding),o=this._map.project(this._center,e),s=n.multiplyBy(-i).add(o).subtract(this._map._getNewPixelOrigin(t,e));P.any3d?he(this._container,s,i):$(this._container,s)},_reset:function(){this._update(),this._updateTransform(this._center,this._zoom);for(var t in this._layers)this._layers[t]._reset()},_onZoomEnd:function(){for(var t in this._layers)this._layers[t]._project()},_updatePaths:function(){for(var t in this._layers)this._layers[t]._update()},_update:function(){var t=this.options.padding,e=this._map.getSize(),i=this._map.containerPointToLayerPoint(e.multiplyBy(-t)).round();this._bounds=new j(i,i.add(e.multiplyBy(1+t*2)).round()),this._center=this._map.getCenter(),this._zoom=this._map.getZoom()}}),Ao=Jt.extend({options:{tolerance:0},getEvents:function(){var t=Jt.prototype.getEvents.call(this);return t.viewprereset=this._onViewPreReset,t},_onViewPreReset:function(){this._postponeUpdatePaths=!0},onAdd:function(){Jt.prototype.onAdd.call(this),this._draw()},_initContainer:function(){var t=this._container=document.createElement("canvas");C(t,"mousemove",this._onMouseMove,this),C(t,"click dblclick mousedown mouseup contextmenu",this._onClick,this),C(t,"mouseout",this._handleMouseOut,this),t._leaflet_disable_events=!0,this._ctx=t.getContext("2d")},_destroyContainer:function(){at(this._redrawRequest),delete this._ctx,V(this._container),q(this._container),delete this._container},_updatePaths:function(){if(!this._postponeUpdatePaths){var t;this._redrawBounds=null;for(var e in this._layers)t=this._layers[e],t._update();this._redraw()}},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){Jt.prototype._update.call(this);var t=this._bounds,e=this._container,i=t.getSize(),n=P.retina?2:1;$(e,t.min),e.width=n*i.x,e.height=n*i.y,e.style.width=i.x+"px",e.style.height=i.y+"px",P.retina&&this._ctx.scale(2,2),this._ctx.translate(-t.min.x,-t.min.y),this.fire("update")}},_reset:function(){Jt.prototype._reset.call(this),this._postponeUpdatePaths&&(this._postponeUpdatePaths=!1,this._updatePaths())},_initPath:function(t){this._updateDashArray(t),this._layers[v(t)]=t;var e=t._order={layer:t,prev:this._drawLast,next:null};this._drawLast&&(this._drawLast.next=e),this._drawLast=e,this._drawFirst=this._drawFirst||this._drawLast},_addPath:function(t){this._requestRedraw(t)},_removePath:function(t){var e=t._order,i=e.next,n=e.prev;i?i.prev=n:this._drawLast=n,n?n.next=i:this._drawFirst=i,delete t._order,delete this._layers[v(t)],this._requestRedraw(t)},_updatePath:function(t){this._extendRedrawBounds(t),t._project(),t._update(),this._requestRedraw(t)},_updateStyle:function(t){this._updateDashArray(t),this._requestRedraw(t)},_updateDashArray:function(t){if(typeof t.options.dashArray=="string"){var e=t.options.dashArray.split(/[, ]+/),i=[],n,o;for(o=0;o<e.length;o++){if(n=Number(e[o]),isNaN(n))return;i.push(n)}t.options._dashArray=i}else t.options._dashArray=t.options.dashArray},_requestRedraw:function(t){this._map&&(this._extendRedrawBounds(t),this._redrawRequest=this._redrawRequest||rt(this._redraw,this))},_extendRedrawBounds:function(t){if(t._pxBounds){var e=(t.options.weight||0)+1;this._redrawBounds=this._redrawBounds||new j,this._redrawBounds.extend(t._pxBounds.min.subtract([e,e])),this._redrawBounds.extend(t._pxBounds.max.add([e,e]))}},_redraw:function(){this._redrawRequest=null,this._redrawBounds&&(this._redrawBounds.min._floor(),this._redrawBounds.max._ceil()),this._clear(),this._draw(),this._redrawBounds=null},_clear:function(){var t=this._redrawBounds;if(t){var e=t.getSize();this._ctx.clearRect(t.min.x,t.min.y,e.x,e.y)}else this._ctx.save(),this._ctx.setTransform(1,0,0,1,0,0),this._ctx.clearRect(0,0,this._container.width,this._container.height),this._ctx.restore()},_draw:function(){var t,e=this._redrawBounds;if(this._ctx.save(),e){var i=e.getSize();this._ctx.beginPath(),this._ctx.rect(e.min.x,e.min.y,i.x,i.y),this._ctx.clip()}this._drawing=!0;for(var n=this._drawFirst;n;n=n.next)t=n.layer,(!e||t._pxBounds&&t._pxBounds.intersects(e))&&t._updatePath();this._drawing=!1,this._ctx.restore()},_updatePoly:function(t,e){if(this._drawing){var i,n,o,s,d=t._parts,f=d.length,m=this._ctx;if(f){for(m.beginPath(),i=0;i<f;i++){for(n=0,o=d[i].length;n<o;n++)s=d[i][n],m[n?"lineTo":"moveTo"](s.x,s.y);e&&m.closePath()}this._fillStroke(m,t)}}},_updateCircle:function(t){if(!(!this._drawing||t._empty())){var e=t._point,i=this._ctx,n=Math.max(Math.round(t._radius),1),o=(Math.max(Math.round(t._radiusY),1)||n)/n;o!==1&&(i.save(),i.scale(1,o)),i.beginPath(),i.arc(e.x,e.y/o,n,0,Math.PI*2,!1),o!==1&&i.restore(),this._fillStroke(i,t)}},_fillStroke:function(t,e){var i=e.options;i.fill&&(t.globalAlpha=i.fillOpacity,t.fillStyle=i.fillColor||i.color,t.fill(i.fillRule||"evenodd")),i.stroke&&i.weight!==0&&(t.setLineDash&&t.setLineDash(e.options&&e.options._dashArray||[]),t.globalAlpha=i.opacity,t.lineWidth=i.weight,t.strokeStyle=i.color,t.lineCap=i.lineCap,t.lineJoin=i.lineJoin,t.stroke())},_onClick:function(t){for(var e=this._map.mouseEventToLayerPoint(t),i,n,o=this._drawFirst;o;o=o.next)i=o.layer,i.options.interactive&&i._containsPoint(e)&&(!(t.type==="click"||t.type==="preclick")||!this._map._draggableMoved(i))&&(n=i);this._fireEvent(n?[n]:!1,t)},_onMouseMove:function(t){if(!(!this._map||this._map.dragging.moving()||this._map._animatingZoom)){var e=this._map.mouseEventToLayerPoint(t);this._handleMouseHover(t,e)}},_handleMouseOut:function(t){var e=this._hoveredLayer;e&&(G(this._container,"leaflet-interactive"),this._fireEvent([e],t,"mouseout"),this._hoveredLayer=null,this._mouseHoverThrottled=!1)},_handleMouseHover:function(t,e){if(!this._mouseHoverThrottled){for(var i,n,o=this._drawFirst;o;o=o.next)i=o.layer,i.options.interactive&&i._containsPoint(e)&&(n=i);n!==this._hoveredLayer&&(this._handleMouseOut(t),n&&(A(this._container,"leaflet-interactive"),this._fireEvent([n],t,"mouseover"),this._hoveredLayer=n)),this._fireEvent(this._hoveredLayer?[this._hoveredLayer]:!1,t),this._mouseHoverThrottled=!0,setTimeout(g(function(){this._mouseHoverThrottled=!1},this),32)}},_fireEvent:function(t,e,i){this._map._fireDOMEvent(e,i||e.type,t)},_bringToFront:function(t){var e=t._order;if(e){var i=e.next,n=e.prev;if(i)i.prev=n;else return;n?n.next=i:i&&(this._drawFirst=i),e.prev=this._drawLast,this._drawLast.next=e,e.next=null,this._drawLast=e,this._requestRedraw(t)}},_bringToBack:function(t){var e=t._order;if(e){var i=e.next,n=e.prev;if(n)n.next=i;else return;i?i.prev=n:n&&(this._drawLast=n),e.prev=null,e.next=this._drawFirst,this._drawFirst.prev=e,this._drawFirst=e,this._requestRedraw(t)}}});function zo(t){return P.canvas?new Ao(t):null}var Ke=function(){try{return document.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(t){return document.createElement("<lvml:"+t+' class="lvml">')}}catch{}return function(t){return document.createElement("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')}}(),za={_initContainer:function(){this._container=R("div","leaflet-vml-container")},_update:function(){this._map._animatingZoom||(Jt.prototype._update.call(this),this.fire("update"))},_initPath:function(t){var e=t._container=Ke("shape");A(e,"leaflet-vml-shape "+(this.options.className||"")),e.coordsize="1 1",t._path=Ke("path"),e.appendChild(t._path),this._updateStyle(t),this._layers[v(t)]=t},_addPath:function(t){var e=t._container;this._container.appendChild(e),t.options.interactive&&t.addInteractiveTarget(e)},_removePath:function(t){var e=t._container;V(e),t.removeInteractiveTarget(e),delete this._layers[v(t)]},_updateStyle:function(t){var e=t._stroke,i=t._fill,n=t.options,o=t._container;o.stroked=!!n.stroke,o.filled=!!n.fill,n.stroke?(e||(e=t._stroke=Ke("stroke")),o.appendChild(e),e.weight=n.weight+"px",e.color=n.color,e.opacity=n.opacity,n.dashArray?e.dashStyle=Q(n.dashArray)?n.dashArray.join(" "):n.dashArray.replace(/( *, *)/g," "):e.dashStyle="",e.endcap=n.lineCap.replace("butt","flat"),e.joinstyle=n.lineJoin):e&&(o.removeChild(e),t._stroke=null),n.fill?(i||(i=t._fill=Ke("fill")),o.appendChild(i),i.color=n.fillColor||n.color,i.opacity=n.fillOpacity):i&&(o.removeChild(i),t._fill=null)},_updateCircle:function(t){var e=t._point.round(),i=Math.round(t._radius),n=Math.round(t._radiusY||i);this._setPath(t,t._empty()?"M0 0":"AL "+e.x+","+e.y+" "+i+","+n+" 0,"+65535*360)},_setPath:function(t,e){t._path.v=e},_bringToFront:function(t){Le(t._container)},_bringToBack:function(t){Ee(t._container)}},Si=P.vml?Ke:Zn,$e=Jt.extend({_initContainer:function(){this._container=Si("svg"),this._container.setAttribute("pointer-events","none"),this._rootGroup=Si("g"),this._container.appendChild(this._rootGroup)},_destroyContainer:function(){V(this._container),q(this._container),delete this._container,delete this._rootGroup,delete this._svgSize},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){Jt.prototype._update.call(this);var t=this._bounds,e=t.getSize(),i=this._container;(!this._svgSize||!this._svgSize.equals(e))&&(this._svgSize=e,i.setAttribute("width",e.x),i.setAttribute("height",e.y)),$(i,t.min),i.setAttribute("viewBox",[t.min.x,t.min.y,e.x,e.y].join(" ")),this.fire("update")}},_initPath:function(t){var e=t._path=Si("path");t.options.className&&A(e,t.options.className),t.options.interactive&&A(e,"leaflet-interactive"),this._updateStyle(t),this._layers[v(t)]=t},_addPath:function(t){this._rootGroup||this._initContainer(),this._rootGroup.appendChild(t._path),t.addInteractiveTarget(t._path)},_removePath:function(t){V(t._path),t.removeInteractiveTarget(t._path),delete this._layers[v(t)]},_updatePath:function(t){t._project(),t._update()},_updateStyle:function(t){var e=t._path,i=t.options;e&&(i.stroke?(e.setAttribute("stroke",i.color),e.setAttribute("stroke-opacity",i.opacity),e.setAttribute("stroke-width",i.weight),e.setAttribute("stroke-linecap",i.lineCap),e.setAttribute("stroke-linejoin",i.lineJoin),i.dashArray?e.setAttribute("stroke-dasharray",i.dashArray):e.removeAttribute("stroke-dasharray"),i.dashOffset?e.setAttribute("stroke-dashoffset",i.dashOffset):e.removeAttribute("stroke-dashoffset")):e.setAttribute("stroke","none"),i.fill?(e.setAttribute("fill",i.fillColor||i.color),e.setAttribute("fill-opacity",i.fillOpacity),e.setAttribute("fill-rule",i.fillRule||"evenodd")):e.setAttribute("fill","none"))},_updatePoly:function(t,e){this._setPath(t,Dn(t._parts,e))},_updateCircle:function(t){var e=t._point,i=Math.max(Math.round(t._radius),1),n=Math.max(Math.round(t._radiusY),1)||i,o="a"+i+","+n+" 0 1,0 ",s=t._empty()?"M0 0":"M"+(e.x-i)+","+e.y+o+i*2+",0 "+o+-i*2+",0 ";this._setPath(t,s)},_setPath:function(t,e){t._path.setAttribute("d",e)},_bringToFront:function(t){Le(t._path)},_bringToBack:function(t){Ee(t._path)}});P.vml&&$e.include(za);function Oo(t){return P.svg||P.vml?new $e(t):null}D.include({getRenderer:function(t){var e=t.options.renderer||this._getPaneRenderer(t.options.pane)||this.options.renderer||this._renderer;return e||(e=this._renderer=this._createRenderer()),this.hasLayer(e)||this.addLayer(e),e},_getPaneRenderer:function(t){if(t==="overlayPane"||t===void 0)return!1;var e=this._paneRenderers[t];return e===void 0&&(e=this._createRenderer({pane:t}),this._paneRenderers[t]=e),e},_createRenderer:function(t){return this.options.preferCanvas&&zo(t)||Oo(t)}});var No=Se.extend({initialize:function(t,e){Se.prototype.initialize.call(this,this._boundsToLatLngs(t),e)},setBounds:function(t){return this.setLatLngs(this._boundsToLatLngs(t))},_boundsToLatLngs:function(t){return t=K(t),[t.getSouthWest(),t.getNorthWest(),t.getNorthEast(),t.getSouthEast()]}});function Oa(t,e){return new No(t,e)}$e.create=Si,$e.pointsToPath=Dn,$t.geometryToLayer=wi,$t.coordsToLatLng=gn,$t.coordsToLatLngs=xi,$t.latLngToCoords=_n,$t.latLngsToCoords=ki,$t.getFeature=Be,$t.asFeature=Li,D.mergeOptions({boxZoom:!0});var Zo=Zt.extend({initialize:function(t){this._map=t,this._container=t._container,this._pane=t._panes.overlayPane,this._resetStateTimeout=0,t.on("unload",this._destroy,this)},addHooks:function(){C(this._container,"mousedown",this._onMouseDown,this)},removeHooks:function(){q(this._container,"mousedown",this._onMouseDown,this)},moved:function(){return this._moved},_destroy:function(){V(this._pane),delete this._pane},_resetState:function(){this._resetStateTimeout=0,this._moved=!1},_clearDeferredResetState:function(){this._resetStateTimeout!==0&&(clearTimeout(this._resetStateTimeout),this._resetStateTimeout=0)},_onMouseDown:function(t){if(!t.shiftKey||t.which!==1&&t.button!==1)return!1;this._clearDeferredResetState(),this._resetState(),He(),Xi(),this._startPoint=this._map.mouseEventToContainerPoint(t),C(document,{contextmenu:me,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseMove:function(t){this._moved||(this._moved=!0,this._box=R("div","leaflet-zoom-box",this._container),A(this._container,"leaflet-crosshair"),this._map.fire("boxzoomstart")),this._point=this._map.mouseEventToContainerPoint(t);var e=new j(this._point,this._startPoint),i=e.getSize();$(this._box,e.min),this._box.style.width=i.x+"px",this._box.style.height=i.y+"px"},_finish:function(){this._moved&&(V(this._box),G(this._container,"leaflet-crosshair")),Ue(),Qi(),q(document,{contextmenu:me,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseUp:function(t){if(!(t.which!==1&&t.button!==1)&&(this._finish(),!!this._moved)){this._clearDeferredResetState(),this._resetStateTimeout=setTimeout(g(this._resetState,this),0);var e=new ht(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point));this._map.fitBounds(e).fire("boxzoomend",{boxZoomBounds:e})}},_onKeyDown:function(t){t.keyCode===27&&(this._finish(),this._clearDeferredResetState(),this._resetState())}});D.addInitHook("addHandler","boxZoom",Zo),D.mergeOptions({doubleClickZoom:!0});var Do=Zt.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick,this)},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick,this)},_onDoubleClick:function(t){var e=this._map,i=e.getZoom(),n=e.options.zoomDelta,o=t.originalEvent.shiftKey?i-n:i+n;e.options.doubleClickZoom==="center"?e.setZoom(o):e.setZoomAround(t.containerPoint,o)}});D.addInitHook("addHandler","doubleClickZoom",Do),D.mergeOptions({dragging:!0,inertia:!0,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,easeLinearity:.2,worldCopyJump:!1,maxBoundsViscosity:0});var Ro=Zt.extend({addHooks:function(){if(!this._draggable){var t=this._map;this._draggable=new re(t._mapPane,t._container),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),this._draggable.on("predrag",this._onPreDragLimit,this),t.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDragWrap,this),t.on("zoomend",this._onZoomEnd,this),t.whenReady(this._onZoomEnd,this))}A(this._map._container,"leaflet-grab leaflet-touch-drag"),this._draggable.enable(),this._positions=[],this._times=[]},removeHooks:function(){G(this._map._container,"leaflet-grab"),G(this._map._container,"leaflet-touch-drag"),this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},moving:function(){return this._draggable&&this._draggable._moving},_onDragStart:function(){var t=this._map;if(t._stop(),this._map.options.maxBounds&&this._map.options.maxBoundsViscosity){var e=K(this._map.options.maxBounds);this._offsetLimit=dt(this._map.latLngToContainerPoint(e.getNorthWest()).multiplyBy(-1),this._map.latLngToContainerPoint(e.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),this._viscosity=Math.min(1,Math.max(0,this._map.options.maxBoundsViscosity))}else this._offsetLimit=null;t.fire("movestart").fire("dragstart"),t.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(t){if(this._map.options.inertia){var e=this._lastTime=+new Date,i=this._lastPos=this._draggable._absPos||this._draggable._newPos;this._positions.push(i),this._times.push(e),this._prunePositions(e)}this._map.fire("move",t).fire("drag",t)},_prunePositions:function(t){for(;this._positions.length>1&&t-this._times[0]>50;)this._positions.shift(),this._times.shift()},_onZoomEnd:function(){var t=this._map.getSize().divideBy(2),e=this._map.latLngToLayerPoint([0,0]);this._initialWorldOffset=e.subtract(t).x,this._worldWidth=this._map.getPixelWorldBounds().getSize().x},_viscousLimit:function(t,e){return t-(t-e)*this._viscosity},_onPreDragLimit:function(){if(!(!this._viscosity||!this._offsetLimit)){var t=this._draggable._newPos.subtract(this._draggable._startPos),e=this._offsetLimit;t.x<e.min.x&&(t.x=this._viscousLimit(t.x,e.min.x)),t.y<e.min.y&&(t.y=this._viscousLimit(t.y,e.min.y)),t.x>e.max.x&&(t.x=this._viscousLimit(t.x,e.max.x)),t.y>e.max.y&&(t.y=this._viscousLimit(t.y,e.max.y)),this._draggable._newPos=this._draggable._startPos.add(t)}},_onPreDragWrap:function(){var t=this._worldWidth,e=Math.round(t/2),i=this._initialWorldOffset,n=this._draggable._newPos.x,o=(n-e+i)%t+e-i,s=(n+e+i)%t-e-i,d=Math.abs(o+i)<Math.abs(s+i)?o:s;this._draggable._absPos=this._draggable._newPos.clone(),this._draggable._newPos.x=d},_onDragEnd:function(t){var e=this._map,i=e.options,n=!i.inertia||t.noInertia||this._times.length<2;if(e.fire("dragend",t),n)e.fire("moveend");else{this._prunePositions(+new Date);var o=this._lastPos.subtract(this._positions[0]),s=(this._lastTime-this._times[0])/1e3,d=i.easeLinearity,f=o.multiplyBy(d/s),m=f.distanceTo([0,0]),_=Math.min(i.inertiaMaxSpeed,m),w=f.multiplyBy(_/m),S=_/(i.inertiaDeceleration*d),z=w.multiplyBy(-S/2).round();!z.x&&!z.y?e.fire("moveend"):(z=e._limitOffset(z,e.options.maxBounds),rt(function(){e.panBy(z,{duration:S,easeLinearity:d,noMoveStart:!0,animate:!0})}))}}});D.addInitHook("addHandler","dragging",Ro),D.mergeOptions({keyboard:!0,keyboardPanDelta:80});var Fo=Zt.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61,171],zoomOut:[189,109,54,173]},initialize:function(t){this._map=t,this._setPanDelta(t.options.keyboardPanDelta),this._setZoomDelta(t.options.zoomDelta)},addHooks:function(){var t=this._map._container;t.tabIndex<=0&&(t.tabIndex="0"),C(t,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.on({focus:this._addHooks,blur:this._removeHooks},this)},removeHooks:function(){this._removeHooks(),q(this._map._container,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.off({focus:this._addHooks,blur:this._removeHooks},this)},_onMouseDown:function(){if(!this._focused){var t=document.body,e=document.documentElement,i=t.scrollTop||e.scrollTop,n=t.scrollLeft||e.scrollLeft;this._map._container.focus(),window.scrollTo(n,i)}},_onFocus:function(){this._focused=!0,this._map.fire("focus")},_onBlur:function(){this._focused=!1,this._map.fire("blur")},_setPanDelta:function(t){var e=this._panKeys={},i=this.keyCodes,n,o;for(n=0,o=i.left.length;n<o;n++)e[i.left[n]]=[-1*t,0];for(n=0,o=i.right.length;n<o;n++)e[i.right[n]]=[t,0];for(n=0,o=i.down.length;n<o;n++)e[i.down[n]]=[0,t];for(n=0,o=i.up.length;n<o;n++)e[i.up[n]]=[0,-1*t]},_setZoomDelta:function(t){var e=this._zoomKeys={},i=this.keyCodes,n,o;for(n=0,o=i.zoomIn.length;n<o;n++)e[i.zoomIn[n]]=t;for(n=0,o=i.zoomOut.length;n<o;n++)e[i.zoomOut[n]]=-t},_addHooks:function(){C(document,"keydown",this._onKeyDown,this)},_removeHooks:function(){q(document,"keydown",this._onKeyDown,this)},_onKeyDown:function(t){if(!(t.altKey||t.ctrlKey||t.metaKey)){var e=t.keyCode,i=this._map,n;if(e in this._panKeys){if(!i._panAnim||!i._panAnim._inProgress)if(n=this._panKeys[e],t.shiftKey&&(n=I(n).multiplyBy(3)),i.options.maxBounds&&(n=i._limitOffset(I(n),i.options.maxBounds)),i.options.worldCopyJump){var o=i.wrapLatLng(i.unproject(i.project(i.getCenter()).add(n)));i.panTo(o)}else i.panBy(n)}else if(e in this._zoomKeys)i.setZoom(i.getZoom()+(t.shiftKey?3:1)*this._zoomKeys[e]);else if(e===27&&i._popup&&i._popup.options.closeOnEscapeKey)i.closePopup();else return;me(t)}}});D.addInitHook("addHandler","keyboard",Fo),D.mergeOptions({scrollWheelZoom:!0,wheelDebounceTime:40,wheelPxPerZoomLevel:60});var Ho=Zt.extend({addHooks:function(){C(this._map._container,"wheel",this._onWheelScroll,this),this._delta=0},removeHooks:function(){q(this._map._container,"wheel",this._onWheelScroll,this)},_onWheelScroll:function(t){var e=ho(t),i=this._map.options.wheelDebounceTime;this._delta+=e,this._lastMousePos=this._map.mouseEventToContainerPoint(t),this._startTime||(this._startTime=+new Date);var n=Math.max(i-(+new Date-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(g(this._performZoom,this),n),me(t)},_performZoom:function(){var t=this._map,e=t.getZoom(),i=this._map.options.zoomSnap||0;t._stop();var n=this._delta/(this._map.options.wheelPxPerZoomLevel*4),o=4*Math.log(2/(1+Math.exp(-Math.abs(n))))/Math.LN2,s=i?Math.ceil(o/i)*i:o,d=t._limitZoom(e+(this._delta>0?s:-s))-e;this._delta=0,this._startTime=null,d&&(t.options.scrollWheelZoom==="center"?t.setZoom(e+d):t.setZoomAround(this._lastMousePos,e+d))}});D.addInitHook("addHandler","scrollWheelZoom",Ho);var Na=600;D.mergeOptions({tapHold:P.touchNative&&P.safari&&P.mobile,tapTolerance:15});var Uo=Zt.extend({addHooks:function(){C(this._map._container,"touchstart",this._onDown,this)},removeHooks:function(){q(this._map._container,"touchstart",this._onDown,this)},_onDown:function(t){if(clearTimeout(this._holdTimeout),t.touches.length===1){var e=t.touches[0];this._startPos=this._newPos=new M(e.clientX,e.clientY),this._holdTimeout=setTimeout(g(function(){this._cancel(),this._isTapValid()&&(C(document,"touchend",st),C(document,"touchend touchcancel",this._cancelClickPrevent),this._simulateEvent("contextmenu",e))},this),Na),C(document,"touchend touchcancel contextmenu",this._cancel,this),C(document,"touchmove",this._onMove,this)}},_cancelClickPrevent:function t(){q(document,"touchend",st),q(document,"touchend touchcancel",t)},_cancel:function(){clearTimeout(this._holdTimeout),q(document,"touchend touchcancel contextmenu",this._cancel,this),q(document,"touchmove",this._onMove,this)},_onMove:function(t){var e=t.touches[0];this._newPos=new M(e.clientX,e.clientY)},_isTapValid:function(){return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance},_simulateEvent:function(t,e){var i=new MouseEvent(t,{bubbles:!0,cancelable:!0,view:window,screenX:e.screenX,screenY:e.screenY,clientX:e.clientX,clientY:e.clientY});i._simulated=!0,e.target.dispatchEvent(i)}});D.addInitHook("addHandler","tapHold",Uo),D.mergeOptions({touchZoom:P.touch,bounceAtZoomLimits:!0});var Wo=Zt.extend({addHooks:function(){A(this._map._container,"leaflet-touch-zoom"),C(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){G(this._map._container,"leaflet-touch-zoom"),q(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(t){var e=this._map;if(!(!t.touches||t.touches.length!==2||e._animatingZoom||this._zooming)){var i=e.mouseEventToContainerPoint(t.touches[0]),n=e.mouseEventToContainerPoint(t.touches[1]);this._centerPoint=e.getSize()._divideBy(2),this._startLatLng=e.containerPointToLatLng(this._centerPoint),e.options.touchZoom!=="center"&&(this._pinchStartLatLng=e.containerPointToLatLng(i.add(n)._divideBy(2))),this._startDist=i.distanceTo(n),this._startZoom=e.getZoom(),this._moved=!1,this._zooming=!0,e._stop(),C(document,"touchmove",this._onTouchMove,this),C(document,"touchend touchcancel",this._onTouchEnd,this),st(t)}},_onTouchMove:function(t){if(!(!t.touches||t.touches.length!==2||!this._zooming)){var e=this._map,i=e.mouseEventToContainerPoint(t.touches[0]),n=e.mouseEventToContainerPoint(t.touches[1]),o=i.distanceTo(n)/this._startDist;if(this._zoom=e.getScaleZoom(o,this._startZoom),!e.options.bounceAtZoomLimits&&(this._zoom<e.getMinZoom()&&o<1||this._zoom>e.getMaxZoom()&&o>1)&&(this._zoom=e._limitZoom(this._zoom)),e.options.touchZoom==="center"){if(this._center=this._startLatLng,o===1)return}else{var s=i._add(n)._divideBy(2)._subtract(this._centerPoint);if(o===1&&s.x===0&&s.y===0)return;this._center=e.unproject(e.project(this._pinchStartLatLng,this._zoom).subtract(s),this._zoom)}this._moved||(e._moveStart(!0,!1),this._moved=!0),at(this._animRequest);var d=g(e._move,e,this._center,this._zoom,{pinch:!0,round:!1},void 0);this._animRequest=rt(d,this,!0),st(t)}},_onTouchEnd:function(){if(!this._moved||!this._zooming){this._zooming=!1;return}this._zooming=!1,at(this._animRequest),q(document,"touchmove",this._onTouchMove,this),q(document,"touchend touchcancel",this._onTouchEnd,this),this._map.options.zoomAnimation?this._map._animateZoom(this._center,this._map._limitZoom(this._zoom),!0,this._map.options.zoomSnap):this._map._resetView(this._center,this._map._limitZoom(this._zoom))}});D.addInitHook("addHandler","touchZoom",Wo),D.BoxZoom=Zo,D.DoubleClickZoom=Do,D.Drag=Ro,D.Keyboard=Fo,D.ScrollWheelZoom=Ho,D.TapHold=Uo,D.TouchZoom=Wo,a.Bounds=j,a.Browser=P,a.CRS=Gt,a.Canvas=Ao,a.Circle=pn,a.CircleMarker=bi,a.Class=Vt,a.Control=St,a.DivIcon=Io,a.DivOverlay=Dt,a.DomEvent=ta,a.DomUtil=Xr,a.Draggable=re,a.Evented=Ne,a.FeatureGroup=Yt,a.GeoJSON=$t,a.GridLayer=Ye,a.Handler=Zt,a.Icon=Te,a.ImageOverlay=Ei,a.LatLng=U,a.LatLngBounds=ht,a.Layer=Bt,a.LayerGroup=Pe,a.LineUtil=fa,a.Map=D,a.Marker=yi,a.Mixin=sa,a.Path=ae,a.Point=M,a.PolyUtil=la,a.Polygon=Se,a.Polyline=Kt,a.Popup=Pi,a.PosAnimation=uo,a.Projection=ma,a.Rectangle=No,a.Renderer=Jt,a.SVG=$e,a.SVGOverlay=Bo,a.TileLayer=Ie,a.Tooltip=Ti,a.Transformation=Fi,a.Util=br,a.VideoOverlay=So,a.bind=g,a.bounds=dt,a.canvas=zo,a.circle=xa,a.circleMarker=wa,a.control=je,a.divIcon=Ma,a.extend=c,a.featureGroup=va,a.geoJSON=To,a.geoJson=Ea,a.gridLayer=Ca,a.icon=ya,a.imageOverlay=Pa,a.latLng=Z,a.latLngBounds=K,a.layerGroup=_a,a.map=ea,a.marker=ba,a.point=I,a.polygon=La,a.polyline=ka,a.popup=Ba,a.rectangle=Oa,a.setOptions=H,a.stamp=v,a.svg=Oo,a.svgOverlay=Sa,a.tileLayer=Mo,a.tooltip=Ia,a.transformation=Ze,a.version=l,a.videoOverlay=Ta;var Za=window.L;a.noConflict=function(){return window.L=Za,this},window.L=a})}(Xe,Xe.exports)),Xe.exports}var Xt=cs();const ds="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=",hs="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAABSCAMAAAAhFXfZAAAC91BMVEVMaXEzeak2f7I4g7g3g7cua5gzeKg8hJo3grY4g7c3grU0gLI2frE0daAubJc2gbQwd6QzeKk2gLMtd5sxdKIua5g1frA2f7IydaM0e6w2fq41fK01eqo3grgubJgta5cxdKI1f7AydaQydaMxc6EubJgvbJkwcZ4ubZkwcJwubZgubJcydqUydKIxapgubJctbJcubZcubJcvbJYubJcvbZkubJctbJctbZcubJg2f7AubJcrbZcubJcubJcua5g3grY0fq8ubJcubJdEkdEwhsw6i88vhswuhcsuhMtBjMgthMsrg8srgss6is8qgcs8i9A9iMYtg8spgcoogMo7hcMngMonf8olfso4gr8kfck5iM8jfMk4iM8he8k1fro7itAgesk2hs8eecgzfLcofssdeMg0hc4cd8g2hcsxeLQbdsgZdcgxeLImfcszhM0vda4xgckzhM4xg84wf8Yxgs4udKsvfcQucqhUndROmdM1fK0wcZ8vb5w0eqpQm9MzeKhXoNVcpdYydKNWn9VZotVKltJFjsIwcJ1Rms9OlslLmtH///8+kc9epdYzd6dbo9VHkMM2f7FHmNBClM8ydqVcpNY9hro3gLM9hLczealQmcw3fa46f7A8gLMxc6I3eagyc6FIldJMl9JSnNRSntNNl9JPnNJFi75UnM9ZodVKksg8kM45jc09e6ZHltFBk883gbRBh7pDk9EwcaBzn784g7dKkcY2i81Om9M7j85Llc81is09g7Q4grY/j9A0eqxKmdFFltBEjcXf6fFImdBCiLxJl9FGlNFBi78yiMxVndEvbpo6js74+vx+psPP3+o/ks5HkcpGmNCjwdZCkNDM3ehYoNJEls+lxNkxh8xHks0+jdC1zd5Lg6r+/v/H2ufz9/o3jM3t8/edvdM/k89Th61OiLBSjbZklbaTt9BfptdjmL1AicBHj8hGk9FAgK1dkLNTjLRekrdClc/k7fM0icy0y9tgp9c4jc2NtM9Dlc8zicxeXZn3AAAAQ3RSTlMAHDdTb4yPA+LtnEQmC4L2EmHqB7XA0d0sr478x4/Yd5i1zOfyPkf1sLVq4Nh3FvjxopQ2/STNuFzUwFIwxKaejILpIBEV9wAABhVJREFUeF6s1NdyFEcYBeBeoQIhRAkLlRDGrhIgY3BJL8CVeKzuyXFzzjkn5ZxzzuScg3PO8cKzu70JkO0LfxdTU//pM9vTu7Xgf6KqOVTb9X7toRrVEfBf1HTVjZccrT/2by1VV928Yty9ZbVuucdz90frG8DBjl9pVApbOstvmMuvVgaNXSfAAd6pGxpy6yxf5ph43pS/4f3uoaGm2rdu72S9xzOvMymkZFq/ptDrk90mhW7e4zl7HLzhxGWPR20xmSxJ/VqldG5m9XhaVOA1DadsNh3Pu5L2N6QtPO/32JpqQBVVk20oy/Pi2s23WEvyfHbe1thadVQttvm7Llf65gGmXK67XtupyoM7HQhmXdLS8oGWJNeOJ3C5fG5XCEJnkez3/oFdsvgJ4l2ANZwhrJKk/7OSXa+3Vw2WJMlKnGkobouYk6T0TyX30klOUnTD9HJ5qpckL3EW/w4XF3Xd0FGywXUrstrclVsqz5Pd/sXFYyDnPdrLcQODmGOK47IZb4CmibmMn+MYRzFZ5jg33ZL/EJrWcszHmANy3ARBK/IXtciJy8VsitPSdE3uuHxzougojcUdr8/32atnz/ev3f/K5wtpxUTpcaI45zusVDpYtZi+jg0oU9b3x74h7+n9ABvYEZeKaVq0sh0AtLKsFtqNBdeT0MrSzwwlq9+x6xAO4tgOtSzbCjrNQQiNvQUbUEubvzBUeGw26yDCsRHCoLkTHDa7IdOLIThs/gHvChszh2CimE8peRs47cxANI0lYNB5y1DljpOF0IhzBDPOZnDOqYYbeGKECbPzWnXludPphw5c2YBq5zlwXphIbO4VDCZ0gnPfUO1TwZoYwAs2ExPCedAu9DAjfQUjzITQb3jNj0KG2Sgt6BHaQUdYzWz+XmBktOHwanXjaSTcwwziBcuMOtwBmqPrTOxFQR/DRKKPqyur0aiW6cULYsx6tBm0jXpR/AUWR6HRq9WVW6MRhIq5jLyjbaCTDCijyYJNpCajdyobP/eTw0iexBAKkJ3gA5KcQb2zBXsIBckn+xVv8jkZSaEFHE+jFEleAEfayRU0MouNoBmB/L50Ai/HSLIHxcrpCvnhSQAuakKp2C/YbCylJjXRVy/z3+Kv/RrNcCo+WUzlVEhzKffnTQnxeN9fWF88fiNCUdSTsaufaChKWInHeysygfpIqagoakW+vV20J8uyl6TyNKEZWV4oRSPyCkWpgOLSbkCObT8o2r6tlG58HQquf6O0v50tB7JM7F4EORd2dx/K0w/KHsVkLPaoYrwgP/y7krr3SSMA4zj+OBgmjYkxcdIJQyQRKgg2viX9Hddi9UBb29LrKR7CVVEEEXWojUkXNyfTNDE14W9gbHJNuhjDettN3ZvbOvdOqCD3Jp/9l+/wJE+9PkYGjx/fqkys3S2rMozM/o2106rfMUINo6hVqz+eu/hd1c4xTg0TAfy5kV+4UG6+IthHTU9woWmxuKNbTfuCSfovBCxq7EtHqvYL4Sm6F8GVxsSXHMQ07TOi1DKtZxjWaaIyi4CXWjxPccUw8WVbMYY5wxC1mzEyXMJWkllpRloi+Kkoq69sxBTlElF6aAxYUbjXNlhlDZilDnM4U5SlN5biRsRHnbx3mbeWjEh4mEyiuJDl5XcWVmX5GvNkFgLWZM5qwsop4/AWfLhU1cR7k1VVvcYCWRkOI6Xy5gmnphCYIkvzuNYzHzosq2oNk2RtSs8khfUOfHIDgR6ysYBaMpl4uEgk2U/oJTs9AaTSwma7dT69geAE2ZpEjUsn2ieJNHeKfrI3EcAGJ2ZaNgVuC8EBctCLc57P5u5led6IOBkIYkuQMrmmjChs4VkfOerHqSBkPzZlhe06RslZ3zMjk2sscqKwY0RcjKK+LWbzd7KiHhkncs/siFJ+V5eXxD34B8nVuJEpGJNmxN2gH3vSvp7J70tF+D1Ej8qUJD1TkErAND2GZwTFg/LubvmgiBG3SOvdlsqFQrkEzJCL1rstlnVFROixZoDDSuXQFHESwVGlcuQcMb/b42NgjLowh5MTDFE3vNB5qStRIErdCQEh6pLPR92anSUb/wAIhldAaDMpGgAAAABJRU5ErkJggg==",us="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAQAAAACach9AAACMUlEQVR4Ae3ShY7jQBAE0Aoz/f9/HTMzhg1zrdKUrJbdx+Kd2nD8VNudfsL/Th///dyQN2TH6f3y/BGpC379rV+S+qqetBOxImNQXL8JCAr2V4iMQXHGNJxeCfZXhSRBcQMfvkOWUdtfzlLgAENmZDcmo2TVmt8OSM2eXxBp3DjHSMFutqS7SbmemzBiR+xpKCNUIRkdkkYxhAkyGoBvyQFEJEefwSmmvBfJuJ6aKqKWnAkvGZOaZXTUgFqYULWNSHUckZuR1HIIimUExutRxwzOLROIG4vKmCKQt364mIlhSyzAf1m9lHZHJZrlAOMMztRRiKimp/rpdJDc9Awry5xTZCte7FHtuS8wJgeYGrex28xNTd086Dik7vUMscQOa8y4DoGtCCSkAKlNwpgNtphjrC6MIHUkR6YWxxs6Sc5xqn222mmCRFzIt8lEdKx+ikCtg91qS2WpwVfBelJCiQJwvzixfI9cxZQWgiSJelKnwBElKYtDOb2MFbhmUigbReQBV0Cg4+qMXSxXSyGUn4UbF8l+7qdSGnTC0XLCmahIgUHLhLOhpVCtw4CzYXvLQWQbJNmxoCsOKAxSgBJno75avolkRw8iIAFcsdc02e9iyCd8tHwmeSSoKTowIgvscSGZUOA7PuCN5b2BX9mQM7S0wYhMNU74zgsPBj3HU7wguAfnxxjFQGBE6pwN+GjME9zHY7zGp8wVxMShYX9NXvEWD3HbwJf4giO4CFIQxXScH1/TM+04kkBiAAAAAElFTkSuQmCC";var _e,it,Ct;let ie=(Ct=class{constructor(r,a={}){B(this,_e,5);B(this,it,null);b(this,_e,a.zoom??h(this,_e));const l=document.querySelector(r);if(!l)throw new Error(`Map element not found: ${r}`);if(l.offsetWidth===0||l.offsetHeight===0)throw new Error(`Map element is not visible or has no dimensions: ${r}`);const c=Xt.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'});try{b(this,it,Xt.map(l,{zoom:h(this,_e),scrollWheelZoom:!1,layers:[c],...a})),setTimeout(()=>{h(this,it)&&h(this,it).invalidateSize()},100)}catch(p){throw console.error("Error creating map:",p),new Error(`Failed to create map: ${p.message}`)}}static async getPlaceNameByCoordinate(r,a){try{return await es(r,a)}catch(l){throw console.error("Error fetching place name:",l),new Error("Unable to fetch place name.")}}static isGeoLocationAvailable(){return"geolocation"in navigator}static getCurrentPosition(r={}){return new Promise((a,l)=>{if(!Ct.isGeoLocationAvailable()){l("Geolocation is not supported by this browser.");return}navigator.geolocation.getCurrentPosition(a,l,r)})}addMapEventListener(r,a){h(this,it).addEventListener(r,a)}static async build(r,a={}){const l=document.querySelector(r);if(!l)throw new Error(`Map container element not found: ${r}`);let c=0;const p=10;for(;(l.offsetWidth===0||l.offsetHeight===0)&&c<p;)await new Promise(k=>setTimeout(k,100)),c++;if(l.offsetWidth===0||l.offsetHeight===0)throw new Error(`Map container element has no dimensions: ${r}`);if(l.innerHTML="","center"in a&&a.center)return new Ct(r,a);const g=[-6.2,106.816666];if("locate"in a&&a.locate)try{const k=await Ct.getCurrentPosition(),v=[k.coords.latitude,k.coords.longitude];return new Ct(r,{...a,center:v})}catch{return new Ct(r,{...a,center:g})}return new Ct(r,{...a,center:g})}changeCamera(r,a=null){if(!r||!Array.isArray(r)||r.length!==2||r.some(l=>l==null)){console.warn("Invalid coordinate passed to changeCamera, ignoring.");return}if(!a){h(this,it).setView(Xt.latLng(r),h(this,_e));return}h(this,it).setView(Xt.latLng(r),a)}getCenter(){const{lat:r,lng:a}=h(this,it).getCenter();return{latitude:r,longitude:a}}createIcon(r={}){return Xt.icon({...Xt.Icon.Default.prototype.options,iconRetinaUrl:hs,iconUrl:ds,shadowUrl:us,...r})}addMarker(r,a={},l=null){if(typeof a!="object")throw new Error("Marker options must be an object.");const c=Xt.marker(r,{icon:this.createIcon(),...a});if(l){if(typeof l!="object")throw new Error("Popup options must be an object.");if(!("content"in l))throw new Error("Popup options must have a content property.");const p=Xt.popup(r,l);c.bindPopup(p)}return c.addTo(h(this,it)),c}addMultipleMarkers(r){if(!Array.isArray(r)||r.length===0)return[];const a=[];return r.forEach(l=>{if(!(!l||!l.coordinates||!Array.isArray(l.coordinates)||l.coordinates.length!==2))try{const c=this.addMarker(l.coordinates,l.markerOptions||{},l.popupOptions||null);a.push(c)}catch(c){console.error("Error adding marker:",c)}}),a}invalidateSize(){if(h(this,it)&&this.isAttachedToDom())try{h(this,it).invalidateSize()}catch(r){console.warn("Failed to invalidate map size:",r)}}isReady(){return h(this,it)!==null&&this.isAttachedToDom()}isAttachedToDom(){if(!h(this,it))return!1;try{const r=h(this,it).getContainer();return r&&r.parentNode&&document.contains(r)}catch(r){return console.warn("Map is no longer attached to DOM:",r),!1}}fitBounds(r){if(!(!this.isReady()||!r||!Array.isArray(r)||r.length===0))try{if(r.length===1){const l=r[0].getLatLng();h(this,it).setView([l.lat,l.lng],10);return}const a=Xt.featureGroup(r);h(this,it).fitBounds(a.getBounds(),{padding:[20,20],maxZoom:15})}catch(a){console.error("Error fitting map to markers:",a)}}},_e=new WeakMap,it=new WeakMap,Ct);var ni,ft,Ht,Ut,It,Qt,nt;class fs{constructor(){B(this,ni);B(this,ft,null);B(this,Ht,null);B(this,Ut,null);B(this,It,null);B(this,Qt,null);B(this,nt,null);b(this,ni,new ss({view:this}))}render(){return`      <section class="container">
        <h1>Add Story Guest</h1>
        <form id="add-story-form">
          <label for="story-description">Story Description</label>
          <textarea id="story-description" placeholder="Tell your story..." required></textarea>
          
          <div class="camera-container">
            <video id="camera-preview" autoplay playsinline muted></video>
            <button type="button" id="capture-button">Take Photo</button>
            <canvas id="photo-canvas" style="display:none;"></canvas>
            <div id="captured-image-container">
            </div>
            <p id="camera-error-message" style="color: red; display: none;"></p>
          </div>
            <div class="location-container">
            <div class="location-info">
              <h3>📍 Pilih Lokasi</h3>
              <p id="location-status">Klik pada peta untuk memilih lokasi cerita Anda</p>
              <div id="selected-location-info" style="display: none;">
                <p><strong>Koordinat Terpilih:</strong></p>
                <p>Latitude: <span id="latitude">-</span></p>
                <p>Longitude: <span id="longitude">-</span></p>
                <p id="place-name" style="margin-top: 10px; font-style: italic; color: var(--primary);"></p>
              </div>
            </div>
            <div class="map-actions">
              <button type="button" id="location-button" class="secondary-button">📍 Gunakan Lokasi Saat Ini</button>
              <button type="button" id="clear-location" class="secondary-button" style="display: none;">❌ Hapus Pilihan</button>
            </div>
          </div>
          
          <div class="map-container">
            <div id="map" style="height: 350px; width: 100%; border-radius: 8px;"></div>
            <p class="map-instruction">💡 <strong>Petunjuk:</strong> Klik pada peta untuk memilih lokasi cerita Anda, atau gunakan tombol "Gunakan Lokasi Saat Ini"</p>
          </div>
          
          <button type="submit" id="submit-button">
            <span id="button-text">Add Story</span>
            <span id="loading-spinner" class="spinner" style="display: none;"></span>
          </button>
        </form>
      </section>
      
      <style>
        .spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 1s ease-in-out infinite;
          display: inline-block;
          margin-left: 8px;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        
        .loading-container {
          background-color: white;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        
        .location-container {
          margin: 20px 0;
          padding: 15px;
          border-radius: var(--radius-lg);
          background: linear-gradient(135deg, var(--gray-50) 0%, var(--gray-100) 100%);
          border: 2px dashed var(--gray-300);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
        }
        
        .location-info {
          flex: 1;
        }
        
        .location-info h3 {
          margin-top: 0;
          margin-bottom: 10px;
        }
        
        #location-status {
          color: var(--gray-600);
          margin: 5px 0;
        }
        
        .secondary-button {
          padding: var(--space-md) var(--space-lg);
          background: linear-gradient(135deg, var(--gray-200) 0%, var(--gray-300) 100%);
          color: var(--gray-900);
          border: none;
          border-radius: var(--radius-lg);
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-normal);
        }
        
        .secondary-button:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          background: linear-gradient(135deg, var(--primary-light) 0%, var(--accent-light) 100%);
          color: var(--white);
        }
      </style>
    `}showLoading(){b(this,Ut,document.createElement("div")),h(this,Ut).classList.add("overlay"),h(this,Ut).innerHTML=`
      <div class="loading-container">
        <p>Uploading your story...</p>
        <div class="spinner"></div>
      </div>
    `,document.body.appendChild(h(this,Ut));const r=document.getElementById("submit-button"),a=document.getElementById("button-text"),l=document.getElementById("loading-spinner");r&&a&&l&&(a.textContent="Uploading...",l.style.display="inline-block",r.disabled=!0)}hideLoading(){h(this,Ut)&&(h(this,Ut).remove(),b(this,Ut,null));const r=document.getElementById("submit-button"),a=document.getElementById("button-text"),l=document.getElementById("loading-spinner");r&&a&&l&&(a.textContent="Add Story",l.style.display="none",r.disabled=!1)}showError(r){const a=document.createElement("div");a.textContent=r,a.style.cssText="position:fixed; top:20px; left:50%; transform:translateX(-50%); background-color: #ffdddd; border:1px solid #ffaaaa; color: #d8000c; padding:15px; border-radius:5px; z-index:1000; box-shadow: 0 2px 4px rgba(0,0,0,0.2);",document.body.appendChild(a),setTimeout(()=>{a.remove()},3e3)}showSuccess(r){const a=document.createElement("div");a.textContent=r,a.style.cssText="position:fixed; top:20px; left:50%; transform:translateX(-50%); background-color: #ddffdd; border:1px solid #aaffaa; color: #005000; padding:15px; border-radius:5px; z-index:1000; box-shadow: 0 2px 4px rgba(0,0,0,0.2);",document.body.appendChild(a),setTimeout(()=>{a.remove()},3e3)}resetForm(){const r=document.getElementById("add-story-form");r&&(r.reset(),this.startCamera())}async afterRender(){const r=document.getElementById("camera-preview"),a=document.getElementById("capture-button"),l=document.getElementById("photo-canvas"),c=document.getElementById("captured-image-container"),p=document.getElementById("add-story-form"),g=document.getElementById("camera-error-message"),k=document.getElementById("location-button"),v=document.getElementById("clear-location"),x=document.getElementById("location-status"),W=document.getElementById("selected-location-info"),T=document.getElementById("latitude"),Y=document.getElementById("longitude"),yt=document.getElementById("place-name");b(this,ft,null),b(this,Ht,null),b(this,It,null);try{b(this,Qt,await ie.build("#map",{center:[-6.2088,106.8456],zoom:10})),h(this,Qt).addMapEventListener("click",async y=>{await this.handleMapClick(y.latlng.lat,y.latlng.lng)})}catch(y){console.error("Error initializing map:",y),x.textContent="Error loading map. Location selection may not work properly.",x.style.color="var(--error)"}const gt=async(y,E)=>{try{h(this,nt)&&h(this,nt).remove(),b(this,nt,h(this,Qt).addMarker([y,E])),b(this,It,{latitude:y,longitude:E}),T.textContent=y.toFixed(6),Y.textContent=E.toFixed(6),W.style.display="block",v.style.display="inline-block",x.textContent="Lokasi berhasil dipilih!",x.style.color="var(--success)",h(this,Qt).changeCamera([y,E],15);try{const N=await ie.getPlaceNameByCoordinate(y,E);yt.textContent=`📍 ${N}`,h(this,nt).bindPopup(`
            <div style="text-align: center;">
              <strong>Lokasi Terpilih</strong><br>
              ${N}<br>
              <small>${y.toFixed(6)}, ${E.toFixed(6)}</small>
            </div>
          `).openPopup()}catch(N){console.error("Error getting place name:",N),yt.textContent="📍 Lokasi tidak dikenali",h(this,nt).bindPopup(`
            <div style="text-align: center;">
              <strong>Lokasi Terpilih</strong><br>
              <small>${y.toFixed(6)}, ${E.toFixed(6)}</small>
            </div>
          `).openPopup()}}catch(N){console.error("Error updating location display:",N)}},H=y=>{console.error("Error getting location:",y);let E="Unable to get your location. Please enable location permissions.";switch(y.code){case y.PERMISSION_DENIED:E="Location permission denied. Please enable location access in your browser settings.";break;case y.POSITION_UNAVAILABLE:E="Location information is unavailable. Please try again later.";break;case y.TIMEOUT:E="Location request timed out. Please try again.";break}x.textContent=E,x.style.color="var(--error)",W.style.display="none"},At=()=>{if(!navigator.geolocation){x.textContent="Geolocation is not supported by your browser",x.style.color="var(--error)";return}x.textContent="Detecting your location...",x.style.color="var(--gray-600)",W.style.display="none",navigator.geolocation.getCurrentPosition(y=>{gt(y.coords.latitude,y.coords.longitude)},H,{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})};At(),k.addEventListener("click",At),v.addEventListener("click",()=>{this.clearLocationSelection()});const de=y=>{g.textContent=y,g.style.display="block",r.style.display="none",a.style.display="none"};this.startCamera=async()=>{try{h(this,ft)&&h(this,ft).getTracks().forEach(y=>y.stop()),b(this,ft,await navigator.mediaDevices.getUserMedia({video:!0})),r.srcObject=h(this,ft),r.style.display="block",a.textContent="Take Photo",a.style.display="block",c.innerHTML="",b(this,Ht,null),g.style.display="none",a.removeEventListener("click",Q),a.addEventListener("click",zt)}catch(y){console.error("Error accessing camera:",y);let E="Failed to access camera. Please make sure camera permissions are granted.";y.name==="NotAllowedError"?E="Camera access was denied. Please enable camera permissions in your browser settings.":y.name==="NotFoundError"&&(E="No camera found. Please ensure a camera is connected and enabled."),de(E)}};const zt=()=>{if(!h(this,ft)||!r.srcObject||r.srcObject.getVideoTracks().length===0){console.warn("Stream not active or no video tracks."),de("Camera stream is not active. Please try again or grant permissions.");return}l.width=r.videoWidth,l.height=r.videoHeight,l.getContext("2d").drawImage(r,0,0,l.width,l.height),b(this,Ht,l.toDataURL("image/jpeg")),c.innerHTML=`<img src="${h(this,Ht)}" alt="Captured Image" style="max-width: 100%; border-radius: 8px;">`,r.style.display="none",a.textContent="Retake Photo",h(this,ft)&&h(this,ft).getTracks().forEach(E=>E.stop()),a.removeEventListener("click",zt),a.addEventListener("click",Q)},Q=async()=>{c.innerHTML="",b(this,Ht,null),await this.startCamera()};return await this.startCamera(),p.addEventListener("submit",async y=>{y.preventDefault();const E=document.getElementById("story-description").value;if(!h(this,Ht)){this.showError("Please take a photo first!");return}try{const N=await or(h(this,Ht),"photo.jpg","image/jpeg"),bt=h(this,It)?parseFloat(h(this,It).latitude):null,Tt=h(this,It)?parseFloat(h(this,It).longitude):null;await h(this,ni).submitStory(E,N,bt,Tt)}catch(N){console.error("Error submitting story:",N),this.showError("An error occurred while submitting your story. Please try again.")}}),this.handleMapClick=async(y,E)=>{try{h(this,nt)&&h(this,nt).remove(),b(this,nt,h(this,Qt).addMarker([y,E])),b(this,It,{latitude:y,longitude:E});const N=document.getElementById("latitude"),bt=document.getElementById("longitude"),Tt=document.getElementById("place-name"),xe=document.getElementById("selected-location-info"),di=document.getElementById("clear-location"),rt=document.getElementById("location-status");N&&bt&&xe&&(N.textContent=y.toFixed(6),bt.textContent=E.toFixed(6),xe.style.display="block",di.style.display="inline-block",rt.textContent="Lokasi berhasil dipilih dari peta!",rt.style.color="var(--success)"),h(this,Qt).changeCamera([y,E],15);try{const at=await ie.getPlaceNameByCoordinate(y,E);Tt&&(Tt.textContent=`📍 ${at}`),h(this,nt)&&h(this,nt).bindPopup(`
              <div style="text-align: center;">
                <strong>Lokasi Terpilih</strong><br>
                ${at}<br>
                <small>${y.toFixed(6)}, ${E.toFixed(6)}</small>
              </div>
            `).openPopup()}catch(at){console.error("Error getting place name:",at),Tt&&(Tt.textContent="📍 Lokasi tidak dikenali"),h(this,nt)&&h(this,nt).bindPopup(`
              <div style="text-align: center;">
                <strong>Lokasi Terpilih</strong><br>
                <small>${y.toFixed(6)}, ${E.toFixed(6)}</small>
              </div>
            `).openPopup()}}catch(N){console.error("Error handling map click:",N)}},this.clearLocationSelection=()=>{h(this,nt)&&(h(this,nt).remove(),b(this,nt,null)),b(this,It,null);const y=document.getElementById("selected-location-info"),E=document.getElementById("clear-location"),N=document.getElementById("location-status"),bt=document.getElementById("place-name");y&&(y.style.display="none"),E&&(E.style.display="none"),N&&(N.textContent="Klik pada peta untuk memilih lokasi cerita Anda",N.style.color="var(--gray-600)"),bt&&(bt.textContent="")},()=>{h(this,ft)&&(h(this,ft).getTracks().forEach(y=>y.stop()),b(this,ft,null)),a.removeEventListener("click",zt),a.removeEventListener("click",Q),k.removeEventListener("click",At),v.removeEventListener("click",()=>{this.clearLocationSelection()})}}}ni=new WeakMap,ft=new WeakMap,Ht=new WeakMap,Ut=new WeakMap,It=new WeakMap,Qt=new WeakMap,nt=new WeakMap;var Lt;class ms{constructor({view:r}){B(this,Lt);b(this,Lt,r)}async submitStory(r,a,l=null,c=null){try{h(this,Lt).showLoading();const p=ne.getToken();if(!p){h(this,Lt).showError("Authentication token not found. Please login again."),h(this,Lt).redirectToLogin();return}const g=await Qa(p,r,a,l,c);g.error?h(this,Lt).showError(g.message||"Failed to submit story. Please try again."):(h(this,Lt).showSuccess("Story submitted successfully!"),h(this,Lt).resetForm())}catch(p){console.error("Error submitting story:",p),h(this,Lt).showError("An error occurred while submitting your story. Please try again.")}finally{h(this,Lt).hideLoading()}}}Lt=new WeakMap;var oi,mt,Wt,qt,Mt,te,ot;class ps{constructor(){B(this,oi);B(this,mt,null);B(this,Wt,null);B(this,qt,null);B(this,Mt,null);B(this,te,null);B(this,ot,null);b(this,oi,new ms({view:this}))}render(){return`<section class="container">
        <h1>Add Story</h1>
        <form id="add-story-form">
          <label for="story-description">Story Description</label>
          <textarea id="story-description" placeholder="Tell your story..." required></textarea>
          
          <div class="camera-container">
            <video id="camera-preview" autoplay playsinline muted></video>
            <button type="button" id="capture-button">Take Photo</button>
            <canvas id="photo-canvas" style="display:none;"></canvas>
            <div id="captured-image-container">
            </div>
            <p id="camera-error-message" style="color: red; display: none;"></p>
          </div>
            <div class="location-container">
            <div class="location-info">
              <h3>📍 Pilih Lokasi</h3>
              <p id="location-status">Klik pada peta untuk memilih lokasi cerita Anda</p>
              <div id="selected-location-info" style="display: none;">
                <p><strong>Koordinat Terpilih:</strong></p>
                <p>Latitude: <span id="latitude">-</span></p>
                <p>Longitude: <span id="longitude">-</span></p>
                <p id="place-name" style="margin-top: 10px; font-style: italic; color: var(--primary);"></p>
              </div>
            </div>
            <div class="map-actions">
              <button type="button" id="location-button" class="secondary-button">📍 Gunakan Lokasi Saat Ini</button>
              <button type="button" id="clear-location" class="secondary-button" style="display: none;">❌ Hapus Pilihan</button>
            </div>
          </div>
          
          <div class="map-container">
            <div id="map" style="height: 350px; width: 100%; border-radius: 8px;"></div>
            <p class="map-instruction">💡 <strong>Petunjuk:</strong> Klik pada peta untuk memilih lokasi cerita Anda, atau gunakan tombol "Gunakan Lokasi Saat Ini"</p>
          </div>
          
          <button type="submit" id="submit-button">
            <span id="button-text">Add Story</span>
            <span id="loading-spinner" class="spinner" style="display: none;"></span>
          </button>
        </form>
      </section>
      
      <style>
        .spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 1s ease-in-out infinite;
          display: inline-block;
          margin-left: 8px;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        
        .loading-container {
          background-color: white;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        
        .location-container {
          margin: 20px 0;
          padding: 15px;
          border-radius: var(--radius-lg);
          background: linear-gradient(135deg, var(--gray-50) 0%, var(--gray-100) 100%);
          border: 2px dashed var(--gray-300);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
        }
        
        .location-info {
          flex: 1;
        }
        
        .location-info h3 {
          margin-top: 0;
          margin-bottom: 10px;
        }
        
        #location-status {
          color: var(--gray-600);
          margin: 5px 0;
        }
        
        .secondary-button {
          padding: var(--space-md) var(--space-lg);
          background: linear-gradient(135deg, var(--gray-200) 0%, var(--gray-300) 100%);
          color: var(--gray-900);
          border: none;
          border-radius: var(--radius-lg);
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-normal);
        }
        
        .secondary-button:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          background: linear-gradient(135deg, var(--primary-light) 0%, var(--accent-light) 100%);
          color: var(--white);
        }
      </style>
    `}showLoading(){b(this,qt,document.createElement("div")),h(this,qt).classList.add("overlay"),h(this,qt).innerHTML=`
      <div class="loading-container">
        <p>Uploading your story...</p>
        <div class="spinner"></div>
      </div>
    `,document.body.appendChild(h(this,qt));const r=document.getElementById("submit-button"),a=document.getElementById("button-text"),l=document.getElementById("loading-spinner");r&&a&&l&&(a.textContent="Uploading...",l.style.display="inline-block",r.disabled=!0)}hideLoading(){h(this,qt)&&(h(this,qt).remove(),b(this,qt,null));const r=document.getElementById("submit-button"),a=document.getElementById("button-text"),l=document.getElementById("loading-spinner");r&&a&&l&&(a.textContent="Add Story",l.style.display="none",r.disabled=!1)}showError(r){const a=document.createElement("div");a.textContent=r,a.style.cssText="position:fixed; top:20px; left:50%; transform:translateX(-50%); background-color: #ffdddd; border:1px solid #ffaaaa; color: #d8000c; padding:15px; border-radius:5px; z-index:1000; box-shadow: 0 2px 4px rgba(0,0,0,0.2);",document.body.appendChild(a),setTimeout(()=>{a.remove()},3e3)}showSuccess(r){const a=document.createElement("div");a.textContent=r,a.style.cssText="position:fixed; top:20px; left:50%; transform:translateX(-50%); background-color: #ddffdd; border:1px solid #aaffaa; color: #005000; padding:15px; border-radius:5px; z-index:1000; box-shadow: 0 2px 4px rgba(0,0,0,0.2);",document.body.appendChild(a),setTimeout(()=>{a.remove()},3e3)}resetForm(){const r=document.getElementById("add-story-form");r&&(r.reset(),this.startCamera())}async afterRender(){const r=document.getElementById("camera-preview"),a=document.getElementById("capture-button"),l=document.getElementById("photo-canvas"),c=document.getElementById("captured-image-container"),p=document.getElementById("add-story-form"),g=document.getElementById("camera-error-message"),k=document.getElementById("location-button"),v=document.getElementById("clear-location"),x=document.getElementById("location-status"),W=document.getElementById("selected-location-info"),T=document.getElementById("latitude"),Y=document.getElementById("longitude"),yt=document.getElementById("place-name");b(this,mt,null),b(this,Wt,null),b(this,Mt,null);try{b(this,te,await ie.build("#map",{center:[-6.2088,106.8456],zoom:10})),h(this,te).addMapEventListener("click",async y=>{await this.handleMapClick(y.latlng.lat,y.latlng.lng)})}catch(y){console.error("Error initializing map:",y),x.textContent="Error loading map. Location selection may not work properly.",x.style.color="var(--error)"}const gt=async(y,E)=>{try{h(this,ot)&&h(this,ot).remove(),b(this,ot,h(this,te).addMarker([y,E])),b(this,Mt,{latitude:y,longitude:E}),T.textContent=y.toFixed(6),Y.textContent=E.toFixed(6),W.style.display="block",v.style.display="inline-block",x.textContent="Lokasi berhasil dipilih!",x.style.color="var(--success)",h(this,te).changeCamera([y,E],15);try{const N=await ie.getPlaceNameByCoordinate(y,E);yt.textContent=`📍 ${N}`,h(this,ot).bindPopup(`
            <div style="text-align: center;">
              <strong>Lokasi Terpilih</strong><br>
              ${N}<br>
              <small>${y.toFixed(6)}, ${E.toFixed(6)}</small>
            </div>
          `).openPopup()}catch(N){console.error("Error getting place name:",N),yt.textContent="📍 Lokasi tidak dikenali",h(this,ot).bindPopup(`
            <div style="text-align: center;">
              <strong>Lokasi Terpilih</strong><br>
              <small>${y.toFixed(6)}, ${E.toFixed(6)}</small>
            </div>
          `).openPopup()}}catch(N){console.error("Error updating location display:",N)}},H=y=>{console.error("Error getting location:",y);let E="Unable to get your location. Please enable location permissions.";switch(y.code){case y.PERMISSION_DENIED:E="Location permission denied. Please enable location access in your browser settings.";break;case y.POSITION_UNAVAILABLE:E="Location information is unavailable. Please try again later.";break;case y.TIMEOUT:E="Location request timed out. Please try again.";break}x.textContent=E,x.style.color="var(--error)",W.style.display="none"},At=()=>{if(!navigator.geolocation){x.textContent="Geolocation is not supported by your browser",x.style.color="var(--error)";return}x.textContent="Detecting your location...",x.style.color="var(--gray-600)",W.style.display="none",navigator.geolocation.getCurrentPosition(y=>{gt(y.coords.latitude,y.coords.longitude)},H,{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})};At(),k.addEventListener("click",At),v.addEventListener("click",()=>{this.clearLocationSelection()});const de=y=>{g.textContent=y,g.style.display="block",r.style.display="none",a.style.display="none"};this.startCamera=async()=>{try{h(this,mt)&&h(this,mt).getTracks().forEach(y=>y.stop()),b(this,mt,await navigator.mediaDevices.getUserMedia({video:!0})),r.srcObject=h(this,mt),r.style.display="block",a.textContent="Take Photo",a.style.display="block",c.innerHTML="",b(this,Wt,null),g.style.display="none",a.removeEventListener("click",Q),a.addEventListener("click",zt)}catch(y){console.error("Error accessing camera:",y);let E="Failed to access camera. Please make sure camera permissions are granted.";y.name==="NotAllowedError"?E="Camera access was denied. Please enable camera permissions in your browser settings.":y.name==="NotFoundError"&&(E="No camera found. Please ensure a camera is connected and enabled."),de(E)}};const zt=()=>{if(!h(this,mt)||!r.srcObject||r.srcObject.getVideoTracks().length===0){console.warn("Stream not active or no video tracks."),de("Camera stream is not active. Please try again or grant permissions.");return}l.width=r.videoWidth,l.height=r.videoHeight,l.getContext("2d").drawImage(r,0,0,l.width,l.height),b(this,Wt,l.toDataURL("image/jpeg")),c.innerHTML=`<img src="${h(this,Wt)}" alt="Captured Image" style="max-width: 100%; border-radius: 8px;">`,r.style.display="none",a.textContent="Retake Photo",h(this,mt)&&h(this,mt).getTracks().forEach(E=>E.stop()),a.removeEventListener("click",zt),a.addEventListener("click",Q)},Q=async()=>{c.innerHTML="",b(this,Wt,null),await this.startCamera()};return await this.startCamera(),p.addEventListener("submit",async y=>{y.preventDefault();const E=document.getElementById("story-description").value;if(!h(this,Wt)){this.showError("Please take a photo first!");return}try{const N=await or(h(this,Wt),"photo.jpg","image/jpeg"),bt=h(this,Mt)?parseFloat(h(this,Mt).latitude):null,Tt=h(this,Mt)?parseFloat(h(this,Mt).longitude):null;await h(this,oi).submitStory(E,N,bt,Tt)}catch(N){console.error("Error submitting story:",N),this.showError("An error occurred while submitting your story. Please try again.")}}),()=>{h(this,mt)&&(h(this,mt).getTracks().forEach(y=>y.stop()),b(this,mt,null)),a.removeEventListener("click",zt),a.removeEventListener("click",Q),k.removeEventListener("click",At),v.removeEventListener("click",()=>{this.clearLocationSelection()})}}async handleMapClick(r,a){try{h(this,ot)&&h(this,ot).remove(),b(this,ot,h(this,te).addMarker([r,a])),b(this,Mt,{latitude:r,longitude:a});const l=document.getElementById("latitude"),c=document.getElementById("longitude"),p=document.getElementById("place-name"),g=document.getElementById("selected-location-info"),k=document.getElementById("clear-location"),v=document.getElementById("location-status");l&&c&&g&&(l.textContent=r.toFixed(6),c.textContent=a.toFixed(6),g.style.display="block",k.style.display="inline-block",v.textContent="Lokasi berhasil dipilih dari peta!",v.style.color="var(--success)"),h(this,te).changeCamera([r,a],15);try{const x=await ie.getPlaceNameByCoordinate(r,a);p&&(p.textContent=`📍 ${x}`),h(this,ot)&&h(this,ot).bindPopup(`
            <div style="text-align: center;">
              <strong>Lokasi Terpilih</strong><br>
              ${x}<br>
              <small>${r.toFixed(6)}, ${a.toFixed(6)}</small>
            </div>
          `).openPopup()}catch(x){console.error("Error getting place name:",x),p&&(p.textContent="📍 Lokasi tidak dikenali"),h(this,ot)&&h(this,ot).bindPopup(`
            <div style="text-align: center;">
              <strong>Lokasi Terpilih</strong><br>
              <small>${r.toFixed(6)}, ${a.toFixed(6)}</small>
            </div>
          `).openPopup()}}catch(l){console.error("Error handling map click:",l)}}clearLocationSelection(){h(this,ot)&&(h(this,ot).remove(),b(this,ot,null)),b(this,Mt,null);const r=document.getElementById("selected-location-info"),a=document.getElementById("clear-location"),l=document.getElementById("location-status"),c=document.getElementById("place-name");r&&(r.style.display="none"),a&&(a.style.display="none"),l&&(l.textContent="Klik pada peta untuk memilih lokasi cerita Anda",l.style.color="var(--gray-600)"),c&&(c.textContent="")}}oi=new WeakMap,mt=new WeakMap,Wt=new WeakMap,qt=new WeakMap,Mt=new WeakMap,te=new WeakMap,ot=new WeakMap;const Sn=(u,r)=>r.some(a=>u instanceof a);let Ko,$o;function gs(){return Ko||(Ko=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function _s(){return $o||($o=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Bn=new WeakMap,wn=new WeakMap,Di=new WeakMap;function vs(u){const r=new Promise((a,l)=>{const c=()=>{u.removeEventListener("success",p),u.removeEventListener("error",g)},p=()=>{a(we(u.result)),c()},g=()=>{l(u.error),c()};u.addEventListener("success",p),u.addEventListener("error",g)});return Di.set(r,u),r}function ys(u){if(Bn.has(u))return;const r=new Promise((a,l)=>{const c=()=>{u.removeEventListener("complete",p),u.removeEventListener("error",g),u.removeEventListener("abort",g)},p=()=>{a(),c()},g=()=>{l(u.error||new DOMException("AbortError","AbortError")),c()};u.addEventListener("complete",p),u.addEventListener("error",g),u.addEventListener("abort",g)});Bn.set(u,r)}let In={get(u,r,a){if(u instanceof IDBTransaction){if(r==="done")return Bn.get(u);if(r==="store")return a.objectStoreNames[1]?void 0:a.objectStore(a.objectStoreNames[0])}return we(u[r])},set(u,r,a){return u[r]=a,!0},has(u,r){return u instanceof IDBTransaction&&(r==="done"||r==="store")?!0:r in u}};function cr(u){In=u(In)}function bs(u){return _s().includes(u)?function(...r){return u.apply(Mn(this),r),we(this.request)}:function(...r){return we(u.apply(Mn(this),r))}}function ws(u){return typeof u=="function"?bs(u):(u instanceof IDBTransaction&&ys(u),Sn(u,gs())?new Proxy(u,In):u)}function we(u){if(u instanceof IDBRequest)return vs(u);if(wn.has(u))return wn.get(u);const r=ws(u);return r!==u&&(wn.set(u,r),Di.set(r,u)),r}const Mn=u=>Di.get(u);function xs(u,r,{blocked:a,upgrade:l,blocking:c,terminated:p}={}){const g=indexedDB.open(u,r),k=we(g);return l&&g.addEventListener("upgradeneeded",v=>{l(we(g.result),v.oldVersion,v.newVersion,we(g.transaction),v)}),a&&g.addEventListener("blocked",v=>a(v.oldVersion,v.newVersion,v)),k.then(v=>{p&&v.addEventListener("close",()=>p()),c&&v.addEventListener("versionchange",x=>c(x.oldVersion,x.newVersion,x))}).catch(()=>{}),k}const ks=["get","getKey","getAll","getAllKeys","count"],Ls=["put","add","delete","clear"],xn=new Map;function Jo(u,r){if(!(u instanceof IDBDatabase&&!(r in u)&&typeof r=="string"))return;if(xn.get(r))return xn.get(r);const a=r.replace(/FromIndex$/,""),l=r!==a,c=Ls.includes(a);if(!(a in(l?IDBIndex:IDBObjectStore).prototype)||!(c||ks.includes(a)))return;const p=async function(g,...k){const v=this.transaction(g,c?"readwrite":"readonly");let x=v.store;return l&&(x=x.index(k.shift())),(await Promise.all([x[a](...k),c&&v.done]))[0]};return xn.set(r,p),p}cr(u=>({...u,get:(r,a,l)=>Jo(r,a)||u.get(r,a,l),has:(r,a)=>!!Jo(r,a)||u.has(r,a)}));const Es=["continue","continuePrimaryKey","advance"],Xo={},Cn=new WeakMap,dr=new WeakMap,Ps={get(u,r){if(!Es.includes(r))return u[r];let a=Xo[r];return a||(a=Xo[r]=function(...l){Cn.set(this,dr.get(this)[r](...l))}),a}};async function*Ts(...u){let r=this;if(r instanceof IDBCursor||(r=await r.openCursor(...u)),!r)return;r=r;const a=new Proxy(r,Ps);for(dr.set(a,r),Di.set(a,Mn(r));r;)yield a,r=await(Cn.get(a)||r.continue()),Cn.delete(a)}function Qo(u,r){return r===Symbol.asyncIterator&&Sn(u,[IDBIndex,IDBObjectStore,IDBCursor])||r==="iterate"&&Sn(u,[IDBIndex,IDBObjectStore])}cr(u=>({...u,get(r,a,l){return Qo(r,a)?Ts:u.get(r,a,l)},has(r,a){return Qo(r,a)||u.has(r,a)}}));const Ss="storyapp-db",tr="stories",ze="bookmarks",ci=xs(Ss,1,{upgrade(u){u.objectStoreNames.contains(tr)||u.createObjectStore(tr,{keyPath:"id"}),u.objectStoreNames.contains(ze)||u.createObjectStore(ze,{keyPath:"id"})}}),Bs=async()=>ci;async function hr(u){return(await ci).put(ze,u)}async function zi(u){return(await ci).delete(ze,u)}async function kn(){return(await ci).getAll(ze)}async function Oi(u){return await(await ci).get(ze,u)!==void 0}var ee,ri,ai;class Is{constructor({view:r,storyId:a,token:l}){B(this,ee);B(this,ri);B(this,ai);b(this,ee,r),b(this,ri,a),b(this,ai,l)}async getStoryDetail(){try{h(this,ee).showLoading();const r=await Xa(h(this,ai),h(this,ri));if(r.error){h(this,ee).showError(r.message||"Failed to load story details");return}h(this,ee).displayStoryDetail(r.story)}catch(r){console.error("Error fetching story detail:",r),h(this,ee).showError("An error occurred while loading the story details. Please try again.")}finally{h(this,ee).hideLoading()}}async toggleBookmark(r){try{return await Oi(r.id)?(await zi(r.id),!1):(await hr(r),!0)}catch(a){throw console.error("Error toggling bookmark:",a),a}}async checkBookmarkStatus(r){try{return await Oi(r)}catch(a){return console.error("Error checking bookmark status:",a),!1}}}ee=new WeakMap,ri=new WeakMap,ai=new WeakMap;function ur(u){const r=u.split("/");return{resource:r[1]||null,id:r[2]||null}}function Ms(u){let r="";return u.resource&&(r=r.concat(`/${u.resource}`)),u.id&&(r=r.concat("/:id")),r||"/"}function fr(){return location.hash.replace("#","")||"/"}function Cs(){const u=fr(),r=ur(u);return Ms(r)}function As(){const u=fr();return ur(u)}var Ae,si,ve;class zs{constructor(){B(this,Ae);B(this,si,null);B(this,ve,null);b(this,Ae,null)}async render(){return`
      <section class="container">
        <div class="detail-header">
          <button id="back-button" class="back-button">← Back</button>
          <h1>Story Detail</h1>
          <button id="bookmark-button" class="bookmark-button" title="Bookmark this story">
            <span class="bookmark-icon">🔖</span>
            <span class="bookmark-text">Bookmark</span>
          </button>
        </div>
        <div id="story-detail-container"></div>
      </section>
    `}async afterRender(){const r=document.getElementById("back-button");r&&r.addEventListener("click",()=>{window.history.back()});const a=document.getElementById("bookmark-button");a&&a.addEventListener("click",()=>{this.toggleBookmark()});const l=ne.getToken();if(!l){this.showError("Anda belum login. Silakan login terlebih dahulu."),setTimeout(()=>{window.location.hash="#/login"},2e3);return}this.showLoading();const{id:c}=As();if(!c){this.showError("Story ID not found");return}b(this,Ae,new Is({view:this,storyId:c,token:l})),await h(this,Ae).getStoryDetail()}async displayStoryDetail(r){const a=document.getElementById("story-detail-container");if(!r){this.showError("Story not found");return}b(this,ve,r),await this.updateBookmarkButton(r.id);const l=await this.processStoryLocation(r),c=l.location!==null,p=`
      <article class="story-detail-full" data-story-id="${l.id}">
        <div class="story-detail-full__image-container">
          <img 
            class="story-detail-full__image" 
            src="${l.photoUrl}" 
            alt="${l.name}'s story" 
            loading="lazy"
          >
        </div>
        <div class="story-detail-full__content">
          <h2 class="story-detail-full__author">Author: ${l.name}</h2>
          <div class="story-detail-full__description">
            <p>${l.description}</p>
          </div>
          <p class="story-detail-full__date">Posted on: ${new Date(l.createdAt).toLocaleDateString()}</p>          ${c?`
            <div class="story-detail-full__location">
              <h3>Location: ${l.location.placeName}</h3>
              <p class="location-coordinates">Coordinates: ${l.location.latitude.toFixed(6)}, ${l.location.longitude.toFixed(6)}</p>
              <div id="story-map" class="story-map"></div>
            </div>
          `:""}
        </div>
      </article>
    `;a.innerHTML=p,setTimeout(()=>{const g=a.querySelector(".story-detail-full");g&&(g.style.viewTransitionName=`story-${l.id}`)},100),c&&setTimeout(async()=>{try{const{latitude:g,longitude:k,placeName:v}=l.location;document.getElementById("story-map")&&(b(this,si,await ie.build("#story-map",{center:[g,k],zoom:13})),h(this,si).addMarker([g,k],{},{content:`
                <div class="map-popup">
                  <h4>${l.name}'s Story</h4>
                  <p>${v}</p>
                </div>
              `}),setTimeout(()=>{const W=document.querySelectorAll(".leaflet-marker-icon");W.length>0&&W[0].click()},500))}catch(g){console.error("Error initializing map:",g);const k=document.getElementById("story-map");k&&(k.innerHTML='<p class="map-error">Failed to load map</p>')}},300)}showError(r){const a=document.getElementById("story-detail-container");a.innerHTML=`<p class="error-message">${r}</p>`}showLoading(){const r=document.getElementById("story-detail-container");r.innerHTML='<div class="loading-indicator">Loading story details...</div>'}hideLoading(){const r=document.querySelector(".loading-indicator");r&&r.remove()}async processStoryLocation(r){if(r.lat!==null&&r.lon!==null&&!isNaN(parseFloat(r.lat))&&!isNaN(parseFloat(r.lon)))try{const a=parseFloat(r.lat),l=parseFloat(r.lon);let c;try{c=await ie.getPlaceNameByCoordinate(a,l)}catch(p){console.warn("Error getting place name:",p),c=`${a.toFixed(6)}, ${l.toFixed(6)}`}return{...r,location:{latitude:a,longitude:l,placeName:c}}}catch(a){return console.error("Error processing location:",a),{...r,location:{latitude:parseFloat(r.lat),longitude:parseFloat(r.lon),placeName:"Unknown location"}}}else return{...r,location:null}}async toggleBookmark(){if(!h(this,ve)){console.error("No story available to bookmark");return}const r=document.getElementById("bookmark-button"),a=r.querySelector(".bookmark-icon"),l=r.querySelector(".bookmark-text");try{r.disabled=!0,a.textContent="⏳",l.textContent="Processing...";const c=h(this,ve).id;await Oi(c)?(await zi(c),this.showToast("Bookmark removed successfully!","success")):(await hr(h(this,ve)),this.showToast("Story bookmarked successfully!","success")),await this.updateBookmarkButton(c)}catch(c){console.error("Error toggling bookmark:",c),this.showToast("Failed to update bookmark. Please try again.","error"),r.disabled=!1,a.textContent="🔖",l.textContent="Bookmark"}}async updateBookmarkButton(r){const a=document.getElementById("bookmark-button"),l=a.querySelector(".bookmark-icon"),c=a.querySelector(".bookmark-text");if(a)try{const p=await Oi(r);a.disabled=!1,p?(a.classList.add("bookmarked"),l.textContent="📖",c.textContent="Bookmarked",a.title="Remove from bookmarks"):(a.classList.remove("bookmarked"),l.textContent="🔖",c.textContent="Bookmark",a.title="Add to bookmarks")}catch(p){console.error("Error updating bookmark button:",p),a.disabled=!1}}showToast(r,a="info"){const l=document.createElement("div");l.className=`toast toast-${a}`,l.textContent=r,document.body.appendChild(l),setTimeout(()=>l.classList.add("show"),100),setTimeout(()=>{l.classList.remove("show"),setTimeout(()=>{l.parentNode&&l.parentNode.removeChild(l)},300)},3e3)}}Ae=new WeakMap,si=new WeakMap,ve=new WeakMap;var Et;class Os{constructor({view:r}){B(this,Et);b(this,Et,r)}async getAllStories(r,a=1,l=10,c=1){try{h(this,Et).showLoading();const p=await nr(r,a,l,c);if(h(this,Et).clearLoading&&h(this,Et).clearLoading(),p.error){h(this,Et).showError(p.message||"Failed to load stories with location data");return}h(this,Et).displayStories(p.listStory)}catch(p){console.error("Error fetching stories:",p),h(this,Et).clearLoading&&h(this,Et).clearLoading(),h(this,Et).showError("An error occurred while loading stories. Please try again.")}}}Et=new WeakMap;var X,Zi,li,Pt,tt,mr,Mi,Ci,pr,gr,An;class Ns{constructor(){B(this,tt);B(this,X,null);B(this,Zi,[]);B(this,li,null);B(this,Pt,[])}async render(){return`
      <section class="container">
        <header class="page-header">
          <h1 id="all-stories-title">🗺️ All Stories Map</h1>
          <p class="page-description">Jelajahi semua cerita pengguna di peta interaktif dan lihat lokasi tempat cerita dibagikan</p>
        </header>
        
        <div class="map-filter-controls" role="toolbar" aria-label="Kontrol peta">
          <button 
            id="refresh-map-btn" 
            class="map-control-btn"
            aria-label="Muat ulang peta dan data cerita"
            title="Muat ulang peta"
          >
            <span aria-hidden="true">🔄</span> Refresh Map
          </button>
        </div>
        
        <div class="all-stories-map-container">
          <div 
            id="all-stories-map" 
            class="all-stories-map"
            role="application"
            aria-label="Peta interaktif lokasi cerita"
            aria-describedby="map-description"
            tabindex="0"
          >
            <div id="map-description" class="sr-only">
              Peta interaktif yang menampilkan lokasi-lokasi di mana cerita telah dibagikan. 
              Gunakan tombol panah atau mouse untuk menavigasi peta.
            </div>
            <div class="map-loading" role="status" aria-live="polite">
              <div class="loading-spinner" aria-hidden="true"></div>
              <p>Memuat peta dan lokasi cerita...</p>
            </div>
          </div>
        </div>
        
        <div class="stories-list-container">
          <header>
            <h2 id="stories-list-title">📋 Daftar Cerita</h2>
          </header>
          <div 
            id="stories-list" 
            class="stories-container"
            role="region"
            aria-labelledby="stories-list-title"
            aria-live="polite"
          >
            <div class="loading-spinner" aria-hidden="true"></div>
            <span class="sr-only">Memuat daftar cerita...</span>
          </div>
        </div>
      </section>
    `}async afterRender(){b(this,li,new Os({view:this}));const r=ne.getToken();if(!r){this.showAuthError();return}await O(this,tt,mr).call(this,"#all-stories-map"),setTimeout(async()=>{try{const a=document.getElementById("all-stories-map");if(!a||a.offsetWidth===0){console.warn("Map element not ready, retrying..."),setTimeout(()=>O(this,tt,Mi).call(this,r),500);return}await O(this,tt,Mi).call(this,r)}catch(a){console.error("Error in afterRender:",a),this.showMapError("Failed to initialize page. Please refresh.")}},300)}showMapError(r){const a=document.getElementById("all-stories-map");if(a&&!h(this,X))a.innerHTML=`<p class="map-error">${r}</p>`;else if(a&&h(this,X)&&!a.querySelector(".map-error-overlay")){const c=document.createElement("div");c.className="map-error-overlay",c.innerHTML=`<p class="map-error">${r}</p>`,c.style.position="absolute",c.style.top="10px",c.style.left="10px",c.style.right="10px",c.style.zIndex="1000",c.style.backgroundColor="rgba(255, 255, 255, 0.9)",c.style.padding="10px",c.style.borderRadius="4px",a.appendChild(c)}}showAuthError(){const r=document.getElementById("stories-list"),a=document.getElementById("all-stories-map");r&&(r.innerHTML=`
        <div class="auth-error">
          <p>You need to be logged in to view all stories.</p>
          <a href="#/login" class="btn-primary">Login</a>
        </div>
      `),a&&(a.innerHTML=`
        <div class="auth-error">
          <p>You need to be logged in to view the stories map.</p>
        </div>
      `)}displayStories(r){b(this,Zi,r),b(this,Pt,[]);const a=document.getElementById("stories-list"),l=document.getElementById("all-stories-map");if(!a||!l)return;if(O(this,tt,Ci).call(this),r.length===0){a.innerHTML='<p class="no-stories-message">No stories found.</p>',h(this,X)||(l.innerHTML='<p class="map-error">No stories available to display on map.</p>');return}!h(this,X)&&l.querySelector(".map-error")&&(l.innerHTML="");let c="",p=0,g=0;const k=[];r.forEach(x=>{const W=x.lat!==null&&x.lon!==null&&!isNaN(parseFloat(x.lat))&&!isNaN(parseFloat(x.lon));if(c+=`
        <article class="story-item ${W?"has-location":"no-location"}">
          <a href="#/detail/${x.id}" class="story-item__link">
            <img 
              class="story-item__image" 
              src="${x.photoUrl}" 
              alt="${x.name}'s story" 
              loading="lazy"
            >
            <h2 class="story-item__title">${x.name}'s Story</h2>
            <div class="story-item__meta">
              <p class="story-item__date">${new Date(x.createdAt).toLocaleDateString()}</p>
              ${W?`
                <div class="story-item__location">
                  <span class="location-icon">📍</span> Has location
                </div>
              `:`
                <div class="story-item__no-location">
                  <span class="no-location-icon">ⓘ</span> No location data
                </div>
              `}
            </div>
          </a>
        </article>
      `,W){const T=parseFloat(x.lat),Y=parseFloat(x.lon);if(!isNaN(T)&&!isNaN(Y)){const gt=new Date(x.createdAt).toLocaleDateString();k.push({coordinates:[T,Y],popupOptions:{content:`
                <div class="map-popup">
                  <div class="map-popup__image">
                    <img src="${x.photoUrl}" alt="${x.name}'s story" loading="lazy">
                  </div>
                  <h4>${x.name}'s Story</h4>
                  <p class="popup-date">Posted on: ${gt}</p>
                  <p class="popup-coordinates">📍 ${T.toFixed(6)}, ${Y.toFixed(6)}</p>
                  <a href="#/detail/${x.id}" class="popup-link">View Full Story</a>
                </div>
              `}}),p++}else g++}else g++}),a.innerHTML=c;const v=`
      <div class="stories-stats">
        <p>Total: <strong>${r.length} stories</strong></p>
        <p>With location: <strong>${p} stories</strong></p>
        <p>Without location: <strong>${g} stories</strong></p>
      </div>
    `;if(document.querySelector(".stories-list-container h2").insertAdjacentHTML("afterend",v),k.length>0&&h(this,X))if(b(this,Pt,h(this,X).addMultipleMarkers(k)),h(this,Pt).length>0)try{this.fitMapToMarkers();const x=Math.floor(Math.random()*h(this,Pt).length);h(this,Pt)[x].openPopup()}catch(x){console.error("Error fitting map to markers:",x)}else console.warn("No stories with location data found to display on map.");else h(this,X)?console.warn("No stories with location data found to display on map."):l.innerHTML='<p class="map-error">No stories with location data found to display on map.</p>'}addStoryMarker(r){if(h(this,X))try{const a=parseFloat(r.lat),l=parseFloat(r.lon);if(isNaN(a)||isNaN(l))return;const p=new Date(r.createdAt).toLocaleDateString(),g=h(this,X).addMarker([a,l],{},{content:`
          <div class="map-popup">
            <div class="map-popup__image">
              <img src="${r.photoUrl}" alt="${r.name}'s story" loading="lazy">
            </div>
            <h4>${r.name}'s Story</h4>
            <p class="popup-description">${this.truncateText(r.description,80)}</p>
            <p class="popup-date">Posted on: ${p}</p>
            <p class="popup-coordinates">📍 ${a.toFixed(6)}, ${l.toFixed(6)}</p>
            <a href="#/detail/${r.id}" class="popup-link">View Full Story</a>
          </div>
        `});h(this,Pt).push(g)}catch(a){console.error("Error adding marker for story:",a)}}fitMapToMarkers(){if(!(!h(this,X)||h(this,Pt).length===0)){if(!h(this,X).isReady()){console.warn("Map is no longer valid, attempting to reinitialize..."),O(this,tt,An).call(this);return}try{h(this,X).fitBounds(h(this,Pt))}catch(r){console.error("Error fitting map to markers:",r),O(this,tt,An).call(this)}}}truncateText(r,a){return r?r.length<=a?r:r.substr(0,a)+"...":""}showLoading(){const r=document.getElementById("stories-list");r&&(r.innerHTML='<div class="loading-spinner"></div>');const a=document.getElementById("all-stories-map");a&&!h(this,X)&&(a.innerHTML=`
        <div class="map-loading">
          <div class="loading-spinner"></div>
          <p>Loading map and story locations...</p>
        </div>
      `)}clearLoading(){const r=document.getElementById("stories-list");if(r){const a=r.querySelector(".loading-spinner");a&&a.remove()}O(this,tt,Ci).call(this)}showError(r){const a=document.getElementById("stories-list");a&&(a.innerHTML=`<p class="error-message">${r}</p>`)}}X=new WeakMap,Zi=new WeakMap,li=new WeakMap,Pt=new WeakMap,tt=new WeakSet,mr=async function(r,a=3e3){return new Promise((l,c)=>{const p=document.querySelector(r);if(p&&p.offsetWidth>0){l(p);return}const g=new MutationObserver(()=>{const k=document.querySelector(r);k&&k.offsetWidth>0&&(g.disconnect(),l(k))});g.observe(document.body,{childList:!0,subtree:!0}),setTimeout(()=>{g.disconnect(),c(new Error(`Element ${r} not found within ${a}ms`))},a)})},Mi=async function(r){try{if(!document.getElementById("all-stories-map"))throw new Error("Map element not found");O(this,tt,Ci).call(this),b(this,X,await ie.build("#all-stories-map",{zoom:5})),await h(this,li).getAllStories(r,1,50,1),O(this,tt,pr).call(this)}catch(a){console.error("Error initializing map:",a),this.showMapError("Failed to load map. Please refresh the page.")}},Ci=function(){const r=document.getElementById("all-stories-map");if(r){const a=r.querySelector(".map-loading");a&&a.remove(),h(this,X)||(r.innerHTML="")}},pr=function(){const r=document.getElementById("refresh-map-btn");r&&r.addEventListener("click",()=>{O(this,tt,gr).call(this)})},gr=function(){if(!h(this,X)||!h(this,Pt).length)return;const r=document.getElementById("all-stories-map");if(r){const a=r.querySelector(".map-error-overlay");a&&a.remove()}this.fitMapToMarkers()},An=async function(){b(this,X,null);const r=ne.getToken();if(r)try{setTimeout(async()=>{await O(this,tt,Mi).call(this,r)},500)}catch(a){console.error("Failed to recover map:",a),this.showMapError("Map was destroyed. Please refresh the page.")}};var se;class Zs{constructor({view:r}){B(this,se);b(this,se,r)}async loadBookmarks(){try{h(this,se).showLoading(),await Bs();const a=(await kn()).sort((l,c)=>new Date(c.createdAt)-new Date(l.createdAt));h(this,se).displayBookmarks(a)}catch(r){console.error("Error loading bookmarks:",r),h(this,se).showError("Failed to load bookmarks. Please try again.")}finally{h(this,se).hideLoading()}}async removeBookmark(r){try{return await zi(r),!0}catch(a){throw console.error("Error removing bookmark:",a),a}}async clearAllBookmarks(){try{const a=(await kn()).map(l=>zi(l.id));return await Promise.all(a),!0}catch(r){throw console.error("Error clearing all bookmarks:",r),r}}async getBookmarkCount(){try{return(await kn()).length}catch(r){return console.error("Error getting bookmark count:",r),0}}async refreshBookmarks(){await this.loadBookmarks()}}se=new WeakMap;var le;class Ds{constructor(){B(this,le);b(this,le,null)}async render(){return`
      <section class="container">
        <div class="page-header">
          <button id="back-button" class="back-button">← Back</button>
          <h1>My Bookmarks</h1>
          <button id="clear-bookmarks-button" class="clear-button" title="Clear all bookmarks">
            <span class="clear-icon">🗑️</span>
            <span class="clear-text">Clear All</span>
          </button>
        </div>
        <div id="bookmarks-container"></div>
      </section>
    `}async afterRender(){const r=document.getElementById("back-button");r&&r.addEventListener("click",()=>{window.history.back()});const a=document.getElementById("clear-bookmarks-button");if(a&&a.addEventListener("click",()=>{this.showClearConfirmation()}),!ne.getToken()){this.showError("Anda belum login. Silakan login terlebih dahulu."),setTimeout(()=>{window.location.hash="#/login"},2e3);return}b(this,le,new Zs({view:this})),await h(this,le).loadBookmarks()}displayBookmarks(r){const a=document.getElementById("bookmarks-container");if(!r||r.length===0){a.innerHTML=`
        <div class="empty-state">
          <div class="empty-state-icon">📖</div>
          <h3>No Bookmarks Yet</h3>
          <p>Start bookmarking your favorite stories to see them here.</p>
          <a href="#/home" class="primary-button">Browse Stories</a>
        </div>
      `;return}const l=r.map(c=>`
      <article class="bookmark-card" data-story-id="${c.id}">
        <div class="bookmark-card__image-container">
          <img 
            class="bookmark-card__image" 
            src="${c.photoUrl}" 
            alt="${c.name}'s story"
            loading="lazy"
          >
        </div>
        <div class="bookmark-card__content">
          <div class="bookmark-card__header">
            <h3 class="bookmark-card__author">${c.name}</h3>
            <button 
              class="remove-bookmark-button" 
              data-story-id="${c.id}"
              title="Remove bookmark"
            >
              ✕
            </button>
          </div>
          <p class="bookmark-card__description">${this.truncateText(c.description,150)}</p>
          <div class="bookmark-card__footer">
            <span class="bookmark-card__date">${new Date(c.createdAt).toLocaleDateString()}</span>
            <a href="#/detail/${c.id}" class="view-story-link">View Story</a>
          </div>
        </div>
      </article>
    `).join("");a.innerHTML=`
      <div class="bookmarks-grid">
        ${l}
      </div>
    `,this.attachRemoveBookmarkListeners()}attachRemoveBookmarkListeners(){document.querySelectorAll(".remove-bookmark-button").forEach(a=>{a.addEventListener("click",async l=>{l.preventDefault(),l.stopPropagation();const c=a.dataset.storyId;await this.removeBookmark(c)})})}async removeBookmark(r){try{await h(this,le).removeBookmark(r),this.showToast("Bookmark removed successfully!","success");const a=document.querySelector(`[data-story-id="${r}"]`);a&&(a.style.transform="translateX(-100%)",a.style.opacity="0",setTimeout(()=>{a.remove(),document.querySelectorAll(".bookmark-card").length===0&&this.displayBookmarks([])},300))}catch(a){console.error("Error removing bookmark:",a),this.showToast("Failed to remove bookmark. Please try again.","error")}}showClearConfirmation(){const r=document.createElement("div");r.className="confirmation-overlay",r.innerHTML=`
      <div class="confirmation-dialog">
        <div class="confirmation-icon">⚠️</div>
        <h3>Clear All Bookmarks?</h3>
        <p>This action cannot be undone. All your bookmarked stories will be removed.</p>
        <div class="confirmation-buttons">
          <button class="cancel-button">Cancel</button>
          <button class="confirm-button">Clear All</button>
        </div>
      </div>
    `,document.body.appendChild(r);const a=r.querySelector(".cancel-button"),l=r.querySelector(".confirm-button");a.addEventListener("click",()=>{r.remove()}),l.addEventListener("click",async()=>{r.remove(),await this.clearAllBookmarks()}),r.addEventListener("click",c=>{c.target===r&&r.remove()})}async clearAllBookmarks(){try{await h(this,le).clearAllBookmarks(),this.showToast("All bookmarks cleared successfully!","success"),this.displayBookmarks([])}catch(r){console.error("Error clearing bookmarks:",r),this.showToast("Failed to clear bookmarks. Please try again.","error")}}showLoading(){const r=document.getElementById("bookmarks-container");r.innerHTML=`
      <div class="loading-indicator">
        <div class="loading-spinner"></div>
        <p>Loading your bookmarks...</p>
      </div>
    `}hideLoading(){const r=document.querySelector(".loading-indicator");r&&r.remove()}showError(r){const a=document.getElementById("bookmarks-container");a.innerHTML=`
      <div class="error-state">
        <div class="error-icon">❌</div>
        <h3>Error</h3>
        <p>${r}</p>
        <button onclick="location.reload()" class="retry-button">Try Again</button>
      </div>
    `}truncateText(r,a){return r.length<=a?r:r.substring(0,a).trim()+"..."}showToast(r,a="info"){const l=document.createElement("div");l.className=`toast toast-${a}`,l.textContent=r,document.body.appendChild(l),setTimeout(()=>l.classList.add("show"),100),setTimeout(()=>{l.classList.remove("show"),setTimeout(()=>{l.parentNode&&l.parentNode.removeChild(l)},300)},3e3)}}le=new WeakMap;const Rs={"/":new is,"/all-stories":new Ns,"/bookmarks":new Ds,"/login":new os,"/register":new as,"/add-story-guest":new fs,"/add-story":new ps,"/detail/:id":new zs};function er(){return"serviceWorker"in navigator}function Fs(u){const r="=".repeat((4-u.length%4)%4),a=(u+r).replace(/-/g,"+").replace(/_/g,"/"),l=window.atob(a),c=new Uint8Array(l.length);for(let p=0;p<l.length;++p)c[p]=l.charCodeAt(p);return c}function Hs(){return"Notification"in window}function Us(){return Notification.permission==="granted"}async function Ws(){if(!Hs())return console.error("Notification API unsupported."),!1;if(Us())return!0;const u=await Notification.requestPermission();return u==="denied"?(alert("Izin notifikasi ditolak."),!1):u==="default"?(alert("Izin notifikasi ditutup atau diabaikan."),!1):!0}async function _r(){return await(await navigator.serviceWorker.getRegistration()).pushManager.getSubscription()}async function zn(){return!!await _r()}function qs(){return{userVisibleOnly:!0,applicationServerKey:Fs(Ka)}}async function js(){if(!await Ws())return!1;if(await zn())return alert("Sudah berlangganan push notification."),!0;const u="Langganan push notification gagal diaktifkan.",r="Langganan push notification berhasil diaktifkan.";try{const l=await(await navigator.serviceWorker.getRegistration()).pushManager.subscribe(qs()),{endpoint:c,keys:p}=l.toJSON();return alert(r),!0}catch(a){return console.error("subscribe: error:",a),alert(u),!1}}async function Vs(){const u="Gagal menonaktifkan push notification.",r="Push notification berhasil dinonaktifkan.";try{const a=await _r();return a?await a.unsubscribe()?(alert(r),!0):(console.error("Gagal menghapus push subscription"),alert(u),!1):(alert("Tidak ada langganan push notification aktif."),!1)}catch(a){return console.error("unsubscribe: error:",a),alert(u),!1}}var ce,lt,pt,ye,be,jt,Ai,vr,yr;class Gs{constructor({navigationDrawer:r,drawerButton:a,content:l}){B(this,jt);B(this,ce,null);B(this,lt,null);B(this,pt,null);B(this,ye,null);B(this,be,!1);b(this,ce,l),b(this,lt,a),b(this,pt,r),b(this,ye,document.getElementById("nav-list")),O(this,jt,yr).call(this),O(this,jt,Ai).call(this)}async renderPage(){if(h(this,be)){console.warn("Transition already in progress, skipping");return}await O(this,jt,Ai).call(this);const r=Cs(),a=Rs[r];if(!a){console.error(`Route not found: ${r}`),h(this,ce).innerHTML="<p>Page not found</p>";return}if(document.startViewTransition)try{b(this,be,!0);const l=document.startViewTransition(async()=>{document.documentElement.classList.add("view-transition-active"),h(this,ce).innerHTML=await a.render(),await a.afterRender(),setTimeout(()=>{document.documentElement.classList.remove("view-transition-active")},500)});l.finished.catch(c=>{console.warn("View transition was interrupted:",c),document.documentElement.classList.remove("view-transition-active")}).finally(()=>{b(this,be,!1)}),await l.ready}catch(l){console.warn("View transition failed, falling back to normal rendering:",l),h(this,ce).innerHTML=await a.render(),await a.afterRender(),document.documentElement.classList.remove("view-transition-active"),b(this,be,!1)}else h(this,ce).innerHTML=await a.render(),await a.afterRender()}}ce=new WeakMap,lt=new WeakMap,pt=new WeakMap,ye=new WeakMap,be=new WeakMap,jt=new WeakSet,Ai=async function(){const r=ne.isLoggedIn(),a=er()?await zn():!1;if(h(this,ye).innerHTML="",r){h(this,ye).innerHTML=`
        <li role="menuitem"><a href="#/" aria-describedby="home-desc">🏠 Beranda</a><span id="home-desc" class="sr-only">Halaman utama aplikasi</span></li>
        <li role="menuitem"><a href="#/all-stories" aria-describedby="stories-desc">📚 All Stories</a><span id="stories-desc" class="sr-only">Lihat semua cerita yang telah dibagikan</span></li>
        <li role="menuitem"><a href="#/add-story" aria-describedby="add-desc">➕ Add Story</a><span id="add-desc" class="sr-only">Tambahkan cerita baru</span></li>
        <li role="menuitem"><a href="#/bookmarks" aria-describedby="bookmarks-desc">📖 My Bookmarks</a><span id="bookmarks-desc" class="sr-only">Lihat daftar cerita yang disimpan</span></li>
        <li role="menuitem">
          <a href="#" id="notification-toggle-link" class="${a?"subscribed":""}" aria-describedby="notification-desc">
            ${a?"🔕 Matikan Notifikasi":"🔔 Aktifkan Notifikasi"}
          </a>
          <span id="notification-desc" class="sr-only">${a?"Matikan push notification":"Aktifkan push notification"}</span>
        </li>
        <li role="menuitem"><a href="#/" id="logout-button" aria-describedby="logout-desc">🚪 Logout</a><span id="logout-desc" class="sr-only">Keluar dari akun Anda</span></li>
        `;const l=document.getElementById("logout-button");l&&l.addEventListener("click",c=>{c.preventDefault(),ne.clearUserData(),O(this,jt,Ai).call(this),window.location.hash="#/"}),er()&&O(this,jt,vr).call(this)}else h(this,ye).innerHTML=`
        <li role="menuitem"><a href="#/login" aria-describedby="login-desc">🔑 Login</a><span id="login-desc" class="sr-only">Masuk ke akun Anda</span></li>
        <li role="menuitem"><a href="#/register" aria-describedby="register-desc">📝 Register</a><span id="register-desc" class="sr-only">Daftar akun baru</span></li>
        <li role="menuitem"><a href="#/add-story-guest" aria-describedby="guest-desc">✍️ Add Story Guest</a><span id="guest-desc" class="sr-only">Tambah cerita sebagai tamu</span></li>
        <li role="menuitem">
          <a href="#" id="notification-toggle-link" class="${a?"subscribed":""}" aria-describedby="notification-desc">
            ${a?"🔕 Matikan Notifikasi":"🔔 Aktifkan Notifikasi"}
          </a>
          <span id="notification-desc" class="sr-only">${a?"Matikan push notification":"Aktifkan push notification"}</span>
        </li>
      `},vr=function(){const r=document.getElementById("notification-toggle-link");r&&r.addEventListener("click",async a=>{a.preventDefault();const l=await zn(),c=a.target;c.style.pointerEvents="none",c.style.opacity="0.6",l?(c.textContent="⏳ Menonaktifkan...",await Vs()?(c.textContent="🔔 Aktifkan Notifikasi",c.classList.remove("subscribed"),document.getElementById("notification-desc").textContent="Aktifkan push notification"):c.textContent="🔕 Matikan Notifikasi"):(c.textContent="⏳ Mengaktifkan...",await js()?(c.textContent="🔕 Matikan Notifikasi",c.classList.add("subscribed"),document.getElementById("notification-desc").textContent="Matikan push notification"):c.textContent="🔔 Aktifkan Notifikasi"),c.style.pointerEvents="",c.style.opacity="1"})},yr=function(){h(this,lt).addEventListener("click",()=>{if(h(this,pt).classList.contains("open"))h(this,pt).classList.remove("open"),h(this,lt).setAttribute("aria-expanded","false"),h(this,lt).setAttribute("aria-label","Buka menu navigasi");else{h(this,pt).classList.add("open"),h(this,lt).setAttribute("aria-expanded","true"),h(this,lt).setAttribute("aria-label","Tutup menu navigasi");const a=h(this,pt).querySelector("a, button");a&&setTimeout(()=>a.focus(),300)}}),document.addEventListener("keydown",r=>{r.key==="Escape"&&h(this,pt).classList.contains("open")&&(h(this,pt).classList.remove("open"),h(this,lt).setAttribute("aria-expanded","false"),h(this,lt).setAttribute("aria-label","Buka menu navigasi"),h(this,lt).focus())}),document.body.addEventListener("click",r=>{!h(this,pt).contains(r.target)&&!h(this,lt).contains(r.target)&&(h(this,pt).classList.remove("open"),h(this,lt).setAttribute("aria-expanded","false"),h(this,lt).setAttribute("aria-label","Buka menu navigasi")),h(this,pt).querySelectorAll("a, button").forEach(a=>{a.contains(r.target)&&a.id!=="notification-toggle-link"&&(h(this,pt).classList.remove("open"),h(this,lt).setAttribute("aria-expanded","false"),h(this,lt).setAttribute("aria-label","Buka menu navigasi"))})})};const Ys="modulepreload",Ks=function(u){return"/%20Story-App-Web%20/"+u},ir={},$s=function(r,a,l){let c=Promise.resolve();if(a&&a.length>0){document.getElementsByTagName("link");const g=document.querySelector("meta[property=csp-nonce]"),k=(g==null?void 0:g.nonce)||(g==null?void 0:g.getAttribute("nonce"));c=Promise.allSettled(a.map(v=>{if(v=Ks(v),v in ir)return;ir[v]=!0;const x=v.endsWith(".css"),W=x?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${v}"]${W}`))return;const T=document.createElement("link");if(T.rel=x?"stylesheet":Ys,x||(T.as="script"),T.crossOrigin="",T.href=v,k&&T.setAttribute("nonce",k),document.head.appendChild(T),x)return new Promise((Y,yt)=>{T.addEventListener("load",Y),T.addEventListener("error",()=>yt(new Error(`Unable to preload CSS for ${v}`)))})}))}function p(g){const k=new Event("vite:preloadError",{cancelable:!0});if(k.payload=g,window.dispatchEvent(k),!k.defaultPrevented)throw g}return c.then(g=>{for(const k of g||[])k.status==="rejected"&&p(k.reason);return r().catch(p)})};function Js(u={}){const{immediate:r=!1,onNeedRefresh:a,onOfflineReady:l,onRegistered:c,onRegisteredSW:p,onRegisterError:g}=u;let k,v;const x=async(T=!0)=>{await v};async function W(){if("serviceWorker"in navigator){if(k=await $s(async()=>{const{Workbox:T}=await import("./workbox-window.prod.es5-B9K5rw8f.js");return{Workbox:T}},[]).then(({Workbox:T})=>new T("/%20Story-App-Web%20/sw.js",{scope:"/%20Story-App-Web%20/",type:"classic"})).catch(T=>{g==null||g(T)}),!k)return;k.addEventListener("activated",T=>{(T.isUpdate||T.isExternal)&&window.location.reload()}),k.addEventListener("installed",T=>{T.isUpdate||l==null||l()}),k.register({immediate:r}).then(T=>{p?p("/%20Story-App-Web%20/sw.js",T):c==null||c(T)}).catch(T=>{g==null||g(T)})}}return v=W(),x}document.addEventListener("DOMContentLoaded",async()=>{const u=document.querySelector("#main-content"),r=document.createElement("div");r.id="loading-indicator",r.innerHTML=`
    <div class="spinner"></div>
    <p>Loading content...</p>
  `,u.appendChild(r);const a=new Gs({content:u,drawerButton:document.querySelector("#drawer-button"),navigationDrawer:document.querySelector("#navigation-drawer")});try{await a.renderPage()}finally{const c=document.getElementById("loading-indicator");c&&(c.classList.add("fade-out"),setTimeout(()=>{c.remove()},500))}const l=Js({onNeedRefresh(){confirm("New content available. Reload?")&&l(!0)},onOfflineReady(){console.log("App ready to work offline")}});window.addEventListener("hashchange",async()=>{document.startViewTransition||u.appendChild(r.cloneNode(!0));try{await a.renderPage()}catch(c){console.error("Error rendering page:",c);const p=document.createElement("div");p.innerHTML=`
        <div class="error-message">
          <h2>Something went wrong</h2>
          <p>Please try refreshing the page or navigate to a different section.</p>
          <button onclick="window.location.reload()">Refresh Page</button>
        </div>
      `,u.innerHTML="",u.appendChild(p)}finally{if(!document.startViewTransition){const c=document.getElementById("loading-indicator");c&&(c.classList.add("fade-out"),setTimeout(()=>{c.parentNode&&c.remove()},500))}}})});
