import { UserRole } from "@/core/enums/user-role.enum";

export const Colors = {
  white: "#fcfcfc",
  black: "#5f5f5f",
  danger: "#a50000"
};

export const userColors = [
  { role: UserRole.Admin, color: "#00008b", transparentColor: "#00008b88" },
  { role: UserRole.Principal, color: "#50c878", transparentColor: "#50c87888" },
  { role: UserRole.Teacher, color: "#ff1493", transparentColor: "#ff149388" },
  { role: UserRole.Inventory, color: "#ffbf00", transparentColor: "#ffbf00ce" },
  {
    role: UserRole.Coordinator,
    color: "#49117c",
    transparentColor: "#49117c88",
  },
  { role: UserRole.Empty, color: Colors.black, transparentColor: "#5F5F5F88" },
];
