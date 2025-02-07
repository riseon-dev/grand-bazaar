import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserRepository } from '../../../../domain/repositories/user.repository';
import { SqliteUserRepository } from './sqlite-user.repository';

const userRepository = {
  provide: UserRepository,
  useClass: SqliteUserRepository,
};

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [userRepository],
  exports: [UserRepository],
})
export class SqliteModule {}
