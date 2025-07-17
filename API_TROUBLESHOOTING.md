# API Troubleshooting Guide

If you're getting null responses from the API, follow these steps to diagnose and fix the issue:

## 1. Check CloudWatch Logs

First, check the Lambda function logs in CloudWatch:

1. Go to AWS Console > CloudWatch > Log Groups
2. Find the log group for your Lambda function (usually `/aws/lambda/bedrock-proxy-[env]`)
3. Look for recent log entries when you made requests
4. Check for any errors or warnings

## 2. Test API Directly

Test the API directly using curl or Postman:

```bash
curl -X POST \
  https://your-api-gateway-url/prod/chat \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_ID_TOKEN' \
  -d '{
    "inputText": "Hello",
    "agentId": "your-agent-id",
    "agentAliasId": "your-agent-alias-id",
    "sessionId": "test-session",
    "region": "us-east-1"
  }'
```

Check if you get a proper response with a "completion" field.

## 3. Verify Lambda IAM Permissions

Make sure your Lambda function has permission to call Bedrock:

1. Go to AWS Console > Lambda
2. Select your function
3. Go to Configuration > Permissions
4. Check that the execution role has:
   ```
   {
     "Effect": "Allow",
     "Action": [
       "bedrock:InvokeAgent",
       "bedrock:InvokeModel"
     ],
     "Resource": "*"
   }
   ```

## 4. Check Browser Console

In your browser:
1. Open Developer Tools (F12)
2. Go to Console tab
3. Look for any errors or warnings
4. Check the Network tab for the API request/response

## 5. Verify Agent Configuration

Double-check your Bedrock Agent configuration:
1. Verify Agent ID is correct
2. Verify Agent Alias ID is correct
3. Ensure the agent is properly deployed and working

## 6. Check API Gateway Configuration

1. Verify API Gateway endpoint is correct
2. Check that CORS is properly configured
3. Ensure the Lambda integration is set up correctly

## 7. Common Issues and Solutions

### Empty Response
- **Issue**: Lambda returns empty completion
- **Solution**: Check if your Bedrock Agent is responding correctly

### Authentication Issues
- **Issue**: "Unauthorized" or 403 errors
- **Solution**: Verify Cognito setup and token passing

### CORS Issues
- **Issue**: Browser blocks the request
- **Solution**: Update CORS settings in API Gateway

### Timeout Issues
- **Issue**: Request times out
- **Solution**: Increase Lambda timeout or check for long-running operations