import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import UserCard from '../../../components/userCard';
import PropTypes from 'prop-types';
import { fetchUserProfile, removeUserProfile } from '../../../store/actions'

const User = (props) => {

  useEffect(() => {
    if (props.match && props.match.params)
      props.fetchUserProfile(props.match.params.id);

    return () => {props.removeUserProfile()};
  }, [])

  return (
    <div className="row" style={{marginTop: '2rem', marginBottom: '2rem'}}>
        <div className="card col-md-9" >
          <div className="card-body">
            <h5 className="card-title">User Profile
            &nbsp;
            </h5>
            <p><b>Email:</b> {props.user.email || ''}</p>
            <p><b>Name:</b> {props.user.name || ''}</p>
          </div>
        </div>
        <div className="col-md-3">
          <UserCard user={props.user}/>
        </div>
    </div>
  )
}

User.propTypes = {
  auth: PropTypes.object.isRequired
}


function mapStateToProps({user, auth}) {
  return {
      user, auth
  }
}

export default connect(mapStateToProps, {fetchUserProfile, removeUserProfile })(User)
