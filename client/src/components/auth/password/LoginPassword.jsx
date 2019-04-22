import React from 'react'
import {connect} from 'react-redux'
import { loginPassword } from '../../../store/actions';


class LoginPassword extends React.Component {

  constructor(props) {
    super(props)

    this.username = React.createRef()
    this.password = React.createRef()
  }

  render () {
    return (
      <form action="auth/signup" method="post">
      <div>
      <label>Username:</label>
      <input type="text" name="username" ref={this.username}/><br/>
      </div>
      <div>
      <label>Password:</label>
      <input type="password" name="password" ref={this.password}/>
      </div>
      <div>
      <label>Password:</label>
      <input type="password" name="password2" ref={this.password2}/>
      </div>
      <div>
      <input type="button"  onClick={this.login} value="Submit"/>
      <input type="submit" value="signUp"/>
      </div>
    </form>
    );
  }

  login = () => {
    console.log(this.username.current.value, this.password.current.value, this.props)
    this.props.loginPassword(this.username.current.value, this.password.current.value)
  }
}

/*
function mapStateToProps({auth}) {
  return {
      auth
  }
}*/
export default connect(null, {loginPassword})(LoginPassword)
