import RNDateTimePicker from "@react-native-community/datetimepicker";
import Button from "./Button";

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
  return (
    <>
      <Button buttonTitle="Delivery date" onPress={() => setOpen(true)} />

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
