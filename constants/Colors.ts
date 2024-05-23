/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { UserRole } from "@/core/enums/user-role.enum";

export const userColors = [
  { role: UserRole.Admin, color: "#00008b" },
  { role: UserRole.Principal, color: "#50c878" },
  { role: UserRole.Teacher, color: "#ff1493" },
  { role: UserRole.Inventory, color: "#ffbf00" },
  { role: UserRole.Coordinator, color: "#49117c" },
  { role: UserRole.Empty, color: "#5F5F5F" },
];
