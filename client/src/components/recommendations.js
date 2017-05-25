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

  changeRating (title) {
    // make recommendations[thisOneThatwasClicked].clicked = True
    var ratingsChange = this.state.recommendations.slice()
    for (var i = 0; i < this.state.recommendations.length; i++) {
      if (title === this.state.recommendations[i].title) {
        ratingsChange[i].rating++
      } else {
        ratingsChange[i].rating--
      }
    }
    this.setState({
      recommendations: ratingsChange
    })
    // var currState = this.state
    console.log(this.state)
    var xhr = require('xhr')
    xhr.post('http://127.0.0.1:8000/home/rating/', { json: this.state }, function (err, resp) {
      if (err) {
        return console.log(err)
      }
      console.log(resp.body)
      this.setState({
        recommendations: resp.body
      })
      return
    }.bind(this))
  }

  handleClick (e, title) {
    this.changeRating(title)
  }

  render () {
    return (
      <div className={'recommendations'} >
        <a href={this.state.recommendations[0].url} target='_blank' onClick={this.handleClick.bind(this, this.state.recommendations[0].title)}>
          <img src={this.state.recommendations[0].pictureUrl} alt={this.state.recommendations[0].title}/>
          <p>{this.state.recommendations[0].title}</p>
        </a>
        <a href={this.state.recommendations[1].url} target='_blank' onClick={this.handleClick.bind(this, this.state.recommendations[1].title)}>
          <img src={this.state.recommendations[1].pictureUrl} alt={this.state.recommendations[1].title}/>
          <p>{this.state.recommendations[1].title}</p>
        </a>
        <a href={this.state.recommendations[2].url} target='_blank' onClick={this.handleClick.bind(this, this.state.recommendations[2].title)}>
          <img src={this.state.recommendations[2].pictureUrl} alt={this.state.recommendations[2].title}/>
          <p>{this.state.recommendations[2].title}</p>
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
          title: response[i].fields.title,
          clicked: false
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
