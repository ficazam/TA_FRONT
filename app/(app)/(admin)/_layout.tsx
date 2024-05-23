import { Stack } from "expo-router";

const AdminLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AdminLayout;
