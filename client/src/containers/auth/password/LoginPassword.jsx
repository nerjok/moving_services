import React from 'react'
import {connect} from 'react-redux'
import { loginPassword, signupPassword } from '../../../store/actions';
import {Tabs, Tab} from 'react-bootstrap';
import { Register } from './register/register';
import { Login } from './login/login';


class LoginPassword extends React.Component {

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
      <div id="entrance-point">

        <Tabs 
          defaultActiveKey="login" 
          idd="entrance-points" 
          unmountOnExit={true}
          onSelect={this.deleteErr}
        >
          <Tab eventKey="login" title="Login">
            <Login 
              username={this.username} 
              password={this.password} 
              login={this.login}
              loginErr={this.state.loginErr}
            />
          </Tab>
          <Tab eventKey="register" title="Register">
            <Register 
              username={this.username} 
              password={this.password} 
              login={this.login} 
              password2={this.password2}
              signupErr={this.state.signupErr}
            />
          </Tab>
        </Tabs>
        <br/>
    </div>
    );
  }

  login = async () => {
    console.log(this.username.current.value, this.password.current.value,  this.props);

    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (this.username.current.value && this.username.current.value.length > 5 && emailReg.test(this.username.current.value)) {
      if (this.password2.current && this.password.current.value === this.password2.current.value) {
        const sRes = await this.props.signupPassword(this.username.current.value, this.password.current.value)
        if (sRes && sRes.error) {
          this.setState({signupErr: sRes.error});
        }
      } else {
        const lRes = await this.props.loginPassword(this.username.current.value, this.password.current.value);
        if (lRes && lRes.error) {
          this.setState({loginErr: lRes.error});
        } else {
          this.props.history.push('/');
        }
      }
    }  
  }
}

export default connect(null, {loginPassword, signupPassword})(LoginPassword)
