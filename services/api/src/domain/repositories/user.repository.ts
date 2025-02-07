export interface User {
  ethAddress: string;
}

export interface UserRepository {
  saveUser(user: User): Promise<boolean>;
  findUserByAddress(userEthAddress: string): Promise<User | null>;
  findAll(): Promise<User[]>;
}

export const UserRepository = Symbol('UserRepository');
