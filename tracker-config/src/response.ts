interface TokenResponse {
  token: string;
  expires: Date;
}

interface AuthTokensResponse {
  access: TokenResponse;
  refresh?: TokenResponse;
}

export {
  TokenResponse,
  AuthTokensResponse
}