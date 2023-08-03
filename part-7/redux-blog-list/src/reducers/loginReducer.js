import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import { setNotification } from "./notificationReducer";

const slice = createSlice({
    name: 'login',
    initialState: {username: '', password: '', user: '', auth: ''},
    reducers: {setUsername(state, action){  
        return {...state, username: action.payload}
    },
    setPassword(state, action){
        return {...state, password: action.payload}
    },
    setUser(state, action){
        return {...state, user: action.payload}
    },
    setAuth(state, action){
        return {...state, auth: action.payload}
    }
    }
})

export const {setPassword, setUsername, setAuth, setUser} = slice.actions

export const loginRed = (username, password) =>{
    return async dispatch =>{
        try{
            const us = await loginService.login({username, password})
            window.localStorage.setItem('loggedUser', JSON.stringify(us)) 
            dispatch(setUser(us))
            dispatch(setAuth({headers:{Authorization: `Bearer ${us.token}`}}))
            dispatch(setUsername(''))
            dispatch(setPassword(''))
        }
        catch{
            dispatch(setNotification('wrong username or password', 'err'))
        }
    }
  }

export const isLogged = () =>{
    return async dispatch =>{
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const us = JSON.parse(loggedUserJSON)
            dispatch(setUser(us))
            dispatch(setAuth({headers:{Authorization: `Bearer ${us.token}`}}))
        }
    }
}

export default slice.reducer