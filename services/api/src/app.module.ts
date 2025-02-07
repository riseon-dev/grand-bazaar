import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WorkflowsModule } from './application/workflows.module';

@Module({
  imports: [ConfigModule.forRoot(), WorkflowsModule],
})
export class AppModule {}
