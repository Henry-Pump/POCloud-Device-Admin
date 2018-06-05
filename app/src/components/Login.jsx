import React, { Component } from 'react';
import { connect } from 'react-redux';

import { emailChanged, passwordChanged, loginUser } from '../actions';

class Login extends Component {
  onEmailChange(event) {
    this.props.emailChanged(event.target.value);
  }

  onPasswordChange(event) {
    this.props.passwordChanged(event.target.value);
  }

  onButtonPress(event) {
    event.preventDefault();
    const { email, password } = this.props.auth;
    this.props.loginUser({ email, password });
  }

  render() {
    const { email, password, authToken } = this.props.auth;
    if (authToken) {
      this.props.history.push('/main');
    }

    return (
      <div className="row">
        <h1>Login</h1>
        <form className="col s12">
          <div className="input-field col s12">
            <input
              placeholder="email@email.com"
              id="email"
              type="email"
              value={email}
              onChange={this.onEmailChange.bind(this)}
            />
            <label htmlFor="email">Email Address</label>
          </div>

          <div className="input-field col s12">
            <input
              id="password"
              type="password"
              value={password}
              onChange={this.onPasswordChange.bind(this)}
            />
            <label htmlFor="password">Password</label>
          </div>

          <button
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
            onClick={this.onButtonPress.bind(this)}
          >
            Submit <i className="material-icons right">send</i>
          </button>
        </form>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(Login);
