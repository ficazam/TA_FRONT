import { User } from "../types/user.type";

export const newUserValidations = (
  newStaff: User,
  setNewUserError: (error: string) => void
) => {
  if (
    newStaff.email.length < 2 ||
    !newStaff.email.includes("@") ||
    !newStaff.email.includes(".") ||
    newStaff.email.split("@")[1].length < 2 ||
    newStaff.email.split(".")[1].length < 2
  ) {
    setNewUserError("Email invalid! Please enter a valid email.");
    return false;
  }

  if (newStaff.name.length < 2 || newStaff.surname.length < 2) {
    setNewUserError("Please enter a valid name and last name.");
    return false;
  }

  return true;
};
