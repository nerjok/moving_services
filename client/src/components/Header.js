import React, { Component} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import Payments from './Payments'
//import { link } from 'fs';
import { Search } from './map/search/search'


import {Dropdown, DropdownButton} from 'react-bootstrap';

class Header extends Component {
    state = { isOpen: false }

    renderContent() {
    const { auth } = this.props
    const email = (auth.email ||auth.name) || false

		switch(email) {
            case null:
                return;
            case false:
                return (
                    <React.Fragment>
                      <a key="googleLogin" href="auth/google" className="p-2 text-dark">Login with Google</a>
                      <a key="login" href="login" className="p-2 text-dark">Login with username</a>
                    </React.Fragment>
                );
            default:
                return ([
										<Link 
										  key="surveys"
										  to={this.props.auth ? "/surveys" : "/"} 
										  className="stickie-nav__menu-link">
										  Surveys
										</Link>,
                      <DropdownButton 
                      key="user-profiles" id="dropdown-basic-button" 
                      bsPrefix="stickie-nav__menu-link" 
                      onMouseEnter = { () => this.setState({isOpen: true}) }
                      //onMouseLeave = { () => this.setState({isOpen: false}) }
                      //show={ this.state.isOpen }
                      title="Profiles">
												<Dropdown.Item>
													<Link 
														key="surveys"
														to={this.props.auth ? "/profile" : "/"} 
														className="text-dark">
														Profile
													</Link>
												</Dropdown.Item>
                        <Dropdown.Item>
													<Link 
														key="surveys"
														to={this.props.auth ? "/profiles" : "/"} 
														className="text-dark">
														Profiles
													</Link>
												</Dropdown.Item>
												<Dropdown.Item href="/surveys">
												<Link 
														key="surveys"
														to={this.props.auth ? "/surveys" : "/"} 
														className="text-dark">
														Surveys
													</Link>
												</Dropdown.Item>
                        <Dropdown.Item href="/advertisements">
												<Link 
														key="advertisements"
														to={this.props.auth ? "/advertisements" : "/"} 
														className="text-dark">
														Advertisements
													</Link>
												</Dropdown.Item>
												<Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                      </DropdownButton>,
                      <Payments key="payments"/>,
                      <React.Fragment key="credits">Credits: {this.props.auth.credits}</React.Fragment>,
                    <a key="logout" href="/api/logout" className="stickie-nav__menu-link">Log out</a>
                ]
                );
        }
    }

    render() {
        return (
          <>
            <div className="navbar stickie-nav">
              <div className="container" >
            <h5 className="stickie-nav__logo">
             <Link 
                to="/"
                className="stickie-nav__logo">
                TempusWork
              </Link>
            </h5>
              <div>
                {this.renderContent()}
              </div>
            </div>
          </div>
          <div className="header-img">
            &nbsp;
            <div className="container" style={{ position: 'absolute' , bottom: 10, left: 0, right: 0}}>
                <Search/>
              </div>
          </div>
          </>
        )
    }
}

function mapStateToProps({auth}) {
    return {
        auth
    }
}

export default connect(mapStateToProps, null)(Header)