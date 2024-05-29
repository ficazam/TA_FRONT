import { Colors } from "@/constants/Colors";
import { useUserColor } from "@/hooks/useUserColor";
import { Pressable, Text } from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";

interface iDatepickerComponentProps {
  open: boolean;
  date: Date;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

const DatepickerComponent = ({
  open,
  setOpen,
  date,
  setDate,
}: iDatepickerComponentProps) => {
  const { userColor } = useUserColor();
  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        style={{
          height: 50,
          width: 200,
          backgroundColor: userColor.transparentColor,
          borderColor: userColor.color,
          borderWidth: 1,
          borderRadius: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{ color: Colors.white, fontSize: 18, fontWeight: "semibold" }}
        >
          Delivery date
        </Text>
      </Pressable>

      {open && (
        <RNDateTimePicker
          value={date}
          mode="date"
          minimumDate={new Date()}
          onChange={(event, newDate) => {
            newDate && setDate(newDate);
            setOpen(false);
          }}
          onTouchCancel={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default DatepickerComponent;
