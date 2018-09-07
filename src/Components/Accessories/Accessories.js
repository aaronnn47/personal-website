import React, { Component } from 'react'
import './Accessories.css'
import axios from 'axios'

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
                
                
                {accessories}
                

            </div>
        )
    }
}

export default Accessories