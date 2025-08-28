const API_BASE_URL = 'http://localhost:8080';

// API configuration
const apiConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...apiConfig,
      ...options,
      headers: {
        ...apiConfig.headers,
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Auth API functions
export const authAPI = {
  register: (userData) => {
    return apiCall('/appUser/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: (credentials) => {
    return apiCall('/appUser/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
};

// Export default API object
const api = {
  auth: authAPI,
};

export default api;
