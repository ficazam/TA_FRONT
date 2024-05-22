export enum AuthenticationErrorType {
  InvalidEmail,
  InvalidPassword,
  InvalidAccount,
  InvalidServerResponse,
}

export enum AuthenticationStatus {
  Unauthenticated = "Unauthenticated",
  Success = "success",
  Loading = "loading",
  Failed = "failed",
  Cancelled = "cancelled",
}
