import { encode } from 'base-64';
import axios from 'axios';
import { persistor } from '../renderer_process';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_ATTEMPT,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGOUT,
} from './types';

import baseURL from '../Meshify';

export const emailChanged = text => ({
  type: EMAIL_CHANGED,
  payload: text,
});

export const passwordChanged = text => ({
  type: PASSWORD_CHANGED,
  payload: text,
});

const loginUserSuccess = (dispatch, user, authToken) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: { user, authToken },
  });
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

export const loginUser = ({ email, password }) => {
  const tokenPart = encode(`${email}:${password}`);
  const authToken = `Basic ${tokenPart}`;

  return (dispatch) => {
    dispatch({ type: LOGIN_USER_ATTEMPT });
    axios.get(`${baseURL}/users/me`, { headers: { Authorization: authToken } })
      .then((response) => {
        loginUserSuccess(dispatch, response.data, authToken);
      })
      .catch(() => loginUserFail(dispatch));
  };
};

export const logoutUser = () => {
  persistor.purge();
  return ({
    type: LOGOUT,
  });
};
