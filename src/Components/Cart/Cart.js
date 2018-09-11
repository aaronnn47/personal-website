import React, { Component } from "react";
import "./Cart.css";
import { Link } from "react-router-dom";
import axios from "axios";
import x from './error.svg'
import up from './add.svg'
import down from './remove.svg'
import {connect} from 'react-redux'
import {updateTotal} from '../../ducks/reducer'
import Header from '../../Views/Header/Header'
import Footer from '../../Views/Footer/Footer'

class Cart extends Component {
  constructor() {
    super();

    this.state = {
      menuShow: false,
      cart: [],
      total: 0
    };
  }

  onToken = token => {
    token.card = void 0;
    axios
      .post('/api/payment', { token, amount: this.state.total * 100 })
      .then(res => {
        console.log(res);
      });
  };

  componentDidMount() {
    this.getCart()
  }
  
  getCart(){
    axios.get('/api/getcart')
    .then(resp => {
    this.setState({ cart: resp.data })
    })
  }  

  addQuantity(obj){
    axios.post('/api/addtocart',obj)
    .then(resp=>{
      this.getCart()
    })
  }

  removeQuanity(id){
    axios.delete(`/api/removequantity/${id}`)
    .then(resp=>{
      this.getCart()
    })
  }

  deleteCartItem(id){
    axios.delete(`/api/deleteItem/${id}`)
    .then(()=>{
      this.getCart()
    })
  }

  render() {
    console.log(this.state.cart)
    let newCart = [];
    for (var i = 0; i < this.state.cart.length; i++) {
      let flag = false;
      for (var j = 0; j < newCart.length; j++) {
        if (this.state.cart[i].id === newCart[j].id) {
          newCart[j].quantity++;
          flag = true;
        }
      }
      if (!flag) {
        newCart.push(Object.assign({}, this.state.cart[i], { quantity: 1 }));
      }
    }

    let total = newCart.reduce((acc, cur) => {
      return (acc += cur.price * cur.quantity);
    }, 0);

    //eslint-disable-next-line
    this.state.total = total;

    console.log(newCart)

    let mappedcart = newCart.map((ele, i) => {
      return (
        <div key={i} className="mapped-cart">
          <img src={ele.image} alt="" />
          <div className="ele">{ele.description}</div>
          <img className='up' src={up} alt=''
          onClick={()=>this.addQuantity({id:ele.id})}
          />
          <div>{ele.quantity}</div>
          <img className='down' src={down} alt=''
          onClick={()=>this.removeQuanity(ele.cart_id)}
          />

          <div>{ele.price}</div>
          <img className='x' src={x} alt=""
          onClick={()=>{this.deleteCartItem(ele.id)}}
          />
        </div>
      );
    });

    return (
      <div className='cart'>
        <Header/>
        <div className='cart-container'>
          {mappedcart}
        </div>

        <div className='total'>
          <p>Total:</p>
          {total}
        </div>

        <div className="bottom-cart-div">
            <Link to='/checkout'
            onClick={()=>this.props.updateTotal(this.state.total)}
            className='proceed-to-checkout'
            >
            Proceed To Checkout
            </Link>
            
        </div>
        <Footer/>
      </div>
    );
  }
}

function mapStatetoProps(state){
  return{
    total: state.total
  }
}

export default connect(mapStatetoProps,{updateTotal})(Cart);
