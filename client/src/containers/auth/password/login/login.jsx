import React from 'react';
import PropTypes from 'prop-types';

export const Login = ({username, password, login, loginErr}) => {
  return (
        <div className="cardd web-login">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <h5>Welcome</h5>
                <small>Please login by choosing the folowing methods</small>
                <br/>
                <div className="web-login__sociall mt-3 mb-3">
                  <a href="#fcb" className="btn btn-sm btn-primary">Log in with Facebook</a>&nbsp;
                  <a href="auth/google" className="btn btn-sm btn-info"> Log in with Google</a>
                </div>
              </div>
              <div className="col md-6">
                <div>
                  <label>Email:</label>
                  <input type="email" className="form-control form-control-sm input__invalid" name="username" ref={username}/><br/>
                </div>
                <div>
                  <label>Password:</label>
                  <input type="password" pattern=".{5,}"  className="form-control form-control-sm input__invalid" name="password" ref={password}/>
                </div>
                <br/>
                {loginErr && <div className="alert alert-danger" role="alert">{loginErr}</div>}
                <div>
                    <input type="button" className={"form-control form-control-sm btn btn-success"} onClick={login} value="Submit"/>
                </div>
                </div>
            </div>
          </div>
          </div> 
  )
}


Login.propTypes = {
  loginErr: PropTypes.string,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
}