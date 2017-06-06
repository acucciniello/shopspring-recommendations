import React from 'react';
import ReactDOM from 'react-dom'
import Recommendation from './recommendations'
import { shallow, mount } from 'enzyme'

describe('<Recommendation />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Recommendation />, div)
  })
})


