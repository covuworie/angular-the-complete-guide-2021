import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FIREBASE_API_KEY } from './auth-secrets.service';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static readonly url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`;
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(AuthService.url, {
      email: email,
      password: password,
      returnSecureToken: true,
    });
  }
}
