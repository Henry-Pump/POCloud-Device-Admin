import _ from 'lodash';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_ATTEMPT,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGOUT,
  COMPANY_DATA_RECEIVED,
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  authToken: '',
  error: '',
  user: {
    first: '',
    last: '',
    companyName: '',
  },
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };

    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };

    case LOGIN_USER_ATTEMPT:
      return { ...state, loading: true, error: '' };

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        password: '',
        authToken: action.payload.authToken,
        user: action.payload.user,
        loading: false,
      };

    case LOGIN_USER_FAIL:
      return {
        ...state,
        error: 'Authentication failed!',
        password: '',
        loading: false,
      };

    case LOGOUT:
      return INITIAL_STATE;

    case COMPANY_DATA_RECEIVED:
      return {
        ...state,
        user: {
          ...state.user,
          companyName: _.keyBy(action.payload, c => c.id)[state.user.companyId].name,
        },
      };

    default:
      return state;
  }
};

