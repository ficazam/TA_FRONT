import { Colors } from "@/constants/Colors";
import { Item } from "@/core/types/item.type";
import { useUserColor } from "@/hooks/useUserColor";
import { SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from "react-native";

interface iInventoryCardProps {
  item: Item;
}

const InventoryCard = (props: iInventoryCardProps) => {
  const { userColor } = useUserColor();
  return (
    <Pressable
      onPress={() => console.log(props.item.id)}
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
      <View
        style={{
          backgroundColor: Colors.white,
          padding: 10,
          borderWidth: 1,
          borderColor: userColor.color,
          borderRadius: 100,
        }}
      >
        {props.item.image ? (
          <Image
            source={props.item.image as ImageSourcePropType}
            resizeMode="contain"
          />
        ) : (
          <SimpleLineIcons name="ghost" size={32} color={Colors.black} />
        )}
      </View>

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
  );
};

export default InventoryCard;
