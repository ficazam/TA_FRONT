import { AddUser, User } from "@/core/types/user.type";
import { RootState } from "@/store/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersSlice = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_BASE_API,
    prepareHeaders: (headers, { getState }) => {
      const { user: { token } = { token: "" } } = (getState() as RootState)
        .authentication;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
    },
  }),
  endpoints(builder) {
    return {
      addUser: builder.mutation<{ success: boolean }, AddUser>({
        query: (body) => {
          return {
            url: "users",
            method: "POST",
            body: {
              email: body.email,
              password: body.password,
              name: body.name,
              surname: body.surname,
              role: body.role,
              status: body.status,
              schoolId: body.schoolId,
            },
          };
        },
      }),
      updateUser: builder.mutation<{ success: boolean }, Partial<User>>({
        query: (body) => {
          return {
            url: "users",
            method: "PATCH",
            body: body,
          };
        },
      }),
      getAllSchoolUsers: builder.query<
        { success: boolean; data: User[] },
        { schoolId: string }
      >({
        query: ({ schoolId }) => {
          return {
            url: `users/school/${schoolId}`,
            method: "GET",
          };
        },
      }),
      getSingleUser: builder.query<
        { success: boolean; data: User },
        { userId: string }
      >({
        query: ({ userId }) => {
          return {
            url: `users/user/${userId}`,
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useGetAllSchoolUsersQuery,
  useLazyGetAllSchoolUsersQuery,
  useGetSingleUserQuery,
  useLazyGetSingleUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
} = usersSlice;
