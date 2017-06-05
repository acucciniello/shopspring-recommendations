import React from 'react';
import ReactDOM from 'react-dom'
import Recommendation from './recommendations'
import { shallow, mount } from 'enzyme'

describe('<Recommendation />', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<Recommendation />, div)
    })

    it('renders a div with classname of recommendations', () => {
        const wrapper = shallow(<Recommendation />)
        const recDiv = <div className={'recommendations'} >
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
        console.log(wrapper.node)
        console.log(recDiv)
        expect(wrapper.contains(recDiv)).toEqual(true)
    })
})

