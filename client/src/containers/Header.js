import React, { Component} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
//import Payments from './Payments'
//import { link } from 'fs';
//import { Search } from './map/search/search'

import { Trans } from 'react-i18next';
import i18next from 'i18next'

const hideMenu = () => document.getElementById('navigation-toggle').checked = false;


export class Header extends Component {
    state = { isOpen: false }


    renderContent() {
    const { auth } = this.props
    const email = (auth.email ||auth.name) || false
    let  { url } = this.props.match;
    if (url.length <=1 ) {
      url = '';
    }    

		switch(email) {
            case null:
                return;
            case false:
                return [
                      <Link 
                        key="login"
                        to={`${url}/login`} 
                        className="stickie-nav__menu-linkk black-link breadcrumb-link mr-3"
                        onClick={hideMenu}
                        >
                          <Trans>Login</Trans>
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
                    <Link key="myProfile" to={`${url}/user`} className="stickie-nav__menu-linkk black-link breadcrumb-link mr-3" onClick={hideMenu}><Trans>Profile</Trans></Link>,

                ]
                );
        }
    }

    changeLanguage = ({target}) => {

      const lang = target.getAttribute('lang')
      const language =   i18next.language;      
      
      if (lang !== language) {
        if (lang === 'lt')
          window.location.href = '/';
        else
          window.location.href = `/${lang}`;
      }
    }

    langGroup() {
      const language =   i18next.language;  

      return (
        <div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
        <button type="button" onClick={this.changeLanguage} lang="lt" className={`btn btn-success ${language === 'lt' ? 'active' : ''}`}>Lt</button>
        <button type="button" onClick={this.changeLanguage} lang="en" className={`btn btn-success ${language === 'en' ? 'active' : ''}`}>En</button>
        <button type="button" onClick={this.changeLanguage} lang="ru" className={`btn btn-success ${language === 'ru' ? 'active' : ''}`}>Ru</button>
      </div>
      )
    }
    render() {
      let { url } = this.props.match;
      if (url.length <= 1 ) {
        url = '';
      }
        return (
          <>
           <nav className="navbar stickie-nav">
            <h5 className="stickie-nav__logo">
             <Link 
                to={url}
                className="stickie-nav__logo">
                TempusWork
              </Link>
            </h5>
              <div className="header__links">
              <Link to={`${url}/advertisements`} className="stickie-nav__menu-linkk black-link breadcrumb-link mr-3"><Trans>Advertisements</Trans></Link>
              <Link key="users" to={url+'/profiles'} className="stickie-nav__menu-linkk black-link breadcrumb-link mr-3" onClick={hideMenu}><Trans>Users</Trans></Link>
                {this.renderContent()}
                {this.langGroup()}
              </div>
              <div className="navigation">
                <input type="checkbox" id="navigation-toggle" className="navigation__checkbox"/>
                <label htmlFor="navigation-toggle" className="navigation__button">
                  <span className="navigation__icon"></span>
                </label>

                <div className="navigation__background">&nbsp;</div>
                <nav className="navigation__nav">
                  <ul className="navigation__list">
                  <Link to={`${url}/advertisements`} className="stickie-nav__menu-linkk black-link breadcrumb-link mr-3" onClick={hideMenu}><Trans>Advertisements</Trans></Link>
                  <div key={'users'} className="navigation__list__link">
                    <Link to={`${url}/profiles`} className="stickie-nav__menu-linkk black-link breadcrumb-link mr-3" onClick={hideMenu}><Trans>Users</Trans></Link>
                  </div>
                  {Array.from(this.renderContent(), itm => <div key={itm.key} className="navigation__list__link">{itm}</div>)}
                  {this.langGroup()}
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
