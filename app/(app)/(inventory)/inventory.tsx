import ErrorText from "@/components/ErrorText";
import InventoryCard from "@/components/cards/InventoryCard";
import Button from "@/components/input/Button";
import LoadingScreen from "@/components/loading/LoadingScreen";
import UserPageLayout from "@/components/navigation/PageTitleNav";
import { Colors } from "@/constants/Colors";
import { Item } from "@/core/types/item.type";
import { useUserColor } from "@/hooks/useUserColor";
import { useLazyGetAllSchoolItemsQuery } from "@/store/features/api/items.slice";
import { useAppSelector } from "@/store/hooks";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

const inventory = () => {
  const { user } = useAppSelector((state) => state.userState);
  const { userColor } = useUserColor();
  const [schoolItems, setSchoolItems] = useState<Item[]>([]);
  const [
    getItemsQuery,
    { isLoading: isLoadingItems, isSuccess: isSuccessItems },
  ] = useLazyGetAllSchoolItemsQuery();

  useEffect(() => {
    getItemsQuery({ schoolId: user.schoolId! }).then((itemsQuery) => {
      if (!itemsQuery || !itemsQuery.isSuccess) {
        return;
      }

      setSchoolItems(itemsQuery.data.data);
    });
  }, []);

  return (
    <UserPageLayout title="School Inventory" route="/(inventory)">
      {isLoadingItems && <LoadingScreen />}

      {!isLoadingItems && (
        <Button
          onPress={() => router.push("/newItem")}
          buttonTitle="Add New Item"
        />
      )}

      {!isLoadingItems && !isSuccessItems && (
        <ErrorText error="Error loading items." />
      )}

      {!isLoadingItems && !schoolItems.length && (
        <ErrorText error="No items to show." />
      )}

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginTop: 20,
          paddingHorizontal: 20,
          marginBottom: 100,
        }}
      >
        {isSuccessItems && (
          <FlatList
            data={schoolItems}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <InventoryCard item={item} />}
          />
        )}
      </View>
    </UserPageLayout>
  );
};

export default inventory;
