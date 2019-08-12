import { FETCH_PROFILE, REMOVE_USER_PROFILE } from '../actions/types'


export default (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_PROFILE:
      return { ...payload }
    case REMOVE_USER_PROFILE:
      return {};  
    default:
      return state
  }
}
