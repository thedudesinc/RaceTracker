export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginOutput {
  statusCode: number;
  token: string;
}
