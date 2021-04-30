import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
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
  authSignUp = createEffect(
    () => this.actions$.pipe(ofType(AuthActions.SIGNUP_START)),
    { dispatch: false }
  );

  // Only continue in this observable chain if the action we are reacting
  // to is of this type. We can add multiple actions as parameters. Other
  // actions do not trigger this effect.
  authLogin = createEffect(() =>
    this.actions$.pipe(
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
              return new AuthActions.AuthenticateSuccess(user);
            }),
            // Must return a non-error observable so the overall stream observable does
            // not die over the lifetime of the application. We do this by using the of
            // operator. This is to ensure we can attempt to login multiple times.
            catchError((errorResponse: HttpErrorResponse) => {
              let errorMessage = 'An unknown error occurred!';
              if (!errorResponse.error || !errorResponse.error.error) {
                return of(new AuthActions.AuthenticateFail(errorMessage));
              }
              switch (errorResponse.error.error.message) {
                case 'EMAIL_EXISTS':
                  errorMessage = 'This email exists already';
                  break;
                case 'EMAIL_NOT_FOUND':
                  errorMessage = 'This email does not exist';
                  break;
                case 'INVALID_PASSWORD':
                  errorMessage = 'This password is not correct';
                  break;
              }
              // of is a utility function for creating a new observable without an error
              return of(new AuthActions.AuthenticateFail(errorMessage));
            })
          );
      })
    )
  );

  // Modern syntax => @Effect is deprecated
  authSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap(() => this.router.navigate(['/recipes']))
      ),
    { dispatch: false }
  );
  private readonly loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`;

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
