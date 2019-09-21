/* eslint-disable jsx-a11y/anchor-is-valid */

import React, {Component} from 'react'
import { BrowserRouter, Route} from 'react-router-dom'
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
import TableList from "../components/table";

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

    render () {
      console.log('propsadvUser', this.props.users)
      const isLoged = (this.props.auth && this.props.auth._id);
        return (
                <BrowserRouter>
                  <ScrollIntoView>
                      <Header/>
                      {/*<Map/>*/}
                      {/*<Categories/>*/}
                      {/*<HeaderHeading isLoged={isLoged} />*/}
                      <Route path="/" exact component={HeaderHeading}/>
                        <Route path="/" exact component={HeaderBtn}/>
                        <Route path="/" exact component={Ads}/>
                        <Route path="/" exact component={mainRouted(isLoged)}/>

                      <div className="container">

                        <Route path="/surveys" exact component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew} />
                        {/*<Route path="/profile" exact component={Profile}/>*/}
                        <Route path="/profiles" exact component={Users}/>
                        <Route path="/advertisements" exact component={Advertisements}/>
                        <Route path="/advertisements/:id" exact component={Advertisement}/>
                        <Route path="/profiles/:id" exact component={Profile}/>
                        <Route path="/profiles/:id/rates" exact component={Rates}/>
                        <Route path="/profiles/:id/rate/:message_thread_id" exact component={Rate}/>
                        {isLoged ?
                          <Route path="/user" component={User}/>
                        :
                          <Route path="/login" exact component={LoginPassword} />
                        }
					            </div>

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
