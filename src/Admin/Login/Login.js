import React,{Component} from 'react'
import './Login.css'
import axios from 'axios'
import PasswordMask from 'react-password-mask'


class Login extends Component{
    constructor(){
        super()

        this.state={
            username: '',
            password: ''
        }
    }

    handleChange(e){
        let {name, value} = e.target

        this.setState({
            [name]: value
        })
    }

    login(obj){
        axios.post('/api/adminLogin',obj)
        .then(resp=>{
            // console.log(resp.data.admin_id)
            if(resp.data.admin_id){
                this.props.history.push('/admin/home')
            }
            else{
                alert('please try again')
            }
        })
    }


    render(){
        return(
            <div className='admin-login-page'>
                <div className='admin-login-main-content'>
                    <h1>Please Login</h1>
                    <input 
                    name='username'
                    onChange={(e)=>this.handleChange(e)}
                    />
                    <PasswordMask 
                    name='password'
                    value={this.state.password}
                    onChange={(e)=>this.handleChange(e)}
                    useVendorStyles={false}
                    buttonStyle={'none'}
                    />
                    <button
                    onClick={()=>this.login(
                    {
                        username: this.state.username,
                        password: this.state.password
                    }
                    
                    )}
                    >Login</button>
                </div>
            </div>

        )
    }
}

export default Login