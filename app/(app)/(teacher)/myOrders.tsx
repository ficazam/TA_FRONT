import TeacherOrderCard from "@/components/cards/TeacherOrderCard";
import LoadingScreen from "@/components/loading/LoadingScreen";
import UserPageLayout from "@/components/navigation/PageTitleNav";
import { Colors } from "@/constants/Colors";
import { Order } from "@/core/types/order.type";
import { useGetAllTeacherOrdersQuery } from "@/store/features/api/orders.slice";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

const MyOrders = () => {
  const { user } = useAppSelector((user) => user.userState);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);

  const {
    data: ordersQuery,
    isLoading: isLoadingOrders,
    isSuccess: isSuccessOrders,
  } = useGetAllTeacherOrdersQuery({
    schoolId: user.schoolId!,
    teacherId: user.id!,
  });

  useEffect(() => {
    if (!ordersQuery || !ordersQuery.success) {
      return;
    }

    setOrderHistory(ordersQuery.data);
  }, [ordersQuery]);

  return (
    <UserPageLayout title="Order History" route="/(teacher)">
      {isLoadingOrders && <LoadingScreen />}

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          marginTop: 20,
          paddingHorizontal: 20,
        }}
      >
        {isSuccessOrders && !orderHistory.length && (
          <Text
            style={{ color: Colors.danger, fontSize: 20, textAlign: "center" }}
          >
            No Orders to show.
          </Text>
        )}

        {isSuccessOrders && (
          <FlatList
            data={orderHistory}
            renderItem={({ item: order }) => <TeacherOrderCard order={order} />}
          />
        )}
      </View>
    </UserPageLayout>
  );
};

export default MyOrders;
