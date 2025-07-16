import { defineBackend } from '@aws-amplify/backend';
import { Stack } from 'aws-cdk-lib';
import { aws_lambda as lambda } from 'aws-cdk-lib';
import { aws_apigateway as apigateway } from 'aws-cdk-lib';

// Simple function to create API Gateway
export const createApiGateway = (stack: Stack, lambdaFunction: lambda.Function) => {
  // Create REST API
  const api = new apigateway.RestApi(stack, 'BedrockProxyApi', {
    restApiName: 'Bedrock Proxy API',
    description: 'API for Bedrock Agent proxy',
    defaultCorsPreflightOptions: {
      allowOrigins: apigateway.Cors.ALL_ORIGINS,
      allowMethods: apigateway.Cors.ALL_METHODS,
      allowHeaders: ['Content-Type', 'Authorization']
    }
  });

  // Add /chat resource and POST method
  const chatResource = api.root.addResource('chat');
  chatResource.addMethod('POST', new apigateway.LambdaIntegration(lambdaFunction));
  
  return api;
};