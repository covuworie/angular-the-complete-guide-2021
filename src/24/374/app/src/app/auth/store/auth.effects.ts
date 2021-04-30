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

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, userId, token, expirationDate);
  // Persist the user to local storage so that it survives session restarts
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess(user);
};

const handleError = (errorResponse: HttpErrorResponse) => {
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
};

@Injectable()
export class AuthEffects {
  authSignUp = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SIGNUP_START),
      switchMap((signupAction: AuthActions.SignupStart) => {
        return this.http
          .post<SignUpResponseData | HttpErrorResponse>(this.signUpUrl, {
            email: signupAction.credentials.email,
            password: signupAction.credentials.password,
            returnSecureToken: true,
          })
          .pipe(
            map((responseData: LoginResponseData) =>
              handleAuthentication(
                +responseData.expiresIn,
                responseData.email,
                responseData.localId,
                responseData.idToken
              )
            ),
            // Must return a non-error observable so the overall stream observable does
            // not die over the lifetime of the application. We do this by using the of
            // operator. This is to ensure we can attempt to login multiple times.
            catchError((errorResponse: HttpErrorResponse) =>
              handleError(errorResponse)
            )
          );
      })
    )
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
            map((responseData: LoginResponseData) =>
              handleAuthentication(
                +responseData.expiresIn,
                responseData.email,
                responseData.localId,
                responseData.idToken
              )
            ),
            // Must return a non-error observable so the overall stream observable does
            // not die over the lifetime of the application. We do this by using the of
            // operator. This is to ensure we can attempt to login multiple times.
            catchError((errorResponse: HttpErrorResponse) =>
              handleError(errorResponse)
            )
          );
      })
    )
  );

  // Modern syntax => @Effect is deprecated
  authRedirectLogin = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap(() => this.router.navigate(['/recipes']))
      ),
    { dispatch: false }
  );

  authRedirectLogout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => this.router.navigate(['/auth']))
      ),
    { dispatch: false }
  );

  authLogout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(
          () => localStorage.removeItem('userData') // Remove user data on logout
        )
      ),
    { dispatch: false }
  );

  autoLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.AUTO_LOGIN),
      map(() => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
          return { type: 'DUMMY' }; // returns valid action that has no effect
        }

        const tokenExpirationDate = new Date(userData._tokenExpirationDate);
        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          tokenExpirationDate
        );

        if (loadedUser.token) {
          const expirationDuration =
            tokenExpirationDate.getTime() - new Date().getTime();
          return this.loginWithAutoLogout(loadedUser, expirationDuration);
        }

        return { type: 'DUMMY' }; // returns valid action that has no effect
      })
    )
  );

  private readonly loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`;
  private readonly signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`;

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}

  private loginWithAutoLogout(user: User, expirationDuration: number) {
    return new AuthActions.AuthenticateSuccess(user);
    //this.autoLogout(expirationDuration);
  }
}
