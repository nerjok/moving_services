import React from 'react'

import { Category } from './category'

export class Categories extends React.Component {


  render() {
    return (
      <section className="categories-section p-4">
        <div className="categories container">
          <div className="text-center">
            <h5>Categories</h5>
            <small>Explore advertisements by categories</small>
          </div>

          <div className="row mt-4">
            <div className="col-md-3 p-1">
            <Category
              title='writings & translations'
              icon="icon-basic-keyboard"
            />
            </div>
            <div className="col-md-3 p-1">
              <Category
                title='construction & home'
                icon="icon-basic-settings"
              />
            </div>
            <div className="col-md-3 p-1">
              <Category
                title='cleaning & refreshing'
                icon="icon-basic-home"
              />
            </div>
            <div className="col-md-3 p-1">
              <Category
                title='homecare & babysiting'
                icon="icon-basic-heart-broken"
              />
            </div>

            <div className="col-md-3 p-1">
              <Category
                title='transport & logistics'
                icon="icon-basic-geolocalize-05"
              />
            </div>
            <div className="col-md-3 p-1">
              <Category
                title='computers & phones'
                icon="icon-basic-laptop"
              />
            </div>

            <div className="col-md-3 p-1">
              <Category
                title='clothes & wears'
                icon="icon-basic-pencil-ruler"
              />
            </div>

            <div className="col-md-3 p-1">
              <Category
                title='clothes & wears'
                icon="icon-basic-pencil-ruler"
              />
            </div>
          </div>
          <a href="#to" className="more-info-2 mt-3">Discover more <span class="more-info-2__arrow">→</span></a>
        </div>
      </section>
    )
  }
}


export default Categories;