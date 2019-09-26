import { FETCH_CONTACTS, FETCH_RATES, ADD_MESSAGE, FETCH_MESSAGES, FETCH_MESSAGES_THREAD, REMOVE_ADVERTISEMENT, REMOVE_USER_PROFILE, FETCH_PROFILE, FETCH_USER, FETCH_USERS, FETCH_SURVEYS, LOGIN_PASSWORD, FETCH_ADVERTISEMENTS, FETCH_ADVERTISEMENT } from './types'
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
  return res.data;
}

export const signupPassword = (username, password, history) => async dispatch => {
  const res = await axios.post('/auth/signup', { username, password });
  dispatch({ type: LOGIN_PASSWORD, payload: res.data })
  if (res.data && res.data._id)
    history.push('/');
  return res.data;
}

export const forgotPswd = (email, history) => async dispatch => {
  const res = await axios.post('/auth/forgot', { email });
  if (res.data && res.data.msg) {
    history.push('/');
  }
  console.log('forgotAction', res.data)
}

export const resetPassword = (email, password, password_reset, history) => async dispatch => {
  const res = await axios.post('/auth/reset_password', { email, password, password_reset });
  console.log('PAssword resetion', res.data);
  if (res.data && res.data.msg) {
    history.push('/');
  } else if (res.data && res.data.error) {
    return res.data;
  }
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

export const fetchUsers = (page = 1, data = {}) => async dispatch => {
  const res = await axios.get('/api/users', {params:{page, ...data}, body: "kuku"})
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
}

export const fetchAdvertisements = ( page = 0) => async dispatch => {
  const res = await axios.get('/api/advertisements', {params:{page}});
  dispatch({ type: FETCH_ADVERTISEMENTS, payload: res.data });
}

export const myAdvertisements = ( page = 0) => async dispatch => {
  const res = await axios.get('/api/advertisements/my', {params:{page}});
  dispatch({ type: FETCH_ADVERTISEMENTS, payload: res.data });
}

export const filterAdvertisements = ( page = 0, location, distance, keyword, status, workType) => async dispatch => {
  const [lat, lng] = location
  const res = await axios.get('/api/advertisements/filter', {params:{page, lat, lng, distance, keyword, status, workType}});
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
  if (res.data && !res.data.errors) {
    dispatch({ type: FETCH_ADVERTISEMENT, payload: res.data });
    history.push(`/user/advertisements/${res.data._id}`);
  } else {
    return {errors: res.data.errors};
  }
}

export const updateAdvertisement = (data, history) => async dispatch => {
  const res = await axios.post('/api/advertisements/'+data.id+'/update', data );
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


/** Messages */

export const applyJob = data => async dispatch => {
  return axios.post('/api/new_thread', data)
  .then(res => {
    if (res.data._id) {
      return {}
    } else {
      return {error: 'Action not completed'};
    }
  })
  .catch(({response}) => {
    if (response.data)
     return response.data;
    return {error: 'Action not completed'};
  });
}

export const sendMessage = data => async dispatch => {
  return axios.post('/api/new_message', data)
  .then(res => {
    console.log('actionSendMessage', res.data);
    if (res.data._id) {
      return {}
    } else {
      return {error: 'Action not completed'};
    }
  })
  .catch(({response})=> {
    console.log('errResponse', response)
    if (response.data)
    return response.data;
   return {error: 'Action not completed'};
  });
}

export const addMessage = data => async dispatch => {
  const res = await axios.post('/api/messages', data);
  console.log(res.data);
  if (res.data._id) {
    dispatch({type: ADD_MESSAGE, payload: res.data})
    return {}
  } else {
    return {error: 'Action not completed'};
  }
}

export const fetchMessagesThread = () => async dispatch => {
  const res = await axios.get('/api/messages_topics', {});
  console.log('msgThreads', res.data)
  dispatch({ type: FETCH_MESSAGES_THREAD, payload: res.data });
}

export const fetchMessages = (_id) => async dispatch => {
  const res = await axios.get(`/api/messages/${_id}`, {});
  dispatch({ type: FETCH_MESSAGES, payload: res.data });
}


export const fetchRates = (id) => async dispatch => {
  const res = await axios.get(`/api/rates/${id}`, {});
  dispatch({type: FETCH_RATES, payload: res.data})
}

export const submitRate = (data) => async dispatch => {
   axios.post(`/api/rates`, data)
  .then(rez => {
    console.log('successRated',rez.data)
  })
  .catch(err=>console.log(err.response));
  //console.log('submitRateResponse', res);
  //dispatch({type: FETCH_RATES, payload: res.data})
}

export const subscribeUser = id => async dispatch => {
  axios.post('/api/contactList', {id}).then(res => {
    console.log('subscribeUserAction', res.data)
  })
  .catch(err=> console.log(err.response))
}

export const fetchContacts = () => async dispatch => {
  const res = await axios.get(`/api/contactList`, {});
  console.log('fetchContacts', res.data)
  dispatch({type: FETCH_CONTACTS, payload: res.data})
}

export const unsubscribeUser = id => async dispatch => {
  axios.post('/api/contactList/unsubscribe', {id}).then(res => {
    console.log('subscribeUserAction', res.data);
    dispatch({type: FETCH_CONTACTS, payload: res.data})
  })
  .catch(err=> console.log(err.response))
}


//Profile

export const uploadProfilePhoto = (id, photos) => async dispatch => {
   axios.post('/api/user/'+id+'/upload_photo', photos)
   .then(res => {
    console.log('succesfullUpload', res.data);
    if (res.data && res.data._id)
    //dispatch({ type: FETCH_USER, payload: res.data });
      window.location = '/user';
  })
  .catch(err=> console.log('errorUploading', err.response));
   
   
  //dispatch({ type: FETCH_ADVERTISEMENT, payload: res.data });
}

export const uploadWorkPhoto = (id, photos) => async dispatch => {
  console.log('[uploadProfilePhoto]', id, 'photos, ', photos)
   axios.post('/api/user/'+id+'/work_photos', photos)
   .then(res => {
    console.log('succesfullUpload', res.data);
    if (res.data && res.data._id)
      dispatch({ type: FETCH_USER, payload: res.data });
      //window.location = '/user';
  })
  .catch(err=> console.log('errorUploading', err.response))
   ;
  //dispatch({ type: FETCH_ADVERTISEMENT, payload: res.data });
}

export const deleteWorkPhoto = (id, photo) => async dispatch => {
  const res = await axios.post('/api/user/'+id+'/delete_photo/', {photo});
  
  console.log('delete photoResponse', res.data)
  dispatch({ type: FETCH_USER, payload: res.data })
}