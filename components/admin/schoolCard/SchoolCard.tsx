import { useUserColor } from "@/hooks/useUserColor";
import { Link } from "expo-router";
import { Image, ImageSourcePropType, Text, View } from "react-native";

interface iSchoolCardProps {
  link: string;
  title: string;
  image?: ImageSourcePropType;
}

const SchoolCard = (props: iSchoolCardProps) => {
  const { userColor } = useUserColor();

  return (
    <Link
      href={props.link}
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
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 30,
          paddingHorizontal: 25,
        }}
      >
        <Image source={props.image} resizeMode="cover" style={{}} />
        <Text style={{ fontSize: 20, marginTop: 10, color: "#fcfcfc" }}>
          {props.title}
        </Text>
      </View>
    </Link>
  );
};

export default SchoolCard;
