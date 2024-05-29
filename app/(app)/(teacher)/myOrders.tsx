import TeacherOrderCard from "@/components/cards/TeacherOrderCard";
import LoadingScreen from "@/components/loading/LoadingScreen";
import UserPageLayout from "@/components/navigation/PageTitleNav";
import { Colors } from "@/constants/Colors";
import { Order } from "@/core/types/order.type";
import { useLazyGetAllTeacherOrdersQuery } from "@/store/features/api/orders.slice";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

const MyOrders = () => {
  const { user } = useAppSelector((user) => user.userState);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);

  const [
    getQueries,
    { isLoading: isLoadingOrders, isSuccess: isSuccessOrders },
  ] = useLazyGetAllTeacherOrdersQuery();

  useEffect(() => {
    getQueries({ schoolId: user.schoolId!, teacherId: user.id }).then(
      (ordersQuery) => {
        if (!ordersQuery || !ordersQuery.isSuccess) {
          return;
        }

        setOrderHistory(ordersQuery.data.data);
      }
    );
  }, []);

  return (
    <UserPageLayout title="Order History" route="/(teacher)">
      {isLoadingOrders && <LoadingScreen />}

      {isSuccessOrders && !orderHistory.length && (
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
        {isSuccessOrders && (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={orderHistory}
            renderItem={({ item: order }) => <TeacherOrderCard order={order} />}
          />
        )}
      </View>
    </UserPageLayout>
  );
};

export default MyOrders;
