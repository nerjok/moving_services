import { FETCH_RATES } from '../actions/types';

export default (state = {rates: []}, { type, payload }) => {
  switch (type) {

  case FETCH_RATES:
    return { ...state, rates: [...payload] }

  default:
    return state
  }
}
