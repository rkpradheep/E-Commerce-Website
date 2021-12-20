import { Component } from "react";
import { Link ,Redirect} from "react-router-dom";
import styles from "../Styles/modifyproducts.module.css";
import firebase from "../firebase";
import $, { timers } from "jquery";
import Navigation from "./Navigation";
import Load from "./Load";
import {toast} from 'react-toastify'
var productsArr=null;
toast.configure()
class MofifyProducts extends Component {
    
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

                    placeholder=" Search Items"

                    name="search" id="search" onInput={this.modify} autoComplete="off"/> 
                    </div>
<br/><br/>
<div className={styles.products} id="products">
<div style={{margin:"0 0px 1000px 0",marginTop:"0px"}}>
<Load/>
</div>
</div>
</div>
    );
    }
    Remove=(e)=>{
        document.getElementById("pH"+e.currentTarget.id.slice(11)).innerText="Change Image"
        document.getElementById(e.currentTarget.id).value=""
        document.getElementById(e.currentTarget.id).style.backgroundColor="#ddddd7"

       }
    
      isSelected=(e)=>{

        if(document.getElementById(e.currentTarget.id).files!=null){
          document.getElementById(e.currentTarget.id).style.backgroundColor="skyblue"
          document.getElementById("pH"+e.currentTarget.id.slice(11)).innerHTML="Image selected"

        }
      }
      
      pp=()=>{

        var Ref=firebase.database().ref("/").child("data");
         Ref.on("value", (snapshot) => {
            productsArr = snapshot.val();
       var productsEl = document.getElementById('products');
         productsEl.innerHTML = productsArr.map(product=>{
         
         return '<div  style="display:flex; justify-content: center; text-align: center; background-color: #CCCCC6;border-radius: 15px; margin-bottom: 25px;margin-right: 5px;height:550px ">'+
         '<div>'+
         '<img src="'+product.product_image+'" alt="product-image" height="200" width="200"/><br/>'+
         '<input type=text  value="'+product.product_name+'" id="'+'PN'+product._id+'" style="text-align:center;width:200px;background-color: #ddddd7"/><br/><br/>'+
         '<h5  style="display:inline-block;margin-top:-10px;" >Price:&nbsp;&nbsp <input style="text-align:center;display:inline-block;margin-left:20px;width:100px;background-color: #ddddd7" type=text value='+product.product_price+' id="'+'PRICE'+product._id+'"/></h5><br/>'+
         '<h5 style="display:inline-block;margin-top:-20px;margin-left:0px">Stock: <input style="text-align:center;display:inline-block;margin-left:25px;width:100px;background-color: #ddddd7" type=text value='+product.product_stock+' id="'+'STOCK'+product._id+'"/></h5></br>'+
         '<h5 style="display:inline-block;margin-top:-20px;margin-left:0px">Rating: <input style="text-align:center;display:inline-block;margin-left:20px;width:100px;background-color: #ddddd7" type=text value='+product.product_ratings+' id="'+'RATING'+product._id+'"/></h5><br/>'+
         `<label id="pH${product._id}" for="ChangeImage${product._id}" style="display:inline-block;margin-top:10px;position:absolute;margin-left:40px;cursor:pointer">Change Image</label> <input class="file" style="margin-top:0px;width: 180px;padding:50px 0 0 0;height: 20px;-webkit-box-sizing: border-box; -moz-box-sizing: border-box;box-sizing: border-box;border-radius: 20px;background-size: 30px 30px; background-color: #ddddd7; display: inline-block;margin-left: 10px;cursor:pointer
         " type=file accept="images/*" id="ChangeImage${product._id}"/><br/>`+
         ' <button class="modBtn" id="'+product._id+'" style="all:unset;width:150px;padding: 5px;border: 1px solid #450264;color: #efd8fa;background: green;border-radius: 5px;font-size: large;cursor: pointer;text-decoration:none;">UPDATE</button><br/><br/>'+
         ' <button class="delBtn" id="'+product._id+'" style="all:unset;width:150px;padding: 5px;border: 1px solid #450264;color: #efd8fa;background: green;border-radius: 5px;font-size: large;cursor: pointer;text-decoration:none;">DELETE</button>'+
         '</div></div>'
         
         }).join('');
         $(".delBtn").on('click', this.Delete);
         $(".modBtn").on('click', this.Modify);
         $(".file").on('click', this.Remove);
         $(".file").on('input', this.isSelected);

    
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
        var  productsEl = document.getElementById('products');
         productsEl.innerHTML = productsArr.map(product=>{
         if(product.product_name.toLowerCase().includes(document.getElementById('search').value.toLowerCase()))
         {
          f=true;    
          return '<div  style="display:flex; justify-content: center; text-align: center; background-color: #CCCCC6;border-radius: 15px; margin-bottom: 25px;margin-right: 5px;height:550px ">'+
          '<div>'+
          '<img src="'+product.product_image+'" alt="product-image" height="200" width="200"/><br/>'+
          '<input type=text  value="'+product.product_name+'" id="'+'PN'+product._id+'" style="text-align:center;width:200px;background-color: #ddddd7"/><br/><br/>'+
          '<h5  style="display:inline-block;margin-top:-10px;" >Price:&nbsp;&nbsp <input style="text-align:center;display:inline-block;margin-left:20px;width:100px;background-color: #ddddd7" type=text value='+product.product_price+' id="'+'PRICE'+product._id+'"/></h5><br/>'+
          '<h5 style="display:inline-block;margin-top:-20px;margin-left:0px">Stock: <input style="text-align:center;display:inline-block;margin-left:25px;width:100px;background-color: #ddddd7" type=text value='+product.product_stock+' id="'+'STOCK'+product._id+'"/></h5></br>'+
          '<h5 style="display:inline-block;margin-top:-20px;margin-left:0px">Rating: <input style="text-align:center;display:inline-block;margin-left:20px;width:100px;background-color: #ddddd7" type=text value='+product.product_ratings+' id="'+'RATING'+product._id+'"/></h5><br/>'+
          `<label id="pH${product._id}" for="ChangeImage${product._id}" style="display:inline-block;margin-top:10px;position:absolute;margin-left:40px;cursor:pointer">Change Image</label> <input class="file" style="margin-top:0px;width: 180px;padding:50px 0 0 0;height: 20px;-webkit-box-sizing: border-box; -moz-box-sizing: border-box;box-sizing: border-box;border-radius: 20px;background-size: 30px 30px; background-color: #ddddd7; display: inline-block;margin-left: 10px;cursor:pointer
          " type=file accept="images/*" id="ChangeImage${product._id}"/><br/>`+
          ' <button class="modBtn" id="'+product._id+'" style="all:unset;width:150px;padding: 5px;border: 1px solid #450264;color: #efd8fa;background: green;border-radius: 5px;font-size: large;cursor: pointer;text-decoration:none;">UPDATE</button><br/><br/>'+
          ' <button class="delBtn" id="'+product._id+'" style="all:unset;width:150px;padding: 5px;border: 1px solid #450264;color: #efd8fa;background: green;border-radius: 5px;font-size: large;cursor: pointer;text-decoration:none;">DELETE</button>'+
          '</div></div>'
         }
          }).join('');
          $(".delBtn").on('click', this.Delete);
          $(".modBtn").on('click', this.Modify);
          $(".file").on('click', this.Remove);
          $(".file").on('input', this.isSelected);
 
        if(!f)
        productsEl.innerHTML =`<h2 style="width:500px;color:black;margin:0 0 350px 0px">No result found!</h2>`;
   
     });
     }
     
 Delete=(ID)=>{
     var Confirmation=window.confirm("Do you really want to delete it?");
    if(!Confirmation)
    return;
    firebase.database().ref("/").child("data").orderByChild("_id").equalTo(ID.currentTarget.id).once("value",(snapshot)=>{
        snapshot.forEach(e=>{ 
        firebase.database().ref("/").child("data/"+e.key).remove().then(()=>{
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
     var myfile=document.querySelector("#ChangeImage"+ID.currentTarget.id).files[0],url=null,fname=null;
    var price="",pname="",rating="",stock="";
     if(myfile!=null)
     {
     fname=myfile.name;
     var storageRef = firebase.storage().ref();
     var metadata = {
     contentType:myfile.type,
     };
  
     var uploadTask = storageRef.child(myfile.name).put(myfile, metadata);
     
  //alert(price+" "+pname+" "+rating)
     firebase.database().ref("/").child("data").orderByChild("_id").equalTo(ID.currentTarget.id).once("value",(snapshot)=>{
            uploadTask.then(
            (sanpshot)=>{
             uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
             url=downloadURL;
            
              price=document.getElementById('PRICE'+ID.currentTarget.id).value
              pname=document.getElementById('PN'+ID.currentTarget.id).value
              rating=document.getElementById('RATING'+ID.currentTarget.id).value
              stock=document.getElementById('STOCK'+ID.currentTarget.id).value
             }).then(()=>{       
      snapshot.forEach(e=>{ 
          let product={
          product_name:pname,
          _id:ID.currentTarget.id,
          product_price:price,
          product_ratings:rating,
          product_image:e.val().product_image,
          product_stock:stock,
          product_image:url
           }
     firebase.database().ref("/").child("data/"+e.key).set(product).then(()=>{
         toast("Successfully updated",{type:"success"})
         this.HideLoad()
     
                                                                              })
                         });
                        });
  
    }
      );}
     )
    
  }
  else{
        this.setState({isLoad:true})
        var price=document.getElementById('PRICE'+ID.currentTarget.id).value
        var pname=document.getElementById('PN'+ID.currentTarget.id).value
        var rating=document.getElementById('RATING'+ID.currentTarget.id).value
        var stock=document.getElementById('STOCK'+ID.currentTarget.id).value

    firebase.database().ref("/").child("data").orderByChild("_id").equalTo(ID.currentTarget.id).once("value",(snapshot)=>{
     
        snapshot.forEach(e=>{ 
        let product={
            product_name:pname,
            _id:ID.currentTarget.id,
            product_price:price,
            product_ratings:rating,
            product_image:e.val().product_image,
            product_stock:stock,
             }
       firebase.database().ref("/").child("data/"+e.key).set(product).then(()=>{
           toast("Successfully updated",{type:"success"})
           this.HideLoad()
        
        })
    })  
    })
}
        
         }
 
         HideLoad=()=>{
            this.setState({isLoad:false})

         }
    
}
export default MofifyProducts