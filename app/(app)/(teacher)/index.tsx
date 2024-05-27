import Card from "@/components/cards/Card";
import { Colors } from "@/constants/Colors";
import { emptyUser } from "@/core/types/user.type";
import { logout } from "@/store/features/api/authentication/auth-slice";
import { setUser } from "@/store/features/user.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

const TeacherHome = () => {
  const { user } = useAppSelector((state) => state.userState);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      dispatch(logout());
      dispatch(setUser(emptyUser));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        backgroundColor: Colors.white,
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        paddingVertical: 50,
      }}
    >
      <Card
        icon={
          <SimpleLineIcons name="plus" size={24} color={Colors.white} />
        }
        title="New Order"
        link="/newOrder"
      />
      <Card
        icon={<SimpleLineIcons name="organization" size={24} color={Colors.white} />}
        title="My Orders"
        link="/myOrders"
      />
    </View>
  );
};

export default TeacherHome;
