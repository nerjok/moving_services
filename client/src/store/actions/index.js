import axios from 'axios'
import { FETCH_USER, FETCH_SURVEYS, LOGIN_PASSWORD } from './types'

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user')
    dispatch({type:FETCH_USER, payload: res.data})
};

export const loginPassword = (username, password) => async dispatch => {
    console.log('loginAction', username, password)
    const res = await axios.post('/auth/login', {username, password});
    console.log('[[loginResponse]]', res)
    dispatch({type:LOGIN_PASSWORD, payload: res.data})
}

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token)
    dispatch({type: FETCH_USER, payload: res.data})
}


export const submitSurvey = (values, history) => async dispatch => {

    const res = await axios.post('/api/surveys', values)
    dispatch({type:FETCH_USER, payload: res.data})
    history.push('/surveys')
}

export const fetchSurveys = () => async dispatch => {

    const res = await axios.get('/api/surveys');
    dispatch({type: FETCH_SURVEYS, payload: res.data});
}