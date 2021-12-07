
import { Component } from "react";
import { Link } from "react-router-dom";
import styles from "../Styles/cart.module.css";
import $ from "jquery";
class Cart extends Component
{
    render(){
     setTimeout(function(){pp()},100)
        return(
<div className={styles.body} style={{width:"100%"}}>
<div className={styles.outer}>
<table style={{width:"100%"}} id="cartList">
   
</table>
<h3 id="total"></h3>
<Link to="/checkout" style={{textDecoration:"none"}}>
<button className={styles.btn} style={{width:"100px",marginLeft:"47%"}}>Checkout</button>
</Link>
<Link to="/product" style={{textDecoration:"none"}}>
<button className={styles.btn} style={{width:"100px",marginLeft:"47%"}}>Go Back</button>
</Link>
</div>
</div>
);
};
}
var cartListEl = null;
var totalEl = null;
var checkoutEl = null;

var products = [];
function pp()
{

cartListEl = document.getElementById('cartList');
 totalEl = document.getElementById('total');
 getProducts();
}
const getProducts = () => {
    const temp = localStorage.getItem('cartArr');
    const cartArr = JSON.parse(temp);
    if (cartArr === null || cartArr === undefined) {
        alert('Could not get cart');
    } else {
        products = cartArr;
        // console.log(products);
        displayCart();
        calculateCartTotal();
    }
};

// display cart details
const displayCart = () => {
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
            <td><button style="width:90px" id="${product._id}" class="removeBtn">Remove</button></td>
        </tr>
    `)
    .join('');

    // enable remove item button
    $(".removeBtn").on('click', deleteFromCart);
};

// delete item from cart
function deleteFromCart(){
    var currId = this.id;
    // update the cartArr
    for (const i in products){
        if (products[i]._id === currId){
            if(products[i].qty > 1){
                products[i].qty -= 1;
            }else{
                products.splice(i,1);
            }
        }
    }
    updateInLocalStorage();
    getProducts();
}

// update cart in local storage
function updateInLocalStorage(){
    localStorage.setItem('cartArr', JSON.stringify(products));
}

// calculate cart total
function calculateCartTotal(){
    let cartTotal = 0;
    for (const product of products){
        let currTotal = product.qty * product.price;
        cartTotal += currTotal; 
    }
    updateCartTotal(cartTotal);
}

// updates cart total in DOM and local storage
function updateCartTotal(cartTotal){
    totalEl.innerHTML = ` TOTAL : $ ${cartTotal}`;
    localStorage.setItem('cartTotal', cartTotal);
}

// checkout function
function checkout(){
    window.location.href = "./checkout.html";
}
export default Cart;