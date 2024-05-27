import ErrorText from "@/components/ErrorText";
import NewOrderItemCard from "@/components/cards/NewOrderItemCard";
import LoadingScreen from "@/components/loading/LoadingScreen";
import UserPageLayout from "@/components/navigation/PageTitleNav";
import { Item } from "@/core/types/item.type";
import { useGetAllSchoolItemsQuery } from "@/store/features/api/items.slice";
import { useAppSelector } from "@/store/hooks";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

const NewOrder = () => {
  const { user } = useAppSelector((state) => state.userState);
  const [schoolItems, setSchoolItems] = useState<Item[]>([]);

  const {
    data: itemsQuery,
    isLoading: isLoadingItems,
    isSuccess: isSuccessItems,
  } = useGetAllSchoolItemsQuery({
    schoolId: user.schoolId!,
  });

  useEffect(() => {
    if (!itemsQuery || !itemsQuery.success) {
      return;
    }

    setSchoolItems(itemsQuery.data);
  }, [itemsQuery]);

  return (
    <UserPageLayout title="New Order" route="/(teacher)">
      {isLoadingItems && <LoadingScreen />}

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          marginTop: 20,
          paddingHorizontal: 20,
        }}
      >
        {!isLoadingItems && !isSuccessItems && (
          <ErrorText error="Error loading items." />
        )}

        {isSuccessItems && (
          <FlatList
            data={schoolItems}
            renderItem={({ item }) => <NewOrderItemCard item={item} />}
          />
        )}
      </View>
    </UserPageLayout>
  );
};

export default NewOrder;
