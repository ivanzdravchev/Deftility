import * as types from './actionTypes';
import { login, register } from '../../api/usersApi';

export function authenticateSuccess(authResponse) {
  return { type: types.AUTHENTICATE, authResponse };
}

export function unauthenticateSuccess() {
  return { type: types.UNAUTHENTICATE };
}

export function loginUser(userData) {
  return function(dispatch) {
    return login(userData).then(response => {
      localStorage.setItem('jwt', response.data.token);
      dispatch(authenticateSuccess(response));
    }).catch(error => {
      throw error.response.data.error;
    });
  };
}

export function registerUser(userData) {
  return function(dispatch) {
    return register(userData).then(response => {
      localStorage.setItem('jwt', response.data.token);
      dispatch(authenticateSuccess(response));
    }).catch(error => {
      throw error.response.data.error;
    });
  }
}

export function logoutUser() {
  return function(dispatch) {
    localStorage.removeItem('jwt');
    dispatch(unauthenticateSuccess())
  }
}
