import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Trans } from 'react-i18next';

import { EDIT_INPUTS } from './fields';

import UpdateUser from './updateUser'; 
import UpdatePassword from './updatePassword';
import UpdateJobInfo from './updateJobInfo';
import FileUpload from './FileUpload';
import { Tabs, Tab } from 'react-bootstrap';
import { uploadProfilePhoto, uploadWorkPhoto, deleteWorkPhoto } from '../../../store/actions';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '/user/profile'
    }

    this.deleteWorkPhoto = this.deleteWorkPhoto.bind(this);
  }

  showProfile() {
    const { auth } = this.props
    return (
      <>
        {_.map(EDIT_INPUTS, ({name, type, title, value, disabled}) => <p key={name}><b><Trans>{title}</Trans>:</b> {auth[name] || ''}</p>)}
      </>
    )
  }

  componentDidMount() {
    const { pathname } = this.props.history.location;
    if(['/en/user', '/ru/user'].includes(pathname)) {
      const { lang } = this.props.match.params
      this.setState({activeTab: `/${lang}${this.state.activeTab}`})
    } else if (pathname.length > 6)
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
    const { lang } = this.props.match.params
    let url = '';
    if(lang) {
      url = `/${lang}`;
    } 
    
    return (
      <Tabs activeKey={this.state.activeTab} transition={false} id="user-page" className="user-page" unmountOnExit={true}
      onSelect={this.handleSelect.bind(this)}
      >
        <Tab eventKey={`${url}/user/profile`} title={<Trans>Profile</Trans>}>
          {this.showProfile()}
        </Tab>
        <Tab eventKey={`${url}/user/editprofile`} title={<Trans>Edit profile</Trans>}>
          <UpdateUser/>
        </Tab>
        <Tab eventKey={`${url}/user/jobsinfo`} title={<Trans>Job Search</Trans>}>
          <UpdateJobInfo/>
        </Tab>
        <Tab eventKey={`${url}/user/photo`} title={<Trans>Photos</Trans>}>
        <Trans>Photos</Trans>
          <br/>
          { auth.work_photos && auth.work_photos.map(photo => {
            
                      return (<div key={photo} style={{position:'relative', width: "90%", margin: "5px"}} key={photo}>
                      <img src={`/${photo}`}  width={"100%"}/>
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
        <Tab eventKey={`${url}/user/profile_photo`} title={<Trans>Profile photo</Trans>}>
          <Trans>Profile photo</Trans>
          <FileUpload uploadPhoto={this.props.uploadProfilePhoto} id={auth._id}/>
        </Tab>
        <Tab eventKey={`${url}/user/security`} title={<Trans>Password</Trans>}>
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
