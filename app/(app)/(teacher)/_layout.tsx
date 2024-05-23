import { Stack } from "expo-router";

const TeacherHome = () => {
  return (
    <Stack>
      <Stack.Screen name="teacherHome" options={{ headerShown: false }} />
    </Stack>
  );
};

export default TeacherHome;
