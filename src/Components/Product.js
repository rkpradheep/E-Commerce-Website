
import { Component } from "react";
import { Redirect } from "react-router-dom";
import styles from "../Styles/product.module.css";
import $ from "jquery";
import cart from "../cart.png";
import firebase from "firebase";
import logoutIcon from "../logout.png";
import Navigation from "./Navigation";
import Load from "./Load";
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
       };

   }
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
      
    if(!this.state.GoToCart && this.state.isLoggedIn)
    $(document).ready(()=>{pp();getCartArr()} )

 
    if(this.state.GoToCart)
    return <Redirect to="/cart"/>;
    //setTimeout(function(){pp();getCartArr();},0);
     
 return(
<div>

    
<div className={styles.body}>

<Navigation/>
<br/><br/>


    <div style={{backgroundColor:"black",width:"100%"}}>
<h3 style={{color:"white",height:"50px",marginTop:"30px"}}>Welcome, {localStorage.getItem("name")}</h3>
</div>

<a href="javascript:void(0)" onClick={this.LogOut} style={{marginLeft:"55%",textDecoration:"none"}}>
<img src={logoutIcon} height={40} width={50} style={{marginLeft:"99%",marginTop:"-140%",borderRadius:"10px"}} />

		  </a>

<div className={styles.search}> 
       
       <form> 

                <input type="text" style={{height:"60px"}}

                    placeholder=" Search Items"

                    name="search" id="search" onInput={modify} autoComplete="off"/> 

                <a id="cartBtn" href="javascript:void(0)" onClick={this.GoToCartF} style={{marginTop:"0px",marginLeft:"100px",position:"absolute"}}>
                <img src={cart} height="50" style={{display:"inline-block",borderRadius:"10px"}}/>
                </a> 

            </form> 

        </div>
  <br/><br/>
    <div className={styles.products} id="products">
<div style={{margin:"0 0px 1000px 0",marginTop:"600px"}}>
<Load/>
</div>
    </div>
   
</div>
</div>
 );
 };
}

// loads previous cart arr
function getCartArr(){
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
function isItemInCart(currId){
  //cartArr=JSON.stringify(cartArr);
   var f=false;
     cartArr.forEach((part,index)=>{
        if (part._id === currId ){
            if(part.stock<1)
            {
            alert("Stock not avaible for this product")
            document.getElementById("stock"+part._id).innerHTML="Available Stock: "+0;

            f=true;
            return ;
            }

        part.qty+=1;
        part.stock-=1;
        document.getElementById("stock"+part._id).innerHTML="Available Stock: "+part.stock;
        alert('You have added '+part.qty+' '+part.name+' successfully to your cart');
        f=true;
        return ;
        }
    
    });
   // cartArr=JSON.parse(cartArr);
   return f;
 /*  for (const product of cartArr){
       if (currId === product._id){
           product['qty'] += 1;
           product['stock'] -=1;
          /
           alert('You have added '+product['qty']+' '+product['name']+' successfully to your cart');
           
           return true;
       }
   }
   return false;
   */
}

// add to cart function
function addToCart(e){
   var item={};
     if(!isItemInCart(this.id))
    productsArr.forEach((part,index)=>{
        if (part._id === this.id){
            if(part.product_stock<1)
               {
                   alert("Stock not avaible for this product")
                   return
               }
        item['name'] = part.product_name;              
        alert('You have added 1 '+item['name']+' successfully to your cart');
        item['price'] = part.product_price;
        item['img'] = part.product_image;
        item['_id'] = part._id;
        item['qty'] = 1;
        item['stock']=part.product_stock-1;
        document.getElementById("stock"+part._id).innerHTML="Available Stock: "+item['stock'];
        cartArr.push(item);
        return;
        }
    
    });

   //cartArr.push(this.id);
  // const currId = this.id;
   
//   let item = {};

   // check if item is already in cart
  /* if(!isItemInCart(currId)){

       for(const product of productsArr){
           if (product._id === currId){
            
               item['name'] = part.product_name;              
               alert('You have added 1 '+item['name']+' successfully to your cart');
               item['price'] = part.product_price;
               item['img'] = part.product_image;
               item['_id'] = part._id;
               item['qty'] = 1;
               item['stock']=part.product_stock
               cartArr.push(item);
               break
               
           }
       }
   }*/
}

// display cart




function modify()
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
    if(!f)
    productsEl.innerHTML =`<h2 style="width:500px;color:black;margin:0 0 170px 0px">No result found!</h2>`;
    $(".addBtn").on('click', addToCart);
}

function pp(){

      productsEl = document.getElementById('products');

       var Ref=firebase.database().ref("/").child("data");
       Ref.on("value", (snapshot) => {
          productsArr = snapshot.val();

        let TCartArr=JSON.parse(localStorage.getItem('cartArr'));
        if(TCartArr!=null)
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
       $(".addBtn").on('click', addToCart);
    });
   }


export default Product;