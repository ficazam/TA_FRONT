import { Colors } from "@/constants/Colors";
import { useUserColor } from "@/hooks";
import { Link } from "expo-router";
import {
  Pressable,
  Text,
  View,
} from "react-native";
import ImageCircle from "../parts/ImageCircle";
import { SimpleLineIcons } from "@expo/vector-icons";

interface iSchoolCardProps {
  link: string;
  title: string;
  image?: string;
}

const SchoolCard = (props: iSchoolCardProps) => {
  const { userColor } = useUserColor();

  return (
    <Link asChild href={props.link}>
      <Pressable
        style={{
          backgroundColor: userColor.transparentColor,
          borderColor: userColor.color,
          borderStyle: "solid",
          borderWidth: 1,
          borderRadius: 18,
          minWidth: "80%",
          minHeight: "20%",
          marginVertical: 4,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 30,
            paddingHorizontal: 25,
          }}
        >
          <ImageCircle image={props.image} />
          <Text style={{ fontSize: 20, color: Colors.white, marginRight: 75 }}>
            {props.title}
          </Text>
          <SimpleLineIcons name="arrow-right" size={18} color={Colors.white} />
        </View>
      </Pressable>
    </Link>
  );
};

export default SchoolCard;
