import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface SignUpResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

export interface LoginResponseData extends SignUpResponseData {
  registered: boolean;
}

@Injectable()
export class AuthEffects {
  // Only continue in this observable chain if the action we are reacting
  // to is of this type. We can add multiple actions as parameters. Other
  // actions do not trigger this effect.
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<LoginResponseData | HttpErrorResponse>(this.loginUrl, {
          email: authData.credentials.email,
          password: authData.credentials.password,
          returnSecureToken: true,
        })
        .pipe(
          map((responseData: LoginResponseData) => {
            const expirationDate = new Date(
              new Date().getTime() + +responseData.expiresIn * 1000
            );
            const user = new User(
              responseData.email,
              responseData.localId,
              responseData.idToken,
              expirationDate
            );
            return of(new AuthActions.Login(user));
          }),
          catchError((error: HttpErrorResponse) => {
            // Must return a non-error observable so the overall stream observable does
            // not die over the lifetime of the application. This is to ensure we can
            // attempt to login multiple times.
            return of(); // Utility function for creating a new observable without an error
          })
        );
    })
  );

  private readonly loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`;

  constructor(private actions$: Actions, private http: HttpClient) {}
}
