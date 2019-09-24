import React from 'react';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';

export const Header = props => {

  return (
    <div className={"container"} >
      <div className="row mt-3">
        <div className="col-md-6 mb-3">
          <div className="header-btn header-btn--employers">
            <h1 className="header-btn__heading">
              <span>  
                <Trans>Share needed services</Trans>
              </span>
              </h1>
            <p className="header-btn__description">
              <span>  
                <Trans>Share needed services what it can be seen by apropriate persons</Trans>
              </span>
            </p>
            <Link to="/user" className="btn btn-sm btn-success"><Trans>Get started</Trans></Link>
          </div>
        </div>

        <div className="col-md-6 mb-3">  
                    <div className="header-btn header-btn--workers">
            <h1 className="header-btn__heading">
              <span>  
                <Trans>Search work in surounding places</Trans>
              </span>
              </h1>
            <p className="header-btn__description">
              <span>  
                <Trans>Search suround works or works by your sphere</Trans>
              </span>
            </p>
            <Link to="/advertisements" className="btn btn-sm btn-success"><Trans>Search now</Trans></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
