import { Colors } from "@/constants/Colors";
import { Item } from "@/core/types/item.type";
import { useUserColor } from "@/hooks/useUserColor";
import { SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import ImageCircle from "../parts/ImageCircle";
import { Link } from "expo-router";

interface iInventoryCardProps {
  item: Item;
}

const InventoryCard = (props: iInventoryCardProps) => {
  const { userColor } = useUserColor();
  return (
    <Link
      asChild
      href={{
        pathname: "(inventory)/newItem",
        params: { itemId: props.item.id },
      }}
    >
      <Pressable
        style={{
          backgroundColor: userColor.transparentColor,
          borderColor: userColor.color,
          borderStyle: "solid",
          borderWidth: 1,
          borderRadius: 18,
          width: "100%",
          height: 125,
          paddingVertical: 5,
          paddingHorizontal: 15,
          marginVertical: 7,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ImageCircle image={props.item.image} />

        <View
          style={{
            width: "70%",
            display: "flex",
            flexDirection: "column",
            paddingHorizontal: 10,
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
          </View>
        </View>

        <SimpleLineIcons name="arrow-right" size={18} color={Colors.black} />
      </Pressable>
    </Link>
  );
};

export default InventoryCard;
