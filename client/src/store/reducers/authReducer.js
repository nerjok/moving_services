import { FETCH_USER, LOGIN_PASSWORD } from '../actions/types'

export default function(state = {}, action) {
    console.log(action, state)
    switch(action.type) {
        case FETCH_USER:
            return action.payload || false
        case LOGIN_PASSWORD:
            return {...state, ...action.payload}
        default: 
        return state;
    }
}