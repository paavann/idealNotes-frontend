import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";




export const apiSlice = createApi({ //createApi ----> used for creating an api slice for the app(central place where all the api configurations are managed)
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}), //defines the base url for all the api requests
    tagTypes: ['Users', 'Notes'], //placeholders for caching data
    endpoints: builder => ({}) //endpoints where the api operations are mentioned (builder is an object given to us by createApi)
})