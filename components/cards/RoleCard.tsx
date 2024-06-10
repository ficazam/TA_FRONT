import { Colors } from "@/constants/Colors";
import { useUserColor } from "@/hooks";
import { Pressable, Text } from "react-native";

interface iRoleCardProps {
  title: string;
  onPress: () => void;
  isSelected: boolean;
}

const RoleCard = (props: iRoleCardProps) => {
  const { userColor } = useUserColor();
  return (
    <Pressable
      onPress={props.onPress}
      style={{
        marginTop: 10,
        paddingHorizontal: 20,
        paddingVertical: 2,
        borderWidth: 1,
        borderColor: userColor.color,
        borderRadius: 20,
        backgroundColor: props.isSelected
          ? userColor.transparentColor
          : Colors.white,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 120,
        height: 50,
      }}
    >
      <Text
        style={{
          fontWeight: props.isSelected ? "semibold" : "normal",
          color: props.isSelected ? Colors.white : userColor.color,
          fontSize: 16
        }}
      >
        {props.title}
      </Text>
    </Pressable>
  );
};

export default RoleCard;
