import React from 'react'
import { render } from 'react-dom'
import { withRouter } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'

import App from './components/App'

const AppWithRouter = withRouter(App)

render(
  <Router><AppWithRouter /></Router>,
  document.getElementById('app')
)
