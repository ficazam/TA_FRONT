import { Order } from "@/core/types/order.type";
import { RootState } from "@/store/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderSlice = createApi({
  reducerPath: "orders",
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
      getAllSchoolOrders: builder.query<
        { success: boolean; data: Order[] },
        { schoolId: string }
      >({
        query: ({ schoolId }) => {
          return {
            url: `/orders/${schoolId}`,
            method: "GET",
          };
        },
      }),
      getAllTeacherOrders: builder.query<
        { success: boolean; data: Order[] },
        { schoolId: string; teacherId: string }
      >({
        query: ({ schoolId, teacherId }) => {
          return {
            url: `orders/${schoolId}/teacher/${teacherId}`,
            method: "GET",
          };
        },
      }),
      getSingleOrder: builder.query<
        { success: boolean; data: Order },
        { schoolId: string; orderId: string }
      >({
        query: ({ schoolId, orderId }) => {
          return {
            url: `orders/${schoolId}/order/${orderId}`,
            method: "GET",
          };
        },
      }),
      createNewOrder: builder.mutation<{ success: boolean }, Partial<Order>>({
        query: (body) => {
          return {
            url: "orders",
            method: "POST",
            body,
          };
        },
      }),
      updateNewOrder: builder.mutation<{ success: boolean }, Partial<Order>>({
        query: (body) => {
          return {
            url: "orders",
            method: "PATCH",
            body,
          };
        },
      }),
    };
  },
});

export const {
  useGetAllSchoolOrdersQuery,
  useLazyGetAllSchoolOrdersQuery,
  useGetAllTeacherOrdersQuery,
  useLazyGetAllTeacherOrdersQuery,
  useGetSingleOrderQuery,
  useLazyGetSingleOrderQuery,
  useCreateNewOrderMutation,
  useUpdateNewOrderMutation,
} = orderSlice;
