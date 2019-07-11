import React from 'react'
import { BrowserRouter, Route, Link} from 'react-router-dom'

import UserInfo from './UserInfo/UserInfo'
import { Advertisements } from './advertisements/advertisements'

 export const User = props => {

  return (
    <div className="row mt-3 mb-3">
      <div className="col-md-9">
        <div className="card">
          <div class="card-body">
            <Route path="/user" exact component={UserInfo} />
            <Route path="/user/advertisements" exact component={Advertisements} />
          </div>
        </div>

      </div>
      <div className="col-md-3 card p-0">
        <div className="menu-navigation text-center">
          <h5 className="mt-3">Profile info</h5>
        </div>
         
        <div className="p-3" styles={{display: 'inline-block', background: 'gray'}}>
          <Link to={'/user'}>UserInfo</Link>
          <br/>
          <Link to={'/user/advertisements'} style={{zIndex: 1}}>My suggestions</Link>
          <br/>
          <Link to={'/user/advertisements'}>My works</Link>
          <br/>
          {/*<Link to={'user/advertisements'}>Sign out</Link>*/}
          <a key="logout" href="/api/logout" className="btn btn-danger m-3">Log out</a>
        </div>

      </div>
    </div>
  )
}

//export User;