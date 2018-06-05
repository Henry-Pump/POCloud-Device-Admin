import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
        <nav>
          <div className="nav-wrapper">
            <ul className="right">
              <li>
                <button
                  className="btn waves-effect waves-light"
                  onClick={this.onLogoutButtonClicked.bind(this)}
                  style={{ marginRight: 15 }}
                >
                  Log Out
                </button>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="/main">Main</Link>
              </li>
            </ul>
          </div>
        </nav>
      );
    }

    return (
      <nav>
        <div className="nav-wrapper">
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Header);

