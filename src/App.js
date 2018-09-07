import React, { Component } from 'react';
import './App.css';
import {HashRouter} from 'react-router-dom'
import routes from '../src/routes';
import Header from '../src/Views/Header/Header'
import Footer from '../src/Views/Footer/Footer'
import axios from 'axios'

class App extends Component {

  componentDidMount(){
    axios.get('/api/user-data')
  }

  render() {
    return (
      <HashRouter>
        <div className='background'>
        {/* <Header/> */}
        {routes}
        {/* <Footer/> */}
        </div>
      </HashRouter>
    );
  }
}

export default App;
