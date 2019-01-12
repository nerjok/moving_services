import React, { Component} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import Payments from './Payments'
class Header extends Component {

    renderContent() {
        switch(this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li><a href="auth/google">Login with Google</a></li>
                );
            default:
                return ([
                    <li key="dsdss"><Payments/></li>,
                    <li key="dfgdfg"> Credits: {this.props.auth.credits}</li>,
                    <li key="DFgfg"><a href="/api/logout">Log out</a></li>
                    
                ]
                );
        }
    }
    render() {console.log(this.props)
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link 
                        to={this.props.auth ? "/surveys" : "/"} 
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