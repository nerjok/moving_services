/* eslint-disable jsx-a11y/img-redundant-alt */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faEnvelope, faInfo, faUserAltSlash } from '@fortawesome/free-solid-svg-icons';

export const UserCard = ({user, children, hideLinks}) => {
  
  return (
    <div className="card p-0 user-card">
    <div className="user-card__header text-center p-3">
      <h5>{user && user.name}</h5>
    </div>      
    &nbsp;
    <div className="text-center">
      <div className="user-card__img-container">
        <img 
          src={"/public/images/man_icon.svg"} 
          alt="Image cannot be displayed"
          className={"user-card__image"}
        />
      </div>
      <br/>
      <div>
        <FontAwesomeIcon icon={faStar} size="lg" style={{color: '#26ae61'}} />
        <FontAwesomeIcon icon={faStar} size="lg" style={{color: '#26ae61'}} />
        <FontAwesomeIcon icon={faStar} size="lg" style={{color: '#26ae61'}} />
        <FontAwesomeIcon icon={faStar} size="lg" style={{color: '#26ae61'}} />
        <FontAwesomeIcon icon={faStarHalfAlt} size="lg" style={{color: '#26ae61'}} />
      </div>
      {!hideLinks && <div className="m-3">  
        <Link to={`/profiles/${user && user._id}`} className="btn btn-sm btn-info user-card__button">
          <FontAwesomeIcon icon={faInfo} size="lg" styles={{color: '#fff'}} />
        </Link>              
        <button className="btn btn-sm btn-success  user-card__button">
          <FontAwesomeIcon icon={faEnvelope} size="lg" styles={{color: '#fff'}} />
        </button>
        <button className="btn btn-sm btn-warning  user-card__button">
          <FontAwesomeIcon icon={faUserAltSlash} size="lg" style={{color: '#fff'}} />
        </button>
      </div>}
      {children}
    </div>
  </div>
  )
}


UserCard.propTypes = {
  user: PropTypes.object.isRequired
}
