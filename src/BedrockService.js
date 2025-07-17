import { fetchAuthSession } from '@aws-amplify/auth';

class BedrockService {
  constructor() {
    this.apiEndpoint = null;
  }

  async initialize() {
    try {
      // For now, use manual configuration
      const config = JSON.parse(localStorage.getItem('appConfig') || '{}');
      
      // Check if API endpoint is manually configured
      if (config.apiEndpoint) {
        this.apiEndpoint = config.apiEndpoint;
        console.log('Using configured API endpoint:', this.apiEndpoint);
      } else {
        console.warn('No API endpoint configured. Lambda proxy will not work.');
        console.warn('Please add your API Gateway URL to the configuration.');
      }
    } catch (error) {
      console.error('Error initializing BedrockService:', error);
    }
  }

  async invokeAgent({ inputText, agentId, agentAliasId, sessionId, region }) {
    if (!this.apiEndpoint) {
      await this.initialize();
    }

    // If no API endpoint and Lambda proxy is enabled, show error
    if (!this.apiEndpoint) {
      throw new Error('API endpoint not configured. Please check your Amplify setup.');
    }

    try {
      // Get auth session for JWT token
      const session = await fetchAuthSession();
      const token = session.tokens?.idToken?.toString();

      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          inputText,
          agentId,
          agentAliasId,
          sessionId,
          region
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log('API response data:', responseData);
      
      // Validate response format
      if (!responseData || responseData.completion === undefined) {
        console.warn('Invalid API response format:', responseData);
      }
      
      return responseData;
    } catch (error) {
      console.error('BedrockService error:', error);
      throw error;
    }
  }
}

export default new BedrockService();