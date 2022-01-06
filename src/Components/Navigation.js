import React from 'react';
import { Navbar, Nav} from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { Component } from 'react';
import styles from "../Styles/navigation.module.css";
class Navigation extends Component{
	constructor(props)
	{
		super()
		this.state={
			GoToAdmin:false,
			PurchaseHistoryVisibility:props.value||localStorage.getItem("admin")?"block":"none",
			Zoom:props.zoom?props.zoom:null
		}
	}
render()
{   
	if(this.state.GoToAdmin){
	  return <Redirect to="/admin"/>}

return (
	
	  <div>
		<Navbar bg="dark" variant="dark" expand="lg" className={styles.Zoom} collapseOnSelect fixed='top' style={{zoom:this.state.Zoom}}>
		  <Navbar.Toggle   />
		  <Navbar.Collapse  >
			<Nav style={{width:"100%"}}>
			 <Nav.Link as={Link} to="/" style={{margin:"1px",margin:"auto",display:(window.location.pathname=="/")?"none":"block"}}>Home</Nav.Link>
			  <Nav.Link as={Link} to="/product" style={{margin:"1px",margin:"auto",display:(window.location.pathname!=="/product"&&localStorage.getItem("admin")===null)?"block":"none"}}>Purchase</Nav.Link>
			  <Nav.Link as={Link} to="/user/accountSettings" style={{margin:"1px",margin:"auto",display:localStorage.getItem("email")!==null && window.location.pathname!=="/user/accountSettings"?"block":"none"}}>Account Settings</Nav.Link>

			  <Nav.Link style={{margin:"1px",margin:"auto",display:window.location.pathname!=="/admin"&&localStorage.getItem("name")===null?"block":"none"}} onClick={()=>{
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
			  <Nav.Link as={Link} to="/signup" style={{margin:"1px",margin:"auto",display:(window.location.pathname!=="/signup")&&(localStorage.getItem("admin")===null&&localStorage.getItem("name")===null)?"block":"none"}}>Sign Up</Nav.Link>
			  <Nav.Link href="mailto:infotix@gmail.com" style={{margin:"1px",margin:"auto"}}>Contact us</Nav.Link>
			  <Nav.Link as={Link} to="/admin/PurchaseHistory" style={{margin:"1px",margin:"auto",display:this.state.PurchaseHistoryVisibility==="block"&&window.location.pathname!=="/admin/PurchaseHistory"?"block":"none"}}>Purchase History</Nav.Link>
			  <Nav.Link as={Link} to="/modifyproducts" style={{margin:"1px",margin:"auto",display:this.state.PurchaseHistoryVisibility==="block"&&window.location.pathname!=="/modifyproducts"?"block":"none"}}>Product Updation</Nav.Link>
			  <Nav.Link as={Link} to="/admin/userManagement" style={{margin:"1px",margin:"auto",display:this.state.PurchaseHistoryVisibility==="block"&&window.location.pathname!=="/admin/userManagement"?"block":"none"}}>User Management</Nav.Link>
			  <Nav.Link as={Link} to="/" onClick={()=>window.localStorage.clear()} style={{margin:"1px",margin:"auto",display:(localStorage.getItem("admin")||localStorage.getItem("name")!==null)?"block":"none"}}>Log out</Nav.Link>


				  
			</Nav>
		  </Navbar.Collapse>

		</Navbar>
	  </div>
	

);
			}
}
export default Navigation;
