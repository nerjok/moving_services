import React from 'react';
import PropTypes from 'prop-types';

import { Advertisement } from './advertisement/Advertisement';
import { AdvertisementPopup } from './AdvertisementPopup';

export const Advertisements = ({advertisements, location, advCallback, activeAdvertisement, deleteAdvertisement, page}) => {

  return (
    <div className="advertisements">
      <AdvertisementPopup {...activeAdvertisement} />
      {Array.from(advertisements, ({_id, title, description, status, workType}) => 
        <Advertisement key={_id} _id={_id} title={title} status={status} workType={workType} page={page} deleteAdvertisement={deleteAdvertisement} description={description} location={location} advCallback={advCallback}/>
      )}
    </div> 
  )
}

Advertisements.propTypes = {
 advertisements:  PropTypes.array.isRequired,
 location: PropTypes.func.isRequired,
 advCallback: PropTypes.func.isRequired,
 activeAdvertisement: PropTypes.object.isRequired
}
