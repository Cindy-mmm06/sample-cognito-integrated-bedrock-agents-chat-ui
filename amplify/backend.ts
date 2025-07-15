import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { bedrockProxy } from './functions/bedrock-proxy/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  bedrockProxy,
});

// Grant the Lambda function permissions to invoke Bedrock
backend.bedrockProxy.addToRolePolicy({
  Effect: 'Allow',
  Action: [
    'bedrock:InvokeAgent',
    'bedrock:InvokeModel'
  ],
  Resource: '*'
});
