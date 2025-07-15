import { fetchAuthSession } from '@aws-amplify/auth';
import { Amplify } from 'aws-amplify';

class BedrockService {
  constructor() {
    this.apiEndpoint = null;
  }

  async initialize() {
    try {
      // Get the API endpoint from Amplify configuration
      const amplifyConfig = Amplify.getConfig();
      
      // Check if we have a custom API endpoint in outputs
      if (amplifyConfig.custom?.API) {
        const apiConfig = Object.values(amplifyConfig.custom.API)[0];
        this.apiEndpoint = apiConfig.endpoint;
      } else {
        // Fallback to environment variable or manual configuration
        const config = JSON.parse(localStorage.getItem('appConfig') || '{}');
        this.apiEndpoint = process.env.REACT_APP_API_ENDPOINT || config?.apiEndpoint;
      }
      
      if (!this.apiEndpoint) {
        console.warn('No API endpoint configured. Lambda proxy will not work.');
      }
    } catch (error) {
      console.error('Error initializing BedrockService:', error);
    }
  }

  async invokeAgent({ inputText, agentId, agentAliasId, sessionId, region }) {
    if (!this.apiEndpoint) {
      await this.initialize();
    }

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

      return await response.json();
    } catch (error) {
      console.error('BedrockService error:', error);
      throw error;
    }
  }
}

export default new BedrockService();