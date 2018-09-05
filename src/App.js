import React, { Component } from 'react';
import './App.css';
import {HashRouter, Switch, Route} from 'react-router-dom'
import Home from './Components/Home/Home'
import Buy from './Components/Buy/buy'
import Account from './Components/Account/Account'
import Cart from './Components/Cart/Cart'
import Wallet from './Components/Wallet/Wallet'
import Accessories from './Components/Accessories/Accessories'
import Mens from './Components/Mens/Mens'
import Womens from './Components/Womens/Womens'
import Kids from './Components/Kids/Kids'
import Login from './Components/Login/Login'
import Sell from './Components/Sell/Sell'
import Hats from './Components/Hats/Hats'
import axios from 'axios';
import Shipping from './Components/Shipping/Shipping'
import Checkout from './Components/Checkout/Checkout'
import Confirmation from './Components/Confirmation/Confirmation'

class App extends Component {

  componentDidMount(){
    axios.get('/api/user-data')
  }
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route path='/home' component={Home}/>
          <Route path='/buy' component={Buy}/>
          <Route path='/account' component={Account}/>
          <Route path='/wallet' component={Wallet}/>
          <Route path='/cart' component={Cart}/>
          <Route path='/mens' component={Mens}/>
          <Route path='/womens' component={Womens}/>
          <Route path='/kids' component={Kids}/>
          <Route path='/accessories' component={Accessories}/>
          <Route path='/sell' component={Sell}/>
          <Route path='/shipping' component={Shipping}/>
          <Route path='/checkout' component={Checkout}/>
          <Route path='/confirmation' component={Confirmation}/>
          <Route path='/hats' component={Hats}/>
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
