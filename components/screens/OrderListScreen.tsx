import React from "react";
import { FlatList, View } from "react-native";
import ErrorText from "../Text/ErrorText";
import LoadingScreen from "../loading/LoadingScreen";
import OrderCard from "../cards/OrderCard";
import { Order } from "@/core/types/order.type";
import { User } from "@/core/types/user.type";

interface iOrderListScreenProps {
  isLoadingOrders: boolean;
  isLoadingTeachers: boolean;
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
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          marginTop: 20,
          marginBottom: 50,
          paddingHorizontal: 20,
        }}
      >
        {props.ordersToDisplay.length > 0 &&
          props.teachersToDisplay.length > 0 && (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={props.ordersToDisplay}
              style={{ width: "100%" }}
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
