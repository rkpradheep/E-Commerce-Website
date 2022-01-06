
import { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import styles from "../Styles/cart.module.css";
import $ from "jquery";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Load from './Load.js';
import firebase from "../firebase";
toast.configure()
var cartListEl = null;
var totalEl = null;
var checkoutEl = null;
var products = [];

class Cart extends Component
{
 
    constructor()
    {
    super()
    this.state={
    checkout:false,
    total:-1,
    isLoading:false
    }
   
}
     handleToken=(token)=>{
       
        var TOTAL=this.state.total
        let PurchaseDetails=[],Existing=[]
        let PD=JSON.parse(localStorage.getItem("cartArr"))
        const total={"TOTAL":this.state.total}
        this.setState({isLoading:true})
        PD.forEach(D=>{PurchaseDetails.push({"CustomerFullName":localStorage.getItem("name"),"CustomerEmail":localStorage.getItem("email"),"name":D.name,"qty":D.qty,"price":D.price,"date":(new Date().toLocaleString())+""})})
        var emails;
        getMail().then(()=>{mail().then(()=>handleToken(token).then(()=>{this.setState({isLoading:false})
        setTimeout(()=>{
        this.setState({checkout:true})},3000)}
        ))})
       async function getMail(){
        
        await firebase.database().ref("/").child("Users").orderByChild("name").equalTo(localStorage.getItem("name")).once("value",(snapshot)=>{
           snapshot.forEach(e=>{emails= e.val().email;})
          
        });
       }
      async function mail(){
       const email={
           "data":emails
       }
      const PDetails={
          data:JSON.stringify(PurchaseDetails)
      }
    
      const response = await axios.post(
         "https://7qxuu.sse.codesandbox.io/mail", {PDetails,total,email}
      );
       }

            
        async function handleToken(token) {
            const product ={
                price:TOTAL,
              }
            const response = await axios.post(
     "https://0kp4s.sse.codesandbox.io/checkout", {token,product}
            );
         
            const { status } = response.data;
            console.log("Response:", response.data);

            if (status === "success") { 
                const cartArr = JSON.parse(localStorage.getItem("cartArr"));
                firebase.database().ref("/").child("data").orderByChild("_id").once("value",(snapshot)=>{
                    cartArr.forEach(cart=>{
                    snapshot.forEach(e=>{ 
                    if(e.val()._id===cart._id){
                    let product=e.val().product_stock-cart.qty
                    firebase.database().ref("/").child("data/"+e.key+"/product_stock").set(product).then(()=>{
                  })
                    }
                 })
                })
            })

            firebase.database().ref("/").child("Purchase History/"+localStorage.getItem("name").replace(/[^a-zA-Z]/g,"")).once("value",(snapshot)=>{if(snapshot.val()!==null)Existing=snapshot.val()}).then(()=>{
            firebase.database().ref("/").child("Purchase History/"+localStorage.getItem("name").replace(/[^a-zA-Z]/g,"")).set(Existing.concat(PurchaseDetails)).then(()=>{  toast("Success! Check email for details",{type:"success"})
        })})
            }
            else {
              toast("Something went wrong", { type: "error" });
            }
        
          }
     
    }
    pp=()=>
{

cartListEl = document.getElementById('cartList');
 totalEl = document.getElementById('total');
 this.getProducts();
}
    getProducts = () => {
    
    const temp = localStorage.getItem('cartArr');
    const cartArr = JSON.parse(temp);
    if (cartArr === null || cartArr === undefined) {
        alert('Could not get cart');
    } else {
        products = cartArr;
        // console.log(products);
        this.displayCart();
        this.calculateCartTotal();
    }
};

// display cart details
  displayCart = () => {
    cartListEl = document.getElementById('cartList');
  
    cartListEl.innerHTML = `
        <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Option</th>
        </tr>
    `;

    cartListEl.innerHTML += products.map(product=>`
        <tr>
            <td><img src="${product.img}" alt="product-image" height="200" width="200"></td>
            <td><h4>${product.name}</h4></td>
            <td><h5>${product.price}</h5></td>
            <td>${product.qty}</td>
            <td><button class="removeBtn" style="width:90px; border: 1px solid #640207;color: #efd8fa;

            background: #b6063b;" id="${product._id}" onMouseOut="this.style.backgroundColor='#b6063b'" onMouseOver="this.style.backgroundColor='purple'">Remove</button></td>
        </tr>
    `)
    .join('');

    // enable remove item button
   $(".removeBtn").on('click',this.deleteFromCart);
  
};

// delete item from cart
   deleteFromCart=(e)=>{
    var currId = e.currentTarget.id;
    // update the cartArr
    for (const i in products){
        if (products[i]._id === currId){
            
            if(products[i].qty > 1){
                products[i].qty -= 1;
                products[i].stock += 1;
            }else{
                products[i].stock += 1;
                products.splice(i,1);
            }
        }
    }
    this.updateInLocalStorage();
    this.getProducts();
}

// update cart in local storage
   updateInLocalStorage=()=>{
    localStorage.setItem('cartArr', JSON.stringify(products,null,4));
}

// calculate cart total
   calculateCartTotal=()=>{
    let cartTotal = 0;
    for (const product of products){
        let currTotal = product.qty * product.price;
        cartTotal += currTotal; 
    }
    this.updateCartTotal(cartTotal);
}

// updates cart total in DOM and local storage
    updateCartTotal=(cartTotal)=>{
    if(cartTotal!==this.state.total)
     this.setState({total:cartTotal})
    totalEl.innerHTML = ` TOTAL : ₹ ${cartTotal}`;
    localStorage.setItem('cartTotal', cartTotal);
}


    render(){
        if(this.state.checkout)
        return <Redirect to="/checkout" />
     $(document).ready(()=>{this.pp()} )
        return(

<div className={styles.body} style={{width:"100%"}}>
{
       (this.state.isLoading)?
       <Load color="blue"/>:null
      
}
<div className={styles.outer}>
<table style={{width:"100%"}} id="cartList">
   
</table><br/>
<h3 id="total"></h3>
{/*<button className={styles.btn} style={{width:"100px",marginLeft:"47%"}}>Checkout</button>*/}
<br/>
<StripeCheckout style={{width:"160px",margin:"auto"}}
autoComplete="off"
stripeKey="pk_test_51K6xJJSFUjObRNHM2n7HVmBh0wKcVenmU5Nf8dugDOP0o4m0KvtxRRstpPQZ8yOpnbU25bmxUjplLAql3XYZ3AQn00yweQixue"
billingAddress
shippingAddress
currency="INR"
token={this.handleToken}
amount={this.state.total*100}
/>
<br></br><br/>
<Link to="/product" style={{textDecoration:"none"}}>
<button className={styles.btn} style={{width:"100px",margin:"auto"}}>Go Back</button>
</Link>
</div>
</div>
);
};

}

// checkout function

export default Cart;