import {useDispatch, useSelector} from 'react-redux'
import { setPassword, setUsername } from '../reducers/loginReducer'
import { loginRed } from '../reducers/loginReducer'
import Notification from './Notification'
import { Form, Button } from 'react-bootstrap'

const Login = () =>{
  const dispatch = useDispatch()
  const {username, password} = useSelector(state => state.login)

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(loginRed(username, password))
  }
  return <div className='container'>
    <h2>Log in to application</h2>
    <Notification/>
    <Form onSubmit={handleLogin}>
      <Form.Group>
      <Form.Control id='username' type='text' placeholder='username' value={username} onChange={({target}) => dispatch(setUsername((target.value)))}/> 
      <Form.Control id='password' type='password' placeholder='password' value={password} onChange={({target}) => dispatch(setPassword((target.value)))}/>
      <Button variant='primary' id='login' type='submit'>login</Button>
      </Form.Group>
    </Form>
  </div>
}

export default Login