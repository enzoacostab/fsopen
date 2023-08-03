import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'notification',
    initialState: {msg: '', cls: ''},
    reducers: {changeNotification(state, action){
        return {...state, msg: action.payload}
    },
    changeClass(state, action){
        return {...state, cls: action.payload}
    }
}
})

export const {changeNotification, changeClass} = slice.actions

export const setNotification = (message, status) =>{
    return async dispatch =>{
        dispatch(changeClass(status))
        dispatch(changeNotification(message))
        setTimeout(() => {
            dispatch(changeClass(''))
            dispatch(changeNotification(''))
        }, 2000);
    }
  }

export default slice.reducer