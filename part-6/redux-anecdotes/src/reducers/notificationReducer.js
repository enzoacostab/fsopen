import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {changeNotification(state, action){
        return action.payload
    }}
})

export const {changeNotification} = slice.actions

export const setNotification = (message, sec) =>{
    return async dispatch =>{
      dispatch(changeNotification(message))
      setTimeout(() => {
        dispatch(changeNotification(''))
      }, sec*1000);
    }
  }

export default slice.reducer