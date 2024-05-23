import { useUserColor } from "@/hooks/useUserColor";
import { useAppSelector } from "@/store/hooks";
import { Link } from "expo-router";
import { Text, View } from "react-native";

interface iCardProps {
  icon: React.ReactNode;
  title: string;
  link: string;
}

const Card = (props: iCardProps) => {
  const { user } = useAppSelector((state) => state.userState);
  const { userColor } = useUserColor(user.role);

  return (
    <Link
      href={props.link}
      style={{
        backgroundColor: userColor.transparentColor,
        borderColor: userColor.color,
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 18,
        minWidth: "20%",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 30,
          paddingHorizontal: 25,
        }}
      >
        <View>{props.icon}</View>
        <Text style={{ marginTop: 10, color: "#fcfcfc" }}>{props.title}</Text>
      </View>
    </Link>
  );
};

export default Card;
