import { useQueryClient, useMutation } from "react-query"
import { createAnecdote } from "../requests"
import { useNotiDispatch } from "../notificationContext"

const AnecdoteForm = () => {
  const resetNoti = setTimeout(() => {
    dispatch({type:'CHANGE', payload:''})
  }, 3000)
  const queryClient = useQueryClient()
  const dispatch = useNotiDispatch()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries('anecdotes')
      dispatch({type:'CHANGE', payload: `you added ${newAnecdote.content}`})
      resetNoti()
    },
    onError: (err) => {
      dispatch({type: 'CHANGE', payload: err.response.data.error})
      resetNoti()
    }

  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecdoteMutation.mutate({content, votes: 0})
    
    event.target.anecdote.value = ''
    console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
