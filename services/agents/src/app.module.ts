import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { Runner } from './runner';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [Runner],
  exports: [Runner],
})
export class AppModule {}
