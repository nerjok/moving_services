import React from 'react'
import PropTypes from 'prop-types';


export const Category = ({title, icon}) => {

  return (
    <div className="categories__card">
                {/* front side */}
                <div className="cardd categories__card__side categories__card__side--front">
                  <div className="card-body text-center">
                    
                    <div className="text-center">
                      <i className={`categories__card__icon ${icon}`}></i>
                    </div>
                    <h5 className="categories__card__title">{title}</h5>
                    <small className="text-red">(22 open positions)</small>
                  </div>
                </div>
                {/*back */}
                <div className="cardd categories__card__side categories__card__side--back">
                  <div className="card-body text-center">
                    <h5 className="categories__card__title">writings & translations</h5>
                    <p className="card-text mt-1 categories__card__text">
                      Text writing, translations, advertising text etc.
                    </p>
                    <a href="#about" class="more-info-2">Explore →</a>
                  </div>
                </div> 

              </div>
  )
}

Category.propTypes = {
  title: PropTypes.string.isRequired,
  icon:  PropTypes.string.isRequired
}
