import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';

export const Register = ({username, password, password2, login, signupErr}) => {
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
                  <input type="email" className="form-control form-control-sm input__invalid" name="username" ref={username}/>
                  <br/>
                </div>
                <div>
                  <label>{i18next.t('Password')}:</label>
                  <input type="password" pattern=".{5,}"  className="form-control form-control-sm input__invalid" name="password" ref={password}/>
                </div>
                <br/>
                <div>
                  <label>{i18next.t('Repeat password')}:</label>
                  <input type="password" pattern=".{5,}"  className="form-control form-control-sm input__invalid" name="password2" ref={password2}/>
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
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired,
  password2: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
}
