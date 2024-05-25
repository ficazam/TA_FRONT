import { Colors } from "@/constants/Colors";
import { useUserColor } from "@/hooks/useUserColor";
import { Link, router } from "expo-router";
import { Pressable, Text, View } from "react-native";

interface iCardProps {
  icon: React.ReactNode;
  title: string;
  link: string;
}

const Card = (props: iCardProps) => {
  const { userColor } = useUserColor();

  return (
    <Pressable
      onPress={() => router.push(`${props.link}`)}
      style={{
        backgroundColor: userColor.transparentColor,
        borderColor: userColor.color,
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 18,
        width: "40%",
        minHeight: "15%",
        paddingVertical: 30,
        paddingHorizontal: 25,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View>{props.icon}</View>
      <Text style={{ marginTop: 10, color: Colors.white }}>{props.title}</Text>
    </Pressable>
  );
};

export default Card;
