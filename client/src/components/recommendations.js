import React, { Component } from 'react'

class Recommendations extends Component {
  render () {
    return (
      <div className={'recommendations'} >
        <a href='/recommendation1' target='_blank'>
          <img src=' https://s3.amazonaws.com/shopspring-recommendations/clubmonaco.jpg' alt='Club Monaco Blazer'/>
        </a>
        <a href='/recommendation2' target='_blank'>
          <img src='https://s3.amazonaws.com/shopspring-recommendations/dockers2.jpg' alt='Dockers Blazer 2'/>
        </a>
        <a href='/recommendation3' target='_blank'>
          <img src='https://s3.amazonaws.com/shopspring-recommendations/dockers.jpg' alt='Dockers Blazer'/>
        </a>
      </div>
    )
  }
}

export default Recommendations
