import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [msg, setMsg] = useState('')
  const [visible, setVisible] = useState(false)
  const [auth, setAuth] = useState()


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const us = JSON.parse(loggedUserJSON)
      setUser(us)
      setAuth({headers:{Authorization: `Bearer ${us.token}`}})
    }
  }, [])

  const men=document.getElementById('msg')

  const handleLogin = async(event) => {
    event.preventDefault()
    try {
      const us = await loginService.login({username, password})
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(us)
      ) 
      setUser(us)
      setAuth({headers:{Authorization: `Bearer ${us.token}`}})
      setUsername('')
      setPassword('')
    } catch (err) {
      setMsg('wrong username or password')
      men.classList.add('err')
      setTimeout(() => {
        men.classList.remove('err')
        setMsg('')
      }, 5000);
    }
  }

  const addBlog = async(data) =>{
    try{
      const res=await blogService.create(data, auth)
      setBlogs(blogs.concat(res))
      setMsg(`${data.title} by ${data.author} added`)
      men.classList.add('done')
      setTimeout(() => {
        men.classList.remove('done')
        setMsg('')
      }, 7000);
    }
    catch(err){
      setMsg(err.message)
      men.classList.add('err')
      setTimeout(() => {
        men.classList.remove('err')
        setMsg('')
      }, 5000);
    }
  }
  
  const like = async(data) =>{
    try{
      data.likes++
      await blogService.like(data)
      setMsg('liked')
      men.classList.add('done')
      setTimeout(() => {
        men.classList.remove('done')
        setMsg('')
      }, 5000);
    }
    catch(err){
      setMsg(err.message)
      men.classList.add('err')
      setTimeout(() => {
        men.classList.remove('err')
        setMsg('')
      }, 5000);
    }
  }

  const remove = async(id) => {
    try{
      await blogService.remove(id, auth)
      setBlogs(blogs.filter(e=>e.id!==id))
      setMsg('removed')
      men.classList.add('done')
      setTimeout(() => {
        men.classList.remove('done')
        setMsg('')
      }, 5000);
    }
    catch(err){
      setMsg(err.message)
      men.classList.add('err')
      setTimeout(() => {
        men.classList.remove('err')
        setMsg('')
      }, 5000);
    }
  }
  

  if (user){ 
    return <Blogs remove={remove} like={like} vis={{val:visible, set:setVisible}} msg={msg} user={user} blogs={blogs}>
    <CreateBlog createBlog={addBlog}/></Blogs>
  }else{
    return <Login hand={handleLogin} user={{val:username, set:setUsername}} msg={msg} pass={{val:password, set:setPassword}}/>
  }
}

export default App