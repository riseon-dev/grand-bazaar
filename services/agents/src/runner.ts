import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { VolumeAgent } from './agents/volume.agent';

@Injectable()
export class Runner {
  constructor(private readonly volumeAgent: VolumeAgent) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleEvery30Minutes() {
    console.log('Task executed every 10 minutes');
    await this.volumeAgent.runAgent();
  }

  run() {
    console.log('Task executed manually');
  }
}
