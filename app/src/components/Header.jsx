import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import pocloudLogo from '../assets/POCloud.png';

import { logoutUser } from '../actions';

class Header extends Component {
  onLogoutButtonClicked(event) {
    event.preventDefault();
    this.props.logoutUser();
    this.props.history.push('/login');
  }

  render() {
    const { authToken } = this.props.auth;
    if (authToken) {
      return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <span className="navbar-brand mb-0 h1">
            <img src={pocloudLogo} className="img-fluid" alt="POCloud" style={{ maxWidth: 200 }} />
          </span>

          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/main" className="nav-link">Main</Link>
            </li>
          </ul>

          <button
            className="btn btn-danger"
            onClick={this.onLogoutButtonClicked.bind(this)}
          >
            Log Out
          </button>
        </nav>
      );
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <span className="navbar-brand mb-0 h1">
          <img src={pocloudLogo} className="img-fluid" alt="POCloud" style={{ maxWidth: 200 }} />
        </span>

        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/login" className="nav-link">Login</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Header);

