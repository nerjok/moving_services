/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart,  faSearch, faTrash} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';


export const Advertisement = ({title, description, _id, location, advCallback, deleteAdvertisement, page}) => {

  return (
    <div className="row advertisements-row advertisements-row--red">
      <div className="col-md-5 advertisements-row__description">
        <h5><a href="#show-details" id={_id} onClick={advCallback}>{title}</a></h5>
        {description}
      </div>
      <div className="col-md-2 flex" styles={{background: 'lightgray'}}>
          <span className="badge badge-success advertisements-row__badge">Active</span>
      </div>
      <div className="col-md-2 flex">
          <span className="advertisements-row__info-txt">Vilnius</span> 
      </div>
      <div className="col-md-3 flex">
        <div className="advertisements-row__info-txt">
          <Link to={`${location()}/${_id}`} className="btn btn-sm btn-outline-info">
            <FontAwesomeIcon icon={faSearch} size="lg" style={{color: 'lightblue'}} />
          </Link>
          <a href="#ff" className="btn btn-sm btn-outline-danger m-1">
            <FontAwesomeIcon icon={faHeart} size="lg" style={{color: 'red'}} />
          </a>
          <a className="btn btn-sm btn-outline-danger" 
            onClick={() => {
              console.log('deletion');
              deleteAdvertisement({page, id: _id})}}>
                <FontAwesomeIcon icon={faTrash} size="lg" style={{color: 'gray'}} /> 
          </a>
        </div>
      </div>
    </div>
  )
}

Advertisement.propTypes = {
  _id:  PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description:  PropTypes.string.isRequired
}
