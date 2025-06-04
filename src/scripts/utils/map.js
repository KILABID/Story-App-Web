import { map, marker, popup, tileLayer, Icon, icon, latLng, featureGroup } from "leaflet";
import * as L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadom from "leaflet/dist/images/marker-shadow.png";
import { getPlaceNameByCoordinate } from "../data/api.js";

export default class Map {
  #zoom = 5;
  #map = null;  static async getPlaceNameByCoordinate(latitude, longitude) {
    try {
      return await getPlaceNameByCoordinate(latitude, longitude);
    } catch (error) {
      console.error("Error fetching place name:", error);
      throw new Error("Unable to fetch place name.");
    }
  }

  static isGeoLocationAvailable() {
    return "geolocation" in navigator;
  }

  static getCurrentPosition(options = {}) {
    return new Promise((resolve, reject) => {
      if (!Map.isGeoLocationAvailable()) {
        reject("Geolocation is not supported by this browser.");
        return;
      }

      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  addMapEventListener(eventName, callback) {
    this.#map.addEventListener(eventName, callback);
  }
  /**
   * Reference of using this static method:
   * https://stackoverflow.com/questions/43431550/how-can-i-invoke-asynchronous-code-within-a-constructor
   * */  static async build(selector, options = {}) {
    // Wait for element to be ready
    const element = document.querySelector(selector);
    if (!element) {
      throw new Error(`Map container element not found: ${selector}`);
    }

    // Wait for element to have dimensions
    let attempts = 0;
    const maxAttempts = 10;
    while ((element.offsetWidth === 0 || element.offsetHeight === 0) && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }

    if (element.offsetWidth === 0 || element.offsetHeight === 0) {
      throw new Error(`Map container element has no dimensions: ${selector}`);
    }

    // Clear any existing content from the container before creating map
    element.innerHTML = '';

    if ("center" in options && options.center) {
      return new Map(selector, options);
    }

    const jakartaCoordinate = [-6.2, 106.816666];

    if ("locate" in options && options.locate) {
      try {
        const position = await Map.getCurrentPosition();
        const coordinate = [
          position.coords.latitude,
          position.coords.longitude,
        ];

        return new Map(selector, {
          ...options,
          center: coordinate,
        });
      } catch (error) {
        return new Map(selector, {
          ...options,
          center: jakartaCoordinate,
        });
      }
    }
    return new Map(selector, {
      ...options,
      center: jakartaCoordinate,
    });
  }
  constructor(selector, options = {}) {
    this.#zoom = options.zoom ?? this.#zoom;

    // Validate element exists and is ready
    const element = document.querySelector(selector);
    if (!element) {
      throw new Error(`Map element not found: ${selector}`);
    }
    
    if (element.offsetWidth === 0 || element.offsetHeight === 0) {
      throw new Error(`Map element is not visible or has no dimensions: ${selector}`);
    }

    const tileOsm = tileLayer(
      "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
      }
    );

    try {
      this.#map = map(element, {
        zoom: this.#zoom,
        scrollWheelZoom: false,
        layers: [tileOsm],
        ...options,
      });

      // Force invalidate size after a short delay to ensure proper rendering
      setTimeout(() => {
        if (this.#map) {
          this.#map.invalidateSize();
        }
      }, 100);
    } catch (error) {
      console.error("Error creating map:", error);
      throw new Error(`Failed to create map: ${error.message}`);
    }
  }

  changeCamera(coordinate, zoomLevel = null) {
    if (
      !coordinate ||
      !Array.isArray(coordinate) ||
      coordinate.length !== 2 ||
      coordinate.some((c) => c == null)
    ) {
      console.warn("Invalid coordinate passed to changeCamera, ignoring.");
      return;
    }

    if (!zoomLevel) {
      this.#map.setView(latLng(coordinate), this.#zoom);
      return;
    }

    this.#map.setView(latLng(coordinate), zoomLevel);
  }

  getCenter() {
    const { lat, lng } = this.#map.getCenter();
    return {
      latitude: lat,
      longitude: lng,
    };
  }

  createIcon(options = {}) {
    return icon({
      ...Icon.Default.prototype.options,
      iconRetinaUrl: markerIcon2x,
      iconUrl: markerIcon,
      shadowUrl: markerShadom,
      ...options,
    });
  }

  addMarker(coordinates, markerOptions = {}, popupOptions = null) {
    if (typeof markerOptions !== "object") {
      throw new Error("Marker options must be an object.");
    }
    const newMarker = marker(coordinates, {
      icon: this.createIcon(),
      ...markerOptions,
    });

    if (popupOptions) {
      if (typeof popupOptions !== "object") {
        throw new Error("Popup options must be an object.");
      }
      if (!("content" in popupOptions)) {
        throw new Error("Popup options must have a content property.");
      }

      const newPopup = popup(coordinates, popupOptions);
      newMarker.bindPopup(newPopup);
    }

    newMarker.addTo(this.#map);

    return newMarker;
  }

  addMultipleMarkers(points) {
    if (!Array.isArray(points) || points.length === 0) {
      return [];
    }

    const markers = [];

    points.forEach((point) => {
      if (
        !point ||
        !point.coordinates ||
        !Array.isArray(point.coordinates) ||
        point.coordinates.length !== 2
      ) {
        return;
      }

      try {
        const marker = this.addMarker(
          point.coordinates,
          point.markerOptions || {},
          point.popupOptions || null
        );

        markers.push(marker);
      } catch (error) {
        console.error("Error adding marker:", error);
      }
    });

    return markers;
  }  invalidateSize() {
    if (this.#map && this.isAttachedToDom()) {
      try {
        this.#map.invalidateSize();
      } catch (error) {
        console.warn("Failed to invalidate map size:", error);
      }
    }
  }

  isReady() {
    return this.#map !== null && this.isAttachedToDom();
  }

  isAttachedToDom() {
    if (!this.#map) return false;
    
    try {
      // Try to get the map container
      const container = this.#map.getContainer();
      return container && container.parentNode && document.contains(container);
    } catch (error) {
      console.warn("Map is no longer attached to DOM:", error);
      return false;
    }
  }
  fitBounds(markers) {
    if (!this.isReady() || !markers || !Array.isArray(markers) || markers.length === 0) {
      return;
    }

    try {
      // For single marker, just center on it
      if (markers.length === 1) {
        const position = markers[0].getLatLng();
        this.#map.setView([position.lat, position.lng], 10);
        return;
      }

      // Create a feature group from markers and fit bounds
      const group = L.featureGroup(markers);
      this.#map.fitBounds(group.getBounds(), {
        padding: [20, 20],
        maxZoom: 15,
      });
    } catch (error) {
      console.error("Error fitting map to markers:", error);
    }
  }
}
