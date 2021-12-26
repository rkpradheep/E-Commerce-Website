import { Component } from "react";
import { Link ,Redirect} from "react-router-dom";
import styles from "../Styles/SignUpSignIn.module.css";
import firebase from "../firebase";
import Navigation from "./Navigation";
import axios from "axios";
import { toast } from "react-toastify";
toast.configure();
var OTPVALUE="";
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
			    {  toast("Please fill all the required field",{type:"error"})
					return ;
				}
				else if(c!=p)
				{
					toast("Given password and confirm password don't match",{type:"error"})
					return ;
				}
				else if(c.length<8)
				{
					toast("Your password must contain atleast 8 characters.",{type:"error"});
					return;
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
                                  
							document.getElementById("otp").style.display="block";
							document.getElementById("btn").style.display="none";
							document.getElementById("name").style.display="none";
							document.getElementById("password").style.display="none";
							document.getElementById("cpassword").style.display="none";
							document.getElementById("loginn").style.display="none";
							document.getElementById("msg").style.display="block";


							var otp=Math.floor(Math.random()*(9999-1000))+1000;
					const email={
							"data":e
							}
						   const OTP={
							   "data":otp
						   }

						   toast("OTP sent to your mail for account verification process. Please check the mail.",{type:"success"});  
						   const response =  axios.post(
							  "https://7qxuu.sse.codesandbox.io/auth", {OTP,email}
						   ); 
						    OTPVALUE=otp;
							this.Authentication();


						}
						else
						toast("Cannot create account, User id with this email already exists!",{type:"error"});

					});
						
					

					

				//alert(loginref);
				//return;
				 //localStorage.setItem("name",document.getElementById("name").value);
				
			   }


			   	Authentication=()=>{

					var n=document.getElementById("name").value;
					var p=document.getElementById("password").value;
					var e=document.getElementById("email").value;
					
				if((document.getElementById("otp").value.length==4))
 				  if(document.getElementById("otp").value===OTPVALUE+"")
					  {
					   var loginref = firebase.database().ref("/").child("Users").push({
						   name:n,
						   email:e,
						   password:p,
						   }).catch(alert);
						   window.localStorage.clear();
						   localStorage.setItem("name",n);
						   toast("Congragulation! You are authenticated successfully",{type:"success"});
						   this.setState({isLoggedIn:true});
					  }
					  else
					  {
					   toast("Oops! Account authentication failed.\nTry again later.",{type:"error"});
					   document.getElementById("otp").style.display="none";
					   document.getElementById("btn").style.display="block";
					   document.getElementById("name").style.display="block";
					   document.getElementById("password").style.display="block";
					   document.getElementById("cpassword").style.display="block";
					   document.getElementById("loginn").style.display="block";
					   document.getElementById("msg").style.display="none";

					   
					   
					  }


					   
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
							   localStorage.setItem("name",n);
								this.setState({isLoggedIn:true});
						}
						else{
							document.getElementById("PASSWORD").value="";
							document.getElementById("EMAIL").value="";
					     	toast("Invalid email id or password!",{type:"error"});
						}

					});
						
				}

					

				//alert(loginref);
				//return;
				 //localStorage.setItem("name",document.getElementById("name").value);
				
			   }
				 
			 
			 

    render(){
		if (this.state.isLoggedIn || localStorage.getItem("name")!=null){ 
			return <Redirect to="/product"/>;
		}
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
					<input className={styles.input} type="text" style={{display:"none"}} onInput={this.Authentication}  id="otp" placeholder="Enter the OTP" Required=""/>
					<input className={styles.input} type="password" id="cpassword" placeholder="Confirm Password" Required=""/><br/>
                      <p id="msg" style={{isplay:"none",color:"red",display:"none"}}>NOTE: You may not receive the OTP incase of invalid email is provided.</p>
					<button className={styles.button} type="button" onClick={this.NewUser} id="btn" >Sign up</button>
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