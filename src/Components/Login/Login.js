import React,{Component} from 'react'
import logo from './cityscape.svg'
import './Login.css'

class Login extends Component{

    
    login(){
        let {REACT_APP_DOMAIN, REACT_APP_CLIENT_ID} = process.env
        let url = `${encodeURIComponent(window.location.origin)}/auth/callback`
        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${url}&response_type=code`
    }

    render(){
        return(
            <div className="login-page">
                <div className="login">
                    <img src={logo} alt="" />   
                    <button onClick={this.login}>Login</button>
                </div>
            
            </div>
        )
    }
}

export default Login