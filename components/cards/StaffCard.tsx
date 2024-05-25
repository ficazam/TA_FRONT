import { Colors } from "@/constants/Colors";
import { User } from "@/core/types/user.type";
import { useUserColor } from "@/hooks/useUserColor";
import { SimpleLineIcons } from "@expo/vector-icons";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from "react-native";

const StaffCard = (props: { user: User }) => {
  const { userColor } = useUserColor();
  return (
    <Pressable
      onPress={() => console.log(props.user.id)}
      style={{
        backgroundColor: userColor.transparentColor,
        borderColor: userColor.color,
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 18,
        width: "100%",
        height: 75,
        paddingVertical: 5,
        paddingHorizontal: 25,
        marginVertical: 7,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <View
          style={{
            backgroundColor: Colors.white,
            padding: 10,
            borderWidth: 1,
            borderColor: userColor.color,
            borderRadius: 100,
            marginRight: 10,
          }}
        >
          {props.user.image ? (
            <Image
              source={props.user.image as ImageSourcePropType}
              resizeMode="contain"
            />
          ) : (
            <SimpleLineIcons name="user" size={24} color={Colors.black} />
          )}
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{
              color: Colors.white,
              fontSize: 22,
              fontWeight: "semibold",
            }}
          >
            {props.user.name} {props.user.surname}
          </Text>
          <Text
            style={{
              color: Colors.white,
              fontSize: 16,
              fontWeight: "normal",
              fontStyle: "italic",
            }}
          >
            {props.user.role}
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: Colors.white,
          paddingVertical: 7,
          paddingHorizontal: 12,
          borderWidth: 1,
          borderColor: userColor.color,
          borderRadius: 100,
        }}
      >
        <Text
          style={{
            color: Colors.black,
            fontSize: 16,
            fontWeight: "normal",
          }}
        >
          {props.user.orders.length}
        </Text>
      </View>
    </Pressable>
  );
};

export default StaffCard;
