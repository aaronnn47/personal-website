import React,{Component} from 'react'
import axios from 'axios'
import './Todo.css'


class Todo extends Component{
    constructor(props){
        super(props)

        this.state={
           todoFill: false 
        }
    }

    handleFill(){
        this.setState({
            todoFill: !this.state.todoFill
        })
    }

    render(){
        console.log(this.state.todoFill)
        let todo = this.props.todo.map((ele,i)=>{
            return(
                <div key={i}>
                    <div className='todo-elements'>

                    <div 
                    className='todo-checkbox'
                    onClick={()=>this.handleFill()}
                    >

                    <div 
                    className={
                    (this.state.todoFill ? 'todo-fill-show': '') + ' todo-checkbox'
                    }
                    />
                    </div>
                    
                    <div>{ele.todo}</div>                    
                    </div>
                </div>
            )
        })

        return(
            <div>
                {todo}
            </div>
        )

    }
}

export default Todo