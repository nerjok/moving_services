/* eslint-disable jsx-a11y/anchor-is-valid */

import React, {Component} from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../store/actions'

import Header from './Header'
//import Landing from './Landing'
import Dashboard from './Dashboard'
import SurveyNew from './surveys/SurveyNew'
import Advertisements from './advertisements/Advertisements'
import Advertisement from './advertisements/Advertisement'


import Ads from './Ads';
import LoginPassword from './auth/password/LoginPassword'


import Users from './users/Users';
import Profile from './users/user/user';

//import Map from './map/Map'
import BlogSlider from './BlogSlider'
import { Footer } from './footer' 
//import { RecentAdds } from './recentAdds'
//import Categories from './categories/Categories'
import { GetStarted } from './GetStarted'
import Rates from './users/rates';
import Rate from './users/rate/rate';
import  User  from './user/User'
import { withRouter } from 'react-router';
import { Header as HeaderBtn, HeaderHeading} from '../components/header';
import ScrollIntoView from '../hoc/scrollIntoView';
import ResetPassword from './auth/password/ResetPassword';
//import TableList from "../components/table";

//import { useTranslation, withTranslation, Trans } from 'react-i18next';
import i18next from 'i18next'

function mainRouted(isLoged, advertisements, users) {
  const MainPage2 = props => {
    return (
      <div>
        <div className="container">
          {/*<Advertisements from="index" {...props}/>*/}

          </div>
        {isLoged ? null : <GetStarted/>}
        <BlogSlider/>
      </div>
    )
  }
  return withRouter(MainPage2)
}


class App extends Component {

    componentDidMount() {
        this.props.fetchUser()
    }

    currentUrlPath = () => {
      if (this.props.history.location.pathname === '/')
        return '/advertisements'
      return this.props.history.location.pathname
    }

    detectLanguage(lang = 'lt') {
      const language =   i18next.language;
      
      if (lang !== language) {
        i18next.changeLanguage(lang);
      }
    }



    render () {

      const isLoged = (this.props.auth && this.props.auth._id);
        return (
                <BrowserRouter>
                  <ScrollIntoView>
                      {/*<Header/>*/}
                      {/*<Map/>*/}
                      {/*<Categories/>*/}
                      {/*<HeaderHeading isLoged={isLoged} />*/}


                      

                        <Route path="/:lang(en|lt|ru)?" render={({ match: { url, params: {lang} } }) => {
                          this.detectLanguage(lang);
                          return (
                          <> 
                          <Route path={`${url}/`} component={Header}/>
                          <div className="container">
                            
                            
                            <Route path={`${url}/`} exact component={HeaderHeading}/>
                            <Route path={`${url}/`} exact component={HeaderBtn}/>
                            <Route path={`${url}/`} exact component={Ads}/>
                            
                            {isLoged ? null :
                             <Route path={`${url}/reset_password`} component={ResetPassword} exact />
                            }

                            <Route path={`${url}/surveys`} component={Dashboard} exact />

                            <Route path={`${url}/surveys/new`} component={SurveyNew} />
                            {/*<Route path="/profile" exact component={Profile}/>*/}
                            <Route path={`${url}/profiles`} exact component={Users}/>
                            <Route path={`${url}/advertisements`} exact component={Advertisements}/>
                            <Route path={`${url}/advertisements/:id`} exact component={Advertisement}/>
                            <Route path={`${url}/profiles/:id`} exact component={Profile}/>
                            <Route path={`${url}/profiles/:id/rates`} exact component={Rates}/>
                            <Route path={`${url}/profiles/:id/rate/:message_thread_id`} exact component={Rate}/>
                            {isLoged ?
                              <Route path={`${url}/user`} component={User}/>
                            :
                              <Route path={`${url}/login`} exact component={LoginPassword} />
                            }
                              </div>
                              <Route path={`${url}/`} exact component={mainRouted(isLoged)}/>
                            </>
                          )}} 
                        />
					            

                      <Footer/>
                      <div className="to-top">
                        
                        <a href="#">&#8616;</a>
                        </div>
                    </ScrollIntoView>
                </BrowserRouter>
        )
    }
}

function mapStateToProps({auth/*, users: {users}, advertisements: {advertisements}*/}) {
  return {
      auth,
      //users,
      //advertisements
  }
}
export default connect(mapStateToProps, actions)(App)
