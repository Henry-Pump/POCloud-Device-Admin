import _ from 'lodash';
import {
  GATEWAY_DATA_RECEIVED,
  DEVICETYPE_DATA_RECEIVED,
  DEVICE_DATA_RECEIVED,
  COMPANY_DATA_RECEIVED,
} from '../actions/types';

const INITIAL_STATE = {
  gateways: {},
  devicetypes: {},
  allDevices: {},
  companies: {},
  devices: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GATEWAY_DATA_RECEIVED:
      return { ...state, gateways: _.keyBy(action.payload, g => g.id) };

    case COMPANY_DATA_RECEIVED:
      return { ...state, companies: _.keyBy(action.payload, c => c.id) };

    case DEVICETYPE_DATA_RECEIVED:
      return {
        ...state,
        devicetypes: _.keyBy(action.payload, d => d.id),
      };

    case DEVICE_DATA_RECEIVED:
      return {
        ...state,
        devices: _.groupBy(action.payload, (device) => {
          if (state.devicetypes[device.deviceTypeId]) {
            return state.devicetypes[device.deviceTypeId].id;
          }
        }),
        allDevices: _.keyBy(action.payload, d => d.id),
      };

    default:
      return state;
  }
};
