import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const LOGIN_START = '[Auth] Login Start';
export const LOGIN = '[Auth] Login';
export const LOGIN_FAIL = '[Auth] Login Fail';
export const LOGOUT = '[Auth] Logout';

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public credentials: { email: string; password: string }) {}
}

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public user: User) {}
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;

  constructor(public errorMessage: string) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type AuthActions = Login | Logout | LoginStart | LoginFail;
