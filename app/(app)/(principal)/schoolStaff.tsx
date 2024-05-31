import ErrorText from "@/components/Text/ErrorText";
import StaffCard from "@/components/cards/StaffCard";
import LoadingScreen from "@/components/loading/LoadingScreen";
import UserPageLayout from "@/components/navigation/PageTitleNav";
import { User } from "@/core/types/user.type";
import { useLazyGetAllSchoolUsersQuery } from "@/store/features/api/user.slice";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

const schoolStaff = () => {
  const { user } = useAppSelector((state) => state.userState);
  const [schoolStaff, setSchoolStaff] = useState<User[]>([]);

  const [getSchoolStaff, { isLoading: isLoadingSchoolStaff }] =
    useLazyGetAllSchoolUsersQuery();

  useEffect(() => {
    getSchoolStaff({ schoolId: user.schoolId! }).then((schoolStaffQuery) => {
      if (!schoolStaffQuery || !schoolStaffQuery.isSuccess) {
        return;
      }

      setSchoolStaff(schoolStaffQuery.data.data);
    });
  }, []);

  return (
    <UserPageLayout title="School Staff" route="/mySchool">
      {isLoadingSchoolStaff && <LoadingScreen />}

      {!isLoadingSchoolStaff && !schoolStaff.length && (
        <ErrorText error="No users to display." />
      )}

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
        {!isLoadingSchoolStaff && schoolStaff.length > 0 && (
          <FlatList
            data={schoolStaff}
            renderItem={({ item }) => <StaffCard user={item} />}
          />
        )}
      </View>
    </UserPageLayout>
  );
};

export default schoolStaff;
