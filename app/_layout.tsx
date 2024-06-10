import { useNotifications } from "@/hooks";
import { store } from "@/store/store";
import { Slot } from "expo-router";
import { Provider as StoreProvider } from "react-redux";

const RootLayout = () => {
  const { pushToken, notification } = useNotifications();
  return (
    <StoreProvider store={store}>
      <Slot />
    </StoreProvider>
  );
};

export default RootLayout;
