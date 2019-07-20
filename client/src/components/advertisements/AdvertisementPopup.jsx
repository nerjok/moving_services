import React from 'react'
import PropTypes from 'prop-types';


export const AdvertisementPopup = ({title, description}) => {
  return (
    <div className="popup-modal" id="show-details">
      <div className="popup-modal__content p-3">
        <a href="#advertisements" className="popup-modal__close">&times;</a>
        <h5 className="popup-modal__content__title">{title}</h5>
        <p>
          {description}
        </p>
      </div>
    </div>
  )
}

AdvertisementPopup.defaultProps = {
  title: 'Advertisement title',
  description: 'Advertisement description, to inform users about suggested item'
}

AdvertisementPopup.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
}
