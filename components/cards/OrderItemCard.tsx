import { Colors } from "@/constants/Colors";
import { Item } from "@/core/types/item.type";
import { useUserColor } from "@/hooks/useUserColor";
import { SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";
import ImageCircle from "../parts/ImageCircle";

interface iInventoryCardProps {
  item: Item;
  amount: number;
}

const OrderItemCard = (props: iInventoryCardProps) => {
  const { userColor } = useUserColor();
  return (
    <View
      style={{
        backgroundColor: Colors.white,
        borderBottomColor: userColor.color,
        borderBottomWidth: 1,
        width: "90%",
        height: 125,
        paddingVertical: 5,
        paddingHorizontal: 20,
        marginLeft: 20,
        marginVertical: 7,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        columnGap: 20,
      }}
    >
      <ImageCircle image={props.item.image} />

      <View
        style={{
          width: "70%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "stretch",
        }}
      >
        <Text
          style={{
            color: Colors.black,
            fontSize: 24,
            fontWeight: "semibold",
          }}
        >
          {props.item.name}
        </Text>
        <Text
          style={{
            color: Colors.black,
            fontSize: 20,
            fontWeight: "semibold",
          }}
        >
          Type: {props.item.type}
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            marginTop: 15,
            columnGap: 5,
          }}
        >
          {props.item.isTemporal && (
            <SimpleLineIcons name="clock" color={Colors.black} size={12} />
          )}

          <Text
            style={{
              color: Colors.black,
              fontSize: 16,
              fontWeight: "semibold",
            }}
          >
            In stock: {props.item.inStock}
          </Text>

          {props.item.ordered + props.amount >= props.item.inStock && (
            <Text
              style={{
                color: Colors.danger,
                fontSize: 14,
                fontStyle: "italic",
                fontWeight: "semibold",
              }}
            >
              "This item might require approval."
            </Text>
          )}
        </View>
      </View>

      <View
        style={{
          backgroundColor: Colors.white,
          paddingVertical: 7,
          paddingHorizontal: 12,
          borderWidth: 1,
          borderColor: userColor.color,
          borderRadius: 100,
        }}
      >
        <Text
          style={{
            color: Colors.black,
            fontSize: 16,
            fontWeight: "normal",
          }}
        >
          {props.amount}
        </Text>
      </View>
    </View>
  );
};

export default OrderItemCard;
