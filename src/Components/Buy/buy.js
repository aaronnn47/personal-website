import React, { Component } from "react";
import "./buy.css";
import axios from "axios";
import { updatePrice, clearPrice } from "../../ducks/reducer";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import Header from '../../Views/Header/Header'
import Footer from '../../Views/Footer/Footer'


class Buy extends Component {
  constructor() {
    super();

    this.state = {
      menuShow: false
    };
  }


  updateBuy() {
    axios.post("/api/transactions", {
      price: this.props.price
    });
  }

  onToken = token => {
    token.card = void 0;
    axios
      .post("/api/payment", {
        token,
        amount: this.props.price * 100
      })
      .then(resp => {
        this.props.history.push('/home')
        this.props.clearPrice()
      });
  };

  render() {
    console.log(this.props.price);

    return (
      <div>
        <Header/>
        <div className="display">${this.props.price}</div>

        <div className="button-class">
          <button onClick={() => this.props.updatePrice("1")}>1</button>
          <button onClick={() => this.props.updatePrice("2")}>2</button>
          <button onClick={() => this.props.updatePrice("3")}>3</button>
          <button onClick={() => this.props.updatePrice("4")}>4</button>
          <button onClick={() => this.props.updatePrice("5")}>5</button>
          <button onClick={() => this.props.updatePrice("6")}>6</button>
          <button onClick={() => this.props.updatePrice("7")}>7</button>
          <button onClick={() => this.props.updatePrice("8")}>8</button>
          <button onClick={() => this.props.updatePrice("9")}>9</button>
          <button onClick={() => this.props.updatePrice(".")}>.</button>
          <button onClick={() => this.props.updatePrice("0")}>0</button>
          <button onClick={() => this.props.clearPrice()}>clear</button>
        </div>

        <div className="preview">
          <div onClick={() => this.updateBuy()}>
            <StripeCheckout
              name="Clonebase"
              description="Thank you for your purchase"
              image="http://via.placeholder.com/100x100"
              token={this.onToken}
              stripeKey={process.env.REACT_APP_STRIPE_KEY}
              amount={this.props.price * 100}
            />
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    price: state.price
  };
}
export default connect(mapStateToProps,
  { updatePrice, clearPrice }
)(Buy);
