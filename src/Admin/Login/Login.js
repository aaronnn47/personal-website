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

    rot13(str){
        var newString=[]

        for(var i = 0; i < str.length; i++){
            if(str.charCodeAt(i) < 65 || str.charCodeAt(i) > 90){
                newString.push(str.charAt(i))
            }else if(str.charAt(i) > 77){
                newString.push(String.fromCharCode(str.charCodeAt(i) - 13))

            }else{
                newString.push(String.fromCharCode(str.charCodeAt(i) + 13))

            }
        }

        return newString.join('')
    }

    render(){
        return(
            <div className='admin-login-page'>
                <div className='admin-login-main-content'>
                    <h1>Please Login</h1>
                    <input 
                    className='login-button'
                    name='username'
                    onChange={(e)=>this.handleChange(e)}
                    />
                    <PasswordMask 
                    name='password'
                    className='login-button'
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