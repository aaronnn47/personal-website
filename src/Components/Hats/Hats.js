import React,{Component} from 'react'
import axios from 'axios'
import Header from '../../Views/Header/Header'
import Footer from '../../Views/Footer/Footer'


class Mens extends Component{
    constructor() {
        super()

        this.state = {
            menuShow: false,
            hats: []
        }
    }

    componentDidMount(){
        axios.get('/api/get-hat')
        .then(resp=>{
            this.setState({hats: resp.data})
        })
    }

    addToCart(obj){
        axios.post('/api/addtocart', obj)
    }

    showMenu(){
        this.setState({
            menuShow: !this.state.menuShow
        })
    }

    render(){
        let hat = this.state.hats.map((ele,i)=>{
            return (
                <div key={i} className='product'>
                    <div>${ele.price}</div>
                    <div>{ele.description}</div>
                    <img src={ele.image} alt=""/>
                    <button
                    onClick={()=>this.addToCart(
                    {id: ele.id})}>Add to Cart</button>
                </div>
            )
        })
        return(
            <div>
                <Header/>
                    <div className='shirts'>
                    {hat}
                    </div>
                <Footer/>
            </div>
        )
    }
}

export default Mens