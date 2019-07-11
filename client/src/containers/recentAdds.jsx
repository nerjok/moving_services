import React from 'react'

export const RecentAdds = props => {

  return (
<div className="block" style={{background: '#f2f2f2', padding: '5px'}}>
            <div className="container">
                <div className="section-title">
                    <h2>Events Near You</h2>
                </div>
                <div className="row">
                    <div className="col-md-4 col-sm-4">
                        <div className="text-element event">
                            <div className="date-icon">
                                <figure className="day">22</figure>
                                <figure className="month">Jun</figure>
                            </div>
                            <h4><a href="detail.html">Lorem ipsum dolor sit amet</a></h4>
                            <figure className="date"><i className="icon_clock_alt"></i>08:00</figure>
                            <p>Ut nec vulputate enim. Nulla faucibus convallis dui. Donec arcu enim, scelerisque.</p>
                            <a href="detail.html" className="link arrow">More</a>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <div className="text-element event">
                            <div className="date-icon">
                                <figure className="day">04</figure>
                                <figure className="month">Jul</figure>
                            </div>
                            <h4><a href="detail.html">Donec mattis mi vitae volutpat</a></h4>
                            <figure className="date"><i className="icon_clock_alt"></i>12:00</figure>
                            <p>Nullam vitae ex ac neque viverra ullamcorper eu at nunc. Morbi imperdiet.</p>
                            <a href="detail.html" className="link arrow">More</a>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <div className="text-element event">
                            <div className="date-icon">
                                <figure className="day">12</figure>
                                <figure className="month">Aug</figure>
                            </div>
                            <h4><a href="detail.html">Vivamus placerat</a></h4>
                            <figure className="date"><i className="icon_clock_alt"></i>12:00</figure>
                            <p>Aenean sed purus ut massa scelerisque bibendum eget vel massa.</p>
                            <a href="detail.html" className="link arrow">More</a>
                        </div>
                    </div>
                </div>
                <div className="background-wrapper">
                    <div className="background-color background-color-black opacity-5"></div>
                </div>
            </div>
        </div>
  )
}