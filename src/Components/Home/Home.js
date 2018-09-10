import React, { Component } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Line } from 'react-chartjs-2'
import Header from '../../Views/Header/Header'
import Footer from '../../Views/Footer/Footer'

class Home extends Component {
    constructor() {
        super()

        this.state = {
            crypto_data: [],
            historical: [],
            chartData: {}
        }
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
            <div>
                <Header/>
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
                <Footer/>
            </div>
        )
    }
}

export default Home