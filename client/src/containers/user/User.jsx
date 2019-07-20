import React from 'react'
import { Switch, Route, Link} from 'react-router-dom'

import UserInfo from './UserInfo/UserInfo'
import MyAdvertisements from './myAdvertisements/MyAdvertisements'
import { Advertisements } from './advertisements/advertisements'
import MyAdvertisement from './myAdvertisements/MyAdvertisement/MyAdvertisement'
import {cardComponent } from '../../hoc/card/card'
import AdvertisementForm from './myAdvertisements/updateForm/AdvertisementUpdateForm' 

 export const User = props => {

  return (
    <div className="row mt-3 mb-3">
      <div className="col-md-9">

          <Switch>
            <Route path="/user" exact component={cardComponent(UserInfo)} />
            <Route path="/user/advertisements" exact component={MyAdvertisements} />
            <Route path="/user/advertisements/new" exact component={cardComponent(AdvertisementForm)} />
            <Route path="/user/advertisements/:id" exact component={cardComponent(MyAdvertisement)} />
            <Route path="/user/works" exact component={cardComponent(Advertisements)} />
          </Switch>
      </div>
      <div className="col-md-3 card p-0">
        <div className="user-card__header text-center">
          <h5 className="mt-3">Profile info</h5>
        </div>
         
        <div className="p-3" styles={{display: 'inline-block', background: 'gray'}}>
          <Link to={'/user'}>UserInfo</Link>
          <br/>
          <Link to={'/user/advertisements'} style={{zIndex: 1}}>My suggestions</Link>
          <br/>
          <Link to={'/user/advertisements/new'} style={{zIndex: 1}}>new Advertisement</Link>
          <br/>
          <Link to={'/user/works'}>My works</Link>
          <br/>
          {/*<Link to={'user/advertisements'}>Sign out</Link>*/}
          <a key="logout" href="/api/logout" className="btn btn-danger m-3">Log out</a>
        </div>

      </div>
    </div>
  )
}

//export User;