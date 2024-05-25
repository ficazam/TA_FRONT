export interface UserCreationPasswords {
  password: string;
  confirmPassword: string;
}

export const emptyPasswords: UserCreationPasswords = {
  password: "",
  confirmPassword: "",
};
