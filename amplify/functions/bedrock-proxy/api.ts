import { defineFunction } from '@aws-amplify/backend';

export const chatApi = defineFunction({
  name: 'chat-api',
  entry: './handler.ts',
  runtime: 20,
  timeoutSeconds: 300,
});