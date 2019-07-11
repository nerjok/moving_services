import React from 'react'
import axios from 'axios'

export class User extends React.Component {

  /*
  To show other user profile
  constructor(props) {
    super(props)
  }*/

  state = {
    user: {}
   }
  componentDidMount() {
    if (this.props.match && this.props.match.params)
      this.fetchUser(this.props.match.params.id);
  }

  fetchUser = async (user_id) => {console.log('usr_id', user_id)
    const res = await axios.get('/api/users/'+user_id)
    console.log('[userInfo]', res.data, '[props]', this.props)
    if (res.data && res.data._id) {
      this.setState({user: res.data});
    }
  }
  render() {
    const { user } = this.state
    return (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">User Profile</h5>
                <p><b>Email:</b> {user.email || ''}</p>
                <p><b>Name:</b> {user.name || ''}</p>
          </div>
        </div>
    )
  }
}

export default User
/*
function mapStateToProps({auth}) {
  return {
      auth
  }
}
export default connect(mapStateToProps, null)(User)*/