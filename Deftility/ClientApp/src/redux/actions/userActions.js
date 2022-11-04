import * as types from './actionTypes';
import jwt_decode from 'jwt-decode';
import { login, register } from '../../api/usersApi';
import { AUTH_COOKIE_NAME } from '../../constants';

export function authenticateSuccess(authResponse) {
  return { type: types.AUTHENTICATE, authResponse };
}

export function unauthenticateSuccess() {
  return { type: types.UNAUTHENTICATE };
}

export function loginUser(userData) {
  return function(dispatch) {
    return login(userData).then(response => {
      const decodedToken = jwt_decode(response.data.token);
      const expireDate = new Date(decodedToken.exp * 1000).toUTCString();
      document.cookie = `${AUTH_COOKIE_NAME}=${response.data.token}; expires=${expireDate}`;
      dispatch(authenticateSuccess(response));
    }).catch(error => {
      throw error.response.data.error;
    });
  };
}

export function registerUser(userData) {
  return function(dispatch) {
    return register(userData).then(response => {
      const decodedToken = jwt_decode(response.data.token);
      const expireDate = new Date(decodedToken.exp * 1000).toUTCString();
      document.cookie = `${AUTH_COOKIE_NAME}=${response.data.token}; expires=${expireDate}`;
      dispatch(authenticateSuccess(response));
    }).catch(error => {
      throw error.response.data.error;
    });
  }
}

export function logoutUser() {
  return function(dispatch) {
    document.cookie = `${AUTH_COOKIE_NAME}=;expires=${new Date(0).toUTCString()}`;
    dispatch(unauthenticateSuccess())
  }
}
