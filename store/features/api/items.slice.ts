import { Item } from "@/core/types/item.type";
import { RootState } from "@/store/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const itemsSlice = createApi({
  reducerPath: "items",
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
      getAllSchoolItems: builder.query<
        { success: boolean; data: Item[] },
        { schoolId: string }
      >({
        query: ({ schoolId }) => {
          return {
            url: `items/${schoolId}`,
            method: "GET",
          };
        },
      }),
      getSingleItem: builder.query<
        { success: boolean; data: Item },
        { schoolId: string; itemId: string }
      >({
        query: ({ schoolId, itemId }) => {
          return {
            url: `${schoolId}/item/${itemId}`,
            method: "GET",
          };
        },
      }),
      createNewItem: builder.mutation<{ success: boolean }, Partial<Item>>({
        query: (body) => {
          return {
            url: "items",
            method: "POST",
            body,
          };
        },
      }),
      updateItem: builder.mutation<{ success: boolean }, Partial<Item>>({
        query: (body) => {
          return {
            url: "items",
            method: "PATCH",
            body,
          };
        },
      }),
    };
  },
});

export const {
  useGetAllSchoolItemsQuery,
  useLazyGetAllSchoolItemsQuery,
  useGetSingleItemQuery,
  useLazyGetSingleItemQuery,
  useCreateNewItemMutation,
  useUpdateItemMutation,
} = itemsSlice;
