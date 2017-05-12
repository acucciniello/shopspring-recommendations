import React, { Component } from 'react'
import logo from './spring.png'
import './App.css'

import Recommendations from './components/recommendations.js'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Personalized Recommendations</h2>
        </div>
        <p className='App-intro'>
          Welcome back! Here are some items we think you would love:
        </p>
        <Recommendations />
      </div>
    )
  }
}

export default App
