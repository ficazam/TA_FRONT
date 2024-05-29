import ErrorText from "@/components/ErrorText";
import OrderCard from "@/components/cards/OrderCard";
import LoadingScreen from "@/components/loading/LoadingScreen";
import UserPageLayout from "@/components/navigation/PageTitleNav";
import { OrderStatus } from "@/core/enums/order-status.enum";
import { UserRole } from "@/core/enums/user-role.enum";
import { Order } from "@/core/types/order.type";
import { User } from "@/core/types/user.type";
import { useLazyGetAllSchoolOrdersQuery } from "@/store/features/api/orders.slice";
import { useLazyGetAllSchoolUsersQuery } from "@/store/features/api/user.slice";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

const orders = () => {
  const { user } = useAppSelector((state) => state.userState);
  const [schoolOrders, setSchoolOrders] = useState<Order[]>([]);
  const [schoolTeachers, setSchoolTeachers] = useState<User[]>([]);

  const [
    getOrdersQuery,
    { isLoading: isLoadingOrders, isSuccess: isSuccessOrders },
  ] = useLazyGetAllSchoolOrdersQuery();
  const [
    getTeachersQuery,
    { isLoading: isLoadingTeachers, isSuccess: isSuccessTeachers },
  ] = useLazyGetAllSchoolUsersQuery();

  useEffect(() => {
    getOrdersQuery({ schoolId: user.schoolId! }).then((ordersQuery) => {
      if (!ordersQuery || !ordersQuery.isSuccess) {
        return;
      }

      const activeOrders = ordersQuery.data.data.filter(
        (order) =>
          order.status !== OrderStatus.Cancelled &&
          order.status !== OrderStatus.Denied &&
          order.status !== OrderStatus.Delivered
      );

      setSchoolOrders(activeOrders);
    });

    getTeachersQuery({ schoolId: user.schoolId! }).then((teachersQuery) => {
      if (!teachersQuery || !teachersQuery.isSuccess) {
        return;
      }

      const teachers = teachersQuery.data.data.filter(
        (user) => user.role === UserRole.Teacher
      );

      setSchoolTeachers(teachers);
    });
  }, []);

  return (
    <UserPageLayout title="School Orders" route="/(inventory)">
      {(isLoadingOrders || isLoadingTeachers) && <LoadingScreen />}

      {!(isLoadingOrders || isLoadingTeachers) && !schoolOrders.length && (
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
        {isSuccessOrders && isSuccessTeachers && (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={schoolOrders}
            renderItem={({ item: order }) => (
              <OrderCard
                order={order}
                teacher={
                  schoolTeachers.find(
                    (teacher) => teacher.id === order.teacherId
                  )!
                }
              />
            )}
          />
        )}
      </View>
    </UserPageLayout>
  );
};

export default orders;
