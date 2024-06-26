import { Colors } from "@/constants/Colors";
import {
  KeyboardTypeOptions,
  SafeAreaView,
  Text,
  TextInput,
} from "react-native";

interface iTextInputProps {
  label: string;
  value: string;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  isPassword?: boolean;
  onChange: (value: string) => void;
}

const InputTextComponent = (props: iTextInputProps) => {
  return (
    <SafeAreaView style={{ marginTop: 20 }}>
      <Text
        style={{
          marginBottom: 5,
        }}
      >
        {props.label}
      </Text>
      <TextInput
        value={props.value}
        placeholder={props.placeholder}
        onChangeText={props.onChange}
        returnKeyType="next"
        secureTextEntry={props.isPassword ?? false}
        keyboardType={props.keyboardType ?? "default"}
        style={{
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: Colors.black,
          paddingHorizontal: 7,
          paddingVertical: 2,
          minWidth: 250,
          borderRadius: 8,
        }}
      />
    </SafeAreaView>
  );
};

export default InputTextComponent;
