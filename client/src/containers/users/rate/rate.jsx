import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import UserCard from '../../../components/userCard';
import PropTypes from 'prop-types';
import { fetchUserProfile, removeUserProfile, fetchRates, submitRate } from '../../../store/actions';
import Spinner from '../../../components/spinner';
import Breadcrumb from '../../../components/breadcrumb';
import { Link} from 'react-router-dom';

export const Rate = (props) => {
  const [rate, setRate] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (props.match && props.match.params){
      props.fetchUserProfile(props.match.params.id);
    }
    return () => {props.removeUserProfile()};
  }, [])



  if (!props.user)
    return <Spinner/> 


  const submitRate = () => {console.log(props.match.params, 'submitRate', rate, message)
    if (rate && message) {
      const data = {rate, message, message_thread_id: props.match.params.message_thread_id, rate_for: props.match.params.id}
      props.submitRate(data)
      console.log(props.match.params)
    }
  }
  return (
    <>
      <Breadcrumb links={[{link: "/profiles", title: "Users"}, {link: `/profiles/${props.user._id}`, title: props.user.name}, {link: '#', title: 'Rate user'}]} />
      <div className="row" style={{marginTop: '2rem', marginBottom: '2rem'}}>
        <div className="col-md-9 mb-1">

      
          <div className="card" >
            <div className="card-body card__body">

            <div className="form-group">
              <label htmlFor="text">Enter message:</label>
              <input type="text" className="form-control" id="text" onChange={({target}) =>setMessage(target.value)} value={message}/>
            </div>

            <div className="form-group">
              <label htmlFor="text">Select rate:</label>
              <select name="rate" id="rate-user" className="form-control" onChange={({target})=>setRate(target.value)} value={rate}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>            
            </div>
            <button 
              type="button" 
              className="btn btn-sm btn-success form-control"
              onClick={submitRate}
              >
              Submit
            </button>

            </div>
          </div>
        </div>

        <div className="col-md-3">
          <UserCard user={props.user}/>
        </div>

      </div>    
    </>
  )
}

function mapStateToProps({user, auth}) {
  return {
      user, auth
  }
}

export default connect(mapStateToProps, {fetchUserProfile, removeUserProfile, submitRate })(Rate)