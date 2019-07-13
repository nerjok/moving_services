import React from 'react'
import PropTypes from 'prop-types'

import { Advertisement } from './advertisement/Advertisement'
import { AdvertisementPopup } from './AdvertisementPopup'

export const Advertisements = ({advertisements, location}) => {

  return (
    <div className="advertisements">
      <AdvertisementPopup/>
      {Array.from(advertisements, ({_id, title, description}) => 
        <Advertisement key={_id} _id={_id} title={title} description={description} location={location}/>
      )}
    </div> 
  )
}

Advertisements.propTypes = {
 advertisements:  PropTypes.array.isRequired,
 location: PropTypes.func.isRequired
}
