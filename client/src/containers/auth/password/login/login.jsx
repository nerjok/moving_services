import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';


export const Login = ({login, change, email, pswd, loginErr}) => {
  return (
        <div className="cardd web-login">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <h5>{i18next.t('Welcome')}</h5>
                <small>{i18next.t('Please login by choosing the folowing methods')}</small>
                <br/>
                <div className="web-login__sociall mt-3 mb-3">
                  <a href="#fcb" className="btn btn-sm btn-primary">{i18next.t('Log in with Facebook')}</a>&nbsp;
                  <a href="auth/google" className="btn btn-sm btn-info"> {i18next.t('Log in with Google')}</a>
                </div>
              </div>
              <div className="col md-6">
                <div>
                  <label>{i18next.t('Email')}:</label>
                  <input 
                    type="email" 
                    className="form-control form-control-sm input__invalid" 
                    name="email"
                    id="login-mail" 
                    value={email}
                    onChange={change}
                  />
                  <br/>
                </div>
                <div>
                  <label>{i18next.t('Password')}:</label>
                  <input 
                    type="password" 
                    pattern=".{5,}"  
                    className="form-control form-control-sm input__invalid" 
                    name="password" 
                    value={pswd}
                    onChange={change}
                    id="login-password" 
                  />
                </div>
                <br/>
                {loginErr && <div className="alert alert-danger" role="alert">{loginErr}</div>}
                <div>
                  <button 
                    type="button" 
                    id="login_button"
                    className={"btn btn-success full-width"} 
                    onClick={login}>
                      {i18next.t("Login")}
                  </button>
                </div>
                </div>
            </div>
          </div>
          </div> 
  )
}


Login.propTypes = {
  loginErr: PropTypes.string,
  email: PropTypes.string.isRequired,
  pswd: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired
}
