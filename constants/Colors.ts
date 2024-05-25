/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { UserRole } from "@/core/enums/user-role.enum";

export const Colors = {
  white: "#fcfcfc",
  black: "#5f5f5f",
};

export const userColors = [
  { role: UserRole.Admin, color: "#00008b", transparentColor: "#00008b88" },
  { role: UserRole.Principal, color: "#50c878", transparentColor: "#50c87888" },
  { role: UserRole.Teacher, color: "#ff1493", transparentColor: "#ff149388" },
  { role: UserRole.Inventory, color: "#ffbf00", transparentColor: "#ffbf0088" },
  {
    role: UserRole.Coordinator,
    color: "#49117c",
    transparentColor: "#49117c88",
  },
  { role: UserRole.Empty, color: Colors.black, transparentColor: "#5F5F5F88" },
];
