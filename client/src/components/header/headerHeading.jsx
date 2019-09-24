
import React from 'react';
import { Trans } from 'react-i18next';


export const HeaderHeading = (props) => {
  return (
    <div className={"container"}>
      <h1 className="heading-primary">
        <span className="heading-primary--main"><Trans>Find works or services</Trans></span>
        <span className="heading-primary--sub"><Trans>around you</Trans></span>
      </h1>
    </div>
  )
}
