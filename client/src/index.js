import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import App from './containers/App'
import reducers from './store/reducers'
import 'bootstrap/dist/css/bootstrap.css';
import './styles/header.css';
import reduxThunk from 'redux-thunk'

import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';

import axios from 'axios'
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk))
ReactDOM.render(
  <I18nextProvider i18n={ i18n }>
    <Provider store={store}><App /></Provider>
  </I18nextProvider>,
  document.querySelector('#root'))
