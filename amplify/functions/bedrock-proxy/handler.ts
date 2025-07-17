import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { BedrockAgentRuntimeClient, InvokeAgentCommand } from '@aws-sdk/client-bedrock-agent-runtime';

interface ChatRequest {
  inputText: string;
  agentId: string;
  agentAliasId: string;
  sessionId: string;
  region: string;
}

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'Access-Control-Allow-Methods': 'POST,OPTIONS'
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Request body is required' })
      };
    }

    const request: ChatRequest = JSON.parse(event.body);
    
    // Basic validation
    if (!request.inputText || !request.agentId || !request.agentAliasId || !request.sessionId || !request.region) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields: inputText, agentId, agentAliasId, sessionId, region' })
      };
    }

    // Input validation
    if (request.inputText.length > 4000) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Input text too long (max 4000 characters)' })
      };
    }

    // Initialize Bedrock client
    const bedrockClient = new BedrockAgentRuntimeClient({
      region: request.region
    });

    // Create the command
    const command = new InvokeAgentCommand({
      agentId: request.agentId,
      agentAliasId: request.agentAliasId,
      sessionId: request.sessionId,
      endSession: false,
      enableTrace: true,
      inputText: request.inputText
    });

    // Invoke the agent
    console.log('Sending request to Bedrock:', JSON.stringify(command));
    const response = await bedrockClient.send(command);
    console.log('Raw Bedrock response:', JSON.stringify(response));

    if (!response.completion) {
      console.error('No completion in response');
      throw new Error('No completion received from Bedrock');
    }

    // Process the streaming response
    let completion = '';
    let traces: any[] = [];
    let chunkCount = 0;
    
    console.log('Starting to process completion stream');
    for await (const chunkEvent of response.completion) {
      chunkCount++;
      if (chunkEvent.trace) {
        traces.push(chunkEvent.trace);
        
        // Check for failure
        if (chunkEvent.trace.trace?.failureTrace) {
          throw new Error(chunkEvent.trace.trace.failureTrace.failureReason);
        }
      } else if (chunkEvent.chunk) {
        const chunk = chunkEvent.chunk;
        const decodedResponse = new TextDecoder('utf-8').decode(chunk.bytes);
        completion += decodedResponse;
      }
    }

    console.log(`Processed ${chunkCount} chunks, final completion length: ${completion.length}`);
    
    const responseBody = {
      completion,
      traces: traces.length > 0 ? traces : undefined
    };
    
    console.log('Sending response:', JSON.stringify(responseBody));
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(responseBody)
    };

  } catch (error) {
    console.error('Error processing request:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};