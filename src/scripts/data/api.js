import CONFIG, { MAP_API_KEY } from "../config";

const ENDPOINTS = {
  LOGIN: `${CONFIG.BASE_URL}/login`,
  REGISTER: `${CONFIG.BASE_URL}/register`,
  STORIES: `${CONFIG.BASE_URL}/stories`,
  STORIES_GUEST: `${CONFIG.BASE_URL}/stories/guest`,
  NOTIFICATIONS_SUBSCRIBE: `${CONFIG.BASE_URL}/notifications/subscribe`,
};

export async function login(email, password) {
  try {
    const response = await fetch(ENDPOINTS.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error("[login] Error:", error);
    throw error;
  }
}

export async function register(name, email, password) {
  try {
    const response = await fetch(ENDPOINTS.REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error("[register] Error:", error);
    throw error;
  }
}

export async function getStories(token, page = 1, size = 10, location = 0) {
  try {
    const url = new URL(ENDPOINTS.STORIES);
    url.searchParams.append("page", page);
    url.searchParams.append("size", size);
    url.searchParams.append("location", location);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Gagal mengambil daftar cerita");
    }

    return await response.json();
  } catch (error) {
    console.error("[getStories] Error:", error);
    throw error;
  }
}

export async function getStoriesDetail(token, storyId) {
  try {
    const response = await fetch(`${ENDPOINTS.STORIES}/${storyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Gagal mengambil detail cerita");
    }

    return await response.json();
  } catch (error) {
    console.error("[getStoriesDetail] Error:", error);
    throw error;
  }
}

export async function postStory(
  token,
  description,
  photo,
  lat = null,
  lon = null
) {
  try {
    const formData = new FormData();
    formData.append("description", description);
    formData.append("photo", photo);

    if (lat !== null && lon !== null) {
      formData.append("lat", lat);
      formData.append("lon", lon);
    }

    const response = await fetch(ENDPOINTS.STORIES, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Don't set Content-Type header when using FormData
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Gagal mengunggah cerita");
    }

    return await response.json();
  } catch (error) {
    console.error("[postStory] Error:", error);
    throw error;
  }
}

export async function postStoryAsGuest(
  description,
  photo,
  lat = null,
  lon = null
) {
  try {
    const formData = new FormData();
    formData.append("description", description);
    formData.append("photo", photo);

    if (lat !== null && lon !== null) {
      formData.append("lat", lat);
      formData.append("lon", lon);
    }

    const response = await fetch(ENDPOINTS.STORIES_GUEST, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Gagal mengunggah cerita sebagai tamu");
    }

    return await response.json();
  } catch (error) {
    console.error("[postStoryAsGuest] Error:", error);
    throw error;
  }
}

export async function subscribeToNotifications(token, endpoint, keys) {
  try {
    const response = await fetch(ENDPOINTS.NOTIFICATIONS_SUBSCRIBE, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        endpoint,
        keys: {
          p256dh: keys.p256dh,
          auth: keys.auth,
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Gagal berlangganan notifikasi");
    }

    return await response.json();
  } catch (error) {
    console.error("[subscribeToNotifications] Error:", error);
    throw error;
  }
}

export async function unsubscribeFromNotifications(token, endpoint) {
  try {
    const response = await fetch(ENDPOINTS.NOTIFICATIONS_SUBSCRIBE, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        endpoint,
      }),
    });

    if (!response.ok) {
      throw new Error("Gagal berhenti berlangganan notifikasi");
    }

    return await response.json();
  } catch (error) {
    console.error("[unsubscribeFromNotifications] Error:", error);
    throw error;
  }
}

export async function getPlaceNameByCoordinate(latitude, longitude) {
  try {
    const url = new URL(
      `https://api.maptiler.com/geocoding/${longitude},${latitude}.json`
    );
    url.searchParams.set("key", MAP_API_KEY);
    url.searchParams.set("language", "id");
    url.searchParams.set("limit", 1);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch place name from geocoding service");
    }

    const json = await response.json();

    if (!json.features || json.features.length === 0) {
      throw new Error("No place found for the given coordinates");
    }

    const place = json.features[0].place_name.split(", ");
    return [place.at(-2), place.at(-1)].map((name) => name).join(", ");
  } catch (error) {
    console.error("[getPlaceNameByCoordinate] Error:", error);
    throw error;
  }
}

export async function convertDataUrlToFile(dataUrl, filename = 'photo.jpg', mimeType = 'image/jpeg') {
  try {
    const response = await fetch(dataUrl);
    
    if (!response.ok) {
      throw new Error("Failed to convert data URL to file");
    }
    
    const blob = await response.blob();
    return new File([blob], filename, { type: mimeType });
  } catch (error) {
    console.error("[convertDataUrlToFile] Error:", error);
    throw error;
  }
}
