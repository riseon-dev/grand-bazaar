export interface verifySignatureRequest {
  message: string;
  signature: string;
  nonce: string;
}

export interface generateAccessTokenResponse {
  token: string;
  refresh: string;
}

export interface SigninService {
  generateNonce(): string;
  verifySignature(verifyRequest: verifySignatureRequest): Promise<boolean>;
  generateAccessToken(userEthAddress: string): generateAccessTokenResponse;
}

export const SigninService = Symbol('SigninService');
