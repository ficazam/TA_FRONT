import DatepickerComponent from "@/components/DatepickerComponent";
import ErrorText from "@/components/ErrorText";
import NewOrderItemCard from "@/components/cards/NewOrderItemCard";
import ButtonTile from "@/components/input/ButtonTile";
import LoadingScreen from "@/components/loading/LoadingScreen";
import UserPageLayout from "@/components/navigation/PageTitleNav";
import { Item } from "@/core/types/item.type";
import { OrderItem } from "@/core/types/order-item.type";
import { Order } from "@/core/types/order.type";
import { useLazyGetAllSchoolItemsQuery } from "@/store/features/api/items.slice";
import { useCreateNewOrderMutation } from "@/store/features/api/orders.slice";
import { useAppSelector } from "@/store/hooks";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

const NewOrder = () => {
  const { user } = useAppSelector((state) => state.userState);
  const [createNewOrder] = useCreateNewOrderMutation();
  const [schoolItems, setSchoolItems] = useState<Item[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [deliveryDate, setDeliveryDate] = useState<Date>(new Date());
  const [dateModalOpen, setDateModalOpen] = useState<boolean>(false);

  const [
    getItemsQuery,
    { isLoading: isLoadingItems, isSuccess: isSuccessItems },
  ] = useLazyGetAllSchoolItemsQuery();

  useEffect(() => {
    getItemsQuery({ schoolId: user.schoolId! }).then((itemsQuery) => {
      if (!itemsQuery || !itemsQuery.isSuccess) {
        return;
      }

      setSchoolItems(itemsQuery.data.data);
    });
  }, []);

  const handleAddItemToOrder = (itemId: string) => {
    const itemIndex: number = orderItems.findIndex(
      (listItem) => listItem.itemId === itemId
    );

    if (itemIndex >= 0) {
      let itemInOrder = orderItems[itemIndex];
      itemInOrder.amount += 1;

      const newOrderItems = orderItems.map((item) =>
        item.itemId === itemId ? itemInOrder : item
      );

      return setOrderItems(newOrderItems);
    }

    return setOrderItems([...orderItems, { itemId, amount: 1 }]);
  };

  const handleRemoveItemFromOrder = (itemId: string) => {
    const itemIndex: number = orderItems.findIndex(
      (listItem) => listItem.itemId === itemId
    );

    if (itemIndex < 0) {
      return;
    }

    const itemInOrder = orderItems[itemIndex];

    if (itemInOrder.amount > 1) {
      itemInOrder.amount -= 1;

      const newOrderItems = orderItems.map((item) =>
        item.itemId === itemId ? itemInOrder : item
      );

      return setOrderItems(newOrderItems);
    }

    const newOrderItems = orderItems.filter((item) => item.itemId !== itemId);
    return setOrderItems(newOrderItems);
  };

  const handleSubmitOrder = async () => {
    setLoading(true);

    const itemsThatRequireApproval = schoolItems
      .map((item) => {
        const itemInOrder = orderItems.find(
          (orderItem) => orderItem.itemId === item.id
        );

        if (!itemInOrder) {
          return;
        }

        if (itemInOrder.amount + item.ordered >= item.inStock) {
          return item;
        }
      })
      .filter((item) => item !== undefined);

    try {
      const newOrder: Partial<Order> = {
        schoolId: user.schoolId,
        teacherId: user.id,
        requiresApproval: itemsThatRequireApproval.length > 0,
        deliveryDate: deliveryDate,
        items: orderItems,
      };

      await createNewOrder(newOrder).unwrap();
      router.push("/(teacher)");
    } catch (error: any) {
      setSubmitError(error.description);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserPageLayout title="New Order" route="/(teacher)">
      {isLoadingItems && <LoadingScreen />}

      <ErrorText error={submitError} />

      {!isLoadingItems && !isSuccessItems && (
        <ErrorText error="Error loading items." />
      )}

      <DatepickerComponent
        open={dateModalOpen}
        setOpen={setDateModalOpen}
        date={deliveryDate}
        setDate={setDeliveryDate}
      />

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginTop: 20,
          paddingHorizontal: 20,
          marginBottom: 250,
        }}
      >
        {isSuccessItems && (
          <FlatList
            data={schoolItems}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <NewOrderItemCard
                item={item}
                amount={
                  orderItems.find(
                    (orderedItem) => orderedItem.itemId === item.id
                  )
                    ? orderItems.find(
                        (orderedItem) => orderedItem.itemId === item.id
                      )!.amount
                    : 0
                }
                onPressAdd={() => handleAddItemToOrder(item.id)}
                onPressSubtract={() => handleRemoveItemFromOrder(item.id)}
              />
            )}
          />
        )}
      </View>

      <ButtonTile
        title="Submit Order"
        onPress={handleSubmitOrder}
        isLoading={loading}
        disabled={loading || orderItems.length === 0}
      />
    </UserPageLayout>
  );
};

export default NewOrder;
