import { FETCH_ADVERTISEMENTS, FETCH_ADVERTISEMENT, REMOVE_ADVERTISEMENT } from '../actions/types'


export default function(state = {advertisements: [], total: 0, page: 0, advertisement: {}}, action) {

    switch(action.type) {
        case FETCH_ADVERTISEMENTS:
            return {...action.payload}
        case FETCH_ADVERTISEMENT:
           return {...state, advertisement: action.payload}  
        case REMOVE_ADVERTISEMENT:
            return {...state, advertisement: {}};     
        default:
            return state;    
    }
}