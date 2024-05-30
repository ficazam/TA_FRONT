import UserPageLayout from "@/components/navigation/PageTitleNav";
import TeacherOrderListScreen from "@/components/screens/TeacherOrderListScreen";
import { Order } from "@/core/types/order.type";
import { useLazyGetAllTeacherOrdersQuery } from "@/store/features/api/orders.slice";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";

const MyOrders = () => {
  const { user } = useAppSelector((user) => user.userState);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);

  const [
    getQueries,
    { isLoading: isLoadingOrders },
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
      <TeacherOrderListScreen
        isLoadingOrders={isLoadingOrders}
        orderHistory={orderHistory}
      />
    </UserPageLayout>
  );
};

export default MyOrders;
