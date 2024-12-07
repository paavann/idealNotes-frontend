import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/ApiSlice";




const usersAdapter = createEntityAdapter({})
const initialState = usersAdapter.getInitialState()   //{id: [], {entities: {}}}




export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',

            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },//endpoint for getting all users

            keepUnusedDataFor: 5, //keeping unused data for 5 seconds and then discarding it(only for dev)

            transformResponse: responseData => {
                const loadedUser = responseData.map(user => {
                    user.id = user._id
                    return user
                });
                return usersAdapter.setAll(initialState, loadedUser)
            }, //transforms all user data

            provideTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Users', id })) //id => () implicitly returns
                    ]
                } else {
                    return [{ type: 'User', id: 'LIST' }] 
                }
            }
        }),
    }),
})
 //?

export const { useGetUsersQuery } = usersApiSlice //creates a custom hook for  use

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select() //var for selecting result

const selectUsersData = createSelector(
    selectUsersResult,
    UsersResult => UsersResult.data || initialState
) 

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
} = usersAdapter.getSelectors(state => selectUsersData(state) || initialState);