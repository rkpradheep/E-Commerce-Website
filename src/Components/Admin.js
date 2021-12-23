import { Component } from "react/cjs/react.production.min";
import firebase from "../firebase";
import styles from "../Styles/admin.module.css";
import { Redirect,Link } from "react-router-dom";
import logoutIcon from "../logout.png"
import Navigation from "./Navigation";
import { Button }  from "react-bootstrap";
import Load from "./Load";
class Admin extends Component{
  constructor()
  {
    super()
    this.state={
      modify:false,
      isLoggedIn:true,
      isLoad:false
    }
  }
  LogOut=(e)=>{
      window.localStorage.clear();
      this.setState({isLoggedIn:false});
  }
  Modify=()=>{
    this.setState({modify:true})
  }
   Remove=()=>{
    document.getElementById("product_image").style.backgroundColor="#303245"
    document.getElementById("pH").style.color="#65657b"
    document.getElementById("pH").innerText="Product Image"
    document.getElementById("product_image").value=""
   }

  isSelected=()=>{
    if(document.getElementById("product_image").files!=null){
      document.getElementById("product_image").style.backgroundColor="green"
      document.getElementById("pH").style.color="black"
      document.getElementById("pH").innerText="Image selected"
    }
  }
  
    AddProduct=(e)=>{
      e.preventDefault()
  var myfile=document.querySelector("#product_image").files[0],url=null,fname=null,progress=0;

   if(myfile!=null)
   {
  document.getElementById("progress").style.display="block";	
  document.getElementById("add").style.display="none";	
   this.setState({isLoad:true})
   fname=myfile.name;
   var storageRef = firebase.storage().ref();
   var metadata = {
   contentType:myfile.type,
   };

   var uploadTask = storageRef.child(myfile.name).put(myfile, metadata);
   
   uploadTask.on('state_changed', function(snapshot){
   progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
   document.getElementById("progress").value=progress;

   }, function(error) {
   alert(error)
 
   },
   function() {
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    url=downloadURL;
    var Ref=firebase.database().ref("/").child("data");
    Ref.once("value", (snapshot) => {
   let currentProducts = snapshot.val();
   let product={
    product_name:document.getElementById("product_name").value,
    _id:(currentProducts.length+1)+"",
    product_price:document.getElementById("product_price").value,
    product_ratings:document.getElementById("product_ratings").value,
    product_image:url,
    product_stock:document.getElementById("product_stock").value
     }

    currentProducts.push(product);
    Ref.set(currentProducts).then(()=>{ alert("New Product added successfully!");
     window.location.reload();
     });

   }
    );}
   );
  
 }
 );  

}
    
        
    }  
    render()
    {
      
      if(!this.state.isLoggedIn)
        return <Redirect to="/"/>;
      if(this.state.modify)
        return <Redirect to="/modifyproducts"/>
        return(
          
        <div>
          {(this.state.isLoad)?<Load/>:null}
         <Navigation value={true}/>

        
            <div className={styles.body}>
<a href="javascript:void(0)" onClick={this.LogOut} style={{marginLeft:"285px",marginTop:"-420px",textDecoration:"none",position:"absolute",zIndex:"2",position:"fixed"}}>
<img src={logoutIcon} height={30} width={50} style={{borderRadius:"10px"}} />
		  </a>
           <div className={styles.form}>

  <div className={styles.title}>Welcome</div>
  <div className={styles.subtitle}>Let's add product!</div>
  <form autoComplete="off">
  <div className={styles.inputcontaineric1}>
    
    <input id="product_name"  className={styles.input} type="text" placeholder=" " Required=""/>
    <div className={styles.cut}></div>
    <label htmlFor="product_name" className={styles.placeholder}>Product name</label>
  </div>
  <div className={styles.inputcontaineric2}>
    <input id="product_price" className={styles.input} type="text" placeholder=" " Required="" />
    <div className={styles.cut}></div>
    <label htmlFor="product_price" className={styles.placeholder}>Product price</label>
  </div>
  <div className={styles.inputcontaineric2}>
    <input id="product_stock" className={styles.input} type="text" placeholder=" "  Required=""/>
    <div className={styles.cut,styles.cut}></div>
    <label htmlFor="product_stock" className={styles.placeholder}>Product stock</label>
  </div>
  
  <div className={styles.inputcontaineric2}>
    <input id="product_ratings" className={styles.input} type="text" placeholder=" "  Required=""/>
    <div className={styles.cut,styles.cut}></div>
    <label htmlFor="product_ratings" className={styles.placeholder}>Product rating</label>
  </div>
  
  <div className={styles.inputcontaineric2}>
  <input id="product_image" onInput={this.isSelected} onClick={this.Remove} className={styles.input,styles.file} accept="image/*" type="file" placeholder=" " Required="" />
  <label htmlFor="product_image" className={styles.placeholder} id="pH" style={{marginLeft:"80px"}}>Product image</label>
   
   </div>
 <input type="submit" id="add" className={styles.submit} onClick={this.AddProduct}style={{marginTop:"3%"}} value="ADD"/>

<progress id="progress" value="0" max="100" style={{marginTop:"10%",margin:"auto",display:"none"}}/>
</form>
</div>


            </div>
            </div>
        
        );
    }
}
export default Admin

/*
const fs=require("fs")
let p={
    product_image:"AAA",
    _id:22,
    product_name:"AAA",
    product_price:100,
    product_ratings:10 

}
user.data.push(p)
fs.writeFile("../../data.json",JSON.stringify(user),err=>{if(!err)console.log("success")})
*/