import ErrorText from "@/components/Text/ErrorText";
import ButtonTile from "@/components/input/ButtonTile";
import InputCheckboxComponent from "@/components/input/InputCheckboxComponent";
import InputSelectorComponent from "@/components/input/InputSelectorComponent";
import InputTextComponent from "@/components/input/InputTextComponent";
import LoadingScreen from "@/components/loading/LoadingScreen";
import UserPageLayout from "@/components/navigation/PageTitleNav";
import { Item, emptyItem } from "@/core/types/item.type";
import {
  useCreateNewItemMutation,
  useLazyGetAllSchoolItemsQuery,
} from "@/store/features/api/items.slice";
import { useAppSelector } from "@/store/hooks";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";

const newItem = () => {
  const { user } = useAppSelector((state) => state.userState);
  const { width, height } = Dimensions.get("window");
  const [newItem, setNewItem] = useState<Item>(emptyItem);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [itemTypes, setItemTypes] = useState<string[]>([]);
  const [newItemType, setNewItemType] = useState<string>("");

  const [getItemsQuery, { isLoading: isLoadingItems }] =
    useLazyGetAllSchoolItemsQuery();
  const [createNewItem] = useCreateNewItemMutation();

  useEffect(() => {
    getItemsQuery({ schoolId: user.schoolId! }).then((itemsQuery) => {
      if (!itemsQuery || !itemsQuery.isSuccess) {
        setSubmitError(
          "Something went wrong loading items, please try again later."
        );
        return;
      }

      const allItemTypes: string[] = [];

      itemsQuery.data.data.forEach(
        (item) =>
          !allItemTypes.includes(item.type) && allItemTypes.push(item.type)
      );

      setItemTypes(["Choose an item type...", ...allItemTypes, "New..."]);
    });
  }, []);

  const handleSubmitNewItem = async () => {
    setSubmitError("");
    setLoading(true);
    try {
      const item: Partial<Item> = {
        name: newItem.name,
        type: newItem.type === "New..." ? newItemType : newItem.type,
        inStock: newItem.inStock,
        schoolId: user.schoolId!,
        ordered: 0,
        isTemporal: newItem.isTemporal,
      };

      await createNewItem(item).unwrap();
      router.push("inventory");
    } catch (error: any) {
      console.error(error);
      setSubmitError(error.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserPageLayout title="Add Item to Inventory" route="/inventory">
      <ErrorText error={submitError} />

      {!isLoadingItems && (
        <KeyboardAvoidingView
          enabled
          behavior={Platform.OS === "ios" ? "height" : "padding"}
          keyboardVerticalOffset={275}
          style={{
            display: "flex",
            flexDirection: "column",
            height: height,
            width: width,
            paddingHorizontal: 20,
          }}
        >
          {isLoadingItems && <LoadingScreen />}

          <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
            <InputTextComponent
              label="New Item Name"
              placeholder="New item"
              value={newItem.name}
              onChange={(value) => setNewItem({ ...newItem, name: value })}
            />

            <InputSelectorComponent
              label="Item Type"
              value={newItem.type}
              onChange={(itemValue) =>
                setNewItem({ ...newItem, type: itemValue })
              }
              options={itemTypes}
            />

            {newItem.type === "New..." && (
              <InputTextComponent
                label="New Item Type"
                placeholder="New item type"
                value={newItemType}
                onChange={(value: string) => setNewItemType(value)}
              />
            )}

            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 20,
              }}
            >
              <InputTextComponent
                label="How many?"
                placeholder="0"
                value={newItem.inStock.toString()}
                keyboardType="numeric"
                onChange={(value) =>
                  setNewItem({ ...newItem, inStock: parseInt(value) })
                }
              />

              <InputCheckboxComponent
                label="Temporal item?"
                value={newItem.isTemporal}
                onChange={(value: boolean) =>
                  setNewItem({ ...newItem, isTemporal: value })
                }
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}

      <ButtonTile
        title="Submit New Item"
        onPress={handleSubmitNewItem}
        isLoading={loading}
        disabled={loading}
      />
    </UserPageLayout>
  );
};

export default newItem;
