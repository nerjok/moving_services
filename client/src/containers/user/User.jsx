import React, { useState} from 'react';
import { Switch, Route, Link} from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../../store/actions';
import { withTranslation, Trans } from 'react-i18next';
import i18next from 'i18next';

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
import ContactList from './contactList/contactList';

 export const User = props => {
  // eslint-disable-next-line 
  const { language } =   i18next;
  let url = '';
  if (language !== 'lt') {
    url = `/${language}`;
  }
  const [breadcrumb, setBreadcrumb] = useState([{link: '/user', title: <Trans>Profile</Trans>}])
  const logout = () => {
  props.logout(props.history);
 }

  return (
    <>
    <Breadcrumb links={breadcrumb}/>
      <div className="row mt-3 mb-3">
        <div className="col-md-9 mb-1">

            <Switch>
              <Route path="/:lang(en|lt|ru)?/user/advertisements" exact component={MyAdvertisements} />
              <Route path="/:lang(en|lt|ru)?/user/advertisements/new" exact component={NewAdvertisement} />
              <Route path="/:lang(en|lt|ru)?/user/advertisements/:id" exact component={MyAdvertisement} />
              <Route path="/:lang(en|lt|ru)?/user/messages" exact component={Messages} />
              <Route path="/:lang(en|lt|ru)?/user/contacts" exact component={ContactList} />
              <Route path="/:lang(en|lt|ru)?/user/messages/:id" exact component={MessagesList} />
              <Route path="/:lang(en|lt|ru)?/user/works" exact component={cardComponent(Advertisements)} />
              <Route path="/:lang(en|lt|ru)?/user" component={UserInfo} />

            </Switch>
        </div>
        <div className="col-md-3 ">
          <UserCard user={props.auth} hideLinks={true}>
            <div className="p-2 mt-2">
            <Link to={`${url}/user`}><Trans>User info</Trans></Link>
            <br/>
            <Link to={`${url}/user/advertisements`} style={{zIndex: 1}}><Trans>My suggestions</Trans></Link>
            <br/>
            <Link to={`${url}/user/messages`} style={{zIndex: 1}}><Trans>My messages</Trans></Link>
            <br/>
            <Link to={`${url}/user/contacts`} style={{zIndex: 1}}><Trans>ContactList</Trans></Link>
            <br/>
            <Link to={`${url}/user/advertisements/new`} style={{zIndex: 1}}><Trans>New Advertisement</Trans></Link>
            {/*<br/>
            <Link to={`${url}/user/works`}>My works</Link>*/}
            <br/>
            <a 
              key="logout" 
              //href="/api/logout" 
              onClick={logout}
              className="btn btn-danger m-3"
            ><Trans>Log out</Trans></a>
            </div>
          </UserCard>  
        </div>
      </div>
    </>
  )
}

function mapStateToProps({auth}) {
  return {
      auth
  }
}

export default withTranslation()(connect(mapStateToProps, { logout })(User))
