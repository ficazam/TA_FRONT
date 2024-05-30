import { Colors } from "@/constants/Colors";
import { orderIconInformation } from "@/core/constants/order-icons.constant";
import { OrderStatus } from "@/core/enums/order-status.enum";
import { Order } from "@/core/types/order.type";
import { User } from "@/core/types/user.type";
import { useUserColor } from "@/hooks/useUserColor";
import { useAppSelector } from "@/store/hooks";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

interface iOrderCardProps {
  order: Order;
  teacher: User;
}

const OrderCard = (props: iOrderCardProps) => {
  const { user } = useAppSelector((state) => state.userState);
  const { userColor } = useUserColor();
  const orderIcon: any = orderIconInformation.find(
    (icon) => icon.name === props.order.status
  )!;

  return (
    <Link
      asChild
      href={{
        pathname: `(${user.role})/orderDetails/[id]`,
        params: { id: props.order.id },
      }}
    >
      <Pressable
        style={{
          backgroundColor: userColor.transparentColor,
          borderColor: userColor.color,
          borderStyle: "solid",
          borderWidth: 1,
          borderRadius: 18,
          width: "100%",
          height: 125,
          paddingVertical: 5,
          paddingHorizontal: 15,
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
              padding: 10,
              borderRadius: 100,
              marginRight: 10,
            }}
          >
            <SimpleLineIcons
              name={orderIcon.icon}
              size={32}
              color={orderIcon.color}
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            {props.order.status === OrderStatus.Delivered && (
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 22,
                  fontWeight: "semibold",
                }}
              >
                Delivered
              </Text>
            )}

            {props.order.status === OrderStatus.Ordered && (
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 22,
                  fontWeight: "semibold",
                }}
              >
                New Order
              </Text>
            )}

            {(props.order.status === OrderStatus.Denied ||
              props.order.status === OrderStatus.Cancelled) && (
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 22,
                  fontWeight: "semibold",
                }}
              >
                {props.order.status.toUpperCase()}
              </Text>
            )}

            {(props.order.status === OrderStatus.Accepted ||
              props.order.status === OrderStatus.Route) && (
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 22,
                  fontWeight: "semibold",
                }}
              >
                {new Date(props.order.deliveryDate).toDateString()}
              </Text>
            )}

            <Text
              style={{
                color: Colors.white,
                fontSize: 20,
                fontWeight: "normal",
              }}
            >
              Ordered by:{" "}
              {props.teacher
                ? `${props.teacher.name} ${props.teacher.surname}`
                : "User not found"}
            </Text>

            <Text
              style={{
                color: Colors.white,
                fontSize: 16,
                fontWeight: "normal",
                fontStyle: "italic",
              }}
            >
              Ordered on:{" "}
              {new Date(props.order.creationDate).toLocaleDateString()}
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
            {props.order.items.length}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
};

export default OrderCard;
