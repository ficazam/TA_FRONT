import { ISchoolInfo } from "@/core/types/school.type";
import { User } from "@/core/types/user.type";
import { RootState } from "@/store/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const schoolSlice = createApi({
  reducerPath: "schools",
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
      getAllSchools: builder.query({
        query: () => {
          return {
            url: "schools",
            method: "GET",
          };
        },
      }),
      getSingleSchool: builder.query<
        { success: boolean },
        { schoolId: ISchoolInfo }
      >({
        query: ({ schoolId }) => {
          return {
            url: `${schoolId}`,
            method: "GET",
          };
        },
      }),
      createNewSchool: builder.mutation<
        { success: boolean },
        { newUser: Partial<User>; newSchool: Partial<ISchoolInfo> }
      >({
        query: (body) => {
          return {
            url: "schools",
            method: "POST",
            body,
          };
        },
      }),
      updateSchool: builder.mutation<
        { success: boolean },
        Partial<ISchoolInfo>
      >({
        query: (body) => {
          return {
            url: "schools",
            method: "PATCH",
            body,
          };
        },
      }),
    };
  },
});

export const {
  useGetAllSchoolsQuery,
  useLazyGetAllSchoolsQuery,
  useGetSingleSchoolQuery,
  useLazyGetSingleSchoolQuery,
  useCreateNewSchoolMutation,
  useUpdateSchoolMutation,
} = schoolSlice;
