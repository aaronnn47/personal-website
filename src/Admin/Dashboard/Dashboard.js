import React, { Component } from "react";
import "./Dashboard.css";
import {Line} from 'react-chartjs-2'
import Timestamp from 'react-timestamp'
import axios from 'axios'
import home from '../../Images/home.svg'
import {connect} from 'react-redux'
import {updateAdmin} from '../../ducks/reducer'

class Dashboard extends Component {
  constructor(){
      super()

    this.state={
        orders:[]
    }
  }

  componentDidMount(){
    this.getOrders()
    this.mountAdminCred()
  }

  getOrders(){
      axios.get('/api/getOrders')
      .then(resp=>{
          this.setState({
              orders: resp.data
          })
      })
  }

  async mountAdminCred(){
      let adminData = await axios.get('/api/admin-data')
      this.props.updateAdmin(adminData.data)
  }


  render() {
    // console.log(this.state.orders)
    const data={
        labels: [1,2,3,4,5,2,1,3,2,4],
        datasets: [{
            data: [100,200,300,200,100,300,200,130,738,928],
            pointRadius: 0,
            // backgroundColor: 'green',
            
        
        }]
        
    }

    let {admin} = this.props
    console.log(admin)

    // let chartStuff = this.state.orders.map(ele=>{
    //     return 
    // })

    const timestamp = Date.now()
    let newTimestamp = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(timestamp)

    let orders = this.state.orders.map((ele,i)=>{
        return(
            <div key={i} className='admin-order'>
                <div>{ele.order_id}</div>
                <div>{ele.invoice_date}</div>
                <div>{ele.billing_address}</div>
                <div>{ele.billing_city}</div>
                <div>{ele.billing_st}</div>
                <div>{ele.billing_zip}</div>
                <div>{ele.total}</div>
            </div>
        )
    })
    
    return (
      <div>
          
      {
        admin.admin_id ? (
      <div className="admin-page">
        <div className="main-nav">
        
        </div>

        <div className="side-nav-display">
        </div>

        <div className="side-nav-content">

        </div>

        <div className="admin-side-nav">
        <img src={home} alt=''/>       
        
        </div>

        <div className="admin-graph">
        <h2>History</h2>
        <Line data={data} 
        width={100}
        height={35}
        className='chart-data'/>
        <Timestamp date='2018-09-08 05:21:00' format='full'/>
        </div>

        <div className="todo-body">
        <h4>To Do</h4>

        <div className='todo-submit-field'>
            <input/>
            <button>Submit</button>
        </div>
        
        </div>

        <div className="admin-order-history">
        <h4>Order History</h4>
        {orders}
        </div>
        
      </div>)
      : (<div>
        <p> please login</p>

      </div>)
      } 
    
      </div>
    );
  }
}

function mapStateToProps(state){
    return{
        admin: state.admin
    }
}


export default connect(mapStateToProps,{updateAdmin})(Dashboard);
