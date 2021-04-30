import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTICATE_SUCCESS = '[Auth] Login';
export const AUTHENTICATE_FAIL = '[Auth] Login Fail';
export const LOGOUT = '[Auth] Logout';
export const SIGNUP_START = '[Auth] Signup Start';

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public credentials: { email: string; password: string }) {}
}

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;

  constructor(public user: User) {}
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;

  constructor(public errorMessage: string) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;

  constructor(public credentials: { email: string; password: string }) {}
}

export type AuthActions =
  | AuthenticateSuccess
  | Logout
  | LoginStart
  | AuthenticateFail
  | SignupStart;
