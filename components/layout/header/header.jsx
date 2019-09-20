import React, { Component} from 'react'
import Link from 'next/link'


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
                        href={"/login"} 
                        >
                          <a
                            className="stickie-nav__menu-linkk black-link breadcrumb-link mr-3"
                            onClick={hideMenu}>          
                          Login
                          </a>
										  </Link>
                ];
            default:
                return ([
                  <Link 
                      key="myProfile" href={"/user"} >
                        <a
                          className="stickie-nav__menu-linkk black-link breadcrumb-link mr-3"
                          onClick={hideMenu}> 
                        Info</a>
                      </Link>,
                ]
                );
        }
    }

    render() {
        return (
          <>
           <nav className="navbar stickie-nav" style={{position: 'fixed', top: 0}}>
            <h5 className="stickie-nav__logo">
             <Link href="/">
                  <a
                          className="stickie-nav__logo"
                          onClick={hideMenu}> 
                TempusWork
                </a>
              </Link>
            </h5>
              <div className="header__links">
              <Link href={"/advertisements"}>
              <a
                className="stickie-nav__menu-linkk black-link breadcrumb-link mr-3"
                onClick={hideMenu}> 
                Advertisements
                </a>
                </Link>
              <Link 
                key="users" href={"/profiles"} 
                >
                    <a
                      className="stickie-nav__menu-linkk black-link breadcrumb-link mr-3"
                      onClick={hideMenu}> 
                   Users
                   </a>
                  </Link>
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
                  <Link href={"/advertisements"}>
                  <a
                          className="stickie-nav__menu-linkk black-link breadcrumb-link mr-3"
                          onClick={hideMenu}> 
                    Advertisements
                    </a></Link>
                  <div key={'users'} className="navigation__list__link">
                    <Link href={"/profiles"}>
                    <a
                      className="stickie-nav__menu-linkk black-link breadcrumb-link mr-3"
                      onClick={hideMenu}> 
                      Users</a></Link>
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

export default Header
