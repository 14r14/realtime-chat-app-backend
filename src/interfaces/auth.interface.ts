export interface ClientRegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ClientLoginData {
  email: string;
  password: string;
}

export interface ServerToClientError {
  success: boolean;
  code: string;
  msg?: Object;
}

export interface AuthSuccessfullToClient {
  success: boolean;
  username: string;
  active: boolean;
}
