import { SimpleLineIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Text, View } from "react-native";

const newSchool = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fcfcfc",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingVertical: 0,
      }}
    >
      <Link
        href={"/(admin)"}
        style={{
          position: "absolute",
          top: 10,
          left: 20,
        }}
      >
        <SimpleLineIcons name="arrow-left" size={24} color="#5F5F5F" />
      </Link>
      <Text style={{ fontSize: 32, fontWeight: "semibold", color: "#5f5f5f" }}>
        Add New School
      </Text>
    </View>
  );
};

export default newSchool;
