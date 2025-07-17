# API Gateway CORS Fix

The "Failed to fetch" and "Cannot read properties of undefined (reading 'split')" errors are related to CORS issues and response format. Here's how to fix them:

## 1. Update API Gateway CORS Settings

1. Go to API Gateway console
2. Select your API
3. Select the `/chat` resource
4. Click "Actions" > "Enable CORS"
5. Use these exact settings:
   ```
   Access-Control-Allow-Origin: '*'
   Access-Control-Allow-Headers: 'Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token'
   Access-Control-Allow-Methods: 'OPTIONS,POST'
   ```
6. Click "Enable CORS and replace existing CORS headers"
7. Deploy API again: "Actions" > "Deploy API"

## 2. Test with Postman or curl

Before using the UI, test the API directly:

```bash
curl -X POST \
  https://your-api-id.execute-api.region.amazonaws.com/prod/chat \
  -H 'Content-Type: application/json' \
  -d '{
    "inputText": "Hello",
    "agentId": "your-agent-id",
    "agentAliasId": "your-alias-id",
    "sessionId": "test-session",
    "region": "us-east-1"
  }'
```

You should get a response with a "completion" field.

## 3. Clear Browser Cache and Local Storage

1. Open browser developer tools (F12)
2. Go to "Application" tab
3. Select "Local Storage" on the left
4. Find your app's domain
5. Click "Clear" button
6. Refresh the page

## 4. Verify API URL Format

Make sure your API URL:
- Ends with `/chat`
- Starts with `https://`
- Has no trailing spaces
- Is correctly entered in the app settings

## 5. Check Network Tab for Errors

1. Open browser developer tools
2. Go to "Network" tab
3. Try sending a message
4. Look for the API call to your endpoint
5. Check for any errors in the response

If you see CORS errors, double-check the API Gateway CORS settings and make sure you've redeployed the API after making changes.