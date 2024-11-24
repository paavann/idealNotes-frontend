import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/ApiSlice";




const notesAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})
const initialState = notesAdapter.getInitialState()   //{id: [], {entities: {}}}




export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        getNotes: builder.query({
            query: () => '/notes',

            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            }, //returns 200 and sets any errors to false

            keepUnusedDataFor: 5,

            transformResponse: responseData => {
                const loadedNote = responseData.map(note => {
                    note.id = note._id
                    return note
                });
                return notesAdapter.setAll(initialState, loadedNote)
            }, //transform all note data

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Note', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Note', id }))
                    ]
                } else {
                    return [{ type: 'Note', id: 'LIST' }]
                }
            }
        }),
    }),
})

export const { useGetNotesQuery } = notesApiSlice //creates a custom hook for  use

export const selectnotesResult = notesApiSlice.endpoints.getnotes.select() //var for selecting result

const selectnotesData = createSelector(
    selectnotesResult,
    notesResult => notesResult.data || initialState
) 

export const {
    selectAll: selectAllnotes,
    selectById: selectNotesById,
    selectIds: selectNotesIds
} = notesAdapter.getSelectors(state => selectnotesData(state) || initialState);