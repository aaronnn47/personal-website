import React,{Component} from 'react'
import axios from 'axios'
import './Email.css'
import {Link} from 'react-router-dom'

class Email extends Component{
    constructor(){
        super()

        this.state={
            emails: []
        }
    }

    
    componentDidMount(){
        this.getEmails()
    }

    getEmails(){
        axios.get('/api/getEmails')
        .then(resp=>{
            this.setState({
                emails: resp.data.emails
            })
        })
    }

    render(){
        console.log(this.state.emails)
        let email = this.state.emails.splice(0,1)
        let emails = this.state.emails.map((ele,i)=>{
            return(
                <div key={i} className='emails'>
                    <div>{ele.date}</div>
                    <div>{ele.from}</div>
                    <div>{ele.subject}</div>
                    {/* <div>{ele.textHtml}</div> */}
                    <div>{ele.to}</div>
                    {/* <div></div> */}
                    <div>{ele.textPlain}</div>
                </div>
            )
        })

        return(
            <div className='email-body'>
                <h1 className='email-header'>Emails</h1>
                <div className='email-template'>
                {emails}
                </div>
                <Link 
                to='/admin/home'
                className='email-back-button'
                >Go home</Link>
            </div>
        )
    }
}

export default Email