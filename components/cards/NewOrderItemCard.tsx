import { Colors } from "@/constants/Colors";
import { Item } from "@/core/types/item.type";
import { useUserColor } from "@/hooks";
import { SimpleLineIcons } from "@expo/vector-icons";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from "react-native";

interface iNewOrderItemCardProps {
  item: Item;
  amount: number;
  onPressAdd: () => void;
  onPressSubtract: () => void;
}

const NewOrderItemCard = (props: iNewOrderItemCardProps) => {
  const { userColor } = useUserColor();
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        borderBottomColor: userColor.color,
        borderBottomWidth: 1,
        width: "100%",
        height: 125,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 7,
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
        <Text
          style={{
            color: Colors.black,
            fontSize: 18,
            fontStyle: "italic",
            fontWeight: "normal",
          }}
        >
          In stock: {props.item.inStock}
        </Text>

        <Text
          style={{
            color:
              props.item.ordered + props.amount >= props.item.inStock
                ? Colors.danger
                : Colors.black,
            fontSize: 14,
            fontStyle: "italic",
            fontWeight: "semibold",
          }}
        >
          In queue: {props.item.ordered}{" "}
          {props.item.ordered + props.amount >= props.item.inStock &&
            " - This item might cause delays in your order!"}
        </Text>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Pressable onPress={props.onPressSubtract} style={{ padding: 10 }}>
          <SimpleLineIcons name="minus" size={24} color={userColor.color} />
        </Pressable>

        <Text
          style={{
            color:
            props.item.ordered + props.amount >= props.item.inStock ? Colors.danger : Colors.black,
          }}
        >
          {props.amount}
        </Text>

        <Pressable onPress={props.onPressAdd} style={{ padding: 10 }}>
          <SimpleLineIcons name="plus" size={24} color={userColor.color} />
        </Pressable>
      </View>
    </View>
  );
};

export default NewOrderItemCard;
