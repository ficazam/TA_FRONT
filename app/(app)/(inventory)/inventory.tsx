import ErrorText from "@/components/Text/ErrorText";
import InventoryCard from "@/components/cards/InventoryCard";
import Button from "@/components/input/Button";
import LoadingScreen from "@/components/loading/LoadingScreen";
import UserPageLayout from "@/components/navigation/PageTitleNav";
import { Item } from "@/core/types/item.type";
import { useLazyGetAllSchoolItemsQuery } from "@/store/features/api/items.slice";
import { useAppSelector } from "@/store/hooks";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

const inventory = () => {
  const { user } = useAppSelector((state) => state.userState);
  const [schoolItems, setSchoolItems] = useState<Item[]>([]);
  const [getItemsQuery, { isLoading: isLoadingItems }] =
    useLazyGetAllSchoolItemsQuery();

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
        {schoolItems.length > 0 && (
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
