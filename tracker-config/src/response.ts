interface ITokenResponse {
  token: string;
  expires: Date;
}

interface IAuthTokensResponse {
  access: ITokenResponse;
  refresh?: ITokenResponse;
}

export {
  ITokenResponse,
  IAuthTokensResponse
}