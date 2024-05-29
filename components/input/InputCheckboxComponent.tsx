import Checkbox from "expo-checkbox";
import { SafeAreaView, Text } from "react-native";

interface iCheckboxInputProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

const InputCheckboxComponent = (props: iCheckboxInputProps) => {
  return (
    <SafeAreaView
      style={{
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: 150,
      }}
    >
      <Text
        style={{
          marginBottom: 5,
        }}
      >
        {props.label}
      </Text>

      <Checkbox value={props.value} onValueChange={props.onChange} />
    </SafeAreaView>
  );
};

export default InputCheckboxComponent;
