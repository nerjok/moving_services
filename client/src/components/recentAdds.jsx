import React from 'react'

export const RecentAdds = props => {

  return (
<div class="block" style={{background: '#f2f2f2', padding: '5px'}}>
            <div class="container">
                <div class="section-title">
                    <h2>Events Near You</h2>
                </div>
                <div class="row">
                    <div class="col-md-4 col-sm-4">
                        <div class="text-element event">
                            <div class="date-icon">
                                <figure class="day">22</figure>
                                <figure class="month">Jun</figure>
                            </div>
                            <h4><a href="detail.html">Lorem ipsum dolor sit amet</a></h4>
                            <figure class="date"><i class="icon_clock_alt"></i>08:00</figure>
                            <p>Ut nec vulputate enim. Nulla faucibus convallis dui. Donec arcu enim, scelerisque.</p>
                            <a href="detail.html" class="link arrow">More</a>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                        <div class="text-element event">
                            <div class="date-icon">
                                <figure class="day">04</figure>
                                <figure class="month">Jul</figure>
                            </div>
                            <h4><a href="detail.html">Donec mattis mi vitae volutpat</a></h4>
                            <figure class="date"><i class="icon_clock_alt"></i>12:00</figure>
                            <p>Nullam vitae ex ac neque viverra ullamcorper eu at nunc. Morbi imperdiet.</p>
                            <a href="detail.html" class="link arrow">More</a>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                        <div class="text-element event">
                            <div class="date-icon">
                                <figure class="day">12</figure>
                                <figure class="month">Aug</figure>
                            </div>
                            <h4><a href="detail.html">Vivamus placerat</a></h4>
                            <figure class="date"><i class="icon_clock_alt"></i>12:00</figure>
                            <p>Aenean sed purus ut massa scelerisque bibendum eget vel massa.</p>
                            <a href="detail.html" class="link arrow">More</a>
                        </div>
                    </div>
                </div>
                <div class="background-wrapper">
                    <div class="background-color background-color-black opacity-5"></div>
                </div>
            </div>
        </div>
  )
}