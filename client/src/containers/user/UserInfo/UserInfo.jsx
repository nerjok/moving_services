import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { EDIT_INPUTS } from './fields';

import UpdateUser from './updateUser'; 
import UpdatePassword from './updatePassword';
import UpdateJobInfo from './updateJobInfo';
import FileUpload from './FileUpload';
import { Tabs, Tab } from 'react-bootstrap';
import { uploadProfilePhoto, uploadWorkPhoto, deleteWorkPhoto } from '../../../store/actions';
class UserInfo extends React.Component {

  state = {
    activeTab: '/user/profile'
  }

  constructor(props) {
    super(props)
    this.deleteWorkPhoto = this.deleteWorkPhoto.bind(this);
  }

  showProfile() {
    const { auth } = this.props
    return (
      <>
        {_.map(EDIT_INPUTS, ({name, type, title, value, disabled}) => <p key={name}><b>{title}:</b> {auth[name] || ''}</p>)}
      </>
    )
  }

  componentDidMount() {
    const { pathname } = this.props.history.location;
    if (pathname.length > 5)
      this.setState({activeTab: pathname});
  }

  handleSelect(route) {
    this.props.history.push(`${route}`)
    this.setState({activeTab: route})
  }

  deleteWorkPhoto({target}) {
    this.props.deleteWorkPhoto(this.props.auth._id, target.getAttribute('photo_id'));
  }

  render() {
    const { auth } = this.props
    console.log(auth.work_photos)
    return (
      <Tabs activeKey={this.state.activeTab} transition={false} id="user-page" className="user-page" unmountOnExit={true}
      onSelect={this.handleSelect.bind(this)}
      >
        <Tab eventKey="/user/profile" title="Profile">
          {this.showProfile()}
        </Tab>
        <Tab eventKey="/user/editprofile" title="Edit">
          <UpdateUser/>
        </Tab>
        <Tab eventKey="/user/jobsinfo" title="Job search">
          <UpdateJobInfo/>
        </Tab>
        <Tab eventKey="/user/photo" title="Photos">
          Photos
          {auth.work_photos.map(photo => {
            console.log('photo', photo)
            
                      return (<div key={photo} style={{position:'relative', width: "90%", margin: "5px"}} key={photo}>
                      <img src={`/${photo}`}  width={"100%"} alt="image not displayd"/>
                      <button
                        className="btn btn-sm btn-danger" 
                        photo_id={photo} 
                        style={{position:"absolute", top: 5, right: 5}}
                        onClick={this.deleteWorkPhoto}
                        > 
                        &#10005;
                      </button>
                      </div>
                    )
          })}
          <FileUpload uploadPhoto={this.props.uploadWorkPhoto} id={auth._id} multi={true}/>
        </Tab>
        <Tab eventKey="/user/profile_photo" title="Profile photo">
          Profile photo
          <FileUpload uploadPhoto={this.props.uploadProfilePhoto} id={auth._id}/>
        </Tab>
        <Tab eventKey="/user/security" title="Security">
          <UpdatePassword/>
        </Tab>
      </Tabs>
    )
  }
} 

function mapStateToProps({auth}) {
  return {
      auth
  }
}

export default connect(mapStateToProps, {uploadProfilePhoto, uploadWorkPhoto, deleteWorkPhoto})(UserInfo)
