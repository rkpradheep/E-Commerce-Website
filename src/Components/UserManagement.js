import { Component } from "react";
import { Link ,Redirect} from "react-router-dom";
import styles from "../Styles/usermanagement.module.css";
import firebase from "../firebase";
import $, { timers } from "jquery";
import Navigation from "./Navigation";
import Load from "./Load";
import {toast} from 'react-toastify'
var usersArr=[];
toast.configure()
class UserManagement extends Component {
    
    constructor()
    {
        super()
        this.state={
            isLoad:false
        }
    }
   
    render(){
        $(document).ready(()=>{this.pp()} )
    return (
        
        <div className={styles.body} >
               {(this.state.isLoad)?<Load/>:null}
                 <Navigation/>
            <br/>
<br/><br/>
<div className={styles.search}> 

<input type="text" style={{height:"60px"}}

                    placeholder=" Search User name"

                    name="search" id="search" onInput={this.modify} autoComplete="off"/> 
                    </div>
<br/><br/>
<div className={styles.users} id="users">
<div style={{margin:"0 0px 1000px 0",marginTop:"0px"}}>
<Load/>
</div>
</div>
</div>
    );
    }
 
      
      pp=()=>{
        let i=0;
        var Ref=firebase.database().ref("/").child("Users");
         Ref.on("value", (snapshot) => {
            usersArr = snapshot.val();
       var usersEl = document.getElementById('users');
       if(usersEl!==null)
       usersEl.innerHTML = usersArr.map(user=>{
        i++;
        let al2=null;
           if(user.addressLine2==="")
              al2="NA";
              else
              al2=user.addressLine2
         return '<div  style="display:flex; justify-content: center; text-align: center; background-color: #CCCCC6;border-radius: 15px; margin-bottom: 35px;margin-right: 5px;height:500px;width:500px ">'+
         '<div>'+
         '<h5  style="display:inline-block;margin-top:10px;" >Name:&nbsp;&nbsp <input style="text-align:center;display:inline-block;margin-left:70px;width:300px;background-color: #ddddd7;border-radius:10px" type=text value="'+user.name+'" id="'+'NAME'+i+'"/></h5><br/>'+
         '<h5  style="display:inline-block;margin-top:10px;" >Email:&nbsp;&nbsp <input style="text-align:center;display:inline-block;margin-left:70px;width:300px;background-color: #ddddd7;border-radius:10px" type=text value="'+user.email+'" disabled id="'+'EMAIL'+i+'"/></h5><br/>'+
         '<h5 style="display:inline-block;margin-top:20px;margin-left:0px">Password: <input style="text-align:center;display:inline-block;margin-left:50px;width:300px;background-color: #ddddd7;border-radius:10px" type=text value="'+user.password+'" id="'+'PASSWORD'+i+'"/></h5></br>'+
         '<h5 style="display:inline-block;margin-top:20px;margin-left:0px">Adress Line 1: <input style="text-align:center;display:inline-block;margin-left:20px;width:300px;background-color: #ddddd7;border-radius:10px" type=text value="'+user.addressLine1+'" id="'+'AL1'+i+'"/></h5><br/>'+
         '<h5 style="display:inline-block;margin-top:20px;margin-left:0px">Adress Line 2: <input style="text-align:center;display:inline-block;margin-left:20px;width:300px;background-color: #ddddd7;border-radius:10px" type=text value="'+al2+'" id="'+'AL2'+i+'"/></h5><br/>'+
         '<h5 style="display:inline-block;margin-top:20px;margin-left:0px">DOB: <input style="text-align:center;display:inline-block;margin-left:100px;width:300px;background-color: #ddddd7;border-radius:10px" type=date value="'+user.dob+'" id="'+'DOB'+i+'"/></h5><br/><br/>'+
        ' <button class="modBtn" id="'+i+'" style="all:unset;width:150px;padding: 5px;border: 1px solid #450264;color: #efd8fa;background: green;border-radius: 5px;font-size: large;cursor: pointer;text-decoration:none;">UPDATE</button><br/><br/>'+
         ' <button class="delBtn" id="'+i+'" style="all:unset;width:150px;padding: 5px;border: 1px solid #450264;color: #efd8fa;background: green;border-radius: 5px;font-size: large;cursor: pointer;text-decoration:none;">DELETE</button>'+
         '</div></div>'
         
         }).join('');
         $(".delBtn").on('click', this.Delete);
         $(".modBtn").on('click', this.Modify);

    
    });
     }

