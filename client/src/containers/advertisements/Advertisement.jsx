/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { fetchAdvertisement, applyJob, sendMessage } from '../../store/actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import Map from '../map/Map';
import  UserCard from '../../components/userCard';
import BreadCrumb from '../../components/breadcrumb';
import "react-image-gallery/styles/css/image-gallery.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faShareSquare, faBan } from '@fortawesome/free-solid-svg-icons'
import { StatusBtn, WorkTypeBtn } from '../../components/statusBtn/statusBtn';
import Spinner from '../../components/spinner';
import ApplyJob from '../../components/applyJob';
import Messaging from '../../components/messaging';
import ImageGallery from 'react-image-gallery';

const toGallery = (id, images) => {
  return images.map(image => ({
    original: `/public/images/${id}/${image}`, 
    //thumbnail: `/public/images/${id}/${image}`
  }))
}

export class Advertisement extends React.Component {
  state = {error: ''}
  componentDidMount() {
    
    this.props.fetchAdvertisement(this.props.match.params.id)
    this.applyForJob = this.applyForJob.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  applyForJob = async (message) => {
    const { advertisement: { _id: advertisement_id, _user: { _id: receiver_id } } } = this.props
    const data = { advertisement_id, receiver_id, message }

    this.props.applyJob(data).then(succ => {
      this.setState({error: succ.error});
    })
    .catch(err=>console.log('err', err));
  }

  sendMessage(message) {
    const {advertisement: {_id: advertisement_id, _user: {_id: receiver_id}}} = this.props
    console.log('sendMessage', message, receiver_id);
    this.props.sendMessage({message, receiver_id, advertisement_id});
  }

  render() {
    const { advertisement } = this.props
   

    if (!advertisement)
      return <Spinner/>;
       //console.log('advertisement', advertisement, typeof advertisement.updatedAt)
    let upDate = advertisement.updatedAt || advertisement.createdAt
    if (upDate) {
      upDate = new Date(upDate).toDateString();
    }
    const {title, description, _user: user, payment, photos, skills, time, tools, _id, dateTime, status, workType, updatedAt } = advertisement;
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

            <div className="card-body card__body">
              <h5 className="card-title">{title}</h5>
              <div className="text-right">
                <span className="mr-1 p-1">
                  <small>Published: {upDate}</small>
                </span>
                
                <StatusBtn status={status} />
                <WorkTypeBtn status={workType} />
                <ApplyJob apply={this.applyForJob}/>
              </div>
              <div className="float-right">
                {this.state.error && <small>{this.state.error}</small>}
              </div> 

              <div className="mt-5 mb-5"> <b>Description</b><br/> {description}</div>
              
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
          <UserCard user={user} advertisement_id={_id}>
            {/*user && <Messaging sendMsg={this.sendMessage}/>*/}

          </UserCard>
        </div>
      </div>
      </>
    )
  }
}


const mapStateToProps = ({advertisements: {advertisements, total, page, advertisement}}) => ({advertisement, advertisements, total, page });
export default connect(mapStateToProps, { fetchAdvertisement, applyJob, sendMessage })(Advertisement)
