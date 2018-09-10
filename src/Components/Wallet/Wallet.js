import React, { Component } from "react";
import "./Wallet.css";
import axios from "axios";
import qr from "./qr_code.png";
import Header from '../../Views/Header/Header'
import Footer from '../../Views/Footer/Footer'

class Account extends Component {
  constructor() {
    super();

    this.state = {
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
          <div>{parseFloat(ele.quotes.USD.price).toFixed(2)}</div>
        </div>
      );
    });

    return (
      <div>
        <Header/>
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
        <Footer/>
      </div>
    );
  }
}

export default Account;
