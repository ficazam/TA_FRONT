import Card from "@/components/cards/Card";
import { Colors } from "@/constants/Colors";
import { SimpleLineIcons } from "@expo/vector-icons";
import { View } from "react-native";

const TeacherHome = () => {
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
          <SimpleLineIcons name="plus" size={24} color={Colors.white} />
        }
        title="New Order"
        link="/newOrder"
      />
      <Card
        icon={<SimpleLineIcons name="organization" size={24} color={Colors.white} />}
        title="My Orders"
        link="/myOrders"
      />
    </View>
  );
};

export default TeacherHome;
