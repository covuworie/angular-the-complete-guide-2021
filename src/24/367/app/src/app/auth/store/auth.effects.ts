import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
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

export class AuthEffects {
  // Only continue in this observable chain if the action we are reacting
  // to is of this type. We can add multiple actions as parameters. Other
  // actions do not trigger this effect.
  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((authData: AuthActions.LoginStart) =>
        this.http
          .post<LoginResponseData | HttpErrorResponse>(this.loginUrl, {
            email: authData.credentials.email,
            password: authData.credentials.password,
            returnSecureToken: true,
          })
          .pipe(
            catchError(
              (error: HttpErrorResponse) =>
                // Must return a non-error observable so the overall stream observable does
                // not die over the lifetime of the application. This is to ensure we can
                // attempt to login multiple times.
                of() // Utility function for creating a new observable without an error
            ),
            map((responseData: LoginResponseData) => of())
          )
      )
    )
  );

  private readonly loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`;

  constructor(private actions$: Actions, private http: HttpClient) {}
}
