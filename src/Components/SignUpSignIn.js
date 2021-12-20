import { Component } from "react";
import { Link ,Redirect} from "react-router-dom";
import styles from "../Styles/SignUpSignIn.module.css";
import firebase from "../firebase";
import Navigation from "./Navigation";
class SignUpSignIn extends Component
{
	constructor()
	{super();
		this.state = {
			isLoggedIn: false,
			admin:false
		  };
	
	 }
	 

		     NewUser= ()=>{
				var n=document.getElementById("name").value;
				var p=document.getElementById("password").value;
				var e=document.getElementById("email").value;
				var c=document.getElementById("cpassword").value;

			  if(p==""||n=="" || e=="" || c=="")
			    {  alert("Please fill all the required field")
					return ;
				}
				else if(c!=p)
				{
					alert("Given password and confirm password don't match")
					return ;
				}
				var flag=true;
			      
					firebase.database().ref("/").child("Users").once("value",(snapshot)=>{
						snapshot.forEach((data)=>{
							var val=data.val();
							if(val.email==e){

							   flag=false;
							   
							}
						
						});
					}).then(()=>{
						if(flag)
						{
							var loginref = firebase.database().ref("/").child("Users").push({
								name:n,
								email:e,
								password:p,
								}).catch(alert);
								window.localStorage.clear();
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
				if(p==""||e=="")
			    {  alert("Please fill all the required field")
					return ;
				}
				var flag=false;
				if(e=="admin@gmail.com" && p=="admin"){
				  this.setState({admin:true})
				}
				else{
			      
					firebase.database().ref("/").child("Users").once("value",(snapshot)=>{
						snapshot.forEach((data)=>{
							var val=data.val();
							if(val.email==e && val.password==p){
						
                               n=val.name;
							   flag=true;
							   
							}
						
						});
					}).then(()=>{
						if(flag)
						{       window.localStorage.clear();

								alert(1)
								this.setState({isLoggedIn:true});
						}
						else{
							document.getElementById("PASSWORD").value="";
							document.getElementById("EMAIL").value="";
					     	alert("Invalid email id or password!");
						}

					});
						
				}

					

				//alert(loginref);
				//return;
				 //localStorage.setItem("name",document.getElementById("name").value);
				
			   }
				 
			 
			 

    render(){
		if (this.state.isLoggedIn || localStorage.getItem("name")!=null) 
			return <Redirect to="/product"/>;
			if(this.state.admin)
			return <Redirect to="/admin"/>;

       
 return(
	 <div>
		<Navigation/>

	<div className={styles.div}>
    <div className={styles.main}>  	

			<div className={styles.signup}>
				<form autoComplete="off" style={{all:"unset"}}>
					<label className={styles.label} htmlFor="chk" aria-hidden="true" onClick={call} >Sign up</label>
					<input className={styles.input} type="text"  id="name" placeholder="User name" Required=""/><br></br>
					<input className={styles.input} type="email" id="email" placeholder="Email" Required=""/><br/>
					<input className={styles.input} type="password" id="password" placeholder="Password" Required=""/><br/>
					<input className={styles.input} type="password" id="cpassword" placeholder="Confirm Password" Required=""/><br/>
					<button className={styles.button} type="button" onClick={this.NewUser} >Sign up</button>
				</form>
			</div>

			<div className={styles.login} id="loginn">
			      <form autoComplete="off" style={{all:"unset"}}>
					<label className={styles.label} htmlFor="chk" aria-hidden="true" onClick={call}>Login</label>
					<input className={styles.input} type="email" name="email" id="EMAIL" placeholder="Email" Required=""/><br/>
					<input className={styles.input} type="password" id="PASSWORD" placeholder="Password" Required=""/><br/>
					<button className={styles.button} type="button" onClick={this.IsValidUser}>Login</button><br/>
					</form>
			</div>
	</div>
   </div>
   </div>

 );
    };
   
       
    
}
function call() {
	if(  document.getElementById("loginn").style.transform=="translateY(-600px)"
	)
	document.getElementById("loginn").style.transform="translateY(-180px)";

   else
   document.getElementById("loginn").style.transform="translateY(-600px)";

}

export default SignUpSignIn;