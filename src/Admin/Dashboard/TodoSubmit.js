import React,{Component} from 'react'
import './TodoSubmit.css'
import axios from 'axios'

class TodoSubmit extends Component{
    constructor(){
        super()

        this.state={
            todo: ''
        }

        this.onChange = this.onChange.bind(this)
    }

    onChange(e){
        this.setState({
            todo: e.target.value
        })
    }

    addTodo(obj){
        axios.post('/api/todo',obj)
    }


    render(){
        return(
            <div className='todo-submit'>
            <input onChange={this.onChange}/>
            {/* {this.state.todo} */}
            <button
            onClick={()=>this.addTodo({todo: this.state.todo})}
            className='todo-button'
            >Add</button>
            </div>
        )
    }
}

export default TodoSubmit