     modify=()=>
     {
        var Ref=firebase.database().ref("/").child("data");
        Ref.once("value", (snapshot) => {
            var productsArr = snapshot.val();
        }
        ).then(()=>{
        let f=false;
        var  usersEl = document.getElementById('users');
        if(usersEl!==null)
         usersEl.innerHTML = usersArr.map(user=>{
         if(user.name.toLowerCase().includes(document.getElementById('search').value.toLowerCase()))
         {
          f=true;    
          let al2=null;
          if(user.addressLine2==="")
             al2="NA";
             else
             al2=user.addressLine2
        return '<div  style="display:flex; justify-content: center; text-align: center; background-color: #CCCCC6;border-radius: 15px; margin-bottom: 35px;margin-right: 5px;height:500px;width:500px ">'+
        '<div>'+
        '<h5  style="display:inline-block;margin-top:10px;" >Name:&nbsp;&nbsp <input style="text-align:center;display:inline-block;margin-left:70px;width:300px;background-color: #ddddd7;border-radius:10px" type=text value="'+user.name+'" id="'+'NAME'+user.key+'"/></h5><br/>'+
        '<h5  style="display:inline-block;margin-top:10px;"  >Email:&nbsp;&nbsp <input disabled style="text-align:center;display:inline-block;margin-left:70px;width:300px;background-color: #ddddd7;border-radius:10px" type=text value="'+user.email+'" id="'+'EMAIL'+user.key+'"/></h5><br/>'+
        '<h5 style="display:inline-block;margin-top:20px;margin-left:0px">Password: <input style="text-align:center;display:inline-block;margin-left:50px;width:300px;background-color: #ddddd7;border-radius:10px" type=text value="'+user.password+'" id="'+'PASSWORD'+user.key+'"/></h5></br>'+
        '<h5 style="display:inline-block;margin-top:20px;margin-left:0px">Adress Line 1: <input style="text-align:center;display:inline-block;margin-left:20px;width:300px;background-color: #ddddd7;border-radius:10px" type=text value="'+user.addressLine1+'" id="'+'AL1'+user.key+'"/></h5><br/>'+
        '<h5 style="display:inline-block;margin-top:20px;margin-left:0px">Adress Line 2: <input style="text-align:center;display:inline-block;margin-left:20px;width:300px;background-color: #ddddd7;border-radius:10px" type=text value="'+al2+'" id="'+'AL2'+user.key+'"/></h5><br/>'+
        '<h5 style="display:inline-block;margin-top:20px;margin-left:0px">DOB: <input style="text-align:center;display:inline-block;margin-left:100px;width:300px;background-color: #ddddd7;border-radius:10px" type=date value="'+user.dob+'" id="'+'DOB'+user.key+'"/></h5><br/><br/>'+
       ' <button class="modBtn" id="'+user.key+'" style="all:unset;width:150px;padding: 5px;border: 1px solid #450264;color: #efd8fa;background: green;border-radius: 5px;font-size: large;cursor: pointer;text-decoration:none;">UPDATE</button><br/><br/>'+
        ' <button class="delBtn" id="'+user.key+'" style="all:unset;width:150px;padding: 5px;border: 1px solid #450264;color: #efd8fa;background: green;border-radius: 5px;font-size: large;cursor: pointer;text-decoration:none;">DELETE</button>'+
        '</div></div>'
         } 
          }).join('');
          $(".delBtn").on('click', this.Delete);
          $(".modBtn").on('click', this.Modify);
  
        if(!f)
        usersEl.innerHTML =`<h2 style="width:500px;color:black;margin:0 0 350px 0px">No result found!</h2>`;
   
     });
     }
     
 Delete=(ID)=>{
     var Confirmation=window.confirm("Do you really want to delete it?");
    if(!Confirmation)
    return;
    firebase.database().ref("/").child("Users").orderByChild("email").equalTo(document.getElementById("EMAIL"+ID.currentTarget.id).value).once("value",(snapshot)=>{
        snapshot.forEach(e=>{ 
        firebase.database().ref("/").child("Users/"+e.key).remove().then(()=>{
            toast("Successfully deleted",{type:"success"})
        });
    });
});
     }
     Modify=(ID)=>{
       
        var Confirmation=window.confirm("Do you really want to update it?");
        if(!Confirmation)
            return;
      this.setState({isLoad:true})
         var name="",email="",password="",al1="",al2="",dob="";
     
        this.setState({isLoad:true})
           name=document.getElementById('NAME'+ID.currentTarget.id).value
           email=document.getElementById('EMAIL'+ID.currentTarget.id).value
           password=document.getElementById('PASSWORD'+ID.currentTarget.id).value
           al1=document.getElementById('AL1'+ID.currentTarget.id).value
           al2=document.getElementById('AL2'+ID.currentTarget.id).value
           dob=document.getElementById('DOB'+ID.currentTarget.id).value

    firebase.database().ref("/").child("Users").orderByChild("email").equalTo(email).once("value",(snapshot)=>{
     
        snapshot.forEach(e=>{ 
        let user={
            name:name,
            email:email,
            password:password,
            addressLine1:al1,
            addressLine2:al2,
            dob:dob,
             }
       firebase.database().ref("/").child("Users/"+e.key).set(user).then(()=>{
           localStorage.setItem("name",name)
           toast("Successfully updated",{type:"success"})
           this.HideLoad()
        
        })
    })  
    })

        
         }
 
         HideLoad=()=>{
            this.setState({isLoad:false})

         }
    
}
export default UserManagement