import React,{Component} from 'react'
import './Mens.css'
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

                
                {shirts}
                


            </div>
        )
    }
}

export default Mens