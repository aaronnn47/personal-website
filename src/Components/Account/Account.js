import React, {Component} from 'react'
import axios from 'axios'
import {updateUser} from '../../ducks/reducer'
import {connect} from 'react-redux'
import './Account.css'
import {Link} from 'react-router-dom'
import home from './home.svg'
import cart from './shopping-cart.svg'
import avatar from './avatar.svg'
import banknote from './banknote.svg'

class Account extends Component{
    constructor(props){
        super(props)

        this.state={
            user:{},
            menuShow: false,
        }
    }

    showMenu(){
        this.setState({
            menuShow: !this.state.menuShow
        })
    }

    async componentDidMount(){
        let res = await axios.get('/api/user-data')
        this.props.updateUser(res.data)
    }

    render(){
        let {user} = this.props
        return(
            <div className='background'>
                <nav>
                    <div>Account Details</div>
                    <div className="hamburger"
                    onClick={()=>this.showMenu()}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </nav>
                <div className={(this.state.menuShow ? 'dropDownShow': '') + ' dropdown'}>
                    <ul>
                        <Link to='/mens'>
                        <li>Mens</li>
                        </Link>

                        <Link to='/womens'>
                        <li>Womens</li>
                        </Link>
                        
                        <Link to='/kids'>
                        <li>Kids</li>
                        </Link>

                        <Link to='/accessories'>
                        <li>Accessories</li>
                        </Link>
                        <Link to='/hats'>
                        <li>Hats</li>
                        </Link>
                    </ul>
                </div>
                
            <div className="account-detail">
            {
                user.user_name ? (
                    <div className="account-user">
                        <p>Account Holder: {user.user_name}</p>
                        <p>Email: {user.email}</p>
                        <img src={user.picture} alt=""/>
                    </div>
                )
                : (<p>Please Log In</p>)
            } 
            <a href="http://localhost:3005/auth/logout"
            className="logout-button">
            Logout
            </a>

            </div>

            <div className="footer">
                    <Link to='/home' className='link'>
                    <img src={home} alt="" />
                    </Link>

                    <Link to='/wallet' className='link'>
                    <img src={banknote} alt="" />
                    </Link>

                    <Link to='/cart' className='link'>
                    <img src={cart} alt="" />
                    </Link>

                    <Link to='/account' className='link'>
                    <img src={avatar} alt="" />
                    </Link>
                    
                </div>
            </div>
            
        )
    }
}

function mapStateToProps(state){
    return{
        user: state.user
    }
}

export default connect(mapStateToProps,{updateUser})(Account)