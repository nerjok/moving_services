import React, { Component} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
//import Payments from './Payments'
//import { link } from 'fs';
//import { Search } from './map/search/search'

const hideMenu = () => {console.log('hideMenu');document.getElementById('navigation-toggle').checked = false;}

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
                        className="stickie-nav__menu-link"
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
                    <Link key="users" to={"/profiles"} className="stickie-nav__menu-link" onClick={hideMenu}>Users</Link>,
                    //<Link to={"/profile"} className="stickie-nav__menu-link">Profile</Link>,
                    <Link key="myProfile" to={"/user"} className="stickie-nav__menu-link" onClick={hideMenu}>Info</Link>,

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
              <Link to={"/advertisements"} className="stickie-nav__menu-link">Advertisements</Link>
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
                  <Link to={"/advertisements"} className="stickie-nav__menu-link" onClick={hideMenu}>Advertisements</Link>
                  {Array.from(this.renderContent(), itm => <div key={itm.key} className="navigation__list__link">{itm}</div>)}
                  </ul>
                </nav>
              </div>
          </nav>
          
 

{/*}
          <div className="header-img">
            &nbsp;
            <section
            className="section-header__search"
            >

            <div className="container header__search"
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


              </div>
            </section>

          </div>
*/}          
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
