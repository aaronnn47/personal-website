import React,{Component} from 'react'
import './Mens.css'
import {Link} from 'react-router-dom'
import avatar from './avatar.svg'
import banknote from './banknote.svg'
import home from './home.svg'
import cart from './shopping-cart.svg'
import axios from 'axios'
import Modal from 'react-modal'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        
    }
}



class Mens extends Component{
    constructor() {
        super()

        this.state = {
            menuShow: false,
            clothes: [],
            modalIsOpen: false,
        }
        this.openModal = this.openModal.bind(this)
        this.afterOpenModal = this.afterOpenModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        
    }

    openModal(){
        this.setState({
            modalIsOpen: true
        })
    }

    afterOpenModal(){
        this.subtitle.style.color = '#f00'
    }

    closeModal(){
        this.setState({
            modalIsOpen: false
        })
    }

    componentDidMount(){
        axios.get('/api/mens-clothes')
        .then(resp=>{
            this.setState({clothes: resp.data})
        })
    }

    addToCart(obj){
        axios.post('/api/addtocart', obj)
        .then(resp=>{
            this.openModal()
        })
    }

    showMenu(){
        this.setState({
            menuShow: !this.state.menuShow
        })
    }

    render(){
        let shirts = this.state.clothes.map((ele,i)=>{
            return (
                <div key={i} className='product'>
                    <div>${ele.price}</div>
                    <div>{ele.description}</div>
                    <img src={ele.image} alt=""/>
                    <button
                    onClick={()=>this.addToCart({id:ele.id})}
                    // onClick={this.openModal}
                    >Add to Cart</button>
                    <Modal 
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel='Added to Cart'
                    >
                    <h2 ref={subtitle => this.subtitle = subtitle}></h2>
                    <div>Added To Cart</div>
                    <button onClick={this.closeModal}>close</button>
                    </Modal>

                </div>
            )
        })
        return(
            <div>
                <nav>
                    <div>Mens</div>
                    <div className="hamburger"
                    onClick={()=>this.showMenu()}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </nav>

                <div className={(this.state.menuShow ? 'dropDownShow': '') + ' dropdown'}>
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

export default Mens