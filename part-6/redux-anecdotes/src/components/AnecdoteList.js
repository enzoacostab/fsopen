import { useDispatch, useSelector } from "react-redux"
import { voteAnec } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import Filter from "./Filter"

const AnecdoteList = () => {
    const {anecdotes, filter} = useSelector(state => state)
    const dispatch = useDispatch()
    
    const vote = (anecdote) => {
      dispatch(voteAnec(anecdote))
      dispatch(setNotification(`you voted '${anecdote.content}'`, 2))
    }
    return(
        <div>
            <h2>Anecdotes</h2>
            <Filter/>
            {anecdotes.filter(a => a.content.toLowerCase().includes(filter)).sort((a,b)=>b.votes-a.votes).map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
            </div>
            </div>
            )}
        </div>
    )
}

export default AnecdoteList