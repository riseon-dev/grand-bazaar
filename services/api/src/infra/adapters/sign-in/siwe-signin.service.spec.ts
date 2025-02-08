import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SiweSigninService } from './siwe-signin.service';

describe('SiweSigninService', () => {
  let service: SiweSigninService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SiweSigninService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: jest.fn().mockReturnValue('test-secret'),
          },
        },
      ],
    }).compile();

    service = module.get<SiweSigninService>(SiweSigninService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a nonce', () => {
    jest.spyOn(service, 'generateNonce');
    const nonce = service.generateNonce();
    expect(nonce).toBeDefined();
    expect(service.generateNonce).toHaveBeenCalled();
  });

  it('should generate access token', () => {
    const userEthAddress = '0x1234567890abcdef';
    const token = 'test-token';
    const refresh = 'test-refresh';
    jest
      .spyOn(jwtService, 'sign')
      .mockReturnValueOnce(token)
      .mockReturnValueOnce(refresh);
    const result = service.generateAccessToken(userEthAddress);
    expect(result).toEqual({ token, refresh });
    expect(jwtService.sign).toHaveBeenCalledTimes(2);
  });
});
