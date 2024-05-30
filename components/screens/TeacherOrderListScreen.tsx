import { FlatList, Text, View } from "react-native";
import TeacherOrderCard from "../cards/TeacherOrderCard";
import LoadingScreen from "../loading/LoadingScreen";
import { Order } from "@/core/types/order.type";
import { Colors } from "@/constants/Colors";

interface iTeacherOrderListScreenProps {
    isLoadingOrders: boolean
    isSuccessOrders: boolean
    orderHistory: Order[]
}

const TeacherOrderListScreen = (props: iTeacherOrderListScreenProps) => {
  return (
    <>
      {props.isLoadingOrders && <LoadingScreen />}

      {props.isSuccessOrders && !props.orderHistory.length && (
        <Text
          style={{ color: Colors.danger, fontSize: 20, textAlign: "center" }}
        >
          No Orders to show.
        </Text>
      )}

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginTop: 20,
          marginBottom: 50,
          paddingHorizontal: 20,
        }}
      >
        {props.isSuccessOrders && (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={props.orderHistory}
            renderItem={({ item: order }) => <TeacherOrderCard order={order} />}
          />
        )}
      </View>
    </>
  );
};

export default TeacherOrderListScreen;
