import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WorkflowsModule } from './application/workflows.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: __dirname + '/db/database.db',
      entities: [
        __dirname + '/infra/adapters/database/sqlite/*.entity{.ts,.js}',
      ],
      synchronize: true,
    }),
    WorkflowsModule,
  ],
})
export class AppModule {}
