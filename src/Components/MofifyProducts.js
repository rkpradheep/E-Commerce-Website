import { Component } from "react";
import { Link ,Redirect} from "react-router-dom";
import styles from "../Styles/modifyproducts.module.css";
import firebase from "../firebase";
import $ from "jquery";
import Navigation from "./Navigation";
import Load from "./Load";
var productsArr=null;
class MofifyProducts extends Component {

 
    render(){
        $(document).ready(()=>{this.pp()} )
    return (
        
        <div className={styles.body} >
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
<div style={{margin:"0 0px 1000px 0",marginTop:"600px"}}>
<Load/>
</div>
</div>
</div>
    );
    }
      pp=()=>{

        var Ref=firebase.database().ref("/").child("data");
         Ref.on("value", (snapshot) => {
            productsArr = snapshot.val();
       var productsEl = document.getElementById('products');
         productsEl.innerHTML = productsArr.map(product=>{
         
         return '<div  style="display:flex; justify-content: center; text-align: center; background-color: #CCCCC6;border-radius: 15px; margin-bottom: 25px;margin-right: 5px;height:500px ">'+
         '<div>'+
         '<img src="'+product.product_image+'" alt="product-image" height="200" width="200"/><br/>'+
         '<input type=text  value="'+product.product_name+'" id="'+'PN'+product._id+'" style="text-align:center;width:200px;background-color: #ddddd7"/><br/><br/>'+
         '<h5  style="display:inline-block;margin-top:-10px;" >Price:&nbsp;&nbsp <input style="text-align:center;display:inline-block;margin-left:20px;width:100px;background-color: #ddddd7" type=text value='+product.product_price+' id="'+'PRICE'+product._id+'"/></h5><br/>'+
         '<h5 style="display:inline-block;margin-top:-20px;margin-left:0px">Stock: <input style="text-align:center;display:inline-block;margin-left:25px;width:100px;background-color: #ddddd7" type=text value='+product.product_stock+' id="'+'STOCK'+product._id+'"/></h5></br>'+
         '<h5 style="display:inline-block;margin-top:-20px;margin-left:0px">Rating: <input style="text-align:center;display:inline-block;margin-left:20px;width:100px;background-color: #ddddd7" type=text value='+product.product_ratings+' id="'+'RATING'+product._id+'"/></h5><br/><br/>'+
         ' <button class="modBtn" id="'+product._id+'" style="all:unset;width:150px;padding: 5px;border: 1px solid #450264;color: #efd8fa;background: green;border-radius: 5px;font-size: large;cursor: pointer;text-decoration:none;">UPDATE</button><br/><br/>'+
         ' <button class="delBtn" id="'+product._id+'" style="all:unset;width:150px;padding: 5px;border: 1px solid #450264;color: #efd8fa;background: green;border-radius: 5px;font-size: large;cursor: pointer;text-decoration:none;">DELETE</button>'+
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
        var  productsEl = document.getElementById('products');
         productsEl.innerHTML = productsArr.map(product=>{
         if(product.product_name.toLowerCase().includes(document.getElementById('search').value.toLowerCase()))
         {
          f=true;
           
         return '<div  style="display:flex; justify-content: center; text-align: center; background-color: #CCCCC6;border-radius: 15px; margin-bottom: 25px;margin-right: 5px;height:500px ">'+
         '<div>'+
         '<img src="'+product.product_image+'" alt="product-image" height="200" width="200"/><br/>'+
         '<input type=text  value="'+product.product_name+'" id="'+'PN'+product._id+'" style="text-align:center;width:200px;background-color: #ddddd7"/><br/><br/>'+
         '<h5  style="display:inline-block;margin-top:-10px;" >Price:&nbsp;&nbsp <input style="text-align:center;display:inline-block;margin-left:20px;width:100px;background-color: #ddddd7" type=text value='+product.product_price+' id="'+'PRICE'+product._id+'"/></h5><br/>'+
         '<h5 style="display:inline-block;margin-top:-20px;margin-left:0px">Stock: <input style="text-align:center;display:inline-block;margin-left:25px;width:100px;background-color: #ddddd7" type=text value='+product.product_stock+' id="'+'STOCK'+product._id+'"/></h5></br>'+
         '<h5 style="display:inline-block;margin-top:-20px;margin-left:0px">Rating: <input style="text-align:center;display:inline-block;margin-left:20px;width:100px;background-color: #ddddd7" type=text value='+product.product_ratings+' id="'+'RATING'+product._id+'"/></h5><br/><br/>'+
         ' <button class="modBtn" id="'+product._id+'" style="all:unset;width:150px;padding: 5px;border: 1px solid #450264;color: #efd8fa;background: green;border-radius: 5px;font-size: large;cursor: pointer;text-decoration:none;">UPDATE</button><br/><br/>'+
         ' <button class="delBtn" id="'+product._id+'" style="all:unset;width:150px;padding: 5px;border: 1px solid #450264;color: #efd8fa;background: green;border-radius: 5px;font-size: large;cursor: pointer;text-decoration:none;">DELETE</button>'+
         '</div></div>'
            
             }
          
          
        }).join('');
        $(".delBtn").on('click', this.Delete);
        $(".modBtn").on('click', this.Modify);
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
            alert("Successfully deleted")
            this.setState({reload:true})})
        });
    });
     }
      Modify=(ID)=>{

        var Confirmation=window.confirm("Do you really want to update it?");
        if(!Confirmation)
            return;
        var price=document.getElementById('PRICE'+ID.currentTarget.id).value
        var pname=document.getElementById('PN'+ID.currentTarget.id).value
        var rating=document.getElementById('RATING'+ID.currentTarget.id).value
        var stock=document.getElementById('STOCK'+ID.currentTarget.id).value

    //alert(price+" "+pname+" "+rating)
    firebase.database().ref("/").child("data").orderByChild("_id").equalTo(ID.currentTarget.id).once("value",(snapshot)=>{
     
        snapshot.forEach(e=>{ 
        let product={
            product_name:pname,
            _id:ID.currentTarget.id,
            product_price:price,
            product_ratings:rating,
            product_image:e.val().product_image,
            product_stock:stock
             }
       firebase.database().ref("/").child("data/"+e.key).set(product).then(()=>{
           alert("Successfully updated")
           this.setState({reload:true});
        
        })
    })  
    })
        
         }
    
}
export default MofifyProducts