import * as types from '../actions/actionTypes';

const jwtFromStorage = localStorage.getItem('jwt') || '';
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
