import Card from "@/components/Card";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

const AdminHome = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#fcfcfc",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        paddingVertical: 50,
      }}
    >
      <Card
        icon={<SimpleLineIcons name="plus" size={24} color="#fcfcfc" />}
        title="Add New School"
        link="/newSchool"
      />

      <Card
        icon={<SimpleLineIcons name="magnifier" size={24} color="#fcfcfc" />}
        title="View All Schools"
        link="/allSchools"
      />
    </View>
  );
};

export default AdminHome;
