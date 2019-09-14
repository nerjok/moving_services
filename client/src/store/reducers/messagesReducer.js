import { FETCH_MESSAGES, ADD_MESSAGE } from '../actions/types';
import { statement } from '@babel/template';

export default (state = {messages: [], msgThread: {}}, { type, payload }) => {
  switch (type) {

  case FETCH_MESSAGES:
    return { ...state, messages: [...payload.messages], msgThread: payload.msgThread }
  case ADD_MESSAGE:
    const stt = {...state, messages: [payload, ...state.messages]}
    return stt
  default:
    return state
  }
}
