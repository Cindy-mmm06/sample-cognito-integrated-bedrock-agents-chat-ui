import { defineFunction } from '@aws-amplify/backend';

export const bedrockProxy = defineFunction({
  name: 'bedrock-proxy',
  entry: './handler.ts',
  environment: {
    // Environment variables will be set by the backend
  },
  runtime: 20,
  timeoutSeconds: 300, // 5 minutes for longer Bedrock responses
});