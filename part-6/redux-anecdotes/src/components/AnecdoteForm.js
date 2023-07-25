import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const add = async(event) => {
        event.preventDefault()
        dispatch(createAnecdote(event.target.anecdote.value)) 
        dispatch(setNotification(`you added '${event.target.anecdote.value}'`, 2))
       
    }

    return(
    <div>
        <h2>create new</h2>
        <form onSubmit={add}>
            <div><input type='text' name='anecdote'/></div>
            <button type='submit'>create</button>
        </form>
    </div>)
}

export default AnecdoteForm