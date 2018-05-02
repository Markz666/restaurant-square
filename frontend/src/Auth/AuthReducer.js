import {
  AUTH_USER,
  UNAUTH_USER,
} from './index';

export default function(state = {}, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true, error: '' };
    case UNAUTH_USER:
      return { ...state, authenticated: false};
  }

  return state;
}