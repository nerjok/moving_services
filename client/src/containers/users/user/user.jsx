import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import UserCard from '../../../components/userCard';
import PropTypes from 'prop-types';
import { fetchUserProfile, removeUserProfile } from '../../../store/actions';
import Breadcrumb from '../../../components/breadcrumb';
import Spinner from '../../../components/spinner';
import ImageGallery from "react-image-gallery";

import {
  faEnvelope, faCity, faCalendar
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_INPUTS = [
  {name: 'description', type: 'text', title: 'Description', value: 'description', disabled: false},
  {name: 'sphere', type: 'text', title: 'Work sphere', value: 'name', disabled: false},
  {name: 'scope', type: 'text', title: 'Work amounts and project', value: 'name', disabled: false},
  {name: 'experience', type: 'text', title: 'Experience', value: 'name', disabled: false},
]


const SUMMURY = [
  {name: 'email', title: 'Email', icon: faEnvelope, path: ''},
  {name: 'cityName', title: 'Region of services', icon: faCity, path: 'title'},
  {name: 'availability', title: 'Time info', icon: faCalendar, path: 'title'}
]

const toGallery = (id, images) => {
  return images.map(image => ({
    original: `/${image}`
      //original: `/public/images/users/${id}/works/${image}`
    //thumbnail: `/public/images/${id}/${image}`
  }));
};


export const User = (props) => {

  useEffect(() => {
    if (props.match && props.match.params)
      props.fetchUserProfile(props.match.params.id);

    return () => {props.removeUserProfile()};
  }, [])
  const { user } = props
  if (!user)
    return <Spinner/> 
  const { name, work_photos } = user
    console.log("userPAge", props.user)
  return (
    <>
    <Breadcrumb links={[{link: "/profiles", title: "Users"}, {link: "#", title: "User"}]} />
    <div className="row" style={{marginTop: '2rem', marginBottom: '2rem'}}>


          <div className="col-md-12 mb-5">
            {work_photos && work_photos.length > 0 && (
              <div className="mt-5" style={{ border: "15px solid black" }}>
                <ImageGallery
                  showPlayButton={false}
                  showBullets={true}
                  showThumbnails={false}
                  items={toGallery(user._id, work_photos)}
                />
              </div>
            )}
          </div>


      <div className="col-md-8 mb-1">

     
            <h5 className="card-title mb-0"><b>{name}</b></h5>
            <small>{user.updatedAt && new Date(user.updatedAt).toDateString()}</small>
            <hr/>

            {Array.from(USER_INPUTS, ({title, name}) => {
              if (!props.user[name])
                return null;
            return <React.Fragment key={`maininf-${name}`}><b>{title}:</b><p  className="mt-2" key={title}> {props.user[name] || ''}</p></React.Fragment>
            })}

        </div>


        <div className="col-md-4">
          <UserCard user={props.user}>
            {SUMMURY.map(({title, icon, name, path})=> {
              if (user[name]) {
                let txt;
                if (path)
                  txt = user[name][path];
                else
                  txt = user[name];  
                return (
                      <div className="mt-3" key={`infobar-${name}`}>
                        <FontAwesomeIcon
                          icon={icon}
                          size="lg"
                          style={{ color: "gray" }}
                        />
                        <b> {title}</b>
                        <span className="mt-1  ml-4 d-block">{txt}</span>
                      </div>
                  );
                }
            })}
          </UserCard>
        </div>
    </div>
    </>
  )
}

User.propTypes = {
  auth: PropTypes.object.isRequired
}

function mapStateToProps({user, auth}) {
  return {
      user, auth
  }
}

export default connect(mapStateToProps, {fetchUserProfile, removeUserProfile })(User)
