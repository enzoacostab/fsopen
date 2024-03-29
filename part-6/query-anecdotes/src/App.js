import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotiDispatch } from './notificationContext'

const App = () => {
  const dispatch = useNotiDispatch()
  const result = useQuery('anecdotes', getAnecdotes)
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation(updateAnecdote, { 
    onSuccess: (newAnecdote) => {
    const anecdotes = queryClient.getQueryData('anecdotes')
    queryClient.setQueryData('anecdotes', 
    anecdotes.map(anecdote => anecdote.id === newAnecdote.id ? newAnecdote : anecdote))
  }})
  if (result.isLoading){
    return <div>loading data...</div>
  }

  if (result.isError){
    return <div>error: {result.error.message}</div>
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes+1})
    dispatch({type:'CHANGE', payload: `you voted ${anecdote.content}`})
    setTimeout(() => {
      dispatch({type:'CHANGE', payload:''})
    }, 3000);
    console.log('vote')
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
