import { combineReducers } from 'redux';
import AuthReducer from './authReducer';
import MeshifyReducer from './meshifyReducer';

export default combineReducers({
  auth: AuthReducer,
  meshify: MeshifyReducer
});
