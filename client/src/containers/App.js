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

import Users from './users/Users';
import Profile from './users/user/user';

//import Map from './map/Map'
import BlogSlider from './BlogSlider'
import { Footer } from './footer' 
//import { RecentAdds } from './recentAdds'
//import Categories from './categories/Categories'
import { GetStarted } from './GetStarted'

import { User } from './user/User'
import { withRouter } from 'react-router';
import { Header as HeaderBtn, HeaderHeading} from '../components/header';

function mainRouted(isLoged) {
  const MainPage2 = props => {
    return (
      <div>
        <div className="container"><Advertisements from="index" {...props}/></div>
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

    render () {

      const isLoged = (this.props.auth && this.props.auth._id);
        return (
                <BrowserRouter>
                      <Header/>
                      {/*<Map/>*/}
                      {/*<Categories/>*/}
                      <HeaderHeading isLoged={isLoged} />
                        <Route path="/" exact component={HeaderBtn}/>
                        <Route path="/" exact component={mainRouted(isLoged)}/>
                      <div className="container">
                        <Route path="/surveys" exact component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew} />
                        {/*<Route path="/profile" exact component={Profile}/>*/}
                        <Route path="/profiles" exact component={Users}/>
                        <Route path="/advertisements" exact component={Advertisements}/>
                        <Route path="/advertisements/:id" exact component={Advertisement}/>
                        <Route path="/profiles/:id" exact component={Profile}/>
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
