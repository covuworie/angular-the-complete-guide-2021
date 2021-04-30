import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // subscribe at the time the value was emitted
  private tokenExpirationTimer: ReturnType<typeof setTimeout> | null;

  constructor(private store: Store<fromApp.AppState>) {}

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
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
      this.dispatchLogin(loadedUser, expirationDuration);
    }
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
    // Remove user data on logout
    localStorage.removeItem('userData');
    // Clear the token expiration timer
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const tokenExpirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    );
    const user = new User(email, userId, token, tokenExpirationDate);
    this.dispatchLogin(user, expiresIn * 1000);
    // Persist the user to local storage so that it survives session restarts
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private dispatchLogin(user: User, expirationDuration: number) {
    this.store.dispatch(new AuthActions.AuthenticateSuccess(user));
    this.autoLogout(expirationDuration);
  }
}
