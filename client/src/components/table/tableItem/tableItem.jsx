import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart,  faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { StatusBtnServ } from '../../statusBtn/statusBtnServ';


export const TableItem = ({cityName, status, sphere, description, name, email, _id, url}) => {

  return (
        <div className="row advertisements-row advertisements-row--red">
          <div className="col-md-5 advertisements-row__description">
            {sphere && <h5><Link to={`${url}/${_id}`} >
              {sphere.substring(0, 50)}
            </Link></h5>}
            {name || email}
          </div>
          <div className="col-md-2 flex" styles={{background: 'lightgray'}}>
              <StatusBtnServ status={status}/>
          </div>
          <div className="col-md-2 flex">
            {(cityName && cityName.title) && <span className="advertisements-row__info-txt">{cityName.title}</span> }
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
