import authReducer from './authReducer'
import surveysReducer from './surveysReducer'
import advertisements from './avertisementsReducer'
import userReducer from './userReducer'
import { combineReducers } from 'redux'
import { reducer as reduxForm} from 'redux-form'


export default combineReducers({
    advertisements,
    auth: authReducer,
    form: reduxForm,
    surveys: surveysReducer,
    user: userReducer
})