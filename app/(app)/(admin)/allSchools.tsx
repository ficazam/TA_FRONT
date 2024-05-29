import SchoolCard from "@/components/cards/SchoolCard";
import LoadingScreen from "@/components/loading/LoadingScreen";
import UserPageLayout from "@/components/navigation/PageTitleNav";
import { Colors } from "@/constants/Colors";
import { ISchoolInfo } from "@/core/types/school.type";
import { useGetAllSchoolsQuery } from "@/store/features/api/schools.slice";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, ImageSourcePropType, Text, View } from "react-native";

const allSchools = () => {
  const [allSchools, setAllSchools] = useState<ISchoolInfo[]>([]);
  const { data: query } = useGetAllSchoolsQuery({});

  useEffect(() => {
    if (!query || !query.success) {
      return;
    }

    setAllSchools(query.data);
  }, [query]);

  return (
    <UserPageLayout title="All Schools" route="/(principal)">
      {!allSchools.length ? (
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
                image={item.image as ImageSourcePropType}
              />
            )}
          />
        </View>
      )}
    </UserPageLayout>
  );
};

export default allSchools;
