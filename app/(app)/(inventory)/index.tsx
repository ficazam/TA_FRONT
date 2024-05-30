import Card from "@/components/cards/Card";
import { Colors } from "@/constants/Colors";
import { SimpleLineIcons } from "@expo/vector-icons";
import { View } from "react-native";

const InventoryHome = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        backgroundColor: Colors.white,
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        flexWrap: 'wrap',
        rowGap: 20,
        paddingVertical: 50,
      }}
    >
      <Card
        icon={
          <SimpleLineIcons name="magnifier" size={24} color={Colors.white} />
        }
        title="View Inventory"
        link="/(inventory)/inventory"
      />
      <Card
        icon={<SimpleLineIcons name="organization" size={24} color={Colors.white} />}
        title="View Orders"
        link="/(inventory)/orders"
      />
      {/* <Card
        icon={<SimpleLineIcons name="plus" size={24} color={Colors.white} />}
        title="Add Item"
        link="/newItem"
      /> */}
    </View>
  );
};

export default InventoryHome;
