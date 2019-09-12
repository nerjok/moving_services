import { FETCH_MESSAGES, ADD_MESSAGE } from '../actions/types';
import { statement } from '@babel/template';

export default (state = {messages: []}, { type, payload }) => {
  switch (type) {

  case FETCH_MESSAGES:
    return { ...state, messages: [...payload] }
  case ADD_MESSAGE:
    const stt ={...state, messages: [payload, ...state.messages]}
    console.log('addmessage', stt)
    return stt
  default:
    return state
  }
}
