import React, { Component } from "react";
import "./Sell.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { updatePrice, clearPrice } from "../../ducks/reducer";
import { connect } from "react-redux";
import home from "./home.svg";
import cart from "./shopping-cart.svg";
import avatar from "./avatar.svg";
import banknote from "./banknote.svg";

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
      <div className="background">
        <nav>
          <Link to="/home">
            <div>Clonebase</div>
          </Link>
          <div className="hamburger" onClick={() => this.showMenu()}>
            <div />
            <div />
            <div />
          </div>
        </nav>

        <div
          className={(this.state.menuShow ? "dropDownShow" : "") + " dropdown"}
        >
          <ul>
            <Link to="/mens">
              <li>Men</li>
            </Link>

            <Link to="/womens">
              <li>Women</li>
            </Link>

            <Link to="/kids">
              <li>Kids</li>
            </Link>

            <Link to="/accessories">
              <li>Accessories</li>
            </Link>

            <Link to="/hats">
              <li>Hats</li>
            </Link>
          </ul>
        </div>

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

        <div className="footer">
          <Link to="/home" className="link">
            <img src={home} alt="" />
          </Link>
          <Link to="/account" className="link">
            <img src={banknote} alt="" />
          </Link>
          <Link to="/cart" className="link">
            <img src={cart} alt="" />
          </Link>
          <Link to="/account" className="link">
            <img src={avatar} alt="" />
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
