import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';

export const Register = ({email, pswd, pswd2, change, login, signupErr}) => {
  return (
        <div className="cardd web-login">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <h5>{i18next.t('Welcome')}</h5>
                <small>{i18next.t('Please fill the folowing fields to register')}</small>
                <br/>

              </div>
              <div className="col-md-6">
                <div>
                  <label>{i18next.t('Email')}:</label>
                  <input 
                    type="email" 
                    className="form-control form-control-sm input__invalid" 
                    name="email"
                    id="register-mail" 
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
                    id="register-password" 
                  />
                </div>
                <br/>
                <div>
                  <label>{i18next.t('Repeat password')}:</label>
                  <input 
                    type="password" 
                    pattern=".{5,}"  
                    className="form-control form-control-sm input__invalid" 
                    name="password2" 
                    value={pswd2}
                    onChange={change}
                    id="register-password" 
                  />
                </div>
                <br/>

                {signupErr && <div className="alert alert-danger" role="alert">{signupErr}</div>}
                <div>
                    <input type="button" className={"form-control form-control-sm btn btn-success"} onClick={login} value={i18next.t("Submit")}/>
                </div>
              </div>
            </div>
          </div>
        </div>
)}

Register.propTypes = {
  signupErr: PropTypes.string,
  email: PropTypes.string.isRequired,
  pswd: PropTypes.string.isRequired,
  pswd2: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired
}
