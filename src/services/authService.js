/**
 * Authentication service for handling login, logout, and token management
 */
class AuthService {
  constructor() {
    this.tokenKey = 'auth_token';
    this.refreshTokenKey = 'refresh_token';
  }

  /**
   * Attempt to login user
   * @param {Object} credentials - User credentials
   * @param {string} credentials.email - User email
   * @param {string} credentials.password - User password
   * @param {boolean} credentials.rememberMe - Whether to remember the user
   * @returns {Promise<Object>} User data and tokens
   */
  async login({ email, password, rememberMe }) {
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      if (rememberMe) {
        this.setTokens(data.token, data.refreshToken);
      } else {
        // Store in session storage if not remembering
        sessionStorage.setItem(this.tokenKey, data.token);
        sessionStorage.setItem(this.refreshTokenKey, data.refreshToken);
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  /**
   * Store authentication tokens
   * @param {string} token - JWT token
   * @param {string} refreshToken - Refresh token
   */
  setTokens(token, refreshToken) {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  /**
   * Get the current authentication token
   * @returns {string|null} The stored token or null
   */
  getToken() {
    return localStorage.getItem(this.tokenKey) || sessionStorage.getItem(this.tokenKey);
  }

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;

    // Basic token expiration check
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  /**
   * Logout user and clear stored tokens
   */
  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.refreshTokenKey);
  }

  /**
   * Refresh the authentication token
   * @returns {Promise<Object>} New tokens
   */
  async refreshToken() {
    const refreshToken = localStorage.getItem(this.refreshTokenKey) || 
                        sessionStorage.getItem(this.refreshTokenKey);
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const data = await response.json();
      this.setTokens(data.token, data.refreshToken);
      return data;
    } catch (error) {
      console.error('Token refresh error:', error);
      this.logout();
      throw error;
    }
  }
}

export default new AuthService();
