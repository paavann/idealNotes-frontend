import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/ApiSlice";




export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: detDefaultMiddleware => 
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})