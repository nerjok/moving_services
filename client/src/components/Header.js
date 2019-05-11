import React, { Component} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import Payments from './Payments'
//import { link } from 'fs';
class Header extends Component {

    renderContent() {
    const { auth } = this.props
    const email = auth.email || false
    console.log('[Header]', auth)
        switch(email) {
            case null:
                return;
            case false:
                return (
                    <React.Fragment>
                    <li><a href="auth/google">Login with Google</a></li>
                    <li><a href="login">Login with username</a></li>
                    </React.Fragment>
                );
            default:
                return ([
                    <li key="dsdss"><Payments/></li>,
                    <li key="dfgdfg"> Credits: {this.props.auth.credits}</li>,
                    <li key="profile"> <a href="/profile">My profile</a></li>,
                    <li key="DFgfg"><a href="/api/logout">Log out</a></li>
                    
                ]
                );
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link 
                        //to={this.props.auth ? "/surveys" : "/"} 
                        to="/"
                        className="brand-logo">
                        Emaily
                    </Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {this.renderContent()}
                    </ul>
                 </div>
            </nav>
        )
    }
}

function mapStateToProps({auth}) {
    return {
        auth
    }
}
export default connect(mapStateToProps, null)(Header)