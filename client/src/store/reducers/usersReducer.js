import { FETCH_USERS } from '../actions/types'

export default (state = {users: [], page: 1}, { type, payload }) => {
  switch (type) {
  case FETCH_USERS:
    return { ...payload }
  default:
    return state
  }
}
