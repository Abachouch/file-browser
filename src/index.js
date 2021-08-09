import React from 'react'
import ReactDom from 'react-dom'
import App from './app.jsx'
import './scss/main.scss'
import { Provider } from 'react-redux'
import store from './redux/store'
// import './app/pages/preview.html' d

const defaultTheme = 'light'

document.body.className = window.localStorage.getItem('theme') || defaultTheme
window.localStorage.setItem('theme', document.body.className)

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
