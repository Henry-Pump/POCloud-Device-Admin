import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getData } from '../actions';

class Main extends Component {
  componentWillMount() {
    this.props.getData();
  }

  

  render() {
    return (
      <h1>Meshify Devices</h1>
      <table>
        <thead>

        </thead>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { getData })(Main);
