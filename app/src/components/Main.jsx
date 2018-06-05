import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { getData } from '../actions';

class Main extends Component {
  state = {
    companyShowingDetails: 0
  }

  componentWillMount() {
    const { authToken } = this.props.auth;
    this.props.getData({ authToken });
  }

  getGatewaysForCompany({ companyId }) {
    return _.filter(this.props.gateways, g => g.companyId === companyId);
  }

  getDevicesForGateway({ gatewayId }) { 
    return _.filter(this.props.allDevices, g => g.gatewayId === gatewayId);
  }

  companySelected({ companyId }) {
    if (companyId === this.state.companyShowingDetails) {
      this.setState({ companyShowingDetails: 0 });
    } else {
      this.setState({ companyShowingDetails: companyId });
    }
  }

  renderGatewayList({ gatewayId }) {
    const devices = this.getDevicesForGateway({ gatewayId });
    return (
      <ul>
        {_.map(devices, d => (
          <li key={d.id}>{d.vanityName} - {this.props.devicetypes[d.deviceTypeId].vanityName}</li>
        ))}
      </ul>
    );
  }

  renderCompanyGatewayList({ gatewayList }) {
    return _.map(gatewayList, g => (
      <tr>
        <th>{g.name}</th>
        <th>{g.macAddress}</th>
      </tr>
    ));
  }

 
  renderCompanyTable({ companyId }) {
    const gateways = this.getGatewaysForCompany({ companyId });
    let gatewayList;

    if (companyId === this.state.companyShowingDetails) {
      gatewayList = (
        <table className="table">
          <thead>
            <tr>
              <th>Gateway</th>
              <th>MAC Address</th>
            </tr>
          </thead>
          <tbody>
            {this.renderCompanyGatewayList({ gatewayList: gateways })}
          </tbody>
        </table>
      );
    }

    if (gateways.length > 0) {
      return (
        <li 
          key={companyId} 
          className="list-group-item flex-column align-items-center" 
          onClick={() => this.companySelected({ companyId })}
        >
          <div className="d-flex justify-content-between">
            {this.props.companies[companyId].name}
            <span className="badge badge-primary badge-pill">{gateways.length}</span>
          </div>
          {gatewayList}
        </li>
      );
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>Companies with Devices</h1>
            <ul className="list-group">
              {_.map(this.props.companies, c => this.renderCompanyTable({ companyId: c.id }))}
            </ul>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <h1>Companies with NO Devices</h1>
            <ul className="list-group" style={{ marginBottom: 20 }}>
              {_.map(this.props.companies, c => {
                if (this.getGatewaysForCompany({ companyId: c.id }).length === 0) {
                  return (
                    <li className="list-group-item">
                      {this.props.companies[c.id].name}
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.meshify);
  const {
    gateways,
    devicetypes,
    allDevices,
    companies,
    devices,
  } = state.meshify;
  return {
    auth: state.auth, 
    gateways,
    devicetypes,
    allDevices,
    companies,
    devices,
  };
};

export default connect(mapStateToProps, { getData })(Main);
