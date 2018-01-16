import React from 'react'
import { shallow } from 'enzyme'

import App from './App'

describe('App', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<App />)
  })

  it('has the correct class name', () => {
    expect(wrapper.hasClass('hello-world')).toBe(true)
  })

  it('renders the correct message', () => {
    expect(wrapper.text()).toContain('Hello world!')
  })
})
