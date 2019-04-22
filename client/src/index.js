import React from 'react'
import ReactDOM from 'react-dom'


import 'materialize-css/dist/css/materialize.min.css'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import App from './components/App'
import reducers from './store/reducers'

import reduxThunk from 'redux-thunk'


import axios from 'axios'
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk))
ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.querySelector('#root'))


/*
,
  "proxy": {
    "/auth/google": {
      "target": "http://localhost:5000"
    },
    "/api/*": { "http://localhost:5000"}}*/

console.log('[[STRIPE KEY IS]]', process.env.REACT_APP_STRIPE_KEY)
console.log('environment is: ', process.env.NODE_ENV)