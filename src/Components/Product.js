
import { Component } from "react";
import { Redirect } from "react-router-dom";
import styles from "../Styles/product.module.css";
import $ from "jquery";
import cart from "../cart.png";
class Product extends Component
{
   constructor()
   {
       super();
       this.state={
        isLoggedIn:true,
        GoToCart:false,
       };

   }
  LogOut=(e)=>{
    localStorage.setItem("name","");
      this.setState({isLoggedIn:false});
  }
  GoToCartF=(e)=>{
    localStorage.setItem('cartArr', JSON.stringify(cartArr));
    this.setState({GoToCart:true});
  }

 render(){
    if(!this.state.GoToCart)
    $(document).ready(()=>{pp();getCartArr()} )

    if(!this.state.isLoggedIn || localStorage.getItem("name")=="")
     return <Redirect to="/"/>;
    if(this.state.GoToCart)
    return <Redirect to="/cart"/>;
    //setTimeout(function(){pp();getCartArr();},0);
     
 return(
  
<div className={styles.body}>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" crossOrigin="anonymous"/>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>

<a href="javascript:void(0)" onClick={this.LogOut} style={{marginLeft:"55%",textDecoration:"none"}}>
          <button style={{marginLeft:"90%",height:"30px",width:"100px",backgroundColor:"skyblue",color:"white",fontWeight:"bold",borderRadius:"5px"}} onClick={this.LogOut}>Log out</button>
		  </a>
        

    <div style={{backgroundColor:"black",width:"100%"}}>
<h3 style={{color:"white"}}>Welcome, {localStorage.getItem("name")}</h3>
</div>
<br/><br/>



<div className={styles.search}> 
       
       <form> 

                <input type="text" style={{height:"60px"}}

                    placeholder=" Search Items"

                    name="search" id="search" onInput={modify} autoComplete="off"/> 

                <a id="cartBtn" href="javascript:void(0)" onClick={this.GoToCartF} style={{marginTop:"-53px",marginLeft:"350px",position:"absolute"}}>
                <img src={cart} height="50" style={{display:"inline-block"}}/>
                </a> 

            </form> 

        </div>
  <br/><br/>
    <div className={styles.products} id="products">

        <h2>Wait while we load the Products !!</h2>
    </div>
   
</div>

 );
 };
}
var p=null;
var productsEl = null;
var cartBtnEl = null;

let cartArr;
let productsArr = [];

// loads previous cart arr
function getCartArr(){
    const temp = localStorage.getItem('cartArr');
    const temp2 = JSON.parse(temp);
    if (temp2 === null || temp2 === undefined) {
        cartArr = [];
        localStorage.setItem('cartArr', JSON.stringify(cartArr));
    } else {
        cartArr = temp2;
    }
}
function isItemInCart(currId){
   for (const product of cartArr){
       if (currId === product._id){
           product['qty'] += 1;
           alert('You have added '+product['qty']+' '+product['name']+' successfully to your cart');
           
           return true;
       }
   }
   return false;
}

// add to cart function
function addToCart(e){

   //cartArr.push(this.id);
   const currId = this.id;

   let item = {};

   // check if item is already in cart
   if(!isItemInCart(currId)){
       for(const product of productsArr){
           if (product._id === currId){
               // console.log(cartArr);
               item['name'] = product.product_name;
               
               alert('You have added 1 '+item['name']+' successfully to your cart');
               item['price'] = product.product_price;
               item['img'] = product.product_image;
               item['_id'] = product._id;
               item['qty'] = 1;
               cartArr.push(item);
               
               
           }
       }
   }
}

// display cart




function modify()
{

 var fs=require('../data.json');
 productsArr=fs.data;
 productsEl.innerHTML = fs.data.map(product=>{
    if(product.product_name.toLowerCase().includes(document.getElementById('search').value.toLowerCase()))
    {
   return '<div class="product" style="  display: flex;flex-direction: column; justify-content: space-between; text-align: center; background-color: #CCCCC6;border-radius: 15px; margin-bottom: 25px;margin-right: 5px; margin-left: 5px; padding: 15px;">'+
   '<div class="product-info">'+
   '<img src="'+product.product_image+'" alt="product-image" height="200" width="200">'+
   '<h4>'+product.product_name+'</h4>'+
   '<h5>Price: ₹'+product.product_price+'</h5>'+
   ' <h5>Rating: '+product.product_ratings+'</h5>'+
   ' <button class="addBtn" id="'+product._id+'" style="all:unset;width:150px;padding: 5px;border: 1px solid #450264;color: #efd8fa;background: green;border-radius: 5px;font-size: large;cursor: pointer;text-decoration:none;">add to cart</button>'+
   '</div></div>'
    }
     
     
     
    }).join('');
    $(".addBtn").on('click', addToCart);
}

function pp(){

    productsEl = document.getElementById('products');

       var fs=require('../data.json');
        
        productsArr=fs.data;

       productsEl.innerHTML = productsArr.map(product=>{
       
       return '<div class="product" style="display: flex;flex-direction: column; justify-content: space-between; text-align: center; background-color: #CCCCC6;border-radius: 15px; margin-bottom: 25px;margin-right: 5px;  padding: 15px;">'+
       '<div class="product-info">'+
       '<img src="'+product.product_image+'" alt="product-image" height="200" width="200">'+
       '<h4>'+product.product_name+'</h4>'+
       '<h5>Price: ₹'+product.product_price+'</h5>'+
       ' <h5>Rating: '+product.product_ratings+'</h5>'+
       ' <button class="addBtn" id="'+product._id+'" style="all:unset;width:150px;padding: 5px;border: 1px solid #450264;color: #efd8fa;background: green;border-radius: 5px;font-size: large;cursor: pointer;text-decoration:none;">add to cart</button>'+
       '</div></div>'
       
       
       
       }).join('');
       $(".addBtn").on('click', addToCart);
   }


export default Product;