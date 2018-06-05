import axios from 'axios';
import baseURL from '../Meshify';
import {
  COMPANY_DATA_RECEIVED,
  GATEWAY_DATA_RECEIVED,
  DEVICETYPE_DATA_RECEIVED,
  DEVICE_DATA_RECEIVED,
} from './types';


export const getData = ({ authToken }) => {
  if (!authToken) {
    return { type: 'dummy' };
  }
  return (dispatch) => {
    axios.get(`${baseURL}/companies`, { headers: { Authorization: authToken } })
      .then((companiesResponse) => {
        dispatch({ type: COMPANY_DATA_RECEIVED, payload: companiesResponse.data });
        axios.get(`${baseURL}/devicetypes`, { headers: { Authorization: authToken } })
          .then((devicetypesResponse) => {
            dispatch({ type: DEVICETYPE_DATA_RECEIVED, payload: devicetypesResponse.data });
            axios.get(`${baseURL}/gateways`, { headers: { Authorization: authToken } })
              .then((gtwResponse) => {
                dispatch({ type: GATEWAY_DATA_RECEIVED, payload: gtwResponse.data });
                axios.get(`${baseURL}/devices`, { headers: { Authorization: authToken } })
                  .then((deviceResponse) => {
                    dispatch({ type: DEVICE_DATA_RECEIVED, payload: deviceResponse.data });
                  });
              });
          });
      });
  };
};

export const dummy = '';

