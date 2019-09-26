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

import * as Sentry from '@sentry/browser';

import axios from 'axios'
window.axios = axios;

if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'development') {
  Sentry.init({dsn: "https://040ebcb3ac4e46ca8d73ecf82261ab75@sentry.io/1762480"});
}

const store = createStore(reducers, {}, applyMiddleware(reduxThunk))
ReactDOM.render(
  <I18nextProvider i18n={ i18n }>
    <Provider store={store}><App /></Provider>
  </I18nextProvider>,
  document.querySelector('#root'))
