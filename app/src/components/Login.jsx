import React, { Component } from 'react';
import { connect } from 'react-redux';

import { emailChanged, passwordChanged, loginUser } from '../actions';

class Login extends Component {
  componentWillMount() {
    if (this.props.auth.authToken) {
      this.props.history.push('/main');
    }
  }

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
    const { email, password } = this.props.auth;

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>Login</h1>
            <form>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="email@website.com"
                  value={email}
                  onChange={this.onEmailChange.bind(this)}
                />
                <small 
                  id="emailHelp" 
                  className="form-text text-muted"
                >
                  Enter your POCloud login information.
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={this.onPasswordChange.bind(this)}
                />
              </div>

              <button
                className="btn waves-effect waves-light"
                type="submit"
                name="action"
                onClick={this.onButtonPress.bind(this)}
              >
              Login
              </button>

            </form>

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(Login);
