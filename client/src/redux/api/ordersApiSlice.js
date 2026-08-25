import { apiSlice } from "./apiSlice";

const ORDERS_URL = "/api/orders";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: order,
      }),
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
      }),
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/myorders`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
      providesTags: ["Order"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `${ORDERS_URL}/${orderId}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
} = ordersApiSlice;