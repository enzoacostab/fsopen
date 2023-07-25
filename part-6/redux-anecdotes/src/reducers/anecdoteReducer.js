import { createSlice } from "@reduxjs/toolkit"
import anecdoteServices from '../services/anecdoteService'

const slice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
  updateAnecdote(state, action){
    return state.map(anec => anec.id===action.payload.id ? action.payload : anec)
  },
  addAnecdote(state, action){
    state.push(action.payload)
  },
  setAnecdotes(state, action) {
    return action.payload
  }
 }
})

export const {addAnecdote, updateAnecdote, setAnecdotes} = slice.actions

export const initializeAnecdotes = () =>{
  return async dispatch =>{
    const anec = await anecdoteServices.getAll()
    dispatch(setAnecdotes(anec))
  }
}

export const createAnecdote = content =>{
  return async dispatch =>{
    const anec = await anecdoteServices.createNew(content)
    dispatch(addAnecdote(anec))
  }
}

export const voteAnec = anecdote =>{
  return async dispatch =>{
    const anec = await anecdoteServices.voteAnecdote(anecdote)
    dispatch(updateAnecdote(anec))
  }
}

export default slice.reducer