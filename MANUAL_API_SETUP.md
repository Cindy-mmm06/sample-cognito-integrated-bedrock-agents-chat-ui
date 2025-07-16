# Manual API Gateway Setup

Since Amplify Gen2 doesn't yet support direct API Gateway creation through the backend definition, you'll need to create the API Gateway manually.

## Steps to Create API Gateway

1. Deploy your Lambda function:
   ```bash
   npx amplify push
   ```

2. Go to AWS Console > API Gateway:
   - Click "Create API"
   - Select "REST API" and click "Build"
   - Choose "New API" and name it "BedrockProxyAPI"
   - Click "Create API"

3. Create a resource and method:
   - Click "Actions" > "Create Resource"
   - Resource Name: "chat"
   - Click "Create Resource"
   - With "/chat" selected, click "Actions" > "Create Method"
   - Select "POST" and click the checkmark
   - Integration type: "Lambda Function"
   - Lambda Function: "bedrock-proxy-[environment]" (select your function)
   - Click "Save"

4. Enable CORS:
   - With "/chat" selected, click "Actions" > "Enable CORS"
   - Access-Control-Allow-Headers: 'Content-Type,Authorization'
   - Access-Control-Allow-Methods: 'POST,OPTIONS'
   - Access-Control-Allow-Origin: '*'
   - Click "Enable CORS and replace existing CORS headers"

5. Deploy the API:
   - Click "Actions" > "Deploy API"
   - Deployment stage: [New Stage]
   - Stage name: "prod"
   - Click "Deploy"

6. Get your API URL:
   - After deployment, you'll see "Invoke URL" at the top
   - Copy this URL and add "/chat" to the end
   - Example: https://abc123def.execute-api.us-east-1.amazonaws.com/prod/chat

7. Configure in your application:
   - Open your application
   - Go to Settings (gear icon)
   - Enable "Use Lambda Proxy"
   - Paste the full API URL into the "API Endpoint URL" field
   - Save configuration

## Testing

1. Send a test message in the chat
2. Check browser console for any errors
3. Verify responses are working correctly

## Troubleshooting

If you encounter issues:
- Check Lambda permissions (it needs permission to invoke Bedrock)
- Verify CORS settings in API Gateway
- Check API Gateway logs in CloudWatch
- Ensure the API URL is correctly entered with "/chat" at the end