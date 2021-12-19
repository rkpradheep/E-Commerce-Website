import React from 'react';
import { Navbar, Nav} from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { Component } from 'react';
class Navigation extends Component{
	constructor()
	{
		super()
		this.state={
			GoToAdmin:false
		}
	}
render()
{
	if(this.state.GoToAdmin){
	  return <Redirect to="/admin"/>}

return (
	
	  <div>
		<Navbar bg="dark" variant="dark" className="navbar" expand="lg" fixed='top' style={{zIndex:"1"}}>
		  <Navbar.Toggle aria-controls="basic-navbar-nav" />
		  <Navbar.Collapse id="basic-navbar-nav">
			<Nav >
			 <Nav.Link as={Link} to="/" style={{margin:"1px",margin:"auto"}}>Home</Nav.Link>
			  <Nav.Link as={Link} to="/product" style={{margin:"1px",margin:"auto"}}>Purchase</Nav.Link>
			  <Nav.Link style={{margin:"1px",margin:"auto"}} onClick={()=>{
				  if(window.location.pathname==='/admin')
				  return
				if(localStorage.getItem("admin")){
				 this.setState({"GoToAdmin":true})
				   }
				   else{
				let a=prompt("Enter the password");
				if(a==="admin"){
					window.localStorage.clear()
				localStorage.setItem("admin",true);
				this.setState({"GoToAdmin":true})
			  }
				 else if(a!==null)
				    alert("Wrong password")
			  }}}>Admin</Nav.Link>
			  <Nav.Link as={Link} to="/signup" style={{margin:"1px",margin:"auto"}}>Sign Up</Nav.Link>
			  <Nav.Link href="mailto:infotix@gmail.com" style={{margin:"1px",margin:"auto"}}>Contact us</Nav.Link>

			</Nav>
		  </Navbar.Collapse>

		</Navbar>
	  </div>
	

);
			}
}
export default Navigation;
