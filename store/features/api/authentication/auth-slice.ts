import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase.config";
import {
  AuthenticationError,
  AuthenticationState,
  iAuthParams,
  iAuthenticatedUser,
} from "./core/types";
import { AuthenticationErrorType, AuthenticationStatus } from "./core/enums";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAuthentication = createAsyncThunk<
  iAuthenticatedUser,
  iAuthParams
>("auth/authenticate", async (authParams, { rejectWithValue, dispatch }) => {
  try {
    const { email, password } = authParams;

    const credentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((error) =>
      Promise.reject({
        type: AuthenticationErrorType.InvalidServerResponse,
        description: "Invalid email or password.",
        error,
      })
    );

    const token = await credentials.user.getIdToken(true);

    const response = await fetch(process.env.EXPO_PUBLIC_BASE_API + "/users/login", {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "POST",
    }).catch((error) =>
      Promise.reject({
        type: AuthenticationErrorType.InvalidServerResponse,
        description: "Unable to validate session.",
        error,
      })
    );

    if (!response.ok) {
      return rejectWithValue({
        type: AuthenticationErrorType.InvalidServerResponse,
        description: "Unable to validate session (!response.ok)",
      });
    }

    const { data: user } = await response.json();
    return { ...user, token };
  } catch (error) {
    console.error(error);
    dispatch(reset());
    return rejectWithValue(error);
  }
});

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    isLogged: false,
    status: AuthenticationStatus.Unauthenticated,
  } satisfies AuthenticationState as AuthenticationState,
  reducers: {
    update: (state, action: PayloadAction<Partial<iAuthenticatedUser>>) => {
      if (state.status === AuthenticationStatus.Unauthenticated) {
        return;
      }

      state.user = { ...state.user!, ...action.payload };
    },
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.isLogged = false;
      state.status = AuthenticationStatus.Unauthenticated;
      delete state.error;
      delete state.user;
    },
    reload: (state, action: PayloadAction<Partial<iAuthenticatedUser>>) => {
      if (!state.user) {
        return;
      }

      const token = state.user.token;
      fetch(process.env.EXPO_PUBLIC_BASE_API + "/auth/login", {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        method: "POST",
      })
        .then((response) => {})
        .catch(() =>
          Promise.reject({
            type: AuthenticationErrorType.InvalidServerResponse,
            description: "Unable to validate session.",
          })
        );
    },
    logout: (state) => {
      if (state.status === AuthenticationStatus.Unauthenticated) {
        return;
      }

      if (state.user?.token) {
        fetch(process.env.EXPO_PUBLIC_BASE_API + "/users/logout", {
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            authorization: `Bearer ${state.user!.token}`,
          },
          method: "POST",
        }).catch(console.log);
      }

      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.isLogged = false;
      state.status = AuthenticationStatus.Unauthenticated;
      delete state.error;
      delete state.user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAuthentication.fulfilled, (state, payload) => {
      state.isLoading = state.isError = false;
      state.isSuccess = state.isLogged = true;
      state.user = payload.payload;
      state.status = AuthenticationStatus.Success;
      delete state.error;
    });

    builder.addCase(getAuthentication.pending, (state) => {
      state.isError = state.isSuccess = state.isLogged = false;
      state.isLoading = true;
      state.status = AuthenticationStatus.Loading;
      delete state.user;
      delete state.error;
    });

    builder.addCase(getAuthentication.rejected, (state, payload) => {
      state.isSuccess = state.isLogged = state.isLoading = false;
      state.isError = true;
      state.error = payload.payload as AuthenticationError;
      state.status = AuthenticationStatus.Failed;
      delete state.user;
    });
  },
});

export const { logout, update, reset } = authenticationSlice.actions;
export default authenticationSlice.reducer;
