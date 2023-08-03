
import propTypes from 'prop-types'
import {useSelector} from 'react-redux'
import Notification from "./Notification"
import { Link } from "react-router-dom"
import { Button, Table } from 'react-bootstrap'

const Blogs = ({vis, children}) =>{
  const blogs = useSelector(state => state.blogs)
 
  return <div>
  <Notification/>
  <Table style={{display:vis.val ? 'none': ''} }>
  <tbody>
    <tr><th>Blogs</th></tr>
    {blogs.map(blog =>
      <tr key={blog.id}>
        <td><Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link></td>
      </tr>
    )}
    </tbody>
  </Table>
  <Button onClick={()=>vis.set(true)}>new blog</Button>
  <div style={{display:vis.val ? '': 'none'}}>
    {children}
    <button onClick={()=>vis.set(false)}>cancel</button>
  </div>
</div>
}

Blogs.propTypes = {
  vis: propTypes.object.isRequired,
}

export default Blogs