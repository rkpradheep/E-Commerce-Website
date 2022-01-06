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
	 onKeyUp=(event)=>{
		if (event.charCode === 13) {
			this.IsValidUser();
		       }
	 }
	 onKeyUp2=(event)=>{
		if (event.charCode === 13) {
			this.NewUser();
		       }
	 }

		     NewUser= ()=>{
				var n=document.getElementById("name").value;
				var p=document.getElementById("password").value;
				var e=document.getElementById("email").value;
				var c=document.getElementById("cpassword").value;
				var al1=document.getElementById("al1").value;
				var al2=document.getElementById("al2").value;
				var dob=document.getElementById("dob").value;


			  if(p==""||n=="" || e=="" || c=="" || al1===""||dob==="")
			    {  toast("Please fill all the required fields",{type:"error"})
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
							document.getElementById("al1").style.display="none";

							document.getElementById("al2").style.display="none";
	 
							document.getElementById("dob").style.display="none";


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
					var al1=document.getElementById("al1").value;
					var al2=document.getElementById("al2").value;
					var dob=document.getElementById("dob").value;
					
				if((document.getElementById("otp").value.length==4))
 				  if(document.getElementById("otp").value===OTPVALUE+"")
					  {
						firebase.database().ref("/").child("Users").once("value",(snapshot)=>{
						 let u={
								name:n,
								email:e,
								addressLine1:al1,
								addressLine2:al2,
								dob:dob,
								password:p,
						 }
						 let user=[]
						if(snapshot.val()!=null)
				          user=snapshot.val();
					       user.push(u)
					   var loginref = firebase.database().ref("/").child("Users").set(user).catch(alert);
						   window.localStorage.clear();
						   localStorage.setItem("name",n);
						   localStorage.setItem("email",e);

						   toast("Congragulation! You are authenticated successfully",{type:"success"});
						   this.setState({isLoggedIn:true});
						});
					  }
					  else
					  {
					   toast("Oops! Account authentication failed.\nTry again later.",{type:"error"});
				       document.getElementById("otp").value=""

					   document.getElementById("otp").style.display="none";
					   document.getElementById("btn").style.display="block";
					   document.getElementById("name").style.display="block";
					   document.getElementById("password").style.display="block";
					   document.getElementById("cpassword").style.display="block";
					   document.getElementById("loginn").style.display="block";
					   document.getElementById("al1").style.display="block";

					   document.getElementById("al2").style.display="block";

					   document.getElementById("dob").style.display="block";

					   document.getElementById("msg").style.display="none";

					   
					   
					  }


					   
				   }



			   IsValidUser= ()=>{
			    var n;
				var p=document.getElementById("PASSWORD").value;
				var e=document.getElementById("EMAIL").value;
				if(p==""||e=="")
				{				
					toast("Please fill all the required fields",{type:"error"});

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
							   localStorage.setItem("email",e);
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
				 
			   ForgotPassword= ()=>{
			 
				var e=prompt("Enter your registered email");
				var flag=false,p="";

				if(e=="")
				{				
				//	toast("Please fill all the required fields",{type:"error"});

					return ;
				}
				else{
			      
					firebase.database().ref("/").child("Users").once("value",(snapshot)=>{
						snapshot.forEach((data)=>{
							var val=data.val();
							if(val.email==e){
						
                               p=val.password;
							   flag=true;
							   
							}
						
						});
					}).then(()=>{
						if(flag)
						{   mail()
							async function mail(){
								const password={
									"data":p
								}
							    const email={
									"data":e
								}
							 
							   const response = await axios.post(
								  "https://7qxuu.sse.codesandbox.io/forgotPassword", {password,email}
							   );
		            	toast("Your password is being sent successfully to your mail. You can later reset your password later in Acoount Settings menu.",{type:"success"});

								}
						}
						else{

					     	toast("Provided email address does not exist",{type:"error"});
						}

					});
						
				}
				
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
				<form autoComplete="off" style={{all:"unset"}} onKeyPress={this.onKeyUp2}>
					<label className={styles.label} htmlFor="chk" aria-hidden="true" onClick={call} >Sign up</label>
					<input className={styles.input} type="text"  id="name" placeholder="User name *" Required=""/><br></br>
					<input className={styles.input} type="email" id="email" placeholder="Email *" Required=""/><br/>
					<input className={styles.input} type="text" id="dob" placeholder="Date of Birth *" onFocus={()=>document.getElementById("dob").type='date'} onBlur={()=>document.getElementById("dob").type='text'}  Required=""/><br/>
					<input className={styles.input} type="text" id="al1" placeholder="Address Line 1 *" Required=""/><br/>
					<input className={styles.input} type="text" id="al2" placeholder="Address Line 2" /><br/>
					<input className={styles.input} type="password" id="password" placeholder="Password *" Required=""/><br/>
					<input className={styles.input} type="text" style={{display:"none"}} onInput={this.Authentication}  id="otp" placeholder="Enter the OTP" Required=""/>
					<input className={styles.input} type="password" id="cpassword" placeholder="Confirm Password *" Required=""/><br/>
                      <p id="msg" style={{isplay:"none",color:"red",display:"none",marginLeft:"10px"}}>NOTE: You may not receive the OTP incase of invalid email is provided.</p>
					<button className={styles.button} type="button" onClick={this.NewUser} id="btn" >Sign up</button>
				</form>
			</div>

			<div className={styles.login} id="loginn">
			      <form style={{all:"unset"}} onKeyPress={this.onKeyUp}>
					<label className={styles.label} htmlFor="chk" aria-hidden="true" onClick={call}>Login</label>
					<input className={styles.input} type="email" name="email" id="EMAIL" placeholder="Email" Required=""/><br/>
					<input className={styles.input} type="password" id="PASSWORD" placeholder="Password" Required=""/><br/>
					<button className={styles.button} type="button" onClick={this.IsValidUser}>Login</button><br/>
					<button className={styles.button} type="button" onClick={this.ForgotPassword}>Forgot Password</button><br/>

					</form>
			</div>
	</div>
   </div>
   </div>

 );
    };
   
       
    
}
function call() {
	if(  document.getElementById("loginn").style.transform=="translateY(-780px)"
	){

	document.getElementById("loginn").style.transform="translateY(-180px)";
	document.getElementById("name").style.opacity="100%"

}

   else{

      document.getElementById("loginn").style.transform="translateY(-780px)";
	  document.getElementById("name").style.opacity="0%"

   }

}

export default SignUpSignIn;