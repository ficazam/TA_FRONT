import ButtonTile from "@/components/input/ButtonTile";
import InputTextComponent from "@/components/input/TextInput";
import {
  UserCreationPasswords,
  emptyPasswords,
} from "@/core/types/passwords.type";
import { ISchoolInfo, emptySchool } from "@/core/types/school.type";
import { AddUser, User, emptyUser } from "@/core/types/user.type";
import { useCreateNewSchoolMutation } from "@/store/features/api/schools.slice";
import { useAppDispatch } from "@/store/hooks";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
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
  const dispatch = useAppDispatch();
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
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fcfcfc",
        justifyContent: "flex-start",
        alignItems: "center",
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
        Add New School
      </Text>

      <View style={{ minHeight: 20 }}>
        <Text
          style={{
            color: "#ff0000",
            textAlign: "left",
            fontWeight: "semibold",
          }}
        >
          {schoolError}
        </Text>
      </View>

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
                color: "#5f5f5f",
              }}
            >
              Principal's Information
            </Text>

            <View style={{ minHeight: 20 }}>
              <Text
                style={{
                  color: "#ff0000",
                  textAlign: "center",
                  fontWeight: "semibold",
                }}
              >
                {principalError}
              </Text>
            </View>

            <View style={{ marginTop: 20 }}>
              <InputTextComponent
                label="Principal's First Name: "
                value={newPrincipal.name}
                onChange={(value) =>
                  //@ts-ignore
                  setNewPrincipal({ ...newPrincipal, name: value })
                }
                placeholder="Name"
              />
            </View>

            <View style={{ marginTop: 20 }}>
              <InputTextComponent
                label="Principal's Last Name: "
                value={newPrincipal.surname}
                onChange={(value) =>
                  //@ts-ignore
                  setNewPrincipal({ ...newPrincipal, surname: value })
                }
                placeholder="Surname"
              />
            </View>

            <View style={{ marginTop: 20 }}>
              <InputTextComponent
                label="Principal's Email: "
                value={newPrincipal.email}
                onChange={(value) =>
                  //@ts-ignore
                  setNewPrincipal({ ...newPrincipal, email: value })
                }
                placeholder="Email"
              />
            </View>

            <View style={{ marginTop: 20 }}>
              <InputTextComponent
                label="Principal's Password: "
                value={passwords.password}
                onChange={(value) =>
                  //@ts-ignore
                  setPasswords({ ...passwords, password: value })
                }
                isPassword
                placeholder=""
              />
            </View>

            <View style={{ marginTop: 20 }}>
              <InputTextComponent
                label="Confirm Principal's Password: "
                value={passwords.confirmPassword}
                onChange={(value) =>
                  //@ts-ignore
                  setPasswords({ ...passwords, confirmPassword: value })
                }
                isPassword
                placeholder=""
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <ButtonTile
        title="Submit New School"
        onPress={handleNewSchoolSubmit}
        isLoading={loading}
        disabled={loading}
      />
    </View>
  );
};

export default newSchool;
