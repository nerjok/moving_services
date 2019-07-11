import React, { Component} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import Payments from './Payments'
//import { link } from 'fs';
import { Search } from './map/search/search'

import {Dropdown, DropdownButton, Navbar, Nav, NavDropdown} from 'react-bootstrap';


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
                      {/*<a key="googleLogin" href="auth/google" className="stickie-nav__menu-link">Login with Google</a>
                      <a key="login" href="login" className="stickie-nav__menu-link">Login with username</a>
                      <a key="logins" href="login" className="stickie-nav__menu-link">Login</a>*/}
                      <Link 
                        key="login"
                        to={"/login"} 
                        className="stickie-nav__menu-link">
                          Login
										  </Link>
                    </React.Fragment>
                );
            default:
                return ([
										/*<Link 
										  key="surveys"
										  to={this.props.auth ? "/surveys" : "/"} 
										  className="stickie-nav__menu-link">
										  Surveys
                    </Link>,*/
                    <Link to={"/profiles"} className="stickie-nav__menu-link">Users</Link>,
                    //<Link to={"/profile"} className="stickie-nav__menu-link">Profile</Link>,
                    <Link to={"/user"} className="stickie-nav__menu-link">Info</Link>,
                    /*
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
                      */
                      //<Payments key="payments"/>,
                      //<React.Fragment key="credits">Credits: {this.props.auth.credits}</React.Fragment>,
                    //<a key="logout" href="/api/logout" className="stickie-nav__menu-link">Log out</a>
                ]
                );
        }
    }

    render() {
        return (
          <>
           <nav className="navbar stickie-nav">
              <div className="container" >
            <h5 className="stickie-nav__logo">
             <Link 
                to="/"
                className="stickie-nav__logo">
                TempusWork
              </Link>
            </h5>
              <div>
              <Link to={"/advertisements"} className="stickie-nav__menu-link">Advertisements</Link>
                {this.renderContent()}
              </div>
            </div>
          </nav>
          
 


          <div className="header-img">
            &nbsp;
            <section
            className="section-header__search"
            //style={{position: 'absolute', bottom: 0, left: 0, right: 0}}
            >

            
            <div className="container header__search"
              //style={{background: 'lightgray', minHeight: '4rem', borderTopLeftRadius: '5px', borderTopRightRadius: '5px'}}
              //style={{ position: 'absolute' , bottom: 10, left: 0, right: 0}}
              >


<div className="row">
  
        <div className="col-md-3">
          <div className="form-group m-0">
            <input type="text" className="form-controll input-grey" name="keyword" placeholder="Enter keyword" 
            />
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="form-group m-0">
          <select className="form-controll input-grey" name="city" tabIndex="-98" 
          >
                <option value="">Location</option>
                <option value="1">Kaunas</option>
                <option value="2">Vilnius</option>
                <option value="3">Klaipeda</option>
                <option value="4">Panevezys</option>
                <option value="4">Siauliai</option>
              </select>
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group m-0">
          <select className="form-controll input-grey" name="city" tabIndex="-98" 
          >
                <option value="">Category</option>
                <option value="1">Kaunas</option>
                <option value="2">Vilnius</option>
                <option value="3">Klaipeda</option>
                <option value="4">Panevezys</option>
                <option value="4">Siauliai</option>
              </select>
          </div>
        </div>
        <div className="col-md-3">
              <div className="form-group m-0">
                <button type="submit" 
                  className=" col-md-12 form-control btn btn-sm btn-danger">
                    Search
                  </button>
              </div>
            </div>
        
      </div>


                {/*<Search/>*/}
              </div>
            </section>

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