import React, {Component} from 'react'
import { BrowserRouter, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../store/actions'

import Header from './Header'
import Landing from './Landing'
import Dashboard from './Dashboard'
import SurveyNew from './surveys/SurveyNew'
import LoginPassword from './auth/password/LoginPassword'
import Profile from './auth/profile/Profile'
import Profiles from './auth/profiles/Profiles'
import User from './auth/user/User'
const Footer = (props) => <h2>Footer</h2> 

class App extends Component {

    componentDidMount() {
        this.props.fetchUser()
    }

    render () {
        return (
                <BrowserRouter>
                    <div>
                      <Header/>
                      <div className="container">
                        <Route path="/" exact component={Landing}/>
                        <Route path="/surveys" exact component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew} />
                        <Route path="/profile" exact component={Profile}/>
                        <Route path="/profiles" exact component={Profiles}/>
                        <Route path="/profiles/:id" exact component={User}/>
                        <Route path="/login" component={LoginPassword} />
											</div>
                      <Footer/>
                    </div>
                </BrowserRouter>
        )
    }
}


export default connect(null, actions)(App)
