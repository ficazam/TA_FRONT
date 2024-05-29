import { Item } from "@/core/types/item.type";
import { useUserColor } from "@/hooks/useUserColor";
import { Text, View } from "react-native";

const NewOrderItemCard = (props: { item: Item }) => {
  const { userColor } = useUserColor();
  return (
    <View
      style={{
        display: "flex",
        borderColor: userColor.color,
        borderWidth: 1,
        borderRadius: 18,
        width: "100%",
        height: 125,
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginVertical: 7,
      }}
    >
      <Text>{props.item.name}</Text>
    </View>
  );
};

export default NewOrderItemCard;
