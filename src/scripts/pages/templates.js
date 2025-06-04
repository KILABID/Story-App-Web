export function generateStoryItemTemplate({ username, image, description, id, createdAt }) {
  // Format tanggal untuk ditampilkan
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('id-ID', options);
  };

  return `
    <article class="story-detail" data-id="${id}" role="article" tabindex="0">
      <div class="story-detail__image-container">
        <img
          class="story-detail__image"
          src="${image}"
          alt="Foto cerita dari ${username}"
          loading="lazy"
          onerror="this.alt='Gambar tidak dapat dimuat'"
        >
      </div>
      <header class="story-detail__header">
        <h2 class="story-detail__title story-title" id="story-title-${id}">
          👤 ${username}
        </h2>
        ${createdAt ? `<time class="story-detail__date" datetime="${createdAt}">
          📅 ${formatDate(createdAt)}
        </time>` : ''}
      </header>
      <div class="story-detail__description" aria-labelledby="story-title-${id}" role="region">
        <p>${description}</p>
      </div>
      <footer class="story-detail__actions">
        <span class="sr-only">Tekan Enter atau klik untuk membaca cerita lengkap</span>
      </footer>
    </article>
  `;
}

export function generateSubscribeButtonTemplate() {
  return `
    <div class="push-notification-tools">
      <button id="subscribe-button" class="push-subscribe-btn">
        🔔 Aktifkan Push Notification
      </button>
      <button id="unsubscribe-button" class="push-unsubscribe-btn" style="display: none;">
        🔕 Matikan Push Notification
      </button>
      <p id="push-status" class="push-status"></p>
    </div>

    <style>
      .push-notification-tools {
        padding: 1rem;
        background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
        border-radius: 8px;
        margin: 1rem 0;
        text-align: center;
        border: 1px solid #d1d5db;
      }

      .push-subscribe-btn, .push-unsubscribe-btn {
        background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        margin: 0.25rem;
        font-size: 0.9rem;
        box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
      }

      .push-unsubscribe-btn {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        box-shadow: 0 2px 4px rgba(239, 68, 68, 0.3);
      }

      .push-subscribe-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
      }

      .push-unsubscribe-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
      }

      .push-subscribe-btn:disabled,
      .push-unsubscribe-btn:disabled {
        background: #9ca3af;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
      }

      .push-status {
        margin-top: 0.75rem;
        font-size: 0.875rem;
        color: #6b7280;
        font-weight: 500;
      }

      .push-status.success {
        color: #059669;
      }

      .push-status.error {
        color: #dc2626;
      }

      .push-status.warning {
        color: #d97706;
      }
    </style>
  `;
}

export function updatePushNotificationUI(isSubscribed = false) {
  const subscribeBtn = document.getElementById('subscribe-button');
  const unsubscribeBtn = document.getElementById('unsubscribe-button');
  const statusElement = document.getElementById('push-status');

  if (!subscribeBtn || !unsubscribeBtn || !statusElement) {
    return;
  }

  if (isSubscribed) {
    subscribeBtn.style.display = 'none';
    unsubscribeBtn.style.display = 'inline-block';
    statusElement.textContent = '✅ Push notification aktif';
    statusElement.className = 'push-status success';
  } else {
    subscribeBtn.style.display = 'inline-block';
    unsubscribeBtn.style.display = 'none';
    statusElement.textContent = '⭕ Push notification tidak aktif';
    statusElement.className = 'push-status';
  }
}