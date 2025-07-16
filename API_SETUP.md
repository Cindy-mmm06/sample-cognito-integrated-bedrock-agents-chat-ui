# API Gateway Setup for Lambda Proxy

After deploying your Amplify backend, you need to configure the API Gateway endpoint in your application.

## Deployment Steps

1. Deploy your Amplify backend:
   ```bash
   npx amplify push
   ```

2. After deployment, find your API Gateway URL in the AWS Console:
   - Go to AWS Console > API Gateway
   - Find the API named "Bedrock Proxy API"
   - Click on "Stages" in the left menu
   - Select "prod" stage
   - Copy the "Invoke URL" (e.g., https://abc123def.execute-api.us-east-1.amazonaws.com/prod)
   - Add "/chat" to the end of this URL

3. Configure the API endpoint in your application:
   - Open your application
   - Go to Settings (gear icon)
   - Enable "Use Lambda Proxy"
   - Paste the full API URL (with /chat) into the "API Endpoint URL" field
   - Save configuration

## Testing

1. Send a test message in the chat
2. Check browser console for any errors
3. Verify responses are working correctly

## Troubleshooting

If you encounter issues:

1. Check API Gateway logs in CloudWatch
2. Verify Lambda function permissions
3. Check CORS settings in API Gateway
4. Ensure the API URL is correctly entered with "/chat" at the end

## Manual API Gateway Setup

If you need to manually set up the API Gateway:

1. Go to AWS Console > API Gateway
2. Create a new REST API
3. Create a resource named "chat"
4. Add a POST method to the "chat" resource
5. Set up Lambda integration with your bedrock-proxy function
6. Enable CORS with the following settings:
   - Allow-Origin: '*'
   - Allow-Headers: 'Content-Type,Authorization'
   - Allow-Methods: 'POST,OPTIONS'
7. Deploy the API to a "prod" stage
8. Use the resulting URL in your application configuration