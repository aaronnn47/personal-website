import React, { Component } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import home from './home.svg'
import cart from './shopping-cart.svg'
import avatar from './avatar.svg'
import banknote from './banknote.svg'
import { Line } from 'react-chartjs-2'

class Home extends Component {
    constructor() {
        super()

        this.state = {
            crypto_data: [],
            menuShow: false,
            historical: [],
            chartData: {}
        }
    }

    showMenu() {
        this.setState({
            menuShow: !this.state.menuShow
        })
    }

    componentDidMount() {
        this.getBitcoin()
        this.getHistoricalData()
    }

    getBitcoin() {
        axios.get('https://api.coinmarketcap.com/v2/ticker/1/')
            .then(resp => {
                this.setState({ crypto_data: resp.data.data.quotes.USD.price })
            })
    }

    getHistoricalData() {
        axios.get('https://api.coindesk.com/v1/bpi/historical/close.json')
            .then(resp => {
                this.setState({ 
                    historical: resp.data
                })
            })
    }

    render() {
        let chart = []
        let chartData=[]
        for (var prop in this.state.historical.bpi){
            prop = prop.split('').splice(5).join('')
            chart.push(prop)
        }
        for(var prop in this.state.historical.bpi){
            chartData.push(this.state.historical.bpi[prop])
        }

        // console.log(chart)
        
        const data ={
            labels: chart,
            datasets:[
                {
                    data: chartData,
                    backgroundColor: 'yellow',
                    label: 'Bitcoin',
                    pointRadius: 0

                }
            ]
        }
        return (
            <div className="background">
                <nav>
                    <div>Clonebase</div>
                    <div className="hamburger"
                        onClick={() => this.showMenu()}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </nav>

                <div className={(this.state.menuShow ? 'dropDownShow' : '') + ' dropdown'}>
                    <ul>
                        <Link to='/mens'>
                            <li>Men</li>
                        </Link>

                        <Link to='/womens'>
                            <li>Women</li>
                        </Link>

                        <Link to='/kids'>
                            <li>Kids</li>
                        </Link>

                        <Link to='/accessories'>
                            <li>Accessories</li>
                        </Link>

                        <Link to='/hats'>
                            <li>Hats</li>
                        </Link>
                    </ul>
                </div>

                <div className="home-body">
                    <h1>Bitcoin</h1>
                    {Math.round(this.state.crypto_data * 100) / 100}
                    <div>
                        <Line
                            data={data}
                            width={100}
                            height={100}
                        />
                    </div>
                </div>

                <div className="buy-sell">
                    <Link to='/buy'>
                        <div>Buy</div>
                    </Link>
                    <Link to='/sell'>
                        <div>Sell</div>
                    </Link>
                </div>

                <div className="footer">
                    <Link to='/home' className='link'>
                        <img src={home} alt="" />
                    </Link>

                    <Link to='/wallet' className='link'>
                        <img src={banknote} alt="" />
                    </Link>

                    <Link to='/cart' className='link'>
                        <img src={cart} alt="" />
                    </Link>

                    <Link to='/account' className='link'>
                        <img src={avatar} alt="" />
                    </Link>

                </div>
            </div>
        )
    }
}

export default Home