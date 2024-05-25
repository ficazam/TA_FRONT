import StaffCard from "@/components/cards/StaffCard";
import LoadingScreen from "@/components/loading/LoadingScreen";
import UserPageLayout from "@/components/navigation/PageTitleNav";
import { User } from "@/core/types/user.type";
import { useGetAllSchoolUsersQuery } from "@/store/features/api/user.slice";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

const schoolStaff = () => {
  const { user } = useAppSelector((state) => state.userState);
  const { data } = useGetAllSchoolUsersQuery({ schoolId: user.schoolId! });
  const [schoolStaff, setSchoolStaff] = useState<User[]>([]);

  useEffect(() => {
    if (!data || !data.success) {
      return;
    }

    setSchoolStaff(data.data);
  }, [data]);

  return (
    <UserPageLayout title="School Staff" route="/mySchool">
      {!schoolStaff.length ? (
        <LoadingScreen />
      ) : (
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
          <FlatList
            data={schoolStaff}
            renderItem={({ item, index }) => <StaffCard user={item} />}
          />
        </View>
      )}
    </UserPageLayout>
  );
};

export default schoolStaff;
