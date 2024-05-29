import { Stack } from "expo-router";

const InventoryLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="inventory" options={{ headerShown: false }} />
      <Stack.Screen name="orders" options={{ headerShown: false }} />
      <Stack.Screen name="newItem" options={{ headerShown: false }} />
    </Stack>
  );
};

export default InventoryLayout;
