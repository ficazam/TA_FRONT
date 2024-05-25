import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userState from "./features/user.slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Persistor, persistReducer, persistStore } from "redux-persist";
import { authenticationSlice } from "./features/api/authentication/auth-slice";
import { schoolSlice } from "./features/api/schools.slice";
import { usersSlice } from "./features/api/user.slice";
import { itemsSlice } from "./features/api/items.slice";
import { orderSlice } from "./features/api/orders.slice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  userState: userState.reducer,
  [authenticationSlice.name]: authenticationSlice.reducer,
  [usersSlice.reducerPath]: usersSlice.reducer,
  [schoolSlice.reducerPath]: schoolSlice.reducer,
  [itemsSlice.reducerPath]: itemsSlice.reducer,
  [orderSlice.reducerPath]: orderSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(schoolSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const persistor: Persistor = persistStore(store);
