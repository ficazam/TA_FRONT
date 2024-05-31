import { Colors } from "@/constants/Colors";
import { Text, View } from "react-native";

const ErrorText = (props: { error: string }) => {
  return (
    <View style={{ minHeight: 20, marginTop: 50 }}>
      <Text
        style={{
          color: Colors.danger,
          fontSize: 20,
          textAlign: "left",
          fontWeight: "semibold",
        }}
      >
        {props.error}
      </Text>
    </View>
  );
};

export default ErrorText;
