import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './Header.css'

export default class Header extends Component {
    constructor(){
        super();

        this.state={
            menuShow:false
        }
    }

    showMenu(){
        this.setState({
            menuShow: !this.state.menuShow
        })

    }

    render(){
        return(
        <div>
        <nav>
            <div>Clonebase</div>
            <div className="hamburger"
            onClick={()=>this.showMenu()}
            >
                <div></div>
                <div></div>
                <div></div>
            </div>
        </nav>
    
        <div 
        className={(this.state.menuShow ? 'dropDownShow': '') + ' dropdown'}
        >
            <ul>
                <Link to='/mens'
                onClick={()=>this.showMenu()}>
                <li>Mens</li>
                </Link>
                <Link to='/womens'
                onClick={()=>this.showMenu()}
                >
                <li>Womens</li>
                </Link>
                <Link to='/kids'
                onClick={()=>this.showMenu()}>
                <li>Kids</li>
                </Link>
                <Link to='/accessories'
                onClick={()=>this.showMenu()}>
                <li>Accessories</li>
                </Link>
                <Link to='/hats'
                onClick={()=>this.showMenu()}>
                <li>Hats</li>
                </Link>
            </ul>
        </div>
        </div>
        )

    }

}