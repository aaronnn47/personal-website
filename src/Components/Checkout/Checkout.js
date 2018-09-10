import React,{Component} from 'react'
import './Checkout.css'
import axios from 'axios'
import edit from './edit.svg'
import {connect} from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import Header from '../../Views/Header/Header'
import Footer from '../../Views/Footer/Footer'


class Checkout extends Component{
    constructor(){
        super()
        this.state={
          shipping:[],
          bitcoin: 0,
          crypto_data: [],
          hideFirstNameInput: 'hidden',
          hideLastNameInput: 'hidden',
          hideAddressInput: 'hidden',
          hideCityInput: 'hidden',
          hideStInput: 'hidden',
          hideZipInput: 'hidden',
          firstNameIcon: 'block',
          lastNameIcon: 'block',
          addressIcon: 'block',
          cityIcon: 'block',
          stIcon: 'block',
          zipIcon: 'block',
          firstNameEdit: '',
          lastNameEdit: '',
          addressEdit: '',
          cityEdit: '',
          stEdit: '',
          zipEdit: '',
          cart: [],
          address: '',
          city: '',
          st: '',
          zip:''
        }
    }

    handleChange(e){
      let {name, value} = e.target

      this.setState({
        [name]: value
      })
    }

    onToken = token => {
      token.card = void 0;
      axios
        .post("/api/payment", {
          token,
          amount: this.props.total * 100
        })
        .then(resp => {
          console.log(resp);
        });
    };

    showFirstInput(){
      this.setState({
        hideFirstNameInput: 'text',
        firstNameIcon: 'none',
      })
    }
    showLastInput(){
      this.setState({
        hideLastNameInput: 'text',
        lastNameIcon: 'none',
      })
    }
    showAddressInput(){
      this.setState({
        hideAddressInput: 'text',
        addressIcon: 'none',
      })
    }
    showCityInput(){
      this.setState({
        hideCityInput: 'text',
        cityIcon: 'none',
      })
    }
    showStInput(){
      this.setState({
        hideStInput: 'text',
        stIcon: 'none',
      })
    }
    showZipInput(){
      this.setState({
        hideZipInput: 'text',
        zipIcon: 'none',
      })
    }

    editFirstName(){
      axios.put('/editShippingFirstName',)
    }

    componentDidMount(){
      this.getShippingDetail()
      this.getWallet()
      this.getBitcoin()
      this.getCart()
    }

    getCart(){
      axios.get('/api/getcart')
      .then(resp=>{
        this.setState({cart: resp.data})
      })
    }

    getShippingDetail(){
      axios.get('/api/getShipping')
      .then(resp=>{
        if(resp.data[0]){
          this.setState({
            shipping:resp.data,
            address: resp.data[0].address,
            city: resp.data[0].city,
            st: resp.data[0].st,
            zip: resp.data[0].zip
          })
        }else{
          this.props.history.push('/shipping')
        }
      })
    }

    getWallet(){
      axios.get('/api/getbitcoin')
      .then(resp=>{
        this.setState({bitcoin: resp.data[0].sum})
      })
    }

    getBitcoin() {
      axios.get('https://api.coinmarketcap.com/v2/ticker/1/')
      .then(resp => {
        this.setState({ crypto_data: resp.data.data.quotes.USD.price })
      })
    }

    sellBitcoin(){
      axios.post('/api/sellTransactions',{price: this.props.total})
      .then(resp=>{
        this.deleteEverythingFromCart()
        this.props.history.push('/confirmation')
      })
    }


    handleFirstName(e,id,text){
      if(e.key ==='Enter'){
        axios.put(`/api/editFirstInfo/${id}`,{text})
        .then(resp=>{
          this.getShippingDetail()
          this.setToDefault()
        })
      }
    }

    handleLastName(e,id,text){
      if(e.key ==='Enter'){
        axios.put(`/api/editLastInfo/${id}`,{text})
        .then(resp=>{
          this.getShippingDetail()
          this.setToDefault()
        })
      }
    }

    handleAddress(e,id,text){
      if(e.key ==='Enter'){
        axios.put(`/api/editAddressInfo/${id}`,{text})
        .then(resp=>{
          this.getShippingDetail()
          this.setToDefault()
        })
      }
    }
    handleCity(e,id,text){
      if(e.key ==='Enter'){
        axios.put(`/api/editCityInfo/${id}`,{text})
        .then(resp=>{
          this.getShippingDetail()
          this.setToDefault()
        })
      }
    }
    handleSt(e,id,text){
      if(e.key ==='Enter'){
        axios.put(`/api/editStInfo/${id}`,{text})
        .then(resp=>{
          this.getShippingDetail()
          this.setToDefault()
        })
      }
    }
    handleZip(e,id,text){
      if(e.key ==='Enter'){
        axios.put(`/api/editZipInfo/${id}`,{text})
        .then(resp=>{
          this.getShippingDetail()
          this.setToDefault()
        })
      }
    }

