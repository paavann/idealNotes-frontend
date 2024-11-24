import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/ApiSlice";




export const store = configureStore({
    reducer: { //reducer is a function which takes two input(state, action) and returns the state without altering the previous state 
        [apiSlice.reducerPath]: apiSlice.reducer //[] -----> for not turning it into a string.
    }, //default api. contains all the api related info
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})