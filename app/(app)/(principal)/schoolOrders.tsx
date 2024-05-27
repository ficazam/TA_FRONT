import OrderCard from "@/components/cards/OrderCard";
import LoadingScreen from "@/components/loading/LoadingScreen";
import UserPageLayout from "@/components/navigation/PageTitleNav";
import { Colors } from "@/constants/Colors";
import { UserRole } from "@/core/enums/user-role.enum";
import { Order } from "@/core/types/order.type";
import { User } from "@/core/types/user.type";
import { useGetAllSchoolOrdersQuery } from "@/store/features/api/orders.slice";
import { useGetAllSchoolUsersQuery } from "@/store/features/api/user.slice";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

const schoolOrders = () => {
  const { user } = useAppSelector((user) => user.userState);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [schoolTeachers, setSchoolTeachers] = useState<User[]>([]);

  const {
    data: ordersQuery,
    isLoading: isLoadingOrders,
    isSuccess: isSuccessOrders,
  } = useGetAllSchoolOrdersQuery({
    schoolId: user.schoolId!,
  });

  const {
    data: teachersQuery,
    isLoading: isLoadingTeachers,
    isSuccess: isSuccessTeachers,
  } = useGetAllSchoolUsersQuery({
    schoolId: user.schoolId!,
  });

  useEffect(() => {
    if (!ordersQuery || !ordersQuery.success) {
      return;
    }

    setOrderHistory(ordersQuery.data);
  }, [ordersQuery]);

  useEffect(() => {
    if (!teachersQuery || !teachersQuery.success) {
      return;
    }

    const teachers: User[] = teachersQuery.data.filter(
      (staffMember) => staffMember.role === UserRole.Teacher
    );

    setSchoolTeachers(teachers);
  }, [teachersQuery]);

  return (
    <UserPageLayout title="Order History" route="/mySchool">
      {(isLoadingOrders || isLoadingTeachers) && <LoadingScreen />}

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
        {isSuccessOrders && isSuccessTeachers && !orderHistory.length && (
          <Text
            style={{ color: Colors.danger, fontSize: 20, textAlign: "center" }}
          >
            No Orders to show.
          </Text>
        )}

        {isSuccessOrders && isSuccessTeachers && (
          <FlatList
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
