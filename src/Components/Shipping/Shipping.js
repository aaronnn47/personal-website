import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import './Shipping.css'
import axios from 'axios'


class Shipping extends Component{
    constructor(){
        super()
        this.state={
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
    <div >
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
    
    </div>
    )
    }

}

export default Shipping