import './index.js';
import SignUpSignIn from './Components/SignUpSignIn';
import Product from './Components/Product';
import Cart from './Components/Cart';
import CheckOut from './Components/CheckOut';

import React, { Component} from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

class App extends Component {
  render(){
  return (
   <Router>
     <Switch>
     <Route exact path="/" component={SignUpSignIn}/>
     <Route exact path="/product" component={Product}/>
     <Route exact path="/cart" component={Cart}/>
     <Route exact path="/checkout" component={CheckOut}/>

     </Switch>
     
   </Router>
  
 
  );
  };
}
export default App;
