import UserPageLayout from "@/components/navigation/PageTitleNav";
import OrderListScreen from "@/components/screens/OrderListScreen";
import { UserRole } from "@/core/enums/user-role.enum";
import { Order } from "@/core/types/order.type";
import { User } from "@/core/types/user.type";
import { useLazyGetAllSchoolOrdersQuery } from "@/store/features/api/orders.slice";
import { useLazyGetAllSchoolUsersQuery } from "@/store/features/api/user.slice";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";

const approvedOrders = () => {
  const { user } = useAppSelector((state) => state.userState);
  const [approvedOrders, setApprovedOrders] = useState<Order[]>([]);
  const [allTeachers, setAllTeachers] = useState<User[]>([]);

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

      const filteredOrdersForApproval = ordersQuery.data.data.filter(
        (order) =>
          order.requiresApproval &&
          order.approved &&
          order.approvedById === user.id
      );

      setApprovedOrders(filteredOrdersForApproval);
    });

    getTeachersQuery({ schoolId: user.schoolId! }).then((teachersQuery) => {
      if (!teachersQuery || !teachersQuery.isSuccess) {
        return;
      }

      const filteredUsers = teachersQuery.data.data.filter(
        (user) => user.role === UserRole.Teacher
      );
      setAllTeachers(filteredUsers);
    });
  }, []);

  return (
    <UserPageLayout title="Approved Orders" route="/(coordinator)">
      <OrderListScreen
        isLoadingOrders={isLoadingOrders}
        isLoadingTeachers={isLoadingTeachers}
        ordersToDisplay={approvedOrders}
        teachersToDisplay={allTeachers}
      />
    </UserPageLayout>
  );
};

export default approvedOrders;
