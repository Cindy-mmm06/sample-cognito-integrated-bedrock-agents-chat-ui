# How to Reset the Application

If you're experiencing UI issues or errors like "Cannot read properties of undefined (reading 'split')", follow these steps to reset the application:

## Option 1: Use the Reset URL Parameter

1. Add `?reset=true` to your application URL
   ```
   https://your-app-url.com/?reset=true
   ```
2. Load the page - this will automatically clear all stored data
3. You'll be prompted to re-enter your configuration

## Option 2: Manual Reset via Browser Console

1. Open your browser's developer tools (F12 or right-click > Inspect)
2. Go to the "Console" tab
3. Type the following command and press Enter:
   ```javascript
   localStorage.clear();
   ```
4. Refresh the page

## Option 3: Clear Site Data

1. Open your browser's developer tools (F12)
2. Go to the "Application" tab
3. Select "Storage" in the left sidebar
4. Click "Clear site data"
5. Refresh the page

## After Resetting

After resetting, you'll need to:

1. Log in again with your Cognito credentials
2. Re-enter your configuration settings:
   - Cognito User Pool ID
   - Cognito User Pool Client ID
   - Cognito Identity Pool ID
   - Cognito Region
   - Bedrock Agent ID
   - Bedrock Agent Alias ID
   - Bedrock Region
   - API Endpoint URL (if using Lambda proxy)

## Preventing Future Issues

To prevent similar issues in the future:
- Always use the UI buttons to start new conversations
- Use the "Clear settings and local storage" option in the settings menu when needed
- Ensure your API Gateway CORS settings are correctly configured if using Lambda proxy