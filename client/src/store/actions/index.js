import { REMOVE_ADVERTISEMENT, REMOVE_USER_PROFILE, FETCH_PROFILE, FETCH_USER, FETCH_USERS, FETCH_SURVEYS, LOGIN_PASSWORD, FETCH_ADVERTISEMENTS, FETCH_ADVERTISEMENT } from './types'
import axios from 'axios';


export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user')
  dispatch({ type: FETCH_USER, payload: res.data })
};

export const fetchUserProfile = (user_id) => async dispatch => {
  const res = await axios.get('/api/users/'+user_id)
  dispatch({ type: FETCH_PROFILE, payload: res.data })
};

export const removeUserProfile = () => async dispatch => {
  dispatch({type: REMOVE_USER_PROFILE});
}

export const loginPassword = (username, password) => async dispatch => {
  const res = await axios.post('/auth/login', { username, password });
  dispatch({ type: LOGIN_PASSWORD, payload: res.data })
}

export const signupPassword = (username, password) => async dispatch => {
  const res = await axios.post('/auth/signup', { username, password });
  dispatch({ type: LOGIN_PASSWORD, payload: res.data })
}

export const handleToken = (token) => async dispatch => {
  const res = await axios.post('/api/stripe', token)
  dispatch({ type: FETCH_USER, payload: res.data })
}

export const submitSurvey = (values, history) => async dispatch => {

  const res = await axios.post('/api/surveys', values)
  dispatch({ type: FETCH_USER, payload: res.data })
  history.push('/surveys')
}

export const fetchUsers = (page = 1) => async dispatch => {
  const res = await axios.get('/api/users', {params:{page}})
  dispatch({ type: FETCH_USERS, payload: res.data })
}

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');
  dispatch({ type: FETCH_SURVEYS, payload: res.data });
}

export const updateData = data => async dispatch => {
  const res = await axios.post('/api/update_user', data)
  if (typeof res.error == 'undefined')
    dispatch({ type: FETCH_USER, payload: res.data })
}

export const updateUserPassw = data => async dispatch => {
  const res = await axios.post('/api/user/update_password', data);
  console.log('updatePassResponse', res.data);
}

export const fetchAdvertisements = ( page = 0) => async dispatch => {
  const res = await axios.get('/api/advertisements', {params:{page}});
  dispatch({ type: FETCH_ADVERTISEMENTS, payload: res.data });
}

export const myAdvertisements = ( page = 0) => async dispatch => {
  const res = await axios.get('/api/advertisements/my', {params:{page}});
  dispatch({ type: FETCH_ADVERTISEMENTS, payload: res.data });
}

export const filterAdvertisements = ( page = 0, location, distance, keyword) => async dispatch => {
  const [lat, lng] = location
  const res = await axios.get('/api/advertisements/filter', {params:{page, lat, lng, distance, keyword}});
console.log('[FilterResponseFrom Server]', res.data)
  dispatch({ type: FETCH_ADVERTISEMENTS, payload: res.data });
}


export const fetchAdvertisement = _id => async dispatch => {
  const res = await axios.get('/api/advertisements/'+_id, { _id });
  dispatch({ type: FETCH_ADVERTISEMENT, payload: res.data });
}

export const removeAdvertisement = () => async dispatch => {console.log('removeAdvertisement')
  dispatch({ type: REMOVE_ADVERTISEMENT, payload: {} });
}

export const newAdvertisement = (data, history) => async dispatch => {
  const res = await axios.post('/api/advertisements/new', data );
  console.log('newAdvData', data, history)
  if (res.data && !res.data.errors) {
    dispatch({ type: FETCH_ADVERTISEMENT, payload: res.data });
    history.push(`/user/advertisements/${res.data._id}`);
  } else {
    console.log('newAdvertisement', res);
    return {errors: res.data.errors};
  }
}

export const updateAdvertisement = (data, history) => async dispatch => {
  const res = await axios.post('/api/advertisements/'+data.id+'/update', data );
console.log('[idIsTrue]', res);
  if (res.data._id) {
    history.push(`/user/advertisements/${res.data._id}`)
    dispatch({ type: FETCH_ADVERTISEMENT, payload: res.data });
  } else {
    return {errors: res.data.errors};
  }
}

export const uploadPhoto = (id, photos) => async dispatch => {
    const res = await axios.post('/api/advertisements/'+id+'/uploadphoto', photos);
    dispatch({ type: FETCH_ADVERTISEMENT, payload: res.data });
}

export const deletePhoto = (id, photo) => async dispatch => {
  const res = await axios.delete('/api/advertisements/'+id+'/deletephoto/'+photo, photo);
  dispatch({ type: FETCH_ADVERTISEMENT, payload: res.data });
}

export const deleteAdvertisement = data => async dispatch => {
  const res = await axios.delete(`/api/advertisements/${data.id}?page=${data.page}`, data );
  dispatch({ type: FETCH_ADVERTISEMENTS, payload: res.data });
}
