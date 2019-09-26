import React from 'react'
import {connect} from 'react-redux'
import { resetPassword } from '../../../store/actions';
import {Tabs, Tab} from 'react-bootstrap';
import { Register } from './register/register';
import { Login } from './login/login';
import { RecalPswd } from './recalPswd/recalPswd';
import i18next from 'i18next';

class ResetPassword extends React.Component {

  state = {
    signupErr: '',
    loginErr: ''
  }

  constructor(props) {
    super(props);

    this.username = React.createRef();
    this.password = React.createRef();
    this.password2 = React.createRef();
    this.deleteErr = this.deleteErr.bind(this);
  }
  

  deleteErr() {
    this.setState({loginErr: '', signupErr: ''})
  }

  render () {

    return (
      <div id="entrance-point" className="m-5">

      <div className=" card card-body">


      <div className="row">
              <div className="col-md-6">
                <h5>{i18next.t('Welcome')}</h5>
                <small>{i18next.t('Please fill the folowing fields to register')}</small>
                <br/>

              </div>
              <div className="col-md-6">
                <div>
                  <label>{i18next.t('Email')}:</label>
                  <input type="email" className="form-control form-control-sm input__invalid" name="username" ref={this.username}/>
                  <br/>
                </div>
                <div>
                  <label>{i18next.t('New password')}:</label>
                  <input type="password" pattern=".{5,}"  className="form-control form-control-sm input__invalid" name="password" ref={this.password}/>
                </div>
                <br/>
                <div>
                  <label>{i18next.t('Repeat password')}:</label>
                  <input type="password" pattern=".{5,}"  className="form-control form-control-sm input__invalid" name="password2" ref={this.password2}/>
                </div>
                <br/>

                {this.state.signupErr && <div className="alert alert-danger" role="alert">{this.state.signupErr}</div>}
                <div>
                    <input type="button" className={"form-control form-control-sm btn btn-success"} onClick={this.login} value={i18next.t("Submit")}/>
                </div>
              </div>
            </div>

          </div>

        <br/>
    </div>
    );
  }

  login = async () => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let type = params.get('type');

    // eslint-disable-next-line
    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (this.username.current.value && this.username.current.value.length > 5 && emailReg.test(this.username.current.value)) {

      if (type && this.password2.current && this.password.current.value === this.password2.current.value) {
        const sRes = await this.props.resetPassword(this.username.current.value, this.password.current.value, type, this.props.history)
        
        if (sRes && sRes.error) {
          this.setState({signupErr: sRes.error});
        }
      }
    }  
  }
}

export default connect(null, { resetPassword })(ResetPassword)
