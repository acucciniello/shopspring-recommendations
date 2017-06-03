// import React from 'react'
// import { shallow, mount } from 'enzyme'
// import test from 'tape'
var React = require('react')
var shallow = require('enzyme').shallow
var mount = require('enzyme').mount
var test = require('tape')
var Recommendation = require('../src/components/recommendation.js')
// import Recommendation from '../src/components/recommendation.js'

test('shallow', function (t) {
  const wrapper = shallow(<Recommendation />)
  t.equal(wrapper.contains(<div className={'recommendations'} > </div>))
})

test('mount', function (t) {
  const wrapper = mount(<Recommendation />)
  const recommendationInner = wrapper.find('.recommendations')
  t.equal(recommendationInner.is('recommendations'), true)
})
