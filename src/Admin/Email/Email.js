import React,{Component} from 'react'
import axios from 'axios'


class Email extends Component{
    constructor(){
        super()

        this.state={
            user: []
        }
    }

    


    render(){
        console.log(this.state.user)
        return(
            <div>
                hello
            </div>
        )
    }
}

export default Email