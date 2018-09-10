import React, { Component } from 'react'
import './Kids.css'
import axios from 'axios'
import Header from '../../Views/Header/Header'
import Footer from '../../Views/Footer/Footer'

class Kids extends Component {
    constructor() {
        super()

        this.state = {
            clothes:[]
        }
    }

    componentDidMount(){
        axios.get('/api/kids-clothes')
        .then(resp=>{
            this.setState({clothes:resp.data})
        })
    }

    addToCart(obj){
        axios.post('/api/addtocart', obj)
    }

    render() {
        let shirts = this.state.clothes.map((ele,i)=>{
            return (
                <div key={i} className='product'>
                    <div>${ele.price}</div>
                    <div>{ele.description}</div>
                    <img src={ele.image} alt=""/>
                    <button
                    onClick={()=>this.addToCart({id:ele.id})}>Add to Cart</button>
                </div>
            )
        })
        return (
            <div>
                <Header/>
                
                    {shirts}
                <Footer/>

            </div>
        )
    }
}

export default Kids