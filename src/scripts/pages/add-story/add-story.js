import AddStoryPresenter from './add-story-presenter.js';
import Map from '../../utils/map.js';
import { convertDataUrlToFile } from '../../data/api.js';

export default class AddStory {  #presenter;
  #stream = null;
  #capturedImageDataUrl = null;
  #loadingOverlay = null;
  #userLocation = null; // Store user location coordinates
  #map = null; // Store map instance
  #marker = null; // Store current marker

  constructor() {
    this.#presenter = new AddStoryPresenter({ view: this });
  }
  render(){
    return `<section class="container">
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
    `;
  }

  showLoading() {
    this.#loadingOverlay = document.createElement('div');
    this.#loadingOverlay.classList.add('overlay');
    this.#loadingOverlay.innerHTML = `
      <div class="loading-container">
        <p>Uploading your story...</p>
        <div class="spinner"></div>
      </div>
    `;
    document.body.appendChild(this.#loadingOverlay);

    const submitButton = document.getElementById('submit-button');
    const buttonText = document.getElementById('button-text');
    const loadingSpinner = document.getElementById('loading-spinner');
    
    if (submitButton && buttonText && loadingSpinner) {
      buttonText.textContent = 'Uploading...';
      loadingSpinner.style.display = 'inline-block';
      submitButton.disabled = true;
    }
  }

  hideLoading() {
    if (this.#loadingOverlay) {
      this.#loadingOverlay.remove();
      this.#loadingOverlay = null;
    }

    const submitButton = document.getElementById('submit-button');
    const buttonText = document.getElementById('button-text');
    const loadingSpinner = document.getElementById('loading-spinner');
    
    if (submitButton && buttonText && loadingSpinner) {
      buttonText.textContent = 'Add Story';
      loadingSpinner.style.display = 'none';
      submitButton.disabled = false;
    }
  }

  showError(message) {
    const errorAlert = document.createElement('div');
    errorAlert.textContent = message;
    errorAlert.style.cssText = 'position:fixed; top:20px; left:50%; transform:translateX(-50%); background-color: #ffdddd; border:1px solid #ffaaaa; color: #d8000c; padding:15px; border-radius:5px; z-index:1000; box-shadow: 0 2px 4px rgba(0,0,0,0.2);';
    document.body.appendChild(errorAlert);
    setTimeout(() => {
      errorAlert.remove();
    }, 3000);
  }

  showSuccess(message) {
    const successAlert = document.createElement('div');
    successAlert.textContent = message;
    successAlert.style.cssText = 'position:fixed; top:20px; left:50%; transform:translateX(-50%); background-color: #ddffdd; border:1px solid #aaffaa; color: #005000; padding:15px; border-radius:5px; z-index:1000; box-shadow: 0 2px 4px rgba(0,0,0,0.2);';
    document.body.appendChild(successAlert);
    setTimeout(() => {
      successAlert.remove();
    }, 3000);
  }

  resetForm() {
    const addStoryForm = document.getElementById('add-story-form');
    if (addStoryForm) {
      addStoryForm.reset();
      this.startCamera();
    }
  }

  async afterRender() {
    const cameraPreview = document.getElementById('camera-preview');
    const captureButton = document.getElementById('capture-button');
    const photoCanvas = document.getElementById('photo-canvas');
    const capturedImageContainer = document.getElementById('captured-image-container');
    const addStoryForm = document.getElementById('add-story-form');
    const cameraErrorMessage = document.getElementById('camera-error-message');
    const locationButton = document.getElementById('location-button');
    const clearLocationButton = document.getElementById('clear-location');
    const locationStatus = document.getElementById('location-status');
    const selectedLocationInfo = document.getElementById('selected-location-info');
    const latitudeElement = document.getElementById('latitude');
    const longitudeElement = document.getElementById('longitude');
    const placeNameElement = document.getElementById('place-name');

    this.#stream = null;
    this.#capturedImageDataUrl = null;
    this.#userLocation = null;    // Initialize map
    try {
      this.#map = await Map.build('#map', {
        center: [-6.2088, 106.8456], // Jakarta coordinates as default
        zoom: 10
      });

      // Add click event to map
      this.#map.addMapEventListener('click', async (e) => {
        await this.handleMapClick(e.latlng.lat, e.latlng.lng);
      });

    } catch (error) {
      console.error('Error initializing map:', error);
      locationStatus.textContent = 'Error loading map. Location selection may not work properly.';
      locationStatus.style.color = 'var(--error)';
    }// Location update functions
    const updateLocationDisplay = async (latitude, longitude) => {
      try {        // Remove existing marker
        if (this.#marker) {
          this.#marker.remove();
        }

        // Add new marker
        this.#marker = this.#map.addMarker([latitude, longitude]);
        
        // Update location data
        this.#userLocation = { latitude, longitude };
        
        // Update UI
        latitudeElement.textContent = latitude.toFixed(6);
        longitudeElement.textContent = longitude.toFixed(6);
        selectedLocationInfo.style.display = 'block';
        clearLocationButton.style.display = 'inline-block';
        locationStatus.textContent = 'Lokasi berhasil dipilih!';
        locationStatus.style.color = 'var(--success)';        // Center map on location
        this.#map.changeCamera([latitude, longitude], 15);

        // Try to get place name
        try {
          const placeName = await Map.getPlaceNameByCoordinate(latitude, longitude);
          placeNameElement.textContent = `📍 ${placeName}`;
          
          // Add popup to marker
          this.#marker.bindPopup(`
            <div style="text-align: center;">
              <strong>Lokasi Terpilih</strong><br>
              ${placeName}<br>
              <small>${latitude.toFixed(6)}, ${longitude.toFixed(6)}</small>
            </div>
          `).openPopup();
        } catch (error) {
          console.error('Error getting place name:', error);
          placeNameElement.textContent = '📍 Lokasi tidak dikenali';
          this.#marker.bindPopup(`
            <div style="text-align: center;">
              <strong>Lokasi Terpilih</strong><br>
              <small>${latitude.toFixed(6)}, ${longitude.toFixed(6)}</small>
            </div>
          `).openPopup();
        }
      } catch (error) {
        console.error('Error updating location display:', error);
      }
    };

    const handleLocationError = (error) => {
      console.error('Error getting location:', error);
      let errorMessage = 'Unable to get your location. Please enable location permissions.';
      
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = 'Location permission denied. Please enable location access in your browser settings.';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = 'Location information is unavailable. Please try again later.';
          break;
        case error.TIMEOUT:
          errorMessage = 'Location request timed out. Please try again.';
          break;
      }
        locationStatus.textContent = errorMessage;
      locationStatus.style.color = 'var(--error)';
      selectedLocationInfo.style.display = 'none';
    };

    const getCurrentPosition = () => {
      if (!navigator.geolocation) {
        locationStatus.textContent = 'Geolocation is not supported by your browser';
        locationStatus.style.color = 'var(--error)';
        return;
      }      locationStatus.textContent = 'Detecting your location...';
      locationStatus.style.color = 'var(--gray-600)';
      selectedLocationInfo.style.display = 'none';      navigator.geolocation.getCurrentPosition(
        (position) => {
          updateLocationDisplay(
            position.coords.latitude, 
            position.coords.longitude
          );
        },
        handleLocationError,
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    };    // Initialize location tracking
    getCurrentPosition();
    
    // Set up location refresh button
    locationButton.addEventListener('click', getCurrentPosition);

    // Set up clear location button
    clearLocationButton.addEventListener('click', () => {
      this.clearLocationSelection();
    });

    // Camera functions
    const showCameraError = (message) => {
      cameraErrorMessage.textContent = message;
      cameraErrorMessage.style.display = 'block';
      cameraPreview.style.display = 'none';
      captureButton.style.display = 'none';
    };

    this.startCamera = async () => {
      try {
        if (this.#stream) { // Stop any existing stream before starting a new one
          this.#stream.getTracks().forEach(track => track.stop());
        }
        this.#stream = await navigator.mediaDevices.getUserMedia({ video: true });
        cameraPreview.srcObject = this.#stream;
        cameraPreview.style.display = 'block';
        captureButton.textContent = 'Take Photo';
        captureButton.style.display = 'block';
        capturedImageContainer.innerHTML = ''; // Clear previous image
        this.#capturedImageDataUrl = null;
        cameraErrorMessage.style.display = 'none';
        
        // Re-attach the correct event listener
        captureButton.removeEventListener('click', handleRetakePhoto); // Remove retake listener if present
        captureButton.addEventListener('click', handleTakePhoto);   // Add take photo listener
      } catch (error) {
        console.error('Error accessing camera:', error);
        let message = 'Failed to access camera. Please make sure camera permissions are granted.';
        if (error.name === "NotAllowedError") {
            message = "Camera access was denied. Please enable camera permissions in your browser settings.";
        } else if (error.name === "NotFoundError") {
            message = "No camera found. Please ensure a camera is connected and enabled.";
        }
        showCameraError(message);
      }
    };

    const handleTakePhoto = () => {
      if (!this.#stream || !cameraPreview.srcObject || cameraPreview.srcObject.getVideoTracks().length === 0) {
        console.warn('Stream not active or no video tracks.');
        showCameraError('Camera stream is not active. Please try again or grant permissions.');
        return;
      }

      // Set canvas dimensions to match video
      photoCanvas.width = cameraPreview.videoWidth;
      photoCanvas.height = cameraPreview.videoHeight;

      // Draw current video frame to canvas
      const context = photoCanvas.getContext('2d');
      context.drawImage(cameraPreview, 0, 0, photoCanvas.width, photoCanvas.height);

      // Convert canvas to image
      this.#capturedImageDataUrl = photoCanvas.toDataURL('image/jpeg');

      // Display captured image
      capturedImageContainer.innerHTML = `<img src="${this.#capturedImageDataUrl}" alt="Captured Image" style="max-width: 100%; border-radius: 8px;">`;

      // Hide the video element and change button to "Retake Photo"
      cameraPreview.style.display = 'none';
      captureButton.textContent = 'Retake Photo';

      // Turn off the camera stream AFTER capturing photo
      if (this.#stream) {
        this.#stream.getTracks().forEach(track => track.stop());
      }
      
      // Update event listener
      captureButton.removeEventListener('click', handleTakePhoto);
      captureButton.addEventListener('click', handleRetakePhoto);
    };

    const handleRetakePhoto = async () => {
      capturedImageContainer.innerHTML = ''; // Clear the captured image
      this.#capturedImageDataUrl = null;
      await this.startCamera(); // Restart camera and reset button
    };

    // Initialize the camera when the component loads
    await this.startCamera();    // Handle form submission
    addStoryForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const description = document.getElementById('story-description').value;

      if (!this.#capturedImageDataUrl) {
        this.showError('Please take a photo first!');
        return;
      }      try {
        // Convert dataURL to file using utility function
        const photoFile = await convertDataUrlToFile(this.#capturedImageDataUrl, 'photo.jpg', 'image/jpeg');
        
        // Get location data
        const lat = this.#userLocation ? parseFloat(this.#userLocation.latitude) : null;
        const lon = this.#userLocation ? parseFloat(this.#userLocation.longitude) : null;
        
        // Send the story to the server using the presenter
        await this.#presenter.submitStory(description, photoFile, lat, lon);
      } catch (error) {
        console.error('Error submitting story:', error);
        this.showError('An error occurred while submitting your story. Please try again.');
      }
    });    // Clean up when navigating away
    return () => {
      if (this.#stream) {
        this.#stream.getTracks().forEach(track => track.stop());
        this.#stream = null; // Ensure stream is cleared
      }      // Remove event listeners to prevent memory leaks
      captureButton.removeEventListener('click', handleTakePhoto);
      captureButton.removeEventListener('click', handleRetakePhoto);
      locationButton.removeEventListener('click', getCurrentPosition);
      clearLocationButton.removeEventListener('click', () => {
        this.clearLocationSelection();
      });
    };
  }
  async handleMapClick(latitude, longitude) {
    try {
      // Remove existing marker by creating a new one (Leaflet approach)
      if (this.#marker) {
        this.#marker.remove();
      }

      // Add new marker using Map class method
      this.#marker = this.#map.addMarker([latitude, longitude]);
      
      // Update location data
      this.#userLocation = { latitude, longitude };
      
      // Update UI elements
      const latitudeElement = document.getElementById('latitude');
      const longitudeElement = document.getElementById('longitude');
      const placeNameElement = document.getElementById('place-name');
      const selectedLocationInfo = document.getElementById('selected-location-info');
      const clearLocationButton = document.getElementById('clear-location');
      const locationStatus = document.getElementById('location-status');

      if (latitudeElement && longitudeElement && selectedLocationInfo) {
        latitudeElement.textContent = latitude.toFixed(6);
        longitudeElement.textContent = longitude.toFixed(6);
        selectedLocationInfo.style.display = 'block';
        clearLocationButton.style.display = 'inline-block';
        locationStatus.textContent = 'Lokasi berhasil dipilih dari peta!';
        locationStatus.style.color = 'var(--success)';
      }

      // Center map on location
      this.#map.changeCamera([latitude, longitude], 15);

      // Try to get place name
      try {
        const placeName = await Map.getPlaceNameByCoordinate(latitude, longitude);
        if (placeNameElement) {
          placeNameElement.textContent = `📍 ${placeName}`;
        }
        
        // Update marker popup if available
        if (this.#marker) {
          this.#marker.bindPopup(`
            <div style="text-align: center;">
              <strong>Lokasi Terpilih</strong><br>
              ${placeName}<br>
              <small>${latitude.toFixed(6)}, ${longitude.toFixed(6)}</small>
            </div>
          `).openPopup();
        }
      } catch (error) {
        console.error('Error getting place name:', error);
        if (placeNameElement) {
          placeNameElement.textContent = '📍 Lokasi tidak dikenali';
        }
        if (this.#marker) {
          this.#marker.bindPopup(`
            <div style="text-align: center;">
              <strong>Lokasi Terpilih</strong><br>
              <small>${latitude.toFixed(6)}, ${longitude.toFixed(6)}</small>
            </div>
          `).openPopup();
        }
      }
    } catch (error) {
      console.error('Error handling map click:', error);
    }
  }

  clearLocationSelection() {
    // Remove marker from map
    if (this.#marker) {
      this.#marker.remove();
      this.#marker = null;
    }

    // Clear location data
    this.#userLocation = null;

    // Update UI elements
    const selectedLocationInfo = document.getElementById('selected-location-info');
    const clearLocationButton = document.getElementById('clear-location');
    const locationStatus = document.getElementById('location-status');
    const placeNameElement = document.getElementById('place-name');

    if (selectedLocationInfo) selectedLocationInfo.style.display = 'none';
    if (clearLocationButton) clearLocationButton.style.display = 'none';
    if (locationStatus) {
      locationStatus.textContent = 'Klik pada peta untuk memilih lokasi cerita Anda';
      locationStatus.style.color = 'var(--gray-600)';
    }
    if (placeNameElement) placeNameElement.textContent = '';
  }
}
