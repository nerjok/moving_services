import React, { useState} from 'react';
import { Switch, Route, Link} from 'react-router-dom';

import UserInfo from './UserInfo/UserInfo';
import MyAdvertisements from './myAdvertisements/MyAdvertisements';
import { Advertisements } from './advertisements/advertisements';
import MyAdvertisement from './myAdvertisements/MyAdvertisement/MyAdvertisement';
import {cardComponent } from '../../hoc/card/card';
import  NewAdvertisement  from './myAdvertisements/updateForm/newAdvertisement';
import Breadcrumb from '../../components/breadcrumb';
import UserCard from '../../components/userCard';
import Messages from './messages';
import MessagesList from './messages/messagesList/messagesList';

 export const User = props => {
 const [breadcrumb, setBreadcrumb] = useState([{link: '/user', title: "User page"}])
  return (
    <>
    <Breadcrumb links={breadcrumb}/>
      <div className="row mt-3 mb-3">
        <div className="col-md-9 mb-1">

            <Switch>
              <Route path="/user/advertisements" exact component={MyAdvertisements} />
              <Route path="/user/advertisements/new" exact component={NewAdvertisement} />
              <Route path="/user/advertisements/:id" exact component={MyAdvertisement} />
              <Route path="/user/messages" exact component={Messages} />
              <Route path="/user/messages/:id" exact component={MessagesList} />
              <Route path="/user/works" exact component={cardComponent(Advertisements)} />
              <Route path="/user" component={UserInfo} />

            </Switch>
        </div>
        <div className="col-md-3 ">
          <UserCard user={{name: 'Profile info'}} hideLinks={true}>
            <div className="p-2 mt-2">
            <Link to={'/user'}>UserInfo</Link>
            <br/>
            <Link to={'/user/advertisements'} style={{zIndex: 1}}>My suggestions</Link>
            <br/>
            <Link to={'/user/messages'} style={{zIndex: 1}}>My messages</Link>
            <br/>
            <Link to={'/user/advertisements/new'} style={{zIndex: 1}}>new Advertisement</Link>
            <br/>
            <Link to={'/user/works'}>My works</Link>
            <br/>
            <a key="logout" href="/api/logout" className="btn btn-danger m-3">Log out</a>
            </div>
          </UserCard>  
        </div>
      </div>
    </>
  )
}

//export User;