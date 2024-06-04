import ErrorText from "@/components/Text/ErrorText";
import ButtonTile from "@/components/input/ButtonTile";
import InputCheckboxComponent from "@/components/input/InputCheckboxComponent";
import InputSelectorComponent from "@/components/input/InputSelectorComponent";
import InputTextComponent from "@/components/input/InputTextComponent";
import LoadingScreen from "@/components/loading/LoadingScreen";
import UserPageLayout from "@/components/navigation/PageTitleNav";
import { Item, emptyItem } from "@/core/types/item.type";
import { newItemValidations } from "@/core/utils";
import {
  useCreateNewItemMutation,
  useLazyGetAllSchoolItemsQuery,
  useLazyGetSingleItemQuery,
  useUpdateItemMutation,
} from "@/store/features/api/items.slice";
import { useAppSelector } from "@/store/hooks";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useImagePicker } from "@/hooks/useImagePicker";
import ImageButton from "@/components/input/ImageButton";

const newItem = () => {
  const { itemId } = useLocalSearchParams();
  const { user } = useAppSelector((state) => state.userState);
  const { width, height } = Dimensions.get("window");
  const [newItem, setNewItem] = useState<Item>(emptyItem);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [itemTypes, setItemTypes] = useState<string[]>([]);
  const [newItemType, setNewItemType] = useState<string>("");

  const { images, uploadingImage, openImageTray } =
    useImagePicker("itemImages");

  const [getItemsQuery, { isLoading: isLoadingItems }] =
    useLazyGetAllSchoolItemsQuery();
  const [getSingleItemQuery, { isLoading: isLoadingSingleItem }] =
    useLazyGetSingleItemQuery();

  const [createNewItem] = useCreateNewItemMutation();
  const [updateItem] = useUpdateItemMutation();

  useEffect(() => {
    if (!itemId) {
      return;
    }

    const setItemId: string = typeof itemId === "object" ? itemId[0] : itemId;

    getSingleItemQuery({ schoolId: user.schoolId!, itemId: setItemId }).then(
      (itemQuery) => {
        if (!itemQuery || !itemQuery.isSuccess) {
          return;
        }

        setNewItem(itemQuery.data.data);
      }
    );
  }, []);

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

    if (!newItemValidations(newItem, setSubmitError)) {
      return;
    }

    setLoading(true);
    try {
      if (itemId) {
        await updateItem(newItem).unwrap();
      } else {
        const item: Partial<Item> = {
          name: newItem.name,
          type: newItem.type === "New..." ? newItemType : newItem.type,
          inStock: newItem.inStock,
          schoolId: user.schoolId!,
          ordered: 0,
          isTemporal: newItem.isTemporal,
          image: images[0] ?? "",
        };

        await createNewItem(item).unwrap();
      }

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
      {isLoadingItems || (isLoadingSingleItem && <LoadingScreen />)}

      {!isLoadingItems && !isLoadingSingleItem && (
        <KeyboardAvoidingView
          enabled
          behavior={Platform.OS === "ios" ? "height" : "padding"}
          keyboardVerticalOffset={275}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: height,
            width: width,
          }}
        >
          <ImageButton
            image={newItem.image ?? images[0]}
            loading={uploadingImage}
            openTray={openImageTray}
          />
          <ScrollView
            scrollEnabled
            showsVerticalScrollIndicator={false}
            style={{ width: "100%", paddingHorizontal: 20 }}
          >
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
