import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import { removeBlog, updBlog, commentBlog } from '../reducers/blogReducer'
import Notification from './Notification'
import { Button, Form } from 'react-bootstrap'

const Blog = ({blog, user}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const remove = () => {
    try{
      dispatch(removeBlog(blog.id, user.auth))
      dispatch(setNotification('removed', 'done'))
      navigate('/')
    }
    catch(err){
      dispatch(setNotification(err.message, 'err'))
    }
  }

  const like = () =>{
    try{
      dispatch(updBlog({...blog, likes: blog.likes+1}))
      dispatch(setNotification('liked', 'done'))
    }
    catch(err){
      dispatch(setNotification(err.message, 'err'))   
    }
  }

  const comment = (event) =>{
    event.preventDefault()
    try{
      dispatch(commentBlog({...blog, comments: blog.comments.concat(event.target.comment.value)}))
      dispatch(setNotification('commented', 'done'))
    }
    catch(err){
      dispatch(setNotification(err.message, 'err'))   
    }
  }

  if (!blog  || !user) {
    return null
  } 
  return <div>
    <Notification/>
    <h3>{blog.title}</h3>
     <div>
        <p>{blog.url}</p>
        <p>{blog.likes}<Button size='sm' onClick={like}>like</Button></p>
        <p>added by {blog.author}</p>
      </div>
      <Form method='POST' onSubmit={comment}>
      <Form.Group className='row'>
        <div  className='col-sm-9' ><Form.Control type='text' name='comment' placeholder='comment'/></div>
        <Button className='col-sm-3' type='submit' variant='outline-secondary'>send</Button>
      </Form.Group>
      </Form>
      <ul>
        {blog.comments.map((comment, i) => <li key={i}>{comment}</li>)}
      </ul>
      {blog.user.username===user.user.username && <Button variant='danger' onClick={()=>{window.confirm('are you sure?') && remove()}}>remove</Button> }
  </div>
}

export default Blog