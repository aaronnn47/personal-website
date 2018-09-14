import React, { Component } from 'react';
import './App.css';
import {HashRouter} from 'react-router-dom'
import routes from '../src/routes';
import axios from 'axios'

class App extends Component {

  componentDidMount(){
    axios.get('/api/user-data')
  }
  
  render() {
    return (
      <HashRouter>
        <div >
        {routes}
        </div>
      </HashRouter>
    );
  }
}

export default App;
