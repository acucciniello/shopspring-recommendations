import React, { Component } from 'react'

class Recommendations extends Component {
  render () {
    return (
      <div className={'recommendations'} >
        <a href='https://www.shopspring.com/products/53220192' target='_blank'>
          <img src=' https://s3.amazonaws.com/shopspring-recommendations/clubmonaco.jpg' alt='Club Monaco Blazer'/>
        </a>
        <a href='https://www.shopspring.com/products/53062458' target='_blank'>
          <img src='https://s3.amazonaws.com/shopspring-recommendations/dockers2.jpg' alt='Dockers Blazer 2'/>
        </a>
        <a href='https://www.shopspring.com/products/53029966' target='_blank'>
          <img src='https://s3.amazonaws.com/shopspring-recommendations/dockers.jpg' alt='Dockers Blazer'/>
        </a>
      </div>
    )
  }

  componentWillMount () {
    var xhr = require('xhr')
    console.log(xhr)
    xhr.post('http://127.0.0.1:8000/home/', function (err, resp) {
      if (err) {
        return console.log(err)
      }
      console.log(resp.body)
      var response = JSON.parse(resp.body)
      console.log(response)
    })
    return
  }
}

export default Recommendations
