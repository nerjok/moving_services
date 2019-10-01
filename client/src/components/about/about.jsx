import React from 'react'
import { Trans } from 'react-i18next';
import { Link} from 'react-router-dom';


export const About = (props) => {
  
  return (
    <section className="page-height">
      <div className="container p-5">
        <h1 className="text-right"><Trans>About</Trans></h1>

        <div className="row mt-3">
          
          <div className="col-md-5">
          <div className="header-btn header-btn--employers">
            <h1 className="header-btn__heading">
              <span>  
              <Trans>Find works or services</Trans>
              </span>
              </h1>
            <p className="header-btn__description">
              <span>  
                <Trans>Share needed services what it can be seen by apropriate persons</Trans>
              </span>
            </p>
            <Link to="/advertisements" className="btn btn-sm btn-success mr-1"><Trans>Advertisements</Trans></Link>
            <Link to="/user" className="btn btn-sm btn-success"><Trans>Users</Trans></Link>
          </div>
          </div>


          <div className="col-md-7">
        
            <p class="text-center">
              <b className="text-center">
                <Trans>about-title</Trans>
              </b>
            </p>

            <p><Trans>about-par1</Trans></p>

            <p><Trans>about-par2</Trans></p>

            <p><Trans>about-par3</Trans>
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
