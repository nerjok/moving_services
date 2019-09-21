/* eslint-disable jsx-a11y/img-redundant-alt */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faEnvelope, faUserAltSlash } from '@fortawesome/free-solid-svg-icons';
import Messaging from '../messaging';
import { Collapse } from 'react-bootstrap';
import { sendMessage, subscribeUser } from '../../store/actions'
import { connect } from 'react-redux'


const userStars = stars => {
  let visiblStars = []
  for(let i=0; i<5;i++) {
    if (stars > i && stars < i +1)
      visiblStars.push(<FontAwesomeIcon key={`starcount-${i}`} icon={faStarHalfAlt} size="lg" style={{color: '#26ae61'}} />);
    else if (stars >= i)
      visiblStars.push(<FontAwesomeIcon key={`starcount-${i}`} icon={faStar} size="lg" style={{color: '#26ae61'}} />);
  }
  return visiblStars;
}
const UserCard = ({user, children, hideLinks, sendMessage, advertisement_id, subscribeUser}) => {
  const [open, setOpen] = useState(false);
  const [resp, setResp] = useState('');

  const sendMsg = (message) => {
    const receiver_id = user._id
    console.log('sendMessageUserCard', message, receiver_id);
    sendMessage({message, receiver_id, advertisement_id})
                .then(resp => {
                  console.log('thenResp', resp)
                  let ats = resp.error || ''
                  setResp(ats)
                })
                .catch(err=>{console.log('msgError', err);
                  setResp('Message not sent')
                });
  }

  const followUser = () => subscribeUser(user._id)
  
  return (
    <div className="card p-0 user-card">

      <div className="user-card__container" >
        <img 
          src={(user && user.profile_photo) ?  `/${user.profile_photo}`: '/public/profile.png'}
          alt=""
          className={"user-card__container__image"}
        />
      </div>

      <h5 className="text-center mt-1">{user && 
          <Link 
            to={`/profiles/${user && user._id}`} 
            className="text-secondary" 
            title="Preview profile">
            {user.name || user.email}
          </Link>
        }</h5>

 
    <div className="text-center">
      <div>
        {(user && user.rate) && <Link 
                        to={`/profiles/${user && user._id}/rates`} 
                        title="Preview rates">
                        {userStars(user.rate)}
                        <small className="text-success">&nbsp; {user.rate}</small>
                      </Link>}
      </div>


      {!hideLinks && <div className="m-3">            
        <button 
          className="btn btn-sm btn-outline-dark  user-card__button"
          onClick={() => setOpen(!open)}
          aria-controls="collapse-messaging"
          aria-expanded={open}
          title="Send Message"
          >
          <FontAwesomeIcon icon={faEnvelope} size="lg" styles={{color: '#fff'}} />
        </button>
        <button className="btn btn-sm btn-outline-dark  user-card__button" title="Subsbscibe user" onClick={followUser}>
          <FontAwesomeIcon icon={faUserAltSlash} size="lg" style={{color: '#000'}} />
        </button>
      </div>}
      {user && 
      <Collapse in={open}>
        <div id="collapse-messaging">
          <Messaging sendMsg={sendMsg}/>
          {resp && <small className="text-danger">{resp}</small>}
        </div>
      </Collapse>}
    </div>
    <div className="m-3">
      {children}
    </div>
  </div>
  )
}

export default connect(null, {  sendMessage, subscribeUser })(UserCard)

UserCard.defaultProps = {
  user: {},
  advertisement_id: ''
}
UserCard.propTypes = {
  user: PropTypes.object.isRequired,
  advertisement_id: PropTypes.string.isRequired
}
