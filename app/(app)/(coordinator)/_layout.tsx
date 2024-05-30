import { Stack } from "expo-router";

const CoordinatorLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="approvedOrders" options={{ headerShown: false }} />
      <Stack.Screen name="forApproval" options={{ headerShown: false }} />
      <Stack.Screen name="newOrder" options={{ headerShown: false }} />
      <Stack.Screen name="myOrders" options={{ headerShown: false }} />
    </Stack>
  );
};

export default CoordinatorLayout;
