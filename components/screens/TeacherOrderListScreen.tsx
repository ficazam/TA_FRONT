import { FlatList, Text, View } from "react-native";
import TeacherOrderCard from "../cards/TeacherOrderCard";
import LoadingScreen from "../loading/LoadingScreen";
import { Order } from "@/core/types/order.type";
import { Colors } from "@/constants/Colors";
import ErrorText from "../Text/ErrorText";

interface iTeacherOrderListScreenProps {
  isLoadingOrders: boolean;
  orderHistory: Order[];
}

const TeacherOrderListScreen = (props: iTeacherOrderListScreenProps) => {
  return (
    <>
      {props.isLoadingOrders && <LoadingScreen />}

      {!props.isLoadingOrders && !props.orderHistory.length && (
        <ErrorText error="No Orders to show." />
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
        {props.orderHistory.length > 0 && (
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
