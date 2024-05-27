import { Colors } from "@/constants/Colors";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

interface iUserPageLayoutProps {
  title: string;
  children: React.ReactNode;
  route: string;
}

const UserPageLayout = (props: iUserPageLayoutProps) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: Colors.white,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Link
        href={props.route}
        style={{
          position: "absolute",
          top: 0,
          left: 15,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
      >
        <SimpleLineIcons name="arrow-left" size={24} color={Colors.black} />
      </Link>
      <Text
        style={{ fontSize: 32, fontWeight: "semibold", color: Colors.black }}
      >
        {props.title}
      </Text>
      {props.children}
    </View>
  );
};

export default UserPageLayout;
