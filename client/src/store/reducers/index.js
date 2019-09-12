import authReducer from './authReducer'
import surveysReducer from './surveysReducer'
import advertisements from './avertisementsReducer'
import userReducer from './userReducer'
import usersReducer from './usersReducer'
import messagesThreadReaducer from './messageThreadReducer'
import messagesReducer from './messagesReducer'
import { combineReducers } from 'redux'
import { reducer as reduxForm} from 'redux-form'


export default combineReducers({
    advertisements,
    auth: authReducer,
    form: reduxForm,
    surveys: surveysReducer,
    user: userReducer,
    users: usersReducer,
    messageThreads: messagesThreadReaducer,
    messages: messagesReducer
})
