/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { fetchAdvertisement } from '../../store/actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import Map from '../map/Map';
import  UserCard from '../../components/userCard';
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

  state = {
    edit: false
  }

  componentDidMount() {
    this.props.fetchAdvertisement(this.props.match.params.id)
  }

  render() {
    const { advertisement } = this.props
    if (!advertisement)
      return null;

    const {title, description, _user: user, payment, photos, skills, time, tools, _id } = advertisement;
    
    return (
      <div className="row mt-2 mb-2" >
        <div className="col-md-12 mb-3">
        {(photos && photos.length > 0) && <ImageGallery showPlayButton={false} showBullets={true} showThumbnails={false} items={toGallery(_id, photos)} />}

        </div>
        <div className="col-md-9 mb-1">
          <div className="card" >
            <div className="card__header">
              <div className="verticaly-center ">
                <div className="float-left">
                  <Link to={"/"} className="breadcrumb-link">Home</Link>
                  {' '}&#187;{' '}
                  <Link to={"/advertisements"} className="breadcrumb-link">Advertisements</Link>
                  {' '}&#187;{' '} <Link to={"#"} className="breadcrumb-link">Advertisement</Link>
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
              </div>
            </div>
            <div className="card-body">
              <h5 className="card-title">{title}</h5>

              <br/>
              <div> {description}</div>
              <br/>
              <div><b>Skils and experience required</b>{skills}</div>
              <br/>
              {time && <div><b> Time information</b>{time}</div>}
              <br/>
              <div><b>Payment information</b>{payment}</div>
              <div><b>Tools required</b>{tools}</div>
              <br/>
              
              <br/>

              <h5><b>Location info </b></h5>
              <div className="map" style={{width:'100%', minHeight: '300px', background: 'darkgray'}}>
                
                <Map/>
                </div>
            </div>
          </div>
        </div>


          <div className="col-md-3 mb-1">
            <UserCard user={user}/>
          </div>
      </div>

    )
  }
}


const mapStateToProps = ({advertisements: {advertisements, total, page, advertisement}}) => ({advertisement, advertisements, total, page });
export default connect(mapStateToProps, {fetchAdvertisement})(Advertisement)
