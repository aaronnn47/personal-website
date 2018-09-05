import React, { Component } from "react";
import "./Wallet.css";
import axios from "axios";
import { Link } from "react-router-dom";
import avatar from "./avatar.svg";
import banknote from "./banknote.svg";
import home from "./home.svg";
import cart from "./shopping-cart.svg";
import qr from "./qr_code.png";

class Account extends Component {
  constructor() {
    super();

    this.state = {
      menuShow: false,
      publicKey: false,
      address: false,
      bitcoinTransaction: null,
      bitcoin: null,
      crypto: []
    };
  }

  componentDidMount() {
    this.getBitcoinTransaction();
    this.getBitcoin();
    this.getOtherCoins();
  }

  getBitcoinTransaction() {
    axios.get("api/getbitcoin").then(resp => {
      this.setState({ bitcoinTransaction: resp.data[0].sum });
    });
  }

  getOtherCoins() {
    axios
      .get("https://api.coinmarketcap.com/v2/ticker/?limit=10")
      .then(resp => {
        this.setState({
          crypto: resp.data.data
        });
      });
  }

  getBitcoin() {
    axios.get("https://api.coinmarketcap.com/v2/ticker/1/").then(resp => {
      this.setState({
        bitcoin: resp.data.data.quotes.USD.price
      });
    });
  }

  showPublicKey() {
    this.setState({
      publicKey: true
    });
  }

  showSendAddress() {
    this.setState({
      address: true
    });
  }

  setToFalse() {
    this.setState({
      publicKey: false,
      address: false
    });
  }

  showMenu() {
    this.setState({
        menuShow: !this.state.menuShow
    })
    }

  render() {
    let bitcoin = Math.round((this.state.bitcoin * 100) / 100);
    let transaction = this.state.bitcoinTransaction;
    let crypto = [];
    for (var prop in this.state.crypto) {
      crypto.push(this.state.crypto[prop]);
    }

    let cryptoData = crypto.map((ele, i) => {
      return (
        <div key={i} className="crypto">
          <div>{ele.name}</div>
          {/* <div className="ele-symbol">{ele.symbol}</div> */}
          <div>{parseFloat(ele.quotes.USD.price).toFixed(2)}</div>
        </div>
      );
    });

    return (
      <div className="background">
        <nav>
          <div>Wallet</div>
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

        <div className="wallet-body" onClick={() => this.setToFalse()}>
          <h1>Bitcoin</h1>
          <h3>${transaction}</h3>
          <p>{parseFloat(transaction / bitcoin).toFixed(8)}</p>
          {cryptoData}
        </div>

        <div
          className={
            (this.state.publicKey ? "showPublicKeyShow" : "") + " showPublicKey"
          }
        >
          3N99XUQTS1FMQnsnzF1ZJm54752qh1isWy
          <img className="qr" src={qr} alt="" />
        </div>

        <div
          className={
            (this.state.address ? "showAddressShow" : "") + " showAddress"
          }
        >
          <p>Send</p>
          <input />
          <button>Confirm</button>
        </div>

        <div className="send-receive">
          <button onClick={() => this.showSendAddress()}>Send</button>

          <button onClick={() => this.showPublicKey()}>Receive</button>
        </div>

        <div className="footer" onClick={this.alwaysMount}>
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

export default Account;
