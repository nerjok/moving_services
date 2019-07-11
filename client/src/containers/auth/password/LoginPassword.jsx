import React from 'react'
import {connect} from 'react-redux'
import { loginPassword, signupPassword } from '../../../store/actions';
import {Tabs, Tab} from 'react-bootstrap';

const Login = ({username, password, login}) => {
  return (
        <div class="cardd web-login">
          <div class="card-body">
            <div className="row">
              <div className="col-md-6">
                <h5>Welcome</h5>
                <small>Please login by choosing the folowing methods</small>
                <br/>
                <div className="web-login__social">
                  <a href="#fcb" className="btn btn-sm btn-primary">Log in with Facebook</a>&nbsp;
                  <a href="auth/google" className="btn btn-sm btn-info"> Log in with Google</a>
                </div>
              </div>
              <div className="col md-6">
                <div>
                  <label>Username:</label>
                  <input type="text" className="form-control form-control-sm" name="username" ref={username}/><br/>
                </div>
                <div>
                  <label>Password:</label>
                  <input type="password" className="form-control form-control-sm" name="password" ref={password}/>
                </div>
                <br/>
                <div>
                    <input type="button" className={"form-control form-control-sm btn btn-success"} onClick={login} value="Submit"/>
                </div>
                </div>
            </div>
          </div>
          </div> 
  )
}

const Register = ({username, password, password2, login}) => {
  return (
        <div class="cardd web-login">
          <div class="card-body">
            <div className="row">
              <div className="col-md-6">
                <h5>Welcome</h5>
                <small>Please fill the folowing fields to register</small>
                <br/>

              </div>
              <div className="col-md-6">
                <div>
                  <label>Username:</label>
                  <input type="text" className="form-control form-control-sm" name="username" ref={username}/>
                  <br/>
                </div>
                <div>
                  <label>Password:</label>
                  <input type="password" className="form-control form-control-sm" name="password" ref={password}/>
                </div>
                <br/>
                <div>
                  <label>Repeat password:</label>
                  <input type="password" className="form-control form-control-sm" name="password2" ref={password2}/>
                </div>
                <br/>
                <div>
                    <input type="button" className={"form-control form-control-sm btn btn-success"} onClick={login} value="Submit"/>
                </div>
              </div>
            </div>
          </div>
        </div>
)}



class LoginPassword extends React.Component {

  constructor(props) {
    super(props)

    this.username = React.createRef()
    this.password = React.createRef()
    this.password2 = React.createRef()
  }

  render () {
    return (
      <div id="entrance-point">

        <Tabs defaultActiveKey="login" idd="entrance-points" unmountOnExit={true}>
          <Tab eventKey="login" title="Login">
            <Login username={this.username} password={this.password} login={this.login}/>
          </Tab>
          <Tab eventKey="register" title="Register">
            <Register username={this.username} password={this.password} login={this.login} password2={this.password2}/>
          </Tab>
        </Tabs>

<br/>
<br/>
<br/>




{/**}
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
        {/** */}
    </div>
    );
  }

  login = () => {
    console.log(this.username.current.value, this.password.current.value,  this.props)

    if (this.password2.current && this.password.current.value === this.password2.current.value) {
      this.props.signupPassword(this.username.current.value, this.password.current.value)
      console.log('[]signingUp')
    } else 
    this.props.loginPassword(this.username.current.value, this.password.current.value)
  }
}

/*
function mapStateToProps({auth}) {
  return {
      auth
  }
}*/
export default connect(null, {loginPassword, signupPassword})(LoginPassword)
