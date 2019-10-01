/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart,  faSearch, faTrash} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { StatusBtn } from '../../statusBtn/statusBtn';

export const Advertisement = ({my, cityName, status, workType, title, description, _id, location, advCallback, deleteAdvertisement, page}) => {
  let timeColor;
  switch (workType) {
    case 2:
      timeColor = 'advertisements-row--green';
      break;
    case 3:
      timeColor = 'advertisements-row--blue';
      break;
    case 4:
      timeColor = 'advertisements-row--gray';
      break;
    case 1:
      timeColor = 'advertisements-row--red';
      break;
  
    default:
        timeColor = 'advertisements-row--green';
      break;
  }

  return (
    <div className={`row advertisements-row ${timeColor}`} >
      <div className="col-md-5 advertisements-row__description">
        <h5>
          {/*<a href="#show-details" id={_id} onClick={advCallback}>{title}</a>*/}
          <Link to={`${location()}/${_id}`} >
            {title}
          </Link>
        </h5>
      </div>
      <div className="col-md-2 flex" styles={{background: 'lightgray'}}>
          <StatusBtn status={status} />
      </div>
      <div className="col-md-2 flex">
        {(cityName && cityName.title) && <span className="advertisements-row__info-txt">{cityName.title}</span> }
      </div>
      <div className="col-md-3 flex">
        <div className="advertisements-row__info-txt">
          <Link to={`${location()}/${_id}`} className="btn btn-sm btn-outline-info">
            <FontAwesomeIcon icon={faSearch} size="lg" style={{color: 'lightblue'}} />
          </Link>
          <a href="#ff" className="btn btn-sm btn-outline-danger m-1">
            <FontAwesomeIcon icon={faHeart} size="lg" style={{color: 'red'}} />
          </a>
          { my && <a className="btn btn-sm btn-outline-danger" 
            onClick={() => {
              deleteAdvertisement({page, id: _id})}}>
                <FontAwesomeIcon icon={faTrash} size="lg" style={{color: 'gray'}} /> 
          </a>}
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
