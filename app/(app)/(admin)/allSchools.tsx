import SchoolCard from "@/components/admin/schoolCard/SchoolCard";
import LoadingScreen from "@/components/loading/LoadingScreen";
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
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fcfcfc",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingVertical: 0,
      }}
    >
      <Link
        href={"/(admin)"}
        style={{
          position: "absolute",
          top: 10,
          left: 20,
        }}
      >
        <SimpleLineIcons name="arrow-left" size={24} color="#5F5F5F" />
      </Link>
      <Text style={{ fontSize: 32, fontWeight: "semibold", color: "#5f5f5f" }}>
        View All Schools
      </Text>

      {!allSchools.length ? (
        <LoadingScreen />
      ) : (
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            paddingVertical: 10
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
    </View>
  );
};

export default allSchools;
