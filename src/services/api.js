const API_BASE_URL = 'http://localhost:5000/api';

class PortfolioAPI {
  // Get all portfolio data
  static async getPortfolioData() {
    try {
      console.log('🌐 Attempting to fetch from:', `${API_BASE_URL}/portfolio`);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch(`${API_BASE_URL}/portfolio`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📦 Response data:', data);
      return data.success ? data.data : null;
    } catch (error) {
      console.error('❌ Error fetching portfolio data:', error);
      return null;
    }
  }

  // Get specific portfolio section
  static async getPortfolioSection(section) {
    try {
      const response = await fetch(`${API_BASE_URL}/portfolio/${section}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.success ? data.data : null;
    } catch (error) {
      console.error(`Error fetching ${section} data:`, error);
      return null;
    }
  }

  // Submit contact form
  static async submitContact(contactData) {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      return { success: false, message: 'Failed to submit contact form' };
    }
  }

  // Track command usage (for analytics)
  static async trackCommand(command) {
    try {
      await fetch(`${API_BASE_URL}/analytics/command`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command }),
      });
    } catch (error) {
      console.error('Error tracking command:', error);
    }
  }

  // Health check
  static async healthCheck() {
    try {
      const response = await fetch('http://localhost:5000/health');
      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

export default PortfolioAPI;
