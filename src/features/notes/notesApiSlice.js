import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/ApiSlice";




const notesAdapter = createEntityAdapter({})
const initialState = notesAdapter.getInitialState()   //{id: [], {entities: {}}}




export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getnotes: builder.query({
            query: () => '/notes'
        }),  //endpoint for getting all notes
        validateStatus: (response, result) => {
            return response.status === 200 && !result.isError
        }, //returns 200 and sets any errors to false 
    keepUnusedDataFor: 5, //keeping unused data for 5 seconds and then discarding it(only for dev)
    transformResponse: responseData => {
        const loadedNotes = responseData.map(Notes => {
            Notes.id = Notes._id
            return Notes
        })
        return notesAdapter.setAll(initialState, loadedNotes)
    }
    }), //transforms all Notes data
    provideTags: (result, error, arg) => {
        if (result?.ids) {
            return [
                { type: 'Notes', id: 'LIST' },
                ...result.ids.map(id => { type: 'notes', id })
            ]
        } else return { type: 'Notes', id: 'LIST' }
    }
}) //?

export const { useGetnotesQuery } = notesApiSlice //creates a custom hook for  use

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