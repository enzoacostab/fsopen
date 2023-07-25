import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {filter(state, action){
        return action.payload
    }
    }
})

export const {filter} = slice.actions
export default slice.reducer