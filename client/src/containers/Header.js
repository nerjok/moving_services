import React, { Component} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
//import Payments from './Payments'
//import { link } from 'fs';
//import { Search } from './map/search/search'

const hideMenu = () => {
  console.log('hideMenu');
  document.getElementById('navigation-toggle').checked = false;
}

class Header extends Component {
    state = { isOpen: false }

    renderContent() {
    const { auth } = this.props
    const email = (auth.email ||auth.name) || false

		switch(email) {
            case null:
                return;
            case false:
                return [
                      <Link 
                        key="login"
                        to={"/login"} 
                        className="stickie-nav__menu-linkk black-link breadcrumb-link mr-3"
                        onClick={hideMenu}
                        >
                          Login
										  </Link>
                ];
            default:
                return ([
										/*<Link 
										  key="surveys"
										  to={this.props.auth ? "/surveys" : "/"} 
										  className="stickie-nav__menu-link">
										  Surveys
                    </Link>,*/
                    //<Link key="users" to={"/profiles"} className="stickie-nav__menu-link" onClick={hideMenu}>Users</Link>,
                    //<Link to={"/profile"} className="stickie-nav__menu-link">Profile</Link>,
                    <Link key="myProfile" to={"/user"} className="stickie-nav__menu-linkk black-link breadcrumb-link mr-3" onClick={hideMenu}>Info</Link>,

                ]
                );
        }
    }

    render() {
        return (
          <>
           <nav className="navbar stickie-nav">
            <h5 className="stickie-nav__logo">
             <Link 
                to="/"
                className="stickie-nav__logo">
                TempusWork
              </Link>
            </h5>
              <div className="header__links">
              <Link to={"/advertisements"} className="stickie-nav__menu-linkk black-link breadcrumb-link mr-3">Advertisements</Link>
              <Link key="users" to={"/profiles"} className="stickie-nav__menu-linkk black-link breadcrumb-link mr-3" onClick={hideMenu}>Users</Link>
                {this.renderContent()}
              </div>
              <div className="navigation">
                <input type="checkbox" id="navigation-toggle" className="navigation__checkbox"/>
                <label htmlFor="navigation-toggle" className="navigation__button">
                  <span className="navigation__icon"></span>
                </label>

                <div className="navigation__background">&nbsp;</div>
                <nav className="navigation__nav">
                  <ul className="navigation__list">
                  <Link to={"/advertisements"} className="stickie-nav__menu-linkk black-link breadcrumb-link mr-3" onClick={hideMenu}>Advertisements</Link>
                  <div key={'users'} className="navigation__list__link">
                    <Link to={"/profiles"} className="stickie-nav__menu-linkk black-link breadcrumb-link mr-3" onClick={hideMenu}>Users</Link>
                  </div>
                  {Array.from(this.renderContent(), itm => <div key={itm.key} className="navigation__list__link">{itm}</div>)}
                  </ul>
                </nav>
              </div>
          </nav>       
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
