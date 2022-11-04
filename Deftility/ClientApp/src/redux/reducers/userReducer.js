import * as types from '../actions/actionTypes';
import { AUTH_COOKIE_NAME } from '../../constants';
import { getCookieValue } from '../../utils';

const jwtFromStorage = getCookieValue(AUTH_COOKIE_NAME);
const initialState = {
  token: jwtFromStorage
};

export default function userReducer(state = initialState, action) {
  switch(action.type) {
    case types.AUTHENTICATE:
      return { ...state, token: action.authResponse.data.token};
    case types.UNAUTHENTICATE:
      return { ...state, token: ''};
    default:
      return state;
  }
}
