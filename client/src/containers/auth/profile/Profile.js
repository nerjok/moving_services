import React from 'react'
import {connect} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import _ from 'lodash'
import { updateData } from '../../../store/actions/index'

const EDIT_INPUTS = [
  {name: 'email', type: 'text', title: 'Email address:', value: 'email', disabled: true},
  {name: 'name', type: 'text', title: 'Name', value: 'name', disabled: false},
  {name: 'newPassword', type: 'password', title: 'New password:', disabled: false},
  {name: 'repeatPassword', type: 'password', title: 'Repeat password:', disabled: false},
  {name: 'currentPassword', type: 'password', title: 'Current password:', disabled: false}
]
class Profile extends React.Component {

  
  constructor(props) {
    super(props)

    this.name = React.createRef();
    this.newPassword = React.createRef();
    this.repeatPassword = React.createRef();
    this.currentPassword = React.createRef();
  }

  state = {
    edit: false,
    error: ''
  }

  editProfile() {
    const { auth } = this.props
    return (
      <>
        {this.state.error ?
        <div className="alert alert-danger">
          <strong>Error!</strong> {this.state.error}
        </div>
        : null}

        {_.map(EDIT_INPUTS, ({name, type, title, value, disabled}) => <React.Fragment key={name}>
          <div className="form-group">
            <label htmlFor={name}>{title}</label>
            <input type={type} className="form-control" id={name} disabled={disabled ? "disabled" : ''} defaultValue={value ? auth[value] : ''} ref={this[name]}/>
          </div>
        </React.Fragment>
        )}
        <button type="button" onClick={this.submitData} className="btn btn-primary">Submit</button>
      </>
    )
  }

  submitData = async () => {
    this.setState({error: ''});
    if (this.newPassword.current.value || this.repeatPassword.current.value) {
      /*if (!this.currentPassword.current.value) {
        this.setState({error: 'Please enter current password'})
        return;
      }*/
      if ( this.newPassword.current.value !== this.repeatPassword.current.value) {
        this.setState({error: 'Please check password, passwords doesn\'t match'})
        return;
      }
    }
/*
    const res = await axios.post('/api/update_user', {newPassword: this.newPassword.current.value,
                                                              repeatPassword: this.repeatPassword.current.value,
                                                              currentPassword: this.currentPassword.current.value,
                                                              name: this.name.current.value
    })*/
    this.props.updateData({newPassword: this.newPassword.current.value,
      repeatPassword: this.repeatPassword.current.value,
      currentPassword: this.currentPassword.current.value,
      name: this.name.current.value
})
    //console.log(res)
  }

  showProfile() {
    const { auth } = this.props
    return (
      <>
        <p><b>Email:</b> {auth.email || ''}</p>
        <p><b>Name:</b> {auth.name || ''}</p>
      </>
    )
  }

  toggleEddit = () => this.setState({edit: !this.state.edit})

  render() {//console.log(this.props)
    
    return (
        <div className="card" style={{marginTop: '2rem', marginBottom: '2rem'}}>
          <div className="card-body">
            <h5 className="card-title">May Profile
            &nbsp;
              <FontAwesomeIcon icon={faEdit} size="lg" onClick={this.toggleEddit}/>
            </h5>
            {this.state.edit ? this.editProfile() : this.showProfile()}
          </div>
        </div>
    )
  }
}

function mapStateToProps({auth}) {
  return {
      auth
  }
}
export default connect(mapStateToProps, {updateData})(Profile)