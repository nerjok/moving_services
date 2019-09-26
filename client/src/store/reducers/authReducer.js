import { FETCH_USER, LOGIN_PASSWORD, LOGOUT_USER } from '../actions/types'

export default function(state = {}, action) {
    switch(action.type) {
        case FETCH_USER:
            return action.payload || false
        case LOGIN_PASSWORD:
            return {...state, ...action.payload}
        case LOGOUT_USER:
            return {};      
        default: 
        return state;
    }
}