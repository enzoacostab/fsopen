import {useDispatch, useSelector} from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const CreateBlog = () =>{
  const dispatch = useDispatch()
  const {auth} = useSelector(state => state.login)

  const addBlog = async(event) =>{
      const data ={title: event.target.title.value,
        author: event.target.author.value,
        url: event.target.url.value,
        likes: event.target.likes.value,
        comments: []
      }
      try{
      dispatch(createBlog(data, auth))
      dispatch(setNotification(`${data.title} by ${data.author} added`, 'done'))
      }
      catch{
      dispatch(setNotification('error', 'err'))
      }
  }

  return <div>
    <h2>create blog</h2>
    <form onSubmit={addBlog}>
      <input id="title" type='text' name="title" placeholder='title'/><br/>
      <input id="author" type='text' name="author" placeholder='author'/><br/>
      <input id="url" type='text' name="url" placeholder='url'/><br/>
      <input id="likes" type='number' name="likes" placeholder='likes'/><br/>
      <input id="create" value='create' type='submit'/>
    </form>
  </div>
}

export default CreateBlog