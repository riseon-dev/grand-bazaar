export interface verifySignatureRequest {
  message: string;
  signature: string;
  nonce: string;
}

export interface SigninService {
  generateNonce(): Promise<string>;
  verifySignature(verifyRequest: verifySignatureRequest): Promise<boolean>;
  generateAccessToken(userEthAddress: string): Promise<string>;
}

export const SigninService = Symbol('SigninService');
