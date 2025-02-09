import { Injectable, Logger } from '@nestjs/common';
import {
  BedrockRuntimeClient,
  ConverseCommand,
  Message,
} from '@aws-sdk/client-bedrock-runtime';

@Injectable()
export class Bedrock {
  private logger: Logger = new Logger(Bedrock.name);
  constructor() {}

  async query(userMessage: string): Promise<string | null> {
    this.logger.log(`User query: ${userMessage}`);

    const client = new BedrockRuntimeClient({ region: 'us-west-2' });
    const modelId = 'anthropic.claude-3-5-sonnet-20241022-v2:0';

    const conversation: Message[] = [
      {
        role: 'user',
        content: [{ text: userMessage }],
      },
    ];

    const command = new ConverseCommand({
      modelId,
      messages: conversation,
      inferenceConfig: { maxTokens: 900, temperature: 0.5, topP: 0.9 },
    });

    try {
      const response = await client.send(command);

      const responseText = response?.output?.message?.content?.[0].text;
      if (!responseText) {
        this.logger.error(`ERROR: Can't get response from '${modelId}'`);
        return null;
      }
      this.logger.log(`Model response: ${responseText}`);
      return responseText;
    } catch (err) {
      this.logger.error(`ERROR: Can't invoke '${modelId}'. Reason: ${err}`);
      return null;
    }
  }
}
