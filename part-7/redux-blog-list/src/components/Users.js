import { useEffect } from "react"
import { initializeUsers } from "../reducers/userReducer"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Table } from "react-bootstrap"

const Users = ({users}) =>{
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeUsers())    
    }, [])

    return <div>
        <Table>
            <tbody>
            <tr><th/><th>Blogs created</th></tr>
            {users.map(user => <tr key={user.id}><td><Link to={`/users/${user.id}`}>{user.username}</Link></td><td>{user.blogs.length}</td></tr>)}
            </tbody>
        </Table>
    </div>
}

export default Users