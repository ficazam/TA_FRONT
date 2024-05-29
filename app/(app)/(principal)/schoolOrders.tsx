import ErrorText from "@/components/ErrorText";
import OrderCard from "@/components/cards/OrderCard";
import LoadingScreen from "@/components/loading/LoadingScreen";
import UserPageLayout from "@/components/navigation/PageTitleNav";
import { UserRole } from "@/core/enums/user-role.enum";
import { Order } from "@/core/types/order.type";
import { User } from "@/core/types/user.type";
import {
  useLazyGetAllSchoolOrdersQuery,
} from "@/store/features/api/orders.slice";
import {
  useLazyGetAllSchoolUsersQuery,
} from "@/store/features/api/user.slice";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

const schoolOrders = () => {
  const { user } = useAppSelector((user) => user.userState);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
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

      setOrderHistory(ordersQuery.data.data);
    });

    getTeachersQuery({ schoolId: user.schoolId! }).then((teachersQuery) => {
      if (!teachersQuery || !teachersQuery.isSuccess) {
        return;
      }

      const teachers: User[] = teachersQuery.data.data.filter(
        (staffMember) => staffMember.role === UserRole.Teacher
      );

      setSchoolTeachers(teachers);
    });
  }, []);

  useEffect(() => {
    getTeachersQuery;
  }, []);

  return (
    <UserPageLayout title="Order History" route="/mySchool">
      {(isLoadingOrders || isLoadingTeachers) && <LoadingScreen />}

      {!isSuccessOrders &&
        !isSuccessTeachers &&
        !(isLoadingOrders || isLoadingTeachers) &&
        !orderHistory.length && <ErrorText error="No Orders to show." />}

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
            data={orderHistory}
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

export default schoolOrders;
