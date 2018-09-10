import React, { Component } from 'react'
import './Womens.css'
import axios from 'axios'
import Header from '../../Views/Header/Header'
import Footer from '../../Views/Footer/Footer'

class Womens extends Component {
    constructor() {
        super()

        this.state = {
            menuShow: false,
            womens: []
        }
    }
    componentDidMount() {
        axios.get('/api/womens-clothes')
            .then(resp => {
                this.setState({ womens: resp.data })
            })
    }

    addToCart(obj){
        axios.post('/api/addtocart', obj)
    }

    showMenu() {
        this.setState({
            menuShow: !this.state.menuShow
        })
    }
    render() {
        let shirts = this.state.womens.map((ele, i) => {
            return (
                <div key={i} className='product'>
                    <div>${ele.price}</div>
                    <div>{ele.description}</div>
                    <img src={ele.image} alt="" />
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

export default Womens