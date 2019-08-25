import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { EDIT_INPUTS } from './fields';

import UpdateUser from './updateUser'; 
import UpdatePassword from './updatePassword';
import UpdateJobInfo from './updateJobInfo';
import { Tabs, Tab } from 'react-bootstrap';

class UserInfo extends React.Component {

  state = {
    activeTab: '/user/profile'
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
  render() {
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

export default connect(mapStateToProps, {})(UserInfo)
