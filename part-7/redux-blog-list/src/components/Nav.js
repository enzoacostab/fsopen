import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavB = ({user}) =>{
    return <Navbar collapseOnSelect expand='sm' bg="dark" variant="dark">
    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
    <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto" style={{width:'100%', justifyContent: 'space-between'}}>
            <Nav.Item style={{display:'flex'}}>
            <Nav.Link href='#'>
                <Link style={{textDecoration:'none'}} to={'/'}>Home</Link>
            </Nav.Link>
            <Nav.Link href='#'>
                <Link style={{textDecoration:'none'}} to={'/users'}>Users</Link>
            </Nav.Link>
            </Nav.Item>
            <Nav.Item style={{display:'flex'}}>
                <Nav.Link disabled>{user.username}</Nav.Link>
                <Nav.Link onClick={()=>{window.localStorage.clear(); window.location.reload()}}>Log out</Nav.Link>
            </Nav.Item>
        </Nav>
    </Navbar.Collapse>
  </Navbar>
}

export default NavB