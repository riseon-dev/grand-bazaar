import { Injectable, Logger } from '@nestjs/common';
import { generateNonce, SiweMessage } from 'siwe';
import {
  generateAccessTokenResponse,
  SigninService,
  verifySignatureRequest,
} from '../../../domain/services/signin.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SiweSigninService implements SigninService {
  private logger: Logger = new Logger('SiweSigninService');
  private readonly jwtSecret: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configServce: ConfigService,
  ) {
    this.jwtSecret = this.configServce.getOrThrow<string>(
      'SERVICE_API_JWT_SECRET_KEY',
    );
  }

  generateNonce(): string {
    this.logger.log('generating nonce');
    return generateNonce();
  }

  async verifySignature(
    verifyRequest: verifySignatureRequest,
  ): Promise<boolean> {
    const signInMessage = new SiweMessage(verifyRequest.message);

    const isVerified = await signInMessage.verify({
      signature: verifyRequest.signature,
      nonce: verifyRequest.nonce,
    });

    if (!isVerified.success) {
      this.logger.error(`signature verification failed: ${isVerified.error}`);
    }

    return isVerified.success;
  }

  generateAccessToken(userEthAddress: string): generateAccessTokenResponse {
    const token = this.jwtService.sign(
      {
        ethAddress: userEthAddress,
      },
      {
        secret: this.jwtSecret,
        expiresIn: '12h',
      },
    );

    const refresh = this.jwtService.sign(
      {
        ethAddress: userEthAddress,
      },
      {
        secret: this.jwtSecret,
        expiresIn: '1d',
      },
    );

    return {
      token,
      refresh,
    };
  }
}
