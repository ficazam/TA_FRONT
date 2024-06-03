import ErrorText from "@/components/Text/ErrorText";
import ButtonTile from "@/components/input/ButtonTile";
import ImageButton from "@/components/input/ImageButton";
import InputTextComponent from "@/components/input/InputTextComponent";
import UserPageLayout from "@/components/navigation/PageTitleNav";
import { Colors } from "@/constants/Colors";
import {
  UserCreationPasswords,
  emptyPasswords,
} from "@/core/types/passwords.type";
import { ISchoolInfo, emptySchool } from "@/core/types/school.type";
import { AddUser, User, emptyUser } from "@/core/types/user.type";
import { newSchoolValidations } from "@/core/utils";
import { useImagePicker } from "@/hooks/useImagePicker";
import { useCreateNewSchoolMutation } from "@/store/features/api/schools.slice";
import { router } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

const newSchool = () => {
  const { width, height } = Dimensions.get("window");
  const [newSchool, setNewSchool] = useState<ISchoolInfo>(emptySchool);
  const [newPrincipal, setNewPrincipal] = useState<User>(emptyUser);
  const [schoolError, setSchoolError] = useState<string>("");
  const [principalError, setPrincipalError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [createNewSchool] = useCreateNewSchoolMutation();

  const { images, openImageTray, uploadingImage } =
    useImagePicker("schoolImages");

  const handleNewSchoolSubmit = async () => {
    setSchoolError("");
    setPrincipalError("");

    if (
      !newSchoolValidations(
        newSchool,
        newPrincipal,
        setPrincipalError,
        setSchoolError
      )
    ) {
      return;
    }

    setLoading(true);

    try {
      const newUser: AddUser = {
        ...newPrincipal,
        password: process.env.EXPO_PUBLIC_NEW_USER_PASSWORD!,
        image: images[1],
      };

      const school: Partial<ISchoolInfo> = { ...newSchool, image: images[0] };

      await createNewSchool({
        newUser,
        newSchool: school,
      }).unwrap();

      router.push('/(admin)')
    } catch (error: any) {
      setSchoolError(error.description);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserPageLayout title="Add New School" route="/(admin)">
      <ErrorText error={schoolError} />

      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === "ios" ? "height" : "padding"}
        keyboardVerticalOffset={275}
        style={{
          display: "flex",
          flexDirection: "column",
          height: height,
          width: width,
          paddingHorizontal: 30,
        }}
      >
        <ScrollView bounces showsVerticalScrollIndicator={false}>
          <ImageButton
            image={images[0]}
            loading={uploadingImage}
            openTray={openImageTray}
          />
          <InputTextComponent
            label="School Name: "
            value={newSchool.name}
            onChange={(value) =>
              setNewSchool({ ...newSchool, name: value.toString() })
            }
            placeholder="School name"
          />

          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "semibold",
                textAlign: "center",
                color: Colors.black,
              }}
            >
              Principal's Information
            </Text>

            <ErrorText error={principalError} />
            <ImageButton
              image={images[1]}
              loading={uploadingImage}
              openTray={openImageTray}
            />

            <InputTextComponent
              label="Principal's First Name: "
              value={newPrincipal.name}
              onChange={(value) =>
                setNewPrincipal({ ...newPrincipal, name: value })
              }
              placeholder="Name"
            />

            <InputTextComponent
              label="Principal's Last Name: "
              value={newPrincipal.surname}
              onChange={(value) =>
                setNewPrincipal({ ...newPrincipal, surname: value })
              }
              placeholder="Surname"
            />

            <InputTextComponent
              label="Principal's Email: "
              value={newPrincipal.email}
              keyboardType="email-address"
              onChange={(value) =>
                setNewPrincipal({ ...newPrincipal, email: value })
              }
              placeholder="Email"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <ButtonTile
        title="Submit New School"
        onPress={handleNewSchoolSubmit}
        isLoading={loading}
        disabled={loading}
      />
    </UserPageLayout>
  );
};

export default newSchool;
