import React from 'react'


class BlogSlider extends React.Component {

  render() {
    return (
      <section className="blog-slider">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center m-4">
                <h3>Quick Carrier and search types</h3>
                <small>Find out better ways to get involved into provided services, comunication and sustainable live.</small>
            </div>
            <div className="col-md-4">

              <div className="card blog-slider__card" >
                <figure style={{position:'relative'}}>  
                <figcaption className="blog-slider__card__caption">2019-18-15 | 0 comments</figcaption>
                  {/* eslint-disable-next-line jsx-a11y/img-redundant-alt*/}
                  <img className="card-img-top blog-slider__card__image" src={require("../assets/images/student-849825_640.jpg")} alt="Card image cap"/>
                </figure>
                <div className="card-body">
                  <h5 className="card-title">Search Types</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                    </p>
                    <hr/>
                  <a href="#to" className="more-info-2 ">Read more <span className="more-info-2__arrow">&rarr;</span></a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card blog-slider__card" >
                <figure style={{position:'relative'}}>  
                <figcaption className="blog-slider__card__caption">2019-18-15 | 0 comments</figcaption>
                  {/* eslint-disable-next-line jsx-a11y/img-redundant-alt*/}
                  <img className="card-img-top blog-slider__card__image" src={require("../assets/images/ecology-2985781_640.jpg")} alt="Card image cap"/>
                </figure>
                <div className="card-body">
                  <h5 className="card-title">Sustainable time managment</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                    </p>
                    <hr/>
                  <a href="#to" className="more-info-2 ">Read more <span className="more-info-2__arrow">&rarr;</span></a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
            <div className="card blog-slider__card" >
                <figure style={{position:'relative'}}>  
                <figcaption className="blog-slider__card__caption">2019-18-15 | 0 comments</figcaption>
                  {/* eslint-disable-next-line jsx-a11y/img-redundant-alt*/}
                  <img className="card-img-top blog-slider__card__image" src={require("../assets/images/building-1080592_640.jpg")} alt="Card image cap"/>
                </figure>
                <div className="card-body">
                  <h5 className="card-title">Direct to point</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                    </p>
                    <hr/>
                  <a href="#to" className="more-info-2 ">Read more <span className="more-info-2__arrow">&rarr;</span></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}


export default BlogSlider;