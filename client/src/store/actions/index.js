import { FETCH_USER, FETCH_SURVEYS, LOGIN_PASSWORD, FETCH_ADVERTISEMENTS, FETCH_ADVERTISEMENT } from './types'
import axios from 'axios';


export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user')
  dispatch({ type: FETCH_USER, payload: res.data })
};

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

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');
  dispatch({ type: FETCH_SURVEYS, payload: res.data });
}

export const updateData = data => async dispatch => {
  const res = await axios.post('/api/update_user', data)
  if (typeof res.error == 'undefined')
    dispatch({ type: FETCH_USER, payload: res.data })
}

export const fetchAdvertisements = ( page = 0) => async dispatch => {
  const res = await axios.get('/api/advertisements', {params:{page}});
  dispatch({ type: FETCH_ADVERTISEMENTS, payload: res.data });
}

export const fetchAdvertisement = _id => async dispatch => {
  const res = await axios.get('/api/advertisements/'+_id, { _id });
  dispatch({ type: FETCH_ADVERTISEMENT, payload: res.data });
}

export const updateAdvertisement = (data, history) => async dispatch => {
  const res = await axios.post('/api/advertisements/'+data.id+'/update', data );

  if (res.data._id) {
    history.push(`/user/advertisements/${res.data._id}`)
    dispatch({ type: FETCH_ADVERTISEMENT, payload: res.data });
  }
}

export const uploadPhoto = (id, photos) => async dispatch => {
    const res = await axios.post('/api/advertisements/'+id+'/uploadphoto', photos,
    //{ headers: {'Content-Type': 'multipart/form-data' }}
    );
    console.log('[PhotosResponse]', res.data)
/*
    fetch(`${API_URL}/image-upload`, {
      method: 'POST',
      body: {photos}
    })
    .then(res => res.json())
    .then(images => {
      this.setState({ 
        uploading: false,
        images
      })
    })
    /** */
}

export const newAdvertisement = (data, history) => async dispatch => {
  const res = await axios.post('/api/advertisements/new', data );

  if (res.data && !res.data.errors) {
    dispatch({ type: FETCH_ADVERTISEMENT, payload: res.data });
    history.push(`/user/advertisements/${res.data._id}`);
  } 
}

export const deleteAdvertisement = data => async dispatch => {
  const res = await axios.delete(`/api/advertisements/${data.id}?page=${data.page}`, data );
  console.log('[[deletion response]]' , res.data, '[SentData]', data)
  dispatch({ type: FETCH_ADVERTISEMENTS, payload: res.data });
}