import { Component } from "react";
import { Link ,Redirect} from "react-router-dom";
import styles from "../Styles/SignUpSignIn.module.css";
import firebase from "../firebase";
class SignUpSignIn extends Component
{
	constructor()
	{super();
		this.state = {
			isLoggedIn: false,
		  };
	
	 }
	 

		     NewUser= ()=>{
				var n=document.getElementById("name").value;
				var p=document.getElementById("password").value;
				var e=document.getElementById("email").value;
				    
				var flag=true;
			      
					firebase.ref("/").child("Users").once("value",(snapshot)=>{
						snapshot.forEach((data)=>{
							var val=data.val();
							if(val.email==e){

							   flag=false;
							   
							}
						
						});
					}).then(()=>{
						if(flag)
						{
							var loginref = firebase.ref("/").child("Users").push({
								name:n,
								email:e,
								password:p,
								}).catch(alert);
								localStorage.setItem("name",n);
								this.setState({isLoggedIn:true});
						}
						else
						alert("Cannot create account, User id with this email already exists!");

					});
						
					

					

				//alert(loginref);
				//return;
				 //localStorage.setItem("name",document.getElementById("name").value);
				
			   }
			   IsValidUser= ()=>{
			    var n;
				var p=document.getElementById("PASSWORD").value;
				var e=document.getElementById("EMAIL").value;
				var flag=false;
			      
					firebase.ref("/").child("Users").once("value",(snapshot)=>{
						snapshot.forEach((data)=>{
							var val=data.val();
							if(val.email==e && val.password==p){
						
                               n=val.name;
							   flag=true;
							   
							}
						
						});
					}).then(()=>{
						if(flag)
						{       
								localStorage.setItem("name",n);
								this.setState({isLoggedIn:true});
						}
						else{
							document.getElementById("PASSWORD").value="";
							document.getElementById("EMAIL").value="";
						alert("Invalid email id or password!");
						}

					});
						
					

					

				//alert(loginref);
				//return;
				 //localStorage.setItem("name",document.getElementById("name").value);
				
			   }
				 
			 
			 

    render(){
		if (this.state.isLoggedIn) 
			return <Redirect to="/product"/>;
       
 return(
	<div className={styles.div}>

	<link rel="stylesheet" href="../Styles/SignUpSignIn.module.css"/>
    <div className={styles.main}>  	

			<div className={styles.signup}>
				<form>
					<label htmlFor="chk" aria-hidden="true" onClick={call} >Sign up</label>
					<input type="text"  id="name" placeholder="User name" Required=""/>
					<input type="email" id="email" placeholder="Email" Required=""/>
					<input type="password" id="password" placeholder="Password" Required=""/>
					<button type="button" onClick={this.NewUser} >Sign up</button>
				</form>
			</div>

			<div className={styles.login} id="loginn">
			      <form>
					<label htmlFor="chk" aria-hidden="true" onClick={call}>Login</label>
					<input type="email" name="email" id="EMAIL" placeholder="Email" Required=""/>
					<input type="password" id="PASSWORD" placeholder="Password" Required=""/>
					<button type="button" onClick={this.IsValidUser}>Login</button>
					</form>
			</div>
	</div>
   </div>
 );
    };
   
       
    
}
function call() {
	if(  document.getElementById("loginn").style.transform=="translateY(-500px)"
	)
	document.getElementById("loginn").style.transform="translateY(-180px)";

   else
   document.getElementById("loginn").style.transform="translateY(-500px)";

}

export default SignUpSignIn;