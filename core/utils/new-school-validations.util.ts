import { UserCreationPasswords } from "../types/passwords.type";
import { ISchoolInfo } from "../types/school.type";
import { User } from "../types/user.type";

export const newSchoolValidations = (
  newSchool: ISchoolInfo,
  newPrincipal: User,
  setPrincipalError: (error: string) => void,
  setSchoolError: (error: string) => void
) => {
  if (newSchool.name.length < 2) {
    setSchoolError("Please enter a school name!");
    return false;
  }

  if (
    newPrincipal.name.length < 2 ||
    newPrincipal.status.length < 2 ||
    newPrincipal.email.length < 2
  ) {
    setPrincipalError("Please complete all fields before submitting.");
    return false;
  }

  if (
    !newPrincipal.email.includes("@") ||
    !newPrincipal.email.includes(".") ||
    newPrincipal.email.split("@")[1].length < 2 ||
    newPrincipal.email.split(".")[1].length < 2
  ) {
    setPrincipalError("Please enter a valid email!");
    return false;
  }

  return true;
};
