import SchoolCard from "@/components/cards/SchoolCard";
import LoadingScreen from "@/components/loading/LoadingScreen";
import UserPageLayout from "@/components/navigation/PageTitleNav";
import { ISchoolInfo } from "@/core/types/school.type";
import { useLazyGetAllSchoolsQuery } from "@/store/features/api/schools.slice";
import { useEffect, useState } from "react";
import { FlatList, ImageSourcePropType, Text, View } from "react-native";

const allSchools = () => {
  const [allSchools, setAllSchools] = useState<ISchoolInfo[]>([]);
  const [getAllSchools, { isLoading: isLoadingSchools }] =
    useLazyGetAllSchoolsQuery();

  useEffect(() => {
    getAllSchools({}).then((schoolsQuery) => {
      if (!schoolsQuery || !schoolsQuery.isSuccess) {
        return;
      }

      setAllSchools(schoolsQuery.data.data);
    });
  }, []);

  return (
    <UserPageLayout title="All Schools" route="/(admin)">
      {isLoadingSchools ? (
        <LoadingScreen />
      ) : (
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            paddingVertical: 10,
          }}
        >
          <FlatList
            data={allSchools}
            renderItem={({ item, index }) => (
              <SchoolCard
                link="/(admin)"
                title={item.name}
                image={item.image}
              />
            )}
          />
        </View>
      )}
    </UserPageLayout>
  );
};

export default allSchools;
