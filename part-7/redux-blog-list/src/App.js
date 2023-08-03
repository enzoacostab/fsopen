import { useEffect } from 'react'
import Login from './components/Login'
import Home from './components/Home'
import { isLogged } from './reducers/loginReducer'
import {useDispatch, useSelector} from 'react-redux'
import { initializeUsers } from './reducers/userReducer'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import NavB from './components/Nav'
import './App.css'
import { Routes, Route, useMatch } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
  const login = useSelector(state => state.login)
  const matchUser = useMatch('/users/:id')
  const user = matchUser 
  ? users.find(user => user.id === matchUser.params.id)
  : null
  
  const matchBlog = useMatch('/blogs/:id')
  const blog = matchBlog
  ? blogs.find(blog => blog.id === matchBlog.params.id)
  : null

  useEffect(() => {
    dispatch(isLogged())
    dispatch(initializeUsers())
  }, [])
 
  if (login.user){ 
    return <div className='container'>
    <NavB user={login.user}/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/users' element={<Users users={users}/>}/>
      <Route path='/users/:id' element={<User user={user}/>}/>
      <Route path='/blogs/:id' element={<Blog blog={blog} user={login}/>}/>
    </Routes>
    </div>
  }else{
    return <Login/>
  }
}

export default App