# Lambda Proxy Setup Guide

This guide explains how to deploy and use the Lambda proxy feature for enhanced security and monitoring.

## What's New

A lightweight Lambda function now sits between your frontend and Bedrock Agents, providing:

- **Enhanced Security**: Input validation and sanitization
- **Request Monitoring**: Centralized logging of all interactions  
- **Error Handling**: Better error management and retry logic
- **Future Extensibility**: Ready for caching, rate limiting, and more

## Deployment Steps

### 1. Deploy the Backend

```bash
# Install dependencies
npm install

# Deploy Amplify backend with Lambda function
npx amplify push
```

### 2. Configure Lambda Proxy

1. Open your deployed application
2. Go to Settings (gear icon)
3. In the "Amazon Bedrock Agent setup" section:
   - Set "Use Lambda Proxy" to **Enabled**
4. Save configuration

### 3. Test the Setup

1. Send a test message in the chat
2. Check browser console for any errors
3. Verify responses are working correctly

## Feature Flag Usage

The Lambda proxy is controlled by a feature flag in your configuration:

- **Disabled**: Direct frontend → Bedrock calls (current behavior)
- **Enabled**: Frontend → Lambda → Bedrock calls (new secure path)

## Troubleshooting

### Common Issues

1. **"API endpoint not configured" error**
   - Ensure `npx amplify push` completed successfully
   - Check that the Lambda function deployed correctly

2. **Authentication errors**
   - Verify your Cognito configuration is correct
   - Check that the Lambda has proper IAM permissions

3. **Timeout errors**
   - Lambda timeout is set to 5 minutes for long Bedrock responses
   - Check CloudWatch logs for detailed error information

### Monitoring

- **CloudWatch Logs**: Check `/aws/lambda/bedrock-proxy` log group
- **Browser Console**: Look for BedrockService errors
- **Network Tab**: Verify API calls are going to Lambda endpoint

## Rollback Plan

If issues occur, you can instantly rollback:

1. Go to Settings
2. Set "Use Lambda Proxy" to **Disabled**
3. Save configuration

This immediately switches back to direct Bedrock calls without redeployment.

## Next Steps

With the Lambda proxy in place, you can now add:

- Request caching for common queries
- Rate limiting per user
- Advanced input validation
- Usage analytics and monitoring
- Cost optimization features

The foundation is ready for these enhancements with minimal additional changes.