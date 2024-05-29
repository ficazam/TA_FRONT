import { Colors } from "@/constants/Colors";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView, Text, View } from "react-native";

interface iSelectorInputProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

const InputSelectorComponent = (props: iSelectorInputProps) => {
  return (
    <SafeAreaView style={{ marginTop: 20 }}>
      <Text
        style={{
          marginBottom: 5,
        }}
      >
        {props.label}
      </Text>

      <View
        style={{
          borderColor: Colors.black,
          borderWidth: 1,
          borderRadius: 18,
        }}
      >
        <Picker selectedValue={props.value} onValueChange={props.onChange}>
          {props.options.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
      </View>
    </SafeAreaView>
  );
};

export default InputSelectorComponent;
