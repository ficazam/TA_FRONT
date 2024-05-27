import Card from "@/components/cards/Card";
import UserPageLayout from "@/components/navigation/PageTitleNav";
import { Colors } from "@/constants/Colors";
import { SimpleLineIcons } from "@expo/vector-icons";
import { View } from "react-native";

const mySchool = () => {
  return (
    <UserPageLayout title="My School" route="/(principal)">
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          backgroundColor: Colors.white,
          justifyContent: "space-evenly",
          alignItems: "flex-start",
          columnGap: 30,
          marginTop: 30,
        }}
      >
        <Card
          icon={
            <SimpleLineIcons
              name="user"
              size={24}
              color={Colors.white}
            />
          }
          title="View Users"
          link="/schoolStaff"
        />
        <Card
          icon={
            <SimpleLineIcons
              name="organization"
              size={24}
              color={Colors.white}
            />
          }
          title="View Order History"
          link="/schoolOrders"
        />
      </View>
    </UserPageLayout>
  );
};

export default mySchool;
