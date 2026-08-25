import { apiSlice } from "./apiSlice";

const USERS_URL = "/api/users";

export const usersAdminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      providesTags: ["User"],
    }),
    deleteUserAdmin: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    updateUserAdmin: builder.mutation({
      query: ({ userId, ...data }) => ({
        url: `${USERS_URL}/${userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useDeleteUserAdminMutation,
  useUpdateUserAdminMutation,
} = usersAdminApiSlice;