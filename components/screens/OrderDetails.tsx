import { Order } from "@/core/types/order.type";
import { User } from "@/core/types/user.type";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  Text,
  View,
} from "react-native";
import LoadingScreen from "../loading/LoadingScreen";
import ErrorText from "../Text/ErrorText";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useUserColor } from "@/hooks/useUserColor";
import { useAppSelector } from "@/store/hooks";
import { UserRole } from "@/core/enums/user-role.enum";
import ButtonTile from "../input/ButtonTile";
import Button from "../input/Button";
import { OrderStatus } from "@/core/enums/order-status.enum";
import { useUpdateNewOrderMutation } from "@/store/features/api/orders.slice";
import InventoryCard from "../cards/InventoryCard";
import { Item, emptyItem } from "@/core/types/item.type";
import OrderItemCard from "../cards/OrderItemCard";
import { ScrollView } from "react-native-gesture-handler";

interface iOrderDetailsProps {
  order: Order;
  teacher: User;
  items: Item[];
  isLoadingOrder: boolean;
  isLoadingTeacher: boolean;
  isLoadingItems: boolean;
  loadingError: string;
  coordinator?: string;
}

const OrderDetails = (props: iOrderDetailsProps) => {
  const { width } = Dimensions.get("window");
  const { user } = useAppSelector((state) => state.userState);
  const { userColor } = useUserColor();
  const [loading, setLoading] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<string>("");
  const [updateOrder] = useUpdateNewOrderMutation();

  const handleOrderUpdate = async (updateType: OrderStatus) => {
    setLoading(true);
    try {
      const newOrder: Order = {
        ...props.order,
        status: updateType,
        approvedById: user.id,
        approved: updateType === OrderStatus.Approved,
      };

      await updateOrder(newOrder).unwrap();
    } catch (error: any) {
      setUpdateError("Error updating order.");
      console.error(error.description);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "96%",
        width: width,
        paddingVertical: 10,
      }}
    >
      {(props.isLoadingOrder || props.isLoadingTeacher) && <LoadingScreen />}

      {!(props.isLoadingOrder || props.isLoadingTeacher) &&
        props.loadingError.length > 0 && (
          <ErrorText error={props.loadingError || updateError} />
        )}

      {!(props.isLoadingOrder || props.isLoadingTeacher) && (
        <>
          <View
            style={{
              backgroundColor: Colors.white,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 150,
              width: 150,
              borderWidth: 1,
              borderColor: userColor.color,
              borderRadius: 100,
              marginTop: 10,
            }}
          >
            {props.teacher.image ? (
              <Image
                source={props.teacher.image as ImageSourcePropType}
                resizeMode="contain"
              />
            ) : (
              <SimpleLineIcons name="user" size={32} color={Colors.black} />
            )}
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "semibold",
                color: Colors.black,
              }}
            >
              Order by: {props.teacher.role} {props.teacher.name}{" "}
              {props.teacher.surname}
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text style={{ fontSize: 20, color: Colors.black }}>
                Creation Date:{" "}
              </Text>
              <Text style={{ fontSize: 20, color: Colors.black }}>
                {props.order.creationDate.toDateString()}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 20, color: Colors.black }}>
                Delivery by:{" "}
              </Text>
              <Text style={{ fontSize: 20, color: Colors.black }}>
                {props.order.deliveryDate.toDateString()}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 20, color: Colors.black }}>
                Status:{" "}
              </Text>
              <Text style={{ fontSize: 20, color: Colors.black }}>
                {props.order.status}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              {props.order.approved ? (
                <>
                  <Text style={{ fontSize: 20, color: Colors.black }}>
                    Approved by:{" "}
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      color: Colors.black,
                    }}
                  >
                    {props.coordinator}
                  </Text>
                </>
              ) : (
                <>
                  <Text style={{ fontSize: 20, color: Colors.black }}>
                    Requires Approval:{" "}
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      color: props.order.requiresApproval
                        ? Colors.danger
                        : Colors.black,
                    }}
                  >
                    {props.order.requiresApproval ? "Yes" : "No"}
                  </Text>
                </>
              )}
            </View>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 24,
                color: Colors.black,
                textAlign: "center",
                marginVertical: 20,
              }}
            >
              Ordered Items
            </Text>
            <FlatList
              data={props.order.items}
              renderItem={({ item }) => (
                <OrderItemCard
                  item={
                    props.items.find(
                      (inventoryItem) => inventoryItem.id === item.itemId
                    ) || emptyItem
                  }
                  amount={item.amount}
                />
              )}
            />
          </View>

          <View style={{ position: "absolute", bottom: 125, left: "auto" }}>
            {props.order.status === OrderStatus.Ordered &&
              (user.role === UserRole.Coordinator ||
                user.role === UserRole.Inventory) && (
                <Button
                  buttonTitle="Deny Order"
                  onPress={() => handleOrderUpdate(OrderStatus.Denied)}
                  isLoading={loading}
                  disabled={loading}
                />
              )}
          </View>
        </>
      )}

      {!(props.isLoadingOrder || props.isLoadingTeacher) &&
        props.order.requiresApproval &&
        !props.order.approved &&
        user.role === UserRole.Coordinator && (
          <ButtonTile
            title="Approve Order"
            onPress={() => handleOrderUpdate(OrderStatus.Approved)}
            isLoading={loading}
            disabled={loading}
          />
        )}
    </ScrollView>
  );
};

export default OrderDetails;
