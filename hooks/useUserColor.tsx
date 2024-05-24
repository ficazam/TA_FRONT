import { userColors } from "@/constants/Colors";
import { UserRole } from "@/core/enums/user-role.enum";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";

export const useUserColor = () => {
  const { user } = useAppSelector((state) => state.userState);
  const [userColor, setUserColor] = useState<{
    role: UserRole;
    color: string;
    transparentColor: string;
  }>({ role: UserRole.Empty, color: "", transparentColor: "" });

  useEffect(() => {
    const color = userColors.find((color) => color.role === user.role)!;
    setUserColor(color);
  }, [user]);

  return { userColor };
};
