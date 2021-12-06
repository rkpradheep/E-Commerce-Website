import { getByDisplayValue } from "@testing-library/react";
import { Component } from "react";
import { Link,Redirect } from "react-router-dom";
import styles from "../Styles/cart.module.css";

class CheckOut extends Component{
    constructor()
    {
        super();
        this.state={
            LogOut:false,
        }
    }
    Exit=(e)=>{
    
        localStorage.setItem("name","");
        this.setState({LogOut:true});
        
    };

    render()
    
    {
        if(this.state.LogOut)
        return <Redirect to="/" />

       
        setTimeout(function(){Display()},500)
        return(
<div className={styles.body}>
 <div className={styles.outer} id="outer">
 </div>
<button className={styles.button} style={{width:"200px"}} onClick={this.Exit} id="home">Go to home</button>
</div>
        );
    };
}
var outerEl=null;
function Display()
{
 outerEl = document.getElementById('outer');
 getCartTotal();
}
function getCartTotal(){
    const temp = localStorage.getItem('cartTotal');
    const total = parseInt(temp);
    const cartArr = [];
    localStorage.setItem('cartArr', JSON.stringify(cartArr));
    localStorage.setItem('cartTotal', 0);
    updateDOM(total);
}

// end of the site 
function updateDOM(total){
    outerEl.innerHTML = `
        <h2>Thank you for shopping with us</h2>
        <h3>Your final total is : ${total}</h3>
    `;
}


export default CheckOut;