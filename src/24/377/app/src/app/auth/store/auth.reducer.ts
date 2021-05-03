import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  errorMessage: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  errorMessage: '',
  loading: false,
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      return {
        ...state,
        user: action.user,
        errorMessage: initialState.errorMessage,
        loading: false,
      };
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        user: initialState.user,
        errorMessage: initialState.errorMessage,
        loading: true,
      };
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: initialState.user,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: initialState.user,
        errorMessage: initialState.errorMessage,
        loading: false,
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        errorMessage: initialState.errorMessage,
      };
    default:
      return state;
  }
}
