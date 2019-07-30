import React from 'react'

import {
  Link
} from 'react-router-dom'

export const Header = props => {

  return (
    <div className={"container"}>
      <h1 class="heading-primary">
        <span class="heading-primary--main">Find works or services</span>
        <span class="heading-primary--sub">around you</span>
      </h1>
      <div className="row mt-3">

        <div className="col-md-6">
          <div className="header-btn header-btn--employers">
            <h1 className="header-btn__heading">
              <span>  
              Share needed services
              </span>
              </h1>
            <p className="header-btn__description">
              <span>  
                Share needed services what it can be seen by apropriate persons
              </span>
            </p>
            <Link to="/user" className="btn btn-sm btn-success">Get started</Link>
          </div>
        </div>

        <div className="col-md-6">  
                    <div className="header-btn header-btn--workers">
            <h1 className="header-btn__heading">
              <span>  
                Search work in surounding places
              </span>
              </h1>
            <p className="header-btn__description">
              <span>  
                Search suround works or works by your sphere
              </span>
            </p>
            <Link to="/advertisements" className="btn btn-sm btn-success">Search now</Link>
          </div>
        </div>
      </div>
    </div>
  );
}