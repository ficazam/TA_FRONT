import { FlatList, View } from "react-native";
import DatepickerComponent from "../input/DatepickerComponent";
import NewOrderItemCard from "../cards/NewOrderItemCard";
import ButtonTile from "../input/ButtonTile";
import LoadingScreen from "../loading/LoadingScreen";
import ErrorText from "../Text/ErrorText";
import { Item } from "@/core/types/item.type";
import { OrderItem } from "@/core/types/order-item.type";

interface iNewOrderFormProps {
  loading: boolean;
  isLoadingItems: boolean;
  submitError: string;
  dateModalOpen: boolean;
  setDateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deliveryDate: Date;
  setDeliveryDate: React.Dispatch<React.SetStateAction<Date>>;
  schoolItems: Item[];
  orderItems: OrderItem[];
  handleAddItemToOrder: (itemId: string) => void;
  handleRemoveItemFromOrder: (itemId: string) => void;
  handleSubmitOrder: () => void;
}

const NewOrderForm = (props: iNewOrderFormProps) => {
  return (
    <>
      {props.isLoadingItems && <LoadingScreen />}

      {!props.isLoadingItems && (
        <DatepickerComponent
          open={props.dateModalOpen}
          setOpen={props.setDateModalOpen}
          date={props.deliveryDate}
          setDate={props.setDeliveryDate}
        />
      )}

      {!props.isLoadingItems && props.submitError && (
        <ErrorText error={props.submitError} />
      )}

      {!props.isLoadingItems && props.schoolItems.length <= 0 && (
        <ErrorText error="Error loading items." />
      )}

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginTop: 20,
          paddingHorizontal: 20,
          marginBottom: 250,
        }}
      >
        {props.schoolItems.length > 0 && (
          <FlatList
            data={props.schoolItems}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <NewOrderItemCard
                item={item}
                amount={
                  props.orderItems.find(
                    (orderedItem) => orderedItem.itemId === item.id
                  )
                    ? props.orderItems.find(
                        (orderedItem) => orderedItem.itemId === item.id
                      )!.amount
                    : 0
                }
                onPressAdd={() => props.handleAddItemToOrder(item.id)}
                onPressSubtract={() => props.handleRemoveItemFromOrder(item.id)}
              />
            )}
          />
        )}
      </View>

      <ButtonTile
        title="Submit Order"
        onPress={props.handleSubmitOrder}
        isLoading={props.loading}
        disabled={props.loading || props.orderItems.length === 0}
      />
    </>
  );
};

export default NewOrderForm;
