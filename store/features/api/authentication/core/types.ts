import { User } from "@/core/types/user.type";
import { AuthenticationErrorType, AuthenticationStatus } from "./enums";

export interface iAuthParams {
  email: string;
  password: string;
}

export interface iAuthenticatedUser extends User {
  token: string;
}

export interface AuthenticationState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isLogged: boolean;
  status: AuthenticationStatus;
  error?: AuthenticationError;
  user?: iAuthenticatedUser;
}

export interface AuthenticationError {
  type: AuthenticationErrorType;
  description: string;
}
