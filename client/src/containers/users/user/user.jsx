import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import UserCard from '../../../components/userCard';
import PropTypes from 'prop-types';
import { fetchUserProfile, removeUserProfile } from '../../../store/actions';
import Breadcrumb from '../../../components/breadcrumb';

const USER_INPUTS = [
  {name: 'email', type: 'text', title: 'Email address', value: 'email', disabled: true},
  {name: 'name', type: 'text', title: 'Name', value: 'name', disabled: false},
  {name: 'description', type: 'text', title: 'Description', value: 'description', disabled: false},
  {name: 'available', type: 'text', title: 'Accepted time', value: 'available', disabled: false},
  {name: 'city', type: 'text', title: "Region of services", value: 'region', disabled: false},
]
const User = (props) => {

  useEffect(() => {
    if (props.match && props.match.params)
      props.fetchUserProfile(props.match.params.id);

    return () => {props.removeUserProfile()};
  }, [])

  return (
    <>
    <Breadcrumb links={[{link: "/profiles", title: "Users"}, {link: "#", title: "User"}]} />
    <div className="row" style={{marginTop: '2rem', marginBottom: '2rem'}}>
      <div className="col-md-9 mb-1">

     
        <div className="card" >
          <div className="card-body card__body">
            <h5 className="card-title">User Profile
            &nbsp;
            </h5>

            {Array.from(USER_INPUTS, ({title, name}) => {
              if (!props.user[name])
                return null;
            return <p><b>{title}:</b> {props.user[name] || ''}</p>
            })}
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

User.propTypes = {
  auth: PropTypes.object.isRequired
}


function mapStateToProps({user, auth}) {
  return {
      user, auth
  }
}

export default connect(mapStateToProps, {fetchUserProfile, removeUserProfile })(User)
