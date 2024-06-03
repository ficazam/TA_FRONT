import { UserRole } from "../enums/user-role.enum";
import { UserStatus } from "../enums/user-status.enum";

export interface User {
  id: string;
  image?: string;
  name: string;
  surname: string;
  email: string;
  role: UserRole;
  schoolId?: string;
  status: UserStatus;
  orders: string[];
}

export interface AddUser extends Omit<User, "id"> {
  password: string;
}

export const emptyUser: User = {
  id: "",
  image: "",
  name: "",
  surname: "",
  email: "",
  role: UserRole.Empty,
  status: UserStatus.Unverified,
  orders: [],
};
