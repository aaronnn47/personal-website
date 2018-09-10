import React, {Component} from 'react'
import axios from 'axios'
import {updateUser} from '../../ducks/reducer'
import {connect} from 'react-redux'
import Header from '../../Views/Header/Header'
import Footer from '../../Views/Footer/Footer'
import './Account.css'

class Account extends Component{
    constructor(props){
        super(props)

        this.state={
            user:{}
        }
    }


    async componentDidMount(){
        let res = await axios.get('/api/user-data')
        this.props.updateUser(res.data)
    }

    render(){
        let {user} = this.props
        return(
            <div>

            <Header/> 
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
            <Footer/>

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