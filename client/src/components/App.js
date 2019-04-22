import React, {Component} from 'react'
import { BrowserRouter, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../store/actions'

import Header from './Header'
import Landing from './Landing'
import  Dashboard from './Dashboard'
import SurveyNew from './surveys/SurveyNew'
import LoginPassword from './auth/password/LoginPassword'
const Footer = (props) => <h2>Footer</h2> 

class App extends Component {

    componentDidMount() {
        this.props.fetchUser()
    }

    render () {
        return (
            <div className="container">
                <BrowserRouter>
                    <div >
                        <Header/>
                        <Route path="/" exact component={Landing}/>
                        <Route path="/surveys" exact component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew} />
                        <Route path="/login" component={LoginPassword} />
                        <Footer/>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}


export default connect(null, actions)(App)
