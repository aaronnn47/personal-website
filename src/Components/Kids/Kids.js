import React, { Component } from 'react'
import './Kids.css'
import { Link } from 'react-router-dom'
import avatar from './avatar.svg'
import banknote from './banknote.svg'
import home from './home.svg'
import cart from './shopping-cart.svg'
import axios from 'axios'

class Kids extends Component {
    constructor() {
        super()

        this.state = {
            menuShow: false,
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

    showMenu() {
        this.setState({
            menuShow: !this.state.menuShow
        })
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
                <nav>
                    <div>Kids</div>
                    <div className="hamburger"
                        onClick={() => this.showMenu()}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </nav>

                <div className={(this.state.menuShow ? 'dropDownShow' : '') + ' dropdown'}>
                    <ul>
                    <Link to='mens'>
                        <li>Mens</li>
                        </Link>
                        <Link to='womens'>
                        <li>Womens</li>
                        </Link>
                        <Link to='kids'>
                        <li>Kids</li>
                        </Link>
                        <Link to='accessories'>
                        <li>Accessories</li>
                        </Link>
                        <Link to='/hats'>
                        <li>Hats</li>
                        </Link>
                    </ul>
                </div>

                <div>
                    {shirts}
                </div>

                <div className="footer">
                    <Link to='/home' className="link">
                        <img src={home} alt="" />
                    </Link>
                    <Link to='/account' className="link">
                        <img src={banknote} alt="" />
                    </Link>
                    <Link to='/cart' className="link">
                        <img src={cart} alt="" />
                    </Link>
                    <Link to='/account' className="link">
                        <img src={avatar} alt="" />
                    </Link>

                </div>

            </div>
        )
    }
}

export default Kids