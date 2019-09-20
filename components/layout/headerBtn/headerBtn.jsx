import React from 'react'
import Link from 'next/link'


export const HeaderBtn = props => {

  return (
    <div className={"container"} >
      <div className="row mt-3">
        <div className="col-md-6 mb-3">
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
            {/*<Link to="/user" className="btn btn-sm btn-success">Get started</Link>*/}
            <Link href="/user" >
              <a className="btn btn-sm btn-success">Get started</a>
            </Link>
          </div>
        </div>

        <div className="col-md-6 mb-3">  
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
            {/*<Link to="/advertisements" className="btn btn-sm btn-success">Search now</Link>*/}
            <Link href="/advertisements" >
              <a className="btn btn-sm btn-success">Search now</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
