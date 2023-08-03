import { createSlice } from "@reduxjs/toolkit";
import users from '../services/users'

const slice = createSlice({
    name: 'user',
    initialState: [],
    reducers: {setUsers(state, action){
        return action.payload
    }}
})

export const {setUsers} = slice.actions

export const initializeUsers = () =>{
    return async dispatch =>{
        const usrs = await users.getAll()
        dispatch(setUsers(usrs))
    }
}


export default slice.reducer