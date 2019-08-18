import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { EDIT_INPUTS } from './fields';

import UpdateUser from './updateUser'; 
import UpdatePassword from './updatePassword';
import { Tabs, Tab } from 'react-bootstrap';

class UserInfo extends React.Component {

  showProfile() {
    const { auth } = this.props
    return (
      <>
        {_.map(EDIT_INPUTS, ({name, type, title, value, disabled}) => <p key={name}><b>{title}:</b> {auth[name] || ''}</p>)}
      </>
    )
  }

  render() {
    return (
      <Tabs defaultActiveKey="home" transition={false} id="user-page" className="user-page" unmountOnExit={true}>
        <Tab eventKey="home" title="Profile">
          {this.showProfile()}
        </Tab>
        <Tab eventKey="profile" title="Edit">
          <UpdateUser/>
        </Tab>
        <Tab eventKey="contact" title="Photos">
          Photos
        </Tab>
        <Tab eventKey="security" title="Security">
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

export default connect(mapStateToProps, {})(UserInfo)
