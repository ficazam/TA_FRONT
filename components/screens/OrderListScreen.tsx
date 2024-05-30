import React from "react";
import { FlatList, View } from "react-native";
import ErrorText from "../ErrorText";
import LoadingScreen from "../loading/LoadingScreen";
import OrderCard from "../cards/OrderCard";
import { Order } from "@/core/types/order.type";
import { User } from "@/core/types/user.type";

interface iOrderListScreenProps {
  isLoadingOrders: boolean;
  isLoadingTeachers: boolean;
  isSuccessOrders: boolean;
  isSuccessTeachers: boolean;
  ordersToDisplay: Order[];
  teachersToDisplay: User[];
}

const OrderListScreen = (props: iOrderListScreenProps) => {
  return (
    <>
      {(props.isLoadingOrders || props.isLoadingTeachers) && <LoadingScreen />}

      {!(props.isLoadingOrders || props.isLoadingTeachers) &&
        !props.ordersToDisplay.length && (
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
        {props.isSuccessOrders && props.isSuccessTeachers && (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={props.ordersToDisplay}
            renderItem={({ item: order }) => (
              <OrderCard
                order={order}
                teacher={
                  props.teachersToDisplay.find(
                    (teacher) => teacher.id === order.teacherId
                  )!
                }
              />
            )}
          />
        )}
      </View>
    </>
  );
};

export default OrderListScreen;
