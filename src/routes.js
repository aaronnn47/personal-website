import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from '../src/Components/Home/Home'
import Buy from '../src/Components/Buy/buy'
import Account from '../src/Components/Account/Account'
import Cart from '../src/Components/Cart/Cart'
import Wallet from '../src/Components/Wallet/Wallet'
import Accessories from '../src/Components/Accessories/Accessories'
import Mens from '../src/Components/Mens/Mens'
import Womens from '../src/Components/Womens/Womens'
import Kids from '../src/Components/Kids/Kids'
import Login from '../src/Components/Login/Login'
import Sell from '../src/Components/Sell/Sell'
import Hats from '../src/Components/Hats/Hats'
import Shipping from '../src/Components/Shipping/Shipping'
import Checkout from '../src/Components/Checkout/Checkout'
import Confirmation from '../src/Components/Confirmation/Confirmation'
import Admin from '../src/Admin/Dashboard/Dashboard'


export default (
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
<Route path='/admin' component={Admin}/>
</Switch>

);