    setToDefault(){
      this.setState({
        hideFirstNameInput: 'hidden',
        hideLastNameInput: 'hidden',
        hideAddressInput: 'hidden',
        hideCityInput: 'hidden',
        hideStInput: 'hidden',
        hideZipInput: 'hidden',
        firstNameIcon: 'block',
        lastNameIcon: 'block',
        addressIcon: 'block',
        cityIcon: 'block',
        stIcon: 'block',
        zipIcon: 'block',
      })
    }

    deleteEverythingFromCart(){
      axios.delete(`/api/deleteEverythingFromCart/`)
    }

    addOrder(obj){
      axios.post('/api/addToOrder', obj)
      .then(resp=>{
        this.sellBitcoin()
      })
    }


    render(){
    console.log(this.props.total)

    const timestamp = Date.now()
    let newTimestamp = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(timestamp)

    let shippingInfo = this.state.shipping.map((ele,i)=>{
      return(
        <div key={i} className='mapped-shipping'>
          <h1>Checkout</h1>
          <div className='ele-div'>
            <div>{ele.firstname}</div>
            <img src={edit} alt=''
            onClick={()=>this.showFirstInput()}
            style={{display:`${this.state.firstNameIcon}`}}
            />
            <input
            name='firstNameEdit' 
            value={this.state.firstNameEdit}
            type={this.state.hideFirstNameInput}
            onChange={e => this.handleChange(e)}
            onKeyPress={(e)=>this.handleFirstName(e,ele.user_id,this.state.firstNameEdit)}
            />
          </div>
          <div className='ele-div'>
            <div>{ele.lastname}</div>
            <img src={edit} alt=''
            onClick={()=>this.showLastInput()}
            style={{display:`${this.state.lastNameIcon}`}}
            />
            <input type={this.state.lastNameInput}
            name='lastNameEdit' 
            value={this.state.lastNameEdit}
            type={this.state.hideLastNameInput}
            onChange={e => this.handleChange(e)}
            onKeyPress={(e)=>this.handleLastName(e,ele.user_id,this.state.lastNameEdit)}            
            />
          </div>

          <div className='ele-div'>
          <div>{ele.address}</div>
          <img src={edit} alt=''
          onClick={()=>this.showAddressInput()}
          style={{display:`${this.state.addressIcon}`}}          
          />
          <input type={this.state.addressInput}
            name='addressEdit' 
            value={this.state.addressEdit}
            type={this.state.hideAddressInput}
            onChange={e => this.handleChange(e)}
            onKeyPress={(e)=>this.handleAddress(e,ele.user_id,this.state.addressEdit)}          
          />
          </div>

          <div className='ele-div'>
          <div>{ele.city}</div>
          <img src={edit} alt=''
          onClick={()=>this.showCityInput()}
          style={{display:`${this.state.cityIcon}`}}          
          />
          <input type={this.state.cityInput}
            name='cityEdit' 
            value={this.state.cityEdit}
            type={this.state.hideCityInput}
            onChange={e => this.handleChange(e)} 
            onKeyPress={(e)=>this.handleCity(e,ele.user_id,this.state.cityEdit)}         
          />
          </div>

          <div className='ele-div'>
          <div>{ele.st}</div>
          <img src={edit} alt=''
          onClick={()=>this.showStInput()}
          style={{display:`${this.state.stIcon}`}}           
          />
          <input type={this.state.stInput}
            name='stEdit' 
            value={this.state.stEdit}
            type={this.state.hideStInput}
            onChange={e => this.handleChange(e)}
            onKeyPress={(e)=>this.handleSt(e,ele.user_id,this.state.stEdit)}          
          />
          </div>

          <div className='ele-div'>
          <div>{ele.zip}</div>
          <img src={edit} alt=''
          onClick={()=>this.showZipInput()}
          style={{display:`${this.state.zipIcon}`}}           
          />
          <input type={this.state.zipInput}
            name='zipEdit' 
            value={this.state.zipEdit}
            type={this.state.hideZipInput}
            onChange={e => this.handleChange(e)}
            onKeyPress={(e)=>this.handleZip(e,ele.user_id,this.state.zipEdit)}
                 
          />
          </div>
        </div>
      )
    })
    
    return(
    <div className='checkout'>
        <Header/>
        <div className="checkout-container">
          {shippingInfo}
        </div>

          <div className='totals'>
          <div>Total: {this.props.total}.00</div>
          <div>BTC: {parseFloat(this.props.total/this.state.crypto_data).toFixed(8)}</div>
          </div>

          <div className='checkout-buttons-div'>
          <button className='checkout-bitcoin' 
          onClick={
          // ()=>this.sellBitcoin({price:this.props.total})
          ()=>this.addOrder({
            date: newTimestamp,
            address: this.state.address,
            city: this.state.city,
            st: this.state.st,
            zip: this.state.zip,
            total: this.props.total
          })
        }
          >Pay With Bitcoin</button>
          <StripeCheckout
              name="Clonebase"
              description="Thank you for your purchase"
              image="http://via.placeholder.com/100x100"
              token={this.onToken}
              stripeKey={process.env.REACT_APP_STRIPE_KEY}
              amount={this.props.total * 100}
            />

          </div>
          <Footer/>
    </div>
    )
    }

}

function mapStateToProps(state){
  return{
    total:state.total
  }
}

export default connect(mapStateToProps,{})(Checkout)