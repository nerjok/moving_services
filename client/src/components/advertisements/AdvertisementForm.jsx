import React from 'react'
import _ from 'lodash'
import { AdvertisementField } from './advertisementField'
import FIELDS from './formFields'
import AdvertisementForm2 from './AdvertisementUpdateForm'
class AdvertisementForm extends React.Component {

  render() {
    return <AdvertisementForm2 advertisement={null}/>;
    return (
      <div>
        New Advertisement

        <form action='/api/advertisements/new' method='post'>
          {_.map(FIELDS, ({label, name}) => {
            return (
              <AdvertisementField
                label={label}
                name={name}
                input={{}}
              />
            )
          })}
          <button type="submit" className="btn btn-outline-dark">Submit</button>
        </form>
      </div>
    )
  }
}

export default AdvertisementForm
