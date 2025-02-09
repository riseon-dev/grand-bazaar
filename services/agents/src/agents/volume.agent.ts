import { Injectable, Logger } from '@nestjs/common';
import { Bedrock } from '../utils/bedrock';

@Injectable()
export class VolumeAgent {
  private logger = new Logger(VolumeAgent.name);

  constructor(private readonly bedrockClient: Bedrock) {}

  private async getVolumeForLast12Periods(token: string) {
    this.logger.log(`Getting volume for ${token}`);
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  }

  private async contractSwap(token: string) {
    // do contract swap
    this.logger.log(`Swapping to ${token}`);
  }

  async runAgent() {
    const tokenList = ['BTC', 'ETH', 'DOGE', 'SOL']; // max 72 tokens

    const volumelist = {};

    for (const token of tokenList) {
      const volumes = await this.getVolumeForLast12Periods(token);
      this.logger.log(`Volume for ${token}: ${volumes}`);
      volumelist[token] = volumes;
    }

    const volumeStr = JSON.stringify(volumelist);

    const query = `Given the following volumes for tokens over the last 6 hours: ${volumeStr}, what is the best token to invest in? If nothing shows significant growth return null`; // 26 words

    const response = await this.bedrockClient.query(query);

    if (response === 'null' || response === null) {
      this.logger.log('No significant growth detected');
    } else {
      await this.contractSwap(response);
    }
  }
}
