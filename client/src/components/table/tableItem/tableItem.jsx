import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart,  faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


export const TableItem = ({sphere, description, name, email, _id, url}) => {

  return (
        <div className="row advertisements-row advertisements-row--red">
          <div className="col-md-5 advertisements-row__description">
            {sphere && <h5>{sphere.substring(0, 50)}</h5>}
            {name || email}
          </div>
          <div className="col-md-2 flex" styles={{background: 'lightgray'}}>
              <span className="badge badge-success advertisements-row__badge">Active</span>
          </div>
          <div className="col-md-2 flex">
              <span className="advertisements-row__info-txt">Vilnius</span> 
          </div>
          <div className="col-md-3 flex">
            <div className="advertisements-row__info-txt">
              <Link to={`${url}/${_id}`} className="btn btn-sm btn-outline-info">
                <FontAwesomeIcon icon={faSearch} size="lg" style={{color: 'lightblue'}} />
              </Link>
              <a href="#ff" className="btn btn-sm btn-outline-danger m-1">
                <FontAwesomeIcon icon={faHeart} size="lg" style={{color: 'red'}} />
              </a>
            </div>
          </div>
        </div>
      )
}

TableItem.protoTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired
}
