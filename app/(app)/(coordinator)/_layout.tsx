import { Stack } from "expo-router";

const CoordinatorLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default CoordinatorLayout;
