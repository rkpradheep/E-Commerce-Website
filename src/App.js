import './index.js';
import "bootstrap/dist/css/bootstrap.min.css";
import SignUpSignIn from './Components/SignUpSignIn';
import Product from './Components/Product';
import Cart from './Components/Cart';
import CheckOut from './Components/CheckOut';
import Admin from './Components/Admin';
import MofifyProducts from './Components/MofifyProducts';
import Home from './Components/Home';
import React, { Component} from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import $ from "jquery"
class App extends Component {
  render(){
  return (
    
   <Router>
     <Switch>
     <Route exact path="/signup" component={SignUpSignIn}/>
     <Route exact path="/product" component={Product}/>
     <Route exact path="/cart" component={Cart}/>
     <Route exact path="/checkout" component={CheckOut}/>
     <Route exact path="/admin" component={Admin}/>
     <Route exact path="/modifyproducts" component={MofifyProducts}/>
     <Route exact path="/" component={Home}/>

     </Switch>
     
   </Router>
  
 
  );
  };
}
export default App;
