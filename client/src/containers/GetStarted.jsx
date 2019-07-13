import React from 'react'


export const GetStarted = props => {

  return (
    <section className="get-started">
      <div className="container text-center p-5">
        <h5 className="get-started__heading-visible">Login and read rules to get started now</h5>
        <h5 className="get-started__heading-hidden">
          <a href="#to" className="more-info-2 ">Get started <span className="more-info-2__arrow">→</span></a></h5>
      </div>
    </section>
  )
}