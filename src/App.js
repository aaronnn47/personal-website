import React, { Component } from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom'
import routes from '../src/routes';
import axios from 'axios'

class App extends Component {

  componentDidMount(){
    axios.get('/api/user-data')
  }
  render() {
    return (
      <BrowserRouter>
        <div >
        {routes}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
