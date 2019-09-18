import { FETCH_CONTACTS } from '../actions/types';

export default (state = {contacts: []}, { type, payload }) => {
  switch (type) {

  case FETCH_CONTACTS:
    return { ...state, contacts: [...payload] }

  default:
    return state
  }
}
