import React, { Component } from 'react'

class Recommendations extends Component {
  constructor (props) {
    super(props)
    this.state = {
      recommendations: [{
        url: 'google.com',
        pictureUrl: ' ',
        rating: -1,
        title: 'Yes'
      }, {
        url: 'google.com',
        pictureUrl: ' ',
        rating: -1,
        title: 'Yes'
      }, {
        url: 'google.com',
        pictureUrl: ' ',
        rating: -1,
        title: 'Yes'
      }]
    }
  }
  render () {
    return (
      <div className={'recommendations'} >
        <a href={this.state.recommendations[0].url} target='_blank'>
          <img src={this.state.recommendations[0].pictureUrl} alt={this.state.recommendations[0].title}/>
        </a>
        <a href={this.state.recommendations[1].url} target='_blank'>
          <img src={this.state.recommendations[1].pictureUrl} alt={this.state.recommendations[1].title}/>
        </a>
        <a href={this.state.recommendations[2].url} target='_blank'>
          <img src={this.state.recommendations[2].pictureUrl} alt={this.state.recommendations[2].title}/>
        </a>
      </div>
    )
  }

  componentWillMount () {
    var xhr = require('xhr')
    xhr.post('http://127.0.0.1:8000/home/', function (err, resp) {
      if (err) {
        return console.log(err)
      }
      var response = JSON.parse(resp.body)
      var copyRecommendations = []
      for (var i = 0; i < response.length; i++) {
        var recommendation = {
          url: response[i].fields.url,
          pictureUrl: response[i].fields.pictureurl,
          rating: response[i].fields.rating,
          title: response[i].fields.title
        }
        copyRecommendations.push(recommendation)
      }
      this.setState({
        recommendations: copyRecommendations
      })
    }.bind(this))
  }
}

export default Recommendations
