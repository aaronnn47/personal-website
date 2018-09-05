import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import './Shipping.css'
import home from "./home.svg";
import cart from "./shopping-cart.svg";
import avatar from "./avatar.svg";
import banknote from "./banknote.svg";
import axios from 'axios'


class Shipping extends Component{
    constructor(){
        super()
        this.state={
            menuShow: false,
            firstName: '',
            lastName: '',
            address:'',
            city:'',
            st: '',
            zip:0
        }
    }

    handleChange(e){
        let {name, value} = e.target

        this.setState({
            [name]:value
        })
    }

    showMenu() {
        this.setState({
          menuShow: !this.state.menuShow
        });
      }
    
    createShippingInfo(){
      axios.post('/api/shippingInfo',
      {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        city: this.state.city,
        st: this.state.st,
        zip: this.state.zip
      })
    }

    render(){
    return(
    <div className="background">
        <nav>
          <div>Checkout</div>
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
              <li>Mens</li>
            </Link>

            <Link to="/womens">
              <li>Womens</li>
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

        <div className="shipping-container">
            <h1>Shipping Details</h1>

            <div className='shipping-info'>
            <p>First Name:</p>
            <input
            placeholder="First Name"
            name='firstName'
            value={this.state.username}
            onChange={e => this.handleChange(e)}
            />

            <p>Last Name:</p>
            <input
            placeholder="Last Name"
            name='lastName'
            value={this.state.username}
            onChange={e => this.handleChange(e)}
            />

            <p>Address:</p>
            <input
            placeholder="Address"
            name='address'
            value={this.state.username}
            onChange={e => this.handleChange(e)}
            />

            <p>City:</p>
            <input
            placeholder='City'
            name='city'
            value={this.state.username}
            onChange={e => this.handleChange(e)}
            />

            <p>State:</p>
            <input
            placeholder='State'
            name='st'
            value={this.state.username}
            onChange={e => this.handleChange(e)}
            />

            <p>Zip Code:</p>
            <input
            placeholder='Zip Code'
            name='zip'
            value={this.state.username}
            onChange={e => this.handleChange(e)}
            />
            </div>
        </div>
        
        <div className='bottom-shipping-detail'>
            <Link to='/checkout'
            onClick={()=>this.createShippingInfo()}
            >Next
            
            </Link>
        </div>
    

    <div className="footer">
        <Link to="/home">
        <img src={home} alt="" />
        </Link>

        <Link to="/wallet">
        <img src={banknote} alt="" />
        </Link>

        <Link to="/cart">
        <img src={cart} alt="" />
        </Link>

        <Link to="/account">
        <img src={avatar} alt="" />
        </Link>
        </div>
    </div>
    )
    }

}

export default Shipping