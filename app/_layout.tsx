import { store } from "@/store/store";
import { Slot } from "expo-router";
import { Provider as StoreProvider } from "react-redux";

const RootLayout = () => {
  return (
    <StoreProvider store={store}>
      <Slot />
    </StoreProvider>
  );
};

export default RootLayout;
