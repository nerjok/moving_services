import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
//import Payments from './Payments'
//import { link } from 'fs';
//import { Search } from './map/search/search'

import { Trans } from "react-i18next";
import i18next from "i18next";
import Select, { components } from "react-select";

import pngLt from "../assets/images/lithuania-flag-xs.png";
import pngEn from "../assets/images/united-kingdom-flag-xs.png";
import pngRu from "../assets/images/russia-flag-xs.png";

const hideMenu = () =>
  (document.getElementById("navigation-toggle").checked = false);

const CustomOption = ({ value, label, innerProps, innerRef }) => (
  <div
    ref={innerRef}
    style={{ display: "flex", padding: "5px" }}
    {...innerProps}
  >
    <img
      src={label === "En" ? pngEn : label === "Ru" ? pngRu : pngLt}
      style={{ width: "30px" }}
    />
    <div style={{ color: "#ccc", marginLeft: "5px", textAlign: "left" }}>
      {label}
    </div>
  </div>
);

const options = [
  { value: "lt", label: "Lt" },
  { value: "en", label: "En" },
  { value: "ru", label: "Ru" }
];

const customStyles = {
  container: base => ({
    ...base,
    width: 80,
    display: "inline-block"
  }),
  control: base => ({
    ...base,
    minHeight: 30,
    height: 30
  }),

  indicatorsContainer: abc => ({
    ...abc,
    minHeight: 20,
    height: 25,
    padding: 3
  }),
  indicatorSeparator: abc => ({
    ...abc,
    border: "none",
    margin: 0,
    height: "100%"
  }),

  valueContainer: abc => ({
    ...abc,
    minHeight: 20,
    height: 25
  }),

  singleValue: abc => ({
    ...abc,
    minHeight: 20,
    height: 25,
    padding: "4 2"
  })
};

export class Header extends Component {
  state = { isOpen: false };

  renderContent() {
    const { auth } = this.props;
    const email = auth.email || auth.name || false;
    let { url } = this.props.match;
    if (url.length <= 1) {
      url = "";
    }

    switch (email) {
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
        return [
          /*<Link 
                        key="surveys"
                        to={this.props.auth ? "/surveys" : "/"} 
                        className="stickie-nav__menu-link">
                        Surveys
                      </Link>,*/
          //<Link key="users" to={"/profiles"} className="stickie-nav__menu-link" onClick={hideMenu}>Users</Link>,
          //<Link to={"/profile"} className="stickie-nav__menu-link">Profile</Link>,
          <Link
            key="myProfile"
            to={`${url}/user`}
            className="stickie-nav__menu-linkk black-link breadcrumb-link mr-3"
            onClick={hideMenu}
          >
            <Trans>Profile</Trans>
          </Link>
        ];
    }
  }

  changeSelections = ({ value: lang, label }) => {
    const language = i18next.language;

    if (lang !== language) {
      if (lang === "lt") window.location.href = "/";
      else window.location.href = `/${lang}`;
    }
  };

  langGroup() {
    const language = i18next.language;

    return (
      <Select
        components={{ Option: CustomOption }}
        Heading={CustomOption}
        options={options}
        styles={customStyles}
        value={options.filter(option => option.value === language)}
        onChange={this.changeSelections}
        isSearchable={false}
      />
    );
  }

  render() {
    let { url } = this.props.match;
    if (url.length <= 1) {
      url = "";
    }
    return (
      <>
        <nav className="navbar stickie-nav">
          <h5 className="stickie-nav__logo">
            <Link to={url} className="stickie-nav__logo">
              TempusWork
            </Link>
          </h5>
          <div className="header__links">
            <Link
              to={`${url}/advertisements`}
              className="stickie-nav__menu-linkk black-link breadcrumb-link mr-3"
            >
              <Trans>Advertisements</Trans>
            </Link>
            <Link
              key="users"
              to={url + "/profiles"}
              className="stickie-nav__menu-linkk black-link breadcrumb-link mr-3"
              onClick={hideMenu}
            >
              <Trans>Users</Trans>
            </Link>
            {this.renderContent()}
            {this.langGroup()}
          </div>
          <div className="navigation">
            <input
              type="checkbox"
              id="navigation-toggle"
              className="navigation__checkbox"
            />
            <label htmlFor="navigation-toggle" className="navigation__button">
              <span className="navigation__icon"></span>
            </label>

            <div className="navigation__background">&nbsp;</div>
            <nav className="navigation__nav">
              <ul className="navigation__list">
                <Link
                  to={`${url}/advertisements`}
                  className="stickie-nav__menu-linkk black-link breadcrumb-link mr-3"
                  onClick={hideMenu}
                >
                  <Trans>Advertisements</Trans>
                </Link>
                <div key={"users"} className="navigation__list__link">
                  <Link
                    to={`${url}/profiles`}
                    className="stickie-nav__menu-linkk black-link breadcrumb-link mr-3"
                    onClick={hideMenu}
                  >
                    <Trans>Users</Trans>
                  </Link>
                </div>
                {Array.from(this.renderContent(), itm => (
                  <div key={itm.key} className="navigation__list__link">
                    {itm}
                  </div>
                ))}
                {this.langGroup()}
              </ul>
            </nav>
          </div>
        </nav>
      </>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth
  };
}

export default connect(
  mapStateToProps,
  null
)(Header);
