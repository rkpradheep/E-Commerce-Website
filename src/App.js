import './index.js';
import "bootstrap/dist/css/bootstrap.min.css";
import SignUpSignIn from './Components/SignUpSignIn';
import Product from './Components/Product';
import Cart from './Components/Cart';
import CheckOut from './Components/CheckOut';
import Admin from './Components/Admin';
import ModifyProducts from './Components/ModifyProducts';
import Home from './Components/Home';
import React, { Component} from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import PurchaseHistory from './Components/PurchaseHistory.js';
import UserManagement from './Components/UserManagement.js';
import AccountSettings from './Components/AccountSettings.js';
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
     <Route exact path="/modifyproducts" component={ModifyProducts}/>
     <Route exact path="/" component={Home}/>
     <Route exact path="/admin/purchaseHistory" component={PurchaseHistory}/>
     <Route exact path="/admin/userManagement" component={UserManagement}/>
     <Route exact path="/user/accountSettings" component={AccountSettings}/>

     </Switch>
     
   </Router>
  
 
  );
  };
}
export default App;
