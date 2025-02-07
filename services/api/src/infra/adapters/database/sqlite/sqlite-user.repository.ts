import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  User,
  UserRepository,
} from '../../../../domain/repositories/user.repository';
import { UserEntity } from './user.entity';

@Injectable()
export class SqliteUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async saveUser(user: User): Promise<boolean> {
    const savedUser = await this.userRepository.save({
      userEthAddress: user.ethAddress,
    });
    return !!savedUser;
  }

  async findUserByAddress(userEthAddress: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { userEthAddress },
    });
    if (!user) return null;
    return {
      ethAddress: user.userEthAddress,
    };
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users.map((user) => {
      return {
        ethAddress: user.userEthAddress,
      };
    });
  }
}
