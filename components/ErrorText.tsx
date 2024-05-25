import { Text, View } from "react-native";

const ErrorText = (props: { error: string }) => {
  return (
    <View style={{ minHeight: 20 }}>
      <Text
        style={{
          color: "#ff0000",
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
