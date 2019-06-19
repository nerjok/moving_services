import React from 'react'
import ReactDOM from 'react-dom'


//import 'materialize-css/dist/css/materialize.min.css'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import App from './components/App'
import reducers from './store/reducers'
import 'bootstrap/dist/css/bootstrap.css';
import './styles/header.css';
//import './styles/style.css'
import reduxThunk from 'redux-thunk'


import axios from 'axios'
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk))
ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.querySelector('#root'))

/*
  window.addEventListener('scroll', function(e) {
    let sY = window.scrollY;
    console.log('scrollYPosition', sY)
    if (sY > 20)
      document.getElementsByClassName('stickie-nav')[0].style.background = '#fff';
    else
    document.getElementsByClassName('stickie-nav')[0].style.background = 'transparent'; 
    
  })
/*
,
  "proxy": {
    "/auth/google": {
      "target": "http://localhost:5000"
    },
    "/api/*": { "http://localhost:5000"}}*/

console.log('[[STRIPE KEY IS]]', process.env.REACT_APP_STRIPE_KEY)
console.log('environment is: ', process.env.NODE_ENV)