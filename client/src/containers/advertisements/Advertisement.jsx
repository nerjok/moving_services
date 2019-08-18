/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { fetchAdvertisement } from '../../store/actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import Map from '../map/Map';
import  UserCard from '../../components/userCard';
import BreadCrumb from '../../components/breadcrumb';
import "react-image-gallery/styles/css/image-gallery.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faShareSquare, faBan } from '@fortawesome/free-solid-svg-icons'


import ImageGallery from 'react-image-gallery';

const toGallery = (id, images) => {
  return images.map(image => ({
    original: `/public/images/${id}/${image}`, 
    //thumbnail: `/public/images/${id}/${image}`
  }))
}

export class Advertisement extends React.Component {

  componentDidMount() {
    this.props.fetchAdvertisement(this.props.match.params.id)
  }

  render() {
    const { advertisement } = this.props
    if (!advertisement)
      return null;

    const {title, description, _user: user, payment, photos, skills, time, tools, _id, dateTime } = advertisement;
    const options = { weekday: 'long', year: 'numeric', month: '2-digit', day: 'numeric', hour: '2-digit', minute: '2-digit', ahourCycle: 'h24' };
    const brdCrumb = [
                      { link: '/advertisements', title: "Advertisements"},
                      { link: "#", title: "Advertisement"}
                    ];
    return (
      <>
      <BreadCrumb links={brdCrumb}/>

      <div className="row mt-2 mb-2" >
        <div className="col-md-12 mb-3">
        {(photos && photos.length > 0) && <ImageGallery showPlayButton={false} showBullets={true} showThumbnails={false} items={toGallery(_id, photos)} />}

        </div>
        <div className="col-md-9 mb-1">
          <div className="card" >
            {/*}
            <div className="card__header">
              <h5 className="card-title">{title}</h5>
              {/*}
              <div className="verticaly-centerr ">
                <div className="float-left">
                  
                </div>

                <div className="float-right mr-3 ">
                  <button className="btn btn-sm btn-outline-success">
                    <FontAwesomeIcon icon={faAddressCard} size="lg" style={{color: '#000'}} />
                  </button>
                  <button className="btn btn-sm btn-outline-dark m-1">
                    <FontAwesomeIcon icon={faShareSquare} size="lg" style={{color: '#fff'}} />
                  </button> 
                  <button className="btn btn-sm btn-outline-warning">
                    <FontAwesomeIcon icon={faBan} size="lg" style={{color: '#fff'}} />
                  </button>    
                </div>
    </div>*/}
            {/*</div>
            */}
            <div className="card-body card__body">
              <h5 className="card-title">{title}</h5>

              <br/>
              <div> <b>Description</b><br/> {description}</div>
              <br/>
              {skills && <div><b>Skils and experience required </b>{skills}</div>}
              {time && <div><b> Time information </b>{time}</div>}
              {tools && <div><b>Tools required </b>{tools}</div>}
              {dateTime && <div><b> Precise time information </b>{new Date(dateTime).toLocaleDateString('lt-LT', options)}</div>}
              {payment && <div><b>Payment information </b>{payment}</div>}
              <br/>

              <h5><b>Location info </b></h5>
              <div className="map" style={{width:'100%', minHeight: '300px', background: 'darkgray'}}>
                <Map location={advertisement.location}/>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-1">
          <UserCard user={user}/>
        </div>
      </div>
      </>
    )
  }
}


const mapStateToProps = ({advertisements: {advertisements, total, page, advertisement}}) => ({advertisement, advertisements, total, page });
export default connect(mapStateToProps, {fetchAdvertisement})(Advertisement)
