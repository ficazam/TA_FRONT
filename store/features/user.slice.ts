import { User, emptyUser } from "@/core/types/user.type";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: User;
}

const initialState: UserState = {
  user: emptyUser,
};

export const userState = createSlice({
  name: "userState",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = emptyUser;
    },
  },
});

export const { setUser, clearUser } = userState.actions;
export default userState;
