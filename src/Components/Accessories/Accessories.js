import React, { Component } from 'react'
import './Accessories.css'
import axios from 'axios'
import Header from '../../Views/Header/Header'
import Footer from '../../Views/Footer/Footer'

class Accessories extends Component {
    constructor() {
        super()

        this.state = {
            accessories: []
        }
    }
    componentDidMount(){
        axios.get('/api/get-accessories')
        .then(resp=>{
            this.setState({accessories:resp.data})
        })
    }

    addToCart(obj){
        axios.post('/api/addtocart', obj)
    }

    render() {
        let accessories = this.state.accessories.map((ele,i)=>{
            return (
                <div key={i} className='product'>
                    <div>${ele.price}</div>
                    <div>{ele.description}</div>
                    <img src={ele.image} alt=""/>
                    <button
                    onClick={()=>this.addToCart({id: ele.id})}>Add to Cart</button>
                    <hr/>
                </div>
            )
        })
        return (
            <div>
                
                <Header/>
                {accessories}
                <Footer/>

            </div>
        )
    }
}

export default Accessories