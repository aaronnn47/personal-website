import React, { Component } from "react";
import "./Sell.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { updatePrice, clearPrice } from "../../ducks/reducer";
import { connect } from "react-redux";

class Sell extends Component {
  constructor() {
    super();

    this.state = {
      menuShow: false
    };
  }
  showMenu() {
    this.setState({
      menuShow: !this.state.menuShow
    });
  }


  updateBuy() {
    axios.post("/api/sellTransactions", {
      price: parseInt(this.props.price, 10)
    })
    .then(resp=>{
      this.props.clearPrice()
    })
  }

  render() {
    console.log(this.props.price);
    return (
      <div>

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
          <Link to="/home" className="preview-link">
            <button onClick={() => this.updateBuy()}>Confirm</button>
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    price: state.price
  };
}
export default connect(
  mapStateToProps,
  { updatePrice, clearPrice }
)(Sell);
