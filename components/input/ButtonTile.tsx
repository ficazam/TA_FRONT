import { useUserColor } from "@/hooks/useUserColor";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

interface iButtonTileProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const ButtonTile = (props: iButtonTileProps) => {
  const { userColor } = useUserColor();

  return (
    <View
      style={{
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: userColor.color,
        bottom: 0,
        height: 100,
        width: "100%",
        borderTopLeftRadius: 96,
        borderTopRightRadius: 96,
      }}
    >
      <Pressable onPress={props.onPress} disabled={props.disabled}>
        {props.isLoading ? (
          <ActivityIndicator size={20} color="#fcfcfc" />
        ) : (
          <Text style={{ fontSize: 32, color: "#fcfcfc" }}>{props.title}</Text>
        )}
      </Pressable>
    </View>
  );
};

export default ButtonTile;
