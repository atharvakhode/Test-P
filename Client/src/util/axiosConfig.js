import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Import the jwt-decode library

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // Base URL for your API
});

let isRefreshing = false;
let refreshSubscribers = [];

// Function to get expiry time from the token
const getExpiryTime = (token) => {
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000; // JWT exp is in seconds, convert to milliseconds
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

const onRefreshed = (token) => {
  refreshSubscribers.map((callback) => callback(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

// Function to refresh the token
const refreshToken = async () => {
  try {
    console.log("Refreshing token...");
    const refresh_token = localStorage.getItem('refresh_token');
    const response = await api.post('/api/v1/auth/refresh-token', null, {
      headers: {
        'Authorization': `Bearer ${refresh_token}`
      }
    });
    console.log(response.data)
    const { accessToken , refreshToken } = response.data;
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    localStorage.setItem('expiry_time', getExpiryTime(accessToken));
    console.log("Token refreshed successfully.");
    isRefreshing = false;
    onRefreshed(accessToken);
    return accessToken;
  } catch (error) {
    console.error('Token refresh error:', error);
    isRefreshing = false;
    return null;
  }
};

// Axios request interceptor
api.interceptors.request.use(
  async (config) => {
    try {
      if (config.url.includes('/refresh-token')) {
        return config; // Bypass the interceptor logic for token refresh requests
      }

      let token = localStorage.getItem('access_token');
      const expiryTime = getExpiryTime(token);

      if (expiryTime && Date.now() >= expiryTime - 60000) { // Refresh token 1 minute before expiry
        if (!isRefreshing) {
          isRefreshing = true;
          token = await refreshToken();
        } else {
          // Wait until the refresh is done
          token = await new Promise((resolve) => {
            addRefreshSubscriber((newToken) => {
              resolve(newToken);
            });
          });
        }
      }

      console.log("here"); // Ensure this line gets executed
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    } catch (error) {
      console.error('Interceptor error:', error);
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
