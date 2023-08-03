import { useState, useEffect } from 'react'
import Blogs from '../components/Blogs'
import CreateBlog from '../components/CreateBlog'
import {useDispatch} from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'

const Home = () => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

    return <Blogs vis={{val:visible, set:setVisible}}>
    <CreateBlog/></Blogs>
}

export default Home