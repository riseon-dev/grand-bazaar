import { Module } from '@nestjs/common';
import { SqliteModule } from '../infra/adapters/database/sqlite/sqlite.module';

@Module({
  imports: [SqliteModule],
  providers: [],
  exports: [],
})
export class WorkflowsModule {}
