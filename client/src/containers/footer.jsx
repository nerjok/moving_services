/* eslint-disable jsx-a11y/anchor-is-valid */
 // eslint-disable-next-line jsx-a11y/anchor-is-valid
import React from 'react';
import { Trans } from 'react-i18next';
import i18next from 'i18next';
import { Link} from 'react-router-dom';


export const Footer = (props) => {

  const { language } =  i18next;
  let url = '';
  if (language !== 'lt') {
    url = `/${language}`;
  }

  return (
    <section className="footer">
      <div className="container text-white" styles={{background: '#4d4d4d', textAlign: 'center', color: 'white', padding: '5px'}}>
             
          <div className="row">
            <div className="col-md-6">
              <h5><Trans>About</Trans></h5>
              <p className="footer__text">
                <Trans>About description</Trans>
              </p>
              <a href="#about" className="more-info"><Trans>More</Trans> &rarr;</a>
            </div>
            <div className="col-md-2">
              <h5><Trans>For seakers</Trans></h5>
              <ul className="footer__list">
               
                <li><a href="#" className="white-link"><Trans>Types</Trans></a></li>
                <li><Link to={`${url}/profiles`} className="white-link"><Trans>Users</Trans></Link></li>
                <li><a href="#" className="white-link"><Trans>My tasks</Trans></a></li>
              </ul>
            </div>
            <div className="col-md-2">
              <h5><Trans>For employees</Trans></h5>
              <ul className="footer__list">
                <li><Link to={`${url}/advertisements`} className="white-link"><Trans>Advertisements</Trans></Link></li>
                <li><a href="#" className="white-link"><Trans>Messages</Trans></a></li>
                <li><a href="#" className="white-link"><Trans>My works</Trans></a></li>
              </ul>
            </div>
            <div className="col-md-2">
              <h5><Trans>Other</Trans></h5>
              <ul className="footer__list">
                <li><a href="#" className="white-link"><Trans>Rules</Trans></a></li>
                <li><a href="#" className="white-link"><Trans>Blog</Trans></a></li>
                <li><a href="#" className="white-link"><Trans>Contacts</Trans></a></li>
              </ul>
            </div>

            <div className="col-12">
              <hr className="footer__break"/>
              2020 Tempus, All right reserved 
              </div>
          </div>
      </div>    
    </section>

  )
}