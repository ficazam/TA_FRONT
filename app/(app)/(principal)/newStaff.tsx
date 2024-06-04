import ErrorText from "@/components/Text/ErrorText";
import RoleCard from "@/components/cards/RoleCard";
import ButtonTile from "@/components/input/ButtonTile";
import ImageButton from "@/components/input/ImageButton";
import InputTextComponent from "@/components/input/InputTextComponent";
import UserPageLayout from "@/components/navigation/PageTitleNav";
import { UserRole, staffRoles } from "@/core/enums/user-role.enum";
import { UserStatus } from "@/core/enums/user-status.enum";
import { AddUser, User, emptyUser } from "@/core/types/user.type";
import { newUserValidations } from "@/core/utils";
import { useImagePicker } from "@/hooks/useImagePicker";
import { useAddUserMutation } from "@/store/features/api/user.slice";
import { useAppSelector } from "@/store/hooks";
import { router } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";

const newStaff = () => {
  const { width, height } = Dimensions.get("window");
  const { user } = useAppSelector((state) => state.userState);
  const [addUser] = useAddUserMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const [newStaff, setNewStaff] = useState<User>(emptyUser);
  const [chosenStaffRole, setChosenStaffRole] = useState<number>(0);
  const [newUserError, setNewUserError] = useState<string>("");
  const { images, uploadingImage, openImageTray } =
    useImagePicker("staffImages");

  const handleNewUserSubmit = async () => {
    if (!newUserValidations(newStaff, setNewUserError)) {
      return;
    }

    setLoading(true);

    try {
      const newUser: AddUser = {
        ...newStaff,
        password: process.env.EXPO_PUBLIC_NEW_USER_PASSWORD!,
        role: staffRoles[chosenStaffRole].value,
        schoolId: user.schoolId,
        status: UserStatus.Unverified,
        image: images[0],
      };

      const userItem = await addUser(newUser).unwrap();

      if (userItem) {
        router.push("/(principal)");
      }
    } catch (error: any) {
      setNewUserError(error.description);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserPageLayout title="New Staff Member" route="/(principal)">
      <ErrorText error={newUserError} />

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
        <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
          <ImageButton
            image={images[0]}
            loading={uploadingImage}
            openTray={openImageTray}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            {staffRoles.map((role, index) => (
              <RoleCard
                key={role.value}
                onPress={() => setChosenStaffRole(index)}
                title={role.label}
                isSelected={chosenStaffRole === index}
              />
            ))}
          </View>
          <InputTextComponent
            label="New User's First Name"
            placeholder="John"
            value={newStaff.name}
            onChange={(value: string) =>
              setNewStaff({ ...newStaff, name: value })
            }
          />
          <InputTextComponent
            label="New User's Last Name"
            placeholder="Doe"
            value={newStaff.surname}
            onChange={(value: string) =>
              setNewStaff({ ...newStaff, surname: value })
            }
          />
          <InputTextComponent
            label="User Email"
            placeholder="user@email.com"
            keyboardType="email-address"
            value={newStaff.email}
            onChange={(value: string) =>
              setNewStaff({ ...newStaff, email: value })
            }
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <ButtonTile
        title="Submit Staff Member"
        onPress={handleNewUserSubmit}
        isLoading={loading}
        disabled={loading}
      />
    </UserPageLayout>
  );
};

export default newStaff;
