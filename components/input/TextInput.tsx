import { SetStateAction } from "react";
import { SafeAreaView, Text, TextInput } from "react-native";

interface iTextInputProps {
  label: string;
  value: string;
  placeholder: string;
  isPassword?: boolean;
  onChange: React.Dispatch<SetStateAction<string>>;
}

const InputTextComponent = (props: iTextInputProps) => {
  return (
    <SafeAreaView>
      <Text
        style={{
          marginVertical: 5,
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
        style={{
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "#5f5f5f",
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
