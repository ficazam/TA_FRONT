import UserPageLayout from "@/components/navigation/PageTitleNav";
import OrderDetails from "@/components/screens/OrderDetails";
import { Item } from "@/core/types/item.type";
import { Order, emptyOrder } from "@/core/types/order.type";
import { User, emptyUser } from "@/core/types/user.type";
import { useLazyGetAllSchoolItemsQuery } from "@/store/features/api/items.slice";
import { useLazyGetSingleOrderQuery } from "@/store/features/api/orders.slice";
import { useLazyGetSingleUserQuery } from "@/store/features/api/user.slice";
import { useAppSelector } from "@/store/hooks";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

const OrderDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const { user } = useAppSelector((state) => state.userState);
  const [order, setOrder] = useState<Order>(emptyOrder);
  const [teacher, setTeacher] = useState<User>(emptyUser);
  const [items, setItems] = useState<Item[]>([]);
  const [coordinatorName, setCoordinatorName] = useState<string>("");
  const [loadingError, setLoadingError] = useState<string>("");

  const [getSingleOrderQuery, { isLoading: isLoadingOrder }] =
    useLazyGetSingleOrderQuery();
  const [getSingleUserQuery, { isLoading: isLoadingTeacher }] =
    useLazyGetSingleUserQuery();
  const [getAllItemsQuery, { isLoading: isLoadingItems }] =
    useLazyGetAllSchoolItemsQuery();

  useEffect(() => {
    getSingleOrderQuery({
      schoolId: user.schoolId!,
      orderId: typeof id === "object" ? id[0]! : id!,
    }).then((singleOrderQuery) => {
      if (!singleOrderQuery || !singleOrderQuery.isSuccess) {
        setLoadingError("Error loading order.");
        return;
      }

      setOrder({
        ...singleOrderQuery.data.data,
        creationDate: new Date(singleOrderQuery.data.data.creationDate),
        deliveryDate: new Date(singleOrderQuery.data.data.deliveryDate),
      });
    });

    getAllItemsQuery({ schoolId: user.schoolId! }).then((itemQuery) => {
      if (!itemQuery || !itemQuery.isSuccess) {
        setLoadingError("Error loading order");
        return;
      }

      setItems(itemQuery.data.data);
    });
  }, []);

  useEffect(() => {
    if (order.teacherId === emptyOrder.teacherId) {
      return;
    }

    getSingleUserQuery({ userId: order.teacherId! }).then(
      (singleTeacherQuery) => {
        if (!singleTeacherQuery || !singleTeacherQuery.isSuccess) {
          setLoadingError("Error loading teacher.");
          return;
        }

        setTeacher(singleTeacherQuery.data.data);
      }
    );

    if (!order.approved) {
      return;
    }

    getSingleUserQuery({ userId: order.approvedById! }).then(
      (coordinatorNameQuery) => {
        if (!coordinatorNameQuery || !coordinatorNameQuery.isSuccess) {
          setLoadingError("Error loading teacher.");
          return;
        }

        setCoordinatorName(
          `${coordinatorNameQuery.data.data.name} ${coordinatorNameQuery.data.data.surname}`
        );
      }
    );
  }, [order]);

  return (
    <UserPageLayout title="Order Details" route="/(inventory)/orders">
      <OrderDetails
        order={order}
        teacher={teacher}
        items={items}
        isLoadingOrder={isLoadingOrder}
        isLoadingTeacher={isLoadingTeacher}
        isLoadingItems={isLoadingItems}
        loadingError={loadingError}
        coordinator={coordinatorName || ""}
      />
    </UserPageLayout>
  );
};

export default OrderDetailsScreen;
