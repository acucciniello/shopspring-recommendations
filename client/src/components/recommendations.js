import React, { Component } from 'react'

class Recommendations extends Component {
  constructor (props) {
    super(props)
    // Setting up the inital state
    // It is meant to display three recommendations
    // url - the url to the item on shopspring.com
    // pictureurl - the link to the image in AWS S3
    // rating - the score for the item
    // title - what the item is called
    // id - primary key for the item in the database
    this.state = {
      recommendations: [{
        url: '',
        pictureUrl: ' ',
        rating: -1,
        title: 'Yes',
        id: -1
      }, {
        url: '',
        pictureUrl: ' ',
        rating: -1,
        title: 'Yes',
        id: -1
      }, {
        url: '',
        pictureUrl: ' ',
        rating: -1,
        title: 'Yes',
        id: -1
      }]
    }
  }

  // Function to update the rating based on which items were clicked
  changeRating (title) {
    var ratingsChange = this.state.recommendations.slice()
    for (var i = 0; i < this.state.recommendations.length; i++) {
      // raise the rating of the one clicked
      if (title === this.state.recommendations[i].title) {
        ratingsChange[i].rating++
      } else {
        // reduce the rating of one not clicked
        ratingsChange[i].rating--
      }
    }
    this.setState({
      recommendations: ratingsChange
    })
    var xhr = require('xhr')
    // send new rating to be stored in database
    xhr.post('http://127.0.0.1:8000/home/rating/', { json: this.state }, function (err, resp) {
      if (err) {
        return console.log(err)
      }
      console.log(resp.body)
      return
    })
  }

  handleClick (title, e) {
    this.changeRating(title)
  }

  // Renders 3 clickable images filled with info from the database
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

  // Called on page loading
  // XHR request returns recommendations needed
  componentWillMount () {
    var xhr = require('xhr')
    xhr.post('http://127.0.0.1:8000/home/', function (err, resp) {
      if (err) {
        return console.log(err)
      }
      var response = JSON.parse(resp.body)
      var copyRecommendations = []
      for (var i = 0; i < response.length; i++) {
        // store the recommendation
        var recommendation = {
          url: response[i].fields.url,
          pictureUrl: response[i].fields.pictureurl,
          rating: response[i].fields.rating,
          title: response[i].fields.title,
          id: response[i].pk
        }
        copyRecommendations.push(recommendation)
      }
      // update the state with the new information
      this.setState({
        recommendations: copyRecommendations
      })
    }.bind(this))
  }
}

export default Recommendations
