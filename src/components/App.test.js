import React from 'react'
import { shallow } from 'enzyme'

import App from './App'

describe('App', () => {
  let app

  beforeEach(() => {
    app = shallow(<App />)
  })

  it('has the correct class name', () => {
    expect(app.hasClass('hello-world')).toBe(true)
  })

  it('renders the correct message', () => {
    expect(app.text()).toContain('An awesome static app boilerplate')
  })

  it('displays the react logo', () => {
    expect(app.find('.react-logo').exists()).toBe(true)
  })
})
