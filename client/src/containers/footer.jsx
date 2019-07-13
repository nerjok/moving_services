/* eslint-disable jsx-a11y/anchor-is-valid */
 // eslint-disable-next-line jsx-a11y/anchor-is-valid
import React from 'react'

export const Footer = (props) => {

  return (
    <section className="footer">
      <div className="container text-white" styles={{background: '#4d4d4d', textAlign: 'center', color: 'white', padding: '5px'}}>
             
          <div className="row">
            <div className="col-md-6">
              <h5>About</h5>
              <p className="footer__text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima, assumenda ipsum quibusdam necessitatibus 
                quo quia aut neque adipisci debitis! Voluptatem nostrum cumque quo quod eos corrupti, 
                error corporis iusto laudantium.
              </p>
              <a href="#about" className="more-info">More &rarr;</a>
            </div>
            <div className="col-md-2">
              <h5>For seakers</h5>
              <ul className="footer__list">
               
                <li><a href="#" className="white-link">Types</a></li>
                <li><a href="#" className="white-link">Proposals</a></li>
                <li><a href="#" className="white-link">Search</a></li>
                <li><a href="#" className="white-link">My tasks</a></li>
              </ul>
            </div>
            <div className="col-md-2">
              <h5>For employees</h5>
              <ul className="footer__list">
                <li><a href="#" className="white-link">Seekers</a></li>
                <li><a href="#" className="white-link">Jobs</a></li>
                <li><a href="#" className="white-link">Eployess</a></li>
                <li><a href="#" className="white-link">My tasks</a></li>
              </ul>
            </div>
            <div className="col-md-2">
              <h5>Other</h5>
              <ul className="footer__list">
                <li><a href="#" className="white-link">Main</a></li>
                <li><a href="#" className="white-link">Rules</a></li>
                <li><a href="#" className="white-link">Blog</a></li>
                <li><a href="#" className="white-link">Contacts</a></li>
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