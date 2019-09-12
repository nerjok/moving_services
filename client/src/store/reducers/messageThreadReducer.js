import { FETCH_MESSAGES_THREAD } from '../actions/types';

export default (state = {messages: []}, { type, payload }) => {
  switch (type) {

  case FETCH_MESSAGES_THREAD:
    return { ...state, messages: [...payload] }

  default:
    return state
  }
}
