import { Stack } from "expo-router";

const TeacherHome = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default TeacherHome;
