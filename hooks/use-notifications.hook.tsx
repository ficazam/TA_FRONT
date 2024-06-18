import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import { getToken, deleteToken } from "firebase/messaging";
import { messaging } from "@/store/firebase.config";
import { useUpdateUserMutation } from "@/store/features/api/user.slice";
import { useAppSelector } from "@/store/hooks";

const getMessagingToken = async () => {
  const oldToken = await getToken(messaging);
  await deleteToken(messaging);

  const newToken = await getToken(messaging);

  if (oldToken === newToken) {
    throw new Error("refresh tokens!");
  }

  return newToken;
};

export const useNotifications = () => {
  const { user } = useAppSelector((state) => state.userState);
  const [updateUser] = useUpdateUserMutation();
  const [pushToken, setPushToken] = useState<
    Notifications.ExpoPushToken | undefined
  >();
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    getMessagingToken().then((token) =>
      updateUser({ ...user, notificationToken: token }).unwrap()
    );
    registerForPushNotificationsAsync().then(
      (token) => token && setPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        notification && setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {});

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return { pushToken, notification };
};

const registerForPushNotificationsAsync = async () => {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification");
      return;
    }

    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig!.extra!.eas.projectId,
    });
  } else {
    alert("Must be using a physical device for Push notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
};
