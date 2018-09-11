import React, { Component } from "react";
import "./Dashboard.css";
import { Bar } from "react-chartjs-2";
import Timestamp from "react-timestamp";
import axios from "axios";
import home from "../../Images/home.svg";
import avatar from '../../Images/avatar.svg'
import cart from '../../Images/cart.svg'
import wallet from '../../Images/banknote.svg'

import { connect } from "react-redux";
import { updateAdmin } from "../../ducks/reducer";

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      orders: [],
      reducedData:[],
      newOrders: []
    };
  }

  componentDidMount() {
    this.getMappedData()
    this.getOrders();
    this.mountAdminCred();
  }

  componentDidUpdate(previousProps, previousState){
    if(previousState.orders !== this.state.orders){
        this.makeChartData([...this.state.orders])
    }
  }

  getOrders() {
    axios.get('/api/getOrders').then(resp => {
      this.setState({
        orders: resp.data
      });
      return resp.data
    });
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
    },1)
    
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
        <div key={i} className="admin-order">
          <div>{ele.order_id}</div>
          <div >{ele.invoice_date}</div>
          <div>{ele.billing_address}</div>
          <div>{ele.billing_city}</div>
          <div>{ele.billing_st}</div>
          <div>{ele.billing_zip}</div>
          <div>{ele.total}</div>
        </div>
      );
    });
    return (
      <div>
        {admin.admin_id ? (
          <div className="admin-page">
            <div className="main-nav" />

            <div className="side-nav-display" />

            <div className="side-nav-content" />

            <div className="admin-side-nav">
              <img src={home} alt="" />
              <img src={avatar} alt="" />
              <img src={wallet} alt="" />
              <img src={cart} alt="" />
            </div>

            <div className="admin-graph">
              <h2>History</h2>
              <Bar
                data={data}
                width={100}
                height={35}
                className="chart-data"
              />
              <Timestamp date="2018-09-08 05:21:00" format="full" />
            </div>

            <div className="todo-body">
              <h4>To Do</h4>

              <div className="todo-submit-field">
                <input />
                <button>Submit</button>
              </div>
            </div>

            <div className="admin-order-history">
              <h1>Order History</h1>
              {orders}
            </div>

            <div className='admin-right-nav'>
            <h4 className='total-order'>Total Orders</h4>
            <div className='profit'>
            <h2>Profit</h2>
            {totalProfit}
            </div>
            <h1>hello</h1>
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
