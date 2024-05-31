import UserPageLayout from "@/components/navigation/PageTitleNav";
import OrderListScreen from "@/components/screens/OrderListScreen";
import { UserRole } from "@/core/enums/user-role.enum";
import { Order } from "@/core/types/order.type";
import { User } from "@/core/types/user.type";
import { useLazyGetAllSchoolOrdersQuery } from "@/store/features/api/orders.slice";
import { useLazyGetAllSchoolUsersQuery } from "@/store/features/api/user.slice";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";

const schoolOrders = () => {
  const { user } = useAppSelector((user) => user.userState);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [schoolTeachers, setSchoolTeachers] = useState<User[]>([]);

  const [
    getOrdersQuery,
    { isLoading: isLoadingOrders },
  ] = useLazyGetAllSchoolOrdersQuery();

  const [
    getTeachersQuery,
    { isLoading: isLoadingTeachers },
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
      <OrderListScreen
        isLoadingOrders={isLoadingOrders}
        isLoadingTeachers={isLoadingTeachers}
        ordersToDisplay={orderHistory}
        teachersToDisplay={schoolTeachers}
      />
    </UserPageLayout>
  );
};

export default schoolOrders;
