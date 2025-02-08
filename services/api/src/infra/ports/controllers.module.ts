import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserController } from './user.controller';
import { SiweModule } from '../adapters/sign-in/siwe.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SiweModule,
    JwtModule.register({
      global: true,
      secret: process.env.SERVICE_API_JWT_SECRET_KEY || '',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [],
  controllers: [AuthController, UserController],
  exports: [],
})
export class ControllersModule {}
