import { Stack } from "expo-router";

const InventoryLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default InventoryLayout;
