import React from 'react'
import {connect} from 'react-redux'

class Profile extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { auth } = this.props
    console.log('[[ProfileInfo]]', this.props.auth)
    return (
<div className="card">
  <div className="card-header">
    May Profile
  </div>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
        Email: {auth.email || ''}
        Name: {auth.name || ''}
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