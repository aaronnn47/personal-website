import React, { Component } from "react";
import "./Dashboard.css";
import {Link} from 'react-router-dom'
import { Bar } from "react-chartjs-2";
import Timestamp from "react-timestamp";
import axios from "axios";
import home from "../../Images/home.svg";
import avatar from '../../Images/avatar.svg'
import calendar from '../../Images/calendar.svg'
import email from '../../Images/arroba.svg'
import Calendars from 'react-calendar'
import Todo from './Todo'
import TodoSubmit from './TodoSubmit'

import { connect } from "react-redux";
import { updateAdmin } from "../../ducks/reducer";

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      orders: [],
      reducedData:[],
      newOrders: [],
      date: new Date(),
      monthTotal: null,
      todo:[]
    };
  }

  componentDidMount() {
    this.getMappedData()
    this.getOrders();
    this.mountAdminCred();
    this.getTodo()
  }

  getTodo(){
    axios.get('/api/getTodo')
    .then(resp=>{
        this.setState({
            todo: resp.data
        })
    })
}
  
  componentDidUpdate(previousProps, previousState){
    if(previousState.orders !== this.state.orders){
      this.makeChartData([...this.state.orders])
    }
  }

  getMonthTotal(obj){
    let month = obj.map(ele=>{
      return ele.invoice_date.split('/')[0]
    })

    let year = obj.map(ele=>{
      return ele.invoice_date.split('/')[2]
    }).sort((a,b)=>{
      return b - a
    })
   
    let monthTotal = obj.reduce((acc,cur)=>{
      if(month[month.length - 1] === cur.invoice_date.split('/')[0] && year[0] === cur.invoice_date.split('/')[2]){
      return acc + cur.total
      }else{
        return acc
      }
    },0)

    this.setState({
      monthTotal: monthTotal
    })
  }

  getOrders() {
    axios.get('/api/getOrders').then(resp => {
      this.setState({orders: resp.data})
      this.getMonthTotal(this.state.newOrders)
    });
  }

  onChange(date){
    this.setState({date: date})
  }

  makeChartData(data){
    let chartData = [];
    data.forEach(order => {
      let index = chartData.findIndex(
        item => item.invoice_date === order.invoice_date
      );
      if (index >= 0) {
        chartData[index].total += order.total;
      } else {
        chartData.push(order);
      }
    });
    this.setState({
        reducedData: chartData
    })
  }

  getMappedData(){
      axios.get('api/getOrders')
      .then(resp=>{
          this.setState({
              newOrders: resp.data
          })
      })
  }

  async mountAdminCred() {
    let adminData = await axios.get("/api/admin-data");
    this.props.updateAdmin(adminData.data);
  }

  render() {
    let totalProfit = this.state.reducedData.reduce((acc, cur)=>{
        return acc + cur.total
    },0)
    
    let totalOrders = this.state.newOrders.length
    // console.log(this.state.newOrders)
    let { admin } = this.props;

    let total = []
    let date = []
    this.state.reducedData.forEach(obj=>{
        total.push(obj.total)
        date.push(obj.invoice_date)
    })

    const data = {
      labels: date,
      datasets: [
        {
          data: total,
          pointRadius: 0
        }
      ]
    };

    const timestamp = Date.now();
    let newTimestamp = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(timestamp);

    let orders = this.state.newOrders.map((ele, i) => {
      return (
        <div key={i} 
        className="admin-order"
        >
          <div >{ele.order_id}.</div>
          <div >{ele.invoice_date}</div>
          <div>{ele.billing_address}</div>
          <div>{ele.billing_city}</div>
          <div>{ele.billing_state}</div>
          <div>{ele.billing_zip}</div>
          <div>${ele.total}.00</div>
        </div>
      );
    });
    return (
      <div>
        {admin.admin_id ? (
          <div className="admin-page">
            <div className="main-nav">
            <h1>Welcome Home Admin</h1>
            </div>

            <div className="side-nav-content">
            </div>

            <div className="admin-side-nav">

              <img src={home} alt="" />
              <p>Home</p>
              <Link to='/admin/admin'>
              <img src={avatar} alt="" />
              </Link>
              <p>Account</p>
              <Link to='/admin/calendar'>
              <img src={calendar} alt="" />
              </Link>
              <p>Calendar</p>

              <img src={email} alt="" />
              <p>Email</p>
            </div>

            <div className="admin-graph">
              {/* <h2>History</h2> */}
              <Bar
                data={data}
                width={70}
                height={30}
                options={{
                  maintainAspectRatio: false
                }}
                // className="chart-data"
              />
              <Timestamp date="2018-09-08 05:21:00" format="full" />
            </div>

            <div className="todo-body">
              <div className='todo-header'>
              <h2>To Do List</h2>
              </div>

              <div className='todo-content'>
              <Todo todo={this.state.todo}/>
              </div>

              <div className="todo-submit-field">
              <TodoSubmit />
              </div>
            </div>

            <div className="admin-order-history">
              <h1 className='order-history-header'>Order History</h1>
              {orders}
            </div>

            <div className='admin-right-nav'>

            <div className='total-order'>
            <h4>Total Orders</h4>
            {totalOrders}
            </div>

            <div className='profit'>
            <h2> Total Profit</h2>
            ${totalProfit}.00
            </div>

            <div className='month-profit'>
            <h4>Month Total</h4>
            ${this.state.monthTotal}.00
            </div>


            </div>


            <div className='calendar-component'>
            <Calendars
                value={this.state.date}
                width={100}
                />
            </div>
          </div>
        ) : (
          <div className="please-login">
            <div className="please-login-content">
              <h1>Please Login</h1>
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    admin: state.admin
  };
}

export default connect(
  mapStateToProps,
  { updateAdmin }
)(Dashboard);
