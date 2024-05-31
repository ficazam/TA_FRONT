import ErrorText from "@/components/Text/ErrorText";
import ButtonTile from "@/components/input/ButtonTile";
import InputTextComponent from "@/components/input/InputTextComponent";
import UserPageLayout from "@/components/navigation/PageTitleNav";
import { Colors } from "@/constants/Colors";
import {
  UserCreationPasswords,
  emptyPasswords,
} from "@/core/types/passwords.type";
import { ISchoolInfo, emptySchool } from "@/core/types/school.type";
import { AddUser, User, emptyUser } from "@/core/types/user.type";
import { useCreateNewSchoolMutation } from "@/store/features/api/schools.slice";
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
  const [passwords, setPasswords] =
    useState<UserCreationPasswords>(emptyPasswords);
  const [schoolError, setSchoolError] = useState<string>("");
  const [principalError, setPrincipalError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [createNewSchool] = useCreateNewSchoolMutation();

  const runValidations = () => {
    if (newSchool.name.length < 2) {
      setSchoolError("Please enter a school name!");
      return false;
    }

    if (
      newPrincipal.name.length < 2 ||
      newPrincipal.status.length < 2 ||
      newPrincipal.email.length < 2 ||
      passwords.password === "" ||
      passwords.confirmPassword === ""
    ) {
      setPrincipalError("Please complete all fields before submitting.");
      return false;
    }

    if (
      !newPrincipal.email.includes("@") ||
      !newPrincipal.email.includes(".") ||
      newPrincipal.email.split("@")[1].length < 2 ||
      newPrincipal.email.split(".")[1].length < 2
    ) {
      setPrincipalError("Please enter a valid email!");
      return false;
    }

    if (passwords.password.length <= 5) {
      setPrincipalError(
        "Please enter a stronger password. Passwords must be longer than 5 characters."
      );
      return false;
    }

    if (passwords.password !== passwords.confirmPassword) {
      setPrincipalError("Passwords don't match!");
      return false;
    }

    return true;
  };

  const handleNewSchoolSubmit = async () => {
    setSchoolError("");
    setPrincipalError("");

    if (!runValidations()) {
      return;
    }

    setLoading(true);

    try {
      const newUser: AddUser = {
        ...newPrincipal,
        password: passwords.password,
      };

      await createNewSchool({
        newUser,
        newSchool,
      }).unwrap();
    } catch (error: any) {
      setSchoolError(error.description);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserPageLayout title="Add New School" route="/(principal)">
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
        <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
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

            <InputTextComponent
              label="Principal's Password: "
              value={passwords.password}
              onChange={(value) =>
                setPasswords({ ...passwords, password: value })
              }
              isPassword
              placeholder=""
            />

            <InputTextComponent
              label="Confirm Principal's Password: "
              value={passwords.confirmPassword}
              onChange={(value) =>
                setPasswords({ ...passwords, confirmPassword: value })
              }
              isPassword
              placeholder=""
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
