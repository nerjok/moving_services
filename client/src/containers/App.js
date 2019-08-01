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

import LoginPassword from './auth/password/LoginPassword'
import Profile from './auth/profile/Profile'
import Profiles from './auth/profiles/Profiles'
import User0 from './auth/user/User'
//import Map from './map/Map'
import BlogSlider from './BlogSlider'
import { Footer } from './footer' 
//import { RecentAdds } from './recentAdds'
//import Categories from './categories/Categories'
import { GetStarted } from './GetStarted'

import { User } from './user/User'
import { withRouter } from 'react-router';
import { Header as HeaderBtn, HeaderHeading} from '../components/header';

function mainRouted(props2) {
  const MainPage2 = props => {

    return (
      <div>
        <div className="container"><Advertisements {...props}/></div>
        <GetStarted/>
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

    render () {
        return (
                <BrowserRouter>
                      <Header/>
                      {/*<Map/>*/}
                      {/*<Categories/>*/}
                      <HeaderHeading/>
                        <Route path="/" exact component={HeaderBtn}/>
                        <Route path="/" exact component={mainRouted()}/>
                      <div className="container">
                        <Route path="/surveys" exact component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew} />
                        <Route path="/profile" exact component={Profile}/>
                        <Route path="/profiles" exact component={Profiles}/>
                        <Route path="/advertisements" exact component={Advertisements}/>
                        <Route path="/advertisements/:id" exact component={Advertisement}/>
                        <Route path="/profiles/:id" exact component={User0}/>
                        <Route path="/user" component={User}/>
                        <Route path="/login" exact component={LoginPassword} />
					  </div>

                      {/* !this.props.auth || !this.props.auth._id ?
                        <>
                          <div className="container"><Advertisements/></div>
                          <GetStarted/>
                        </>  
                        : null
                      */}
                      
                      {/*<RecentAdds/>*/}
                      {/*<BlogSlider/>*/}
                      <Footer/>
                      <div className="to-top">
                        
                        <a href="#">&#8616;</a>
                        </div>
                </BrowserRouter>
        )
    }
}

function mapStateToProps({auth}) {
  return {
      auth
  }
}
export default connect(mapStateToProps, actions)(App)

