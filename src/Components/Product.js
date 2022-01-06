
import { Component } from "react";
import { Redirect } from "react-router-dom";
import styles from "../Styles/product.module.css";
import $ from "jquery";
import cart from "../cart.png";
import firebase from "firebase";
import logoutIcon from "../logout.png";
import Navigation from "./Navigation";
import Load from "./Load";
import {Modal,Button} from 'react-bootstrap';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
var p=null;
var productsEl = null;
var cartBtnEl = null;

let cartArr;
let productsArr = [];
class Product extends Component
{
   constructor()
   {
       super();
       this.state={
        isLoggedIn:true,
        GoToCart:false,
        modal:false
       };

   }
    handleClose = () => this.setState({modal:false})

  LogOut=(e)=>{
    window.localStorage.clear()
    this.setState({isLoggedIn:false});
  }
  GoToCartF=(e)=>{

    localStorage.setItem('cartArr',JSON.stringify(cartArr));
   // alert(localStorage.getItem('cartArr').length+" "+cartArr.length)
       this.setState({GoToCart:true});
  }

 render(){

    if(!this.state.isLoggedIn || localStorage.getItem("name")==null)
      return <Redirect to="/signup"/>;
      
    if(!this.state.GoToCart && this.state.isLoggedIn && !this.state.modal)
    $(document).ready(()=>{this.pp();this.getCartArr()} )

 
    if(this.state.GoToCart)
    return <Redirect to="/cart"/>;
    //setTimeout(function(){pp();getCartArr();},0);
     
 return(
<div>

<div className={styles.body}>
<Navigation zoom="140%"/>
<br/><br/>
<Modal show={this.state.modal} onHide={this.handleClose}  >
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    <div style={{backgroundColor:"black",width:"100%",height:"70px",marginTop:"80px",justifyContent:"center"}}>
<h3 style={{color:"white",height:"50px",marginTop:"20px"}}>Welcome, {localStorage.getItem("name")}</h3>
</div>

<a href="javascript:void(0)" onClick={this.LogOut} style={{marginLeft:"55%",textDecoration:"none"}}>
<img src={logoutIcon} height={40} width={50} style={{marginLeft:"99%",marginTop:"-135%",borderRadius:"10px"}} />

		  </a>

<div className={styles.search}> 
       
       <form> 

                <input type="text" style={{height:"60px"}}

                    placeholder=" Search Items"

                    name="search" id="search" onInput={this.modify} autoComplete="off"/> 

                <a id="cartBtn" href="javascript:void(0)" onClick={this.GoToCartF} style={{marginTop:"0px",marginLeft:"100px",position:"absolute"}}>
                <img src={cart} height="50" style={{display:"inline-block",borderRadius:"10px"}}/>
                </a> 

            </form> 

        </div>
  <br/><br/>
  <div className={styles.products} id="products">
<div>
<Load/>
</div>
</div>
   
</div>
</div>
 );
 };
 modify=()=>
{
    let f=false;

    productsEl = document.getElementById('products');
    productsEl.innerHTML = productsArr.map(product=>{
    if(product.product_name.toLowerCase().includes(document.getElementById('search').value.toLowerCase()))
    {    f=true;
        return '<div class="product" style="display: flex;flex-direction: column; justify-content: space-between; text-align: center; background-color: #CCCCC6;border-radius: 15px; margin-bottom: 25px;margin-right: 5px;  padding: 15px;">'+
        '<div>'+
        '<img src="'+product.product_image+'" alt="product-image" height="200" width="200">'+
        '<h4>'+product.product_name+'</h4>'+
        '<h5>Price: ₹'+product.product_price+'</h5>'+
        '<h5 id='+"stock"+product._id+'>Available Stock: '+product.product_stock+'</h5>'+
        ' <h5>Rating: '+product.product_ratings+'</h5>'+
        ' <button class="addBtn" id="'+product._id+'" style="all:unset;width:150px;padding: 5px;border: 1px solid #450264;color: #efd8fa;background: green;border-radius: 5px;font-size: large;cursor: pointer;text-decoration:none;">add to cart</button>'+
        '</div></div>'
        
    }
     
     
     
    }).join('');
    $(".addBtn").on('click', this.addToCart);

    if(!f)
    productsEl.innerHTML =`<h2 style="width:500px;color:black;margin:0 0 170px 0px">No result found!</h2>`;
  }


pp(){


     var Ref=firebase.database().ref("/").child("data");
     Ref.on("value", (snapshot) => {
        productsArr = snapshot.val();
         let TCartArr=JSON.parse(localStorage.getItem('cartArr'));
      if(TCartArr!==null)
      {
        
      TCartArr.forEach((part,index)=>{

      productsArr.forEach((p,i)=>{
          if (p._id === part._id){
             p.product_stock-=part.qty;
             }
       });


      });
      }
     productsEl = document.getElementById('products');
     if(productsEl!=null)
     productsEl.innerHTML = productsArr.map(product=>{
     
     return '<div class="product" style="display: flex;flex-direction: column; justify-content: space-between; text-align: center; background-color: #CCCCC6;border-radius: 15px; margin-bottom: 25px;margin-right: 5px;  padding: 15px;">'+
     '<div>'+
     '<img src="'+product.product_image+'" alt="product-image" height="200" width="200">'+
     '<h4>'+product.product_name+'</h4>'+
     '<h5>Price: ₹'+product.product_price+'</h5>'+
     '<h5 id='+"stock"+product._id+'>Available Stock: '+product.product_stock+'</h5>'+
     ' <h5>Rating: '+product.product_ratings+'</h5>'+
     ' <button class="addBtn" id="'+product._id+'" style="all:unset;width:150px;padding: 5px;border: 1px solid #450264;color: #efd8fa;background: green;border-radius: 5px;font-size: large;cursor: pointer;text-decoration:none;">add to cart</button>'+
     '</div></div>'
     
     
     
     }).join('');
     $(".addBtn").on('click', this.addToCart);
  });
 }
 getCartArr=()=>{
    // alert(1)
    const temp = localStorage.getItem('cartArr'); 
    const temp2 = temp;
    if (temp2 === null || temp2 === undefined) {
        cartArr = [];
        localStorage.setItem('cartArr',JSON.stringify(cartArr));
    } else {
        //cartArr = [];
         cartArr =JSON.parse(temp2);
    }
}
  isItemInCart=(currId)=>{
    var f=false;
      cartArr.forEach((part,index)=>{
         if (part._id === currId ){
             if(part.stock<1)
             {
             toast("Stock not avaible for this product",{type:"error"})
             document.getElementById("stock"+part._id).innerHTML="Available Stock: "+0;
 
             f=true;
             return ;
             }
 
         part.qty+=1;
         part.stock-=1;
         document.getElementById("stock"+part._id).innerHTML="Available Stock: "+part.stock;
         toast('You have added '+part.qty+' '+part.name+' successfully to your cart',{type:"success"});
         f=true;
         localStorage.setItem('cartArr',JSON.stringify(cartArr));
         return ;
         }
     
     });
    // cartArr=JSON.parse(cartArr);
    return f;
  
 }
    addToCart=(e)=>{
       
    var item={};
      if(!this.isItemInCart(e.currentTarget.id))
     productsArr.forEach((part,index)=>{
         if (part._id === e.currentTarget.id){
             if(part.product_stock<1)
                {
                  toast("Stock not avaible for this product",{type:"error"})
                  return
                }
         item['name'] = part.product_name;      
         item['price'] = part.product_price;
         item['img'] = part.product_image;
         item['_id'] = part._id;
         item['qty'] = 1;
         item['stock']=part.product_stock-1;
         document.getElementById("stock"+part._id).innerHTML="Available Stock: "+item['stock'];
         cartArr.push(item);
         toast('You have added 1 '+item['name']+' successfully to your cart',{type:"success"})
         localStorage.setItem('cartArr',JSON.stringify(cartArr));
         return;
         }
     
     });
 
    
 }
 

}

// loads previous cart arr

// add to cart function

// display cart





export default Product;