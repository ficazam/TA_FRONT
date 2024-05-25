import Card from "@/components/cards/Card";
import { Colors } from "@/constants/Colors";
import { SimpleLineIcons } from "@expo/vector-icons";
import { View } from "react-native";

const PrincipalHome = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        backgroundColor: Colors.white,
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        paddingVertical: 50,
      }}
    >
      <Card
        icon={
          <SimpleLineIcons name="user-follow" size={24} color={Colors.white} />
        }
        title="Add New Staff Member"
        link="/newStaff"
      />
      <Card
        icon={<SimpleLineIcons name="home" size={24} color={Colors.white} />}
        title="View My School"
        link="/mySchool"
      />
    </View>
  );
};

export default PrincipalHome;
