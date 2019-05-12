import React from 'react'
import {connect} from 'react-redux'

class Profile extends React.Component {

  /*
  constructor(props) {
    super(props)
  }*/

  render() {
    const { auth } = this.props
    return (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">May Profile</h5>
                <p><b>Email:</b> {auth.email || ''}</p>
                <p><b>Name:</b> {auth.name || ''}</p>
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
export default connect(mapStateToProps, null)(Profile)