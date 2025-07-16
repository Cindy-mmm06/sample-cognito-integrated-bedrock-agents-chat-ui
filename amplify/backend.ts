import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { bedrockProxy } from './functions/bedrock-proxy/resource';
import { Policy, PolicyStatement } from 'aws-cdk-lib/aws-iam';



/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  bedrockProxy,
});

// Grant the Lambda function permissions to invoke Bedrock
const bedrockPolicy = new Policy(backend.stack, 'BedrockPolicy', {
  statements: [
    new PolicyStatement({
      actions: ['bedrock:InvokeAgent'], // <-- UPDATE THIS LINE
      resources: ['*'], // For now, allow all agents. You can restrict this later.
    }),
  ],
});
