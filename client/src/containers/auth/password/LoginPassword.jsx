import React from "react";
import { connect } from "react-redux";
import {
  loginPassword,
  signupPassword,
  forgotPswd
} from "../../../store/actions";
import { Tabs, Tab } from "react-bootstrap";
import { Register } from "./register/register";
import { Login } from "./login/login";
import { RecalPswd } from "./recalPswd/recalPswd";
import i18next from "i18next";

export class LoginPassword extends React.Component {
  state = {
    signupErr: "",
    loginErr: "",
    email: "",
    password: "",
    password2: ""
  };

  constructor(props) {
    super(props);
    this.deleteErr = this.deleteErr.bind(this);
  }

  deleteErr() {
    this.setState({ loginErr: "", signupErr: "", email: "", password2: "" });
  }

  change = evt => {
    const { name, value } = evt.currentTarget;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <section className="page-height">
      <div id="entrance-point" className="m-5  scale-to">
        <Tabs
          defaultActiveKey="login"
          id="entrance-points"
          //unmountOnExit={true}
          onSelect={this.deleteErr}
        >
          <Tab eventKey="login" title={i18next.t("Login")}>
            <Login
              email={this.state.email}
              pswd={this.state.password}
              change={this.change}
              login={this.login}
              loginErr={this.state.loginErr}
            />
          </Tab>
          <Tab
            eventKey="register"
            id="register-tab"
            title={i18next.t("Register")}
          >
            <Register
              login={this.login}
              email={this.state.email}
              pswd={this.state.password}
              pswd2={this.state.password2}
              change={this.change}
              signupErr={this.state.signupErr}
            />
          </Tab>
          <Tab eventKey="recall_password" title={i18next.t("Forgot password")}>
            <RecalPswd
              forgotPswd={this.props.forgotPswd}
              history={this.props.history}
            />
          </Tab>
        </Tabs>
        <br />
      </div>
      </section>
    );
  }

  login = async () => {
    const { email, password, password2 } = this.state;
    // eslint-disable-next-line
    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailReg.test(email)) {
      if (password2.length > 0 && password === password2) {
        const sRes = await this.props.signupPassword(
          email,
          password,
          this.props.history
        );
        if (sRes && sRes.error) {
          this.setState({ signupErr: sRes.error });
        }
      } else if (password2.length < 1) {
        const lRes = await this.props.loginPassword(email, password);
        if (lRes && lRes.error) {
          this.setState({ loginErr: lRes.error });
        } else {
          this.props.history.push("/");
        }
      }
    }
  };
}

export default connect(
  null,
  { loginPassword, signupPassword, forgotPswd }
)(LoginPassword);
