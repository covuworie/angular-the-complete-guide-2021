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
    case AuthActions.LOGIN:
      return {
        ...state,
        user: action.user,
        errorMessage: initialState.errorMessage,
        loading: false,
      };
    case AuthActions.LOGIN_START:
      return {
        ...state,
        user: initialState.user,
        errorMessage: initialState.errorMessage,
        loading: true,
      };
    case AuthActions.LOGIN_FAIL:
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
    default:
      return state;
  }
}
