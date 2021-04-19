import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      // Take 1 value from the observable and then immediately unsubscribe
      take(1),
      // Waits for first Observable (i.e the user Observable) to complete and
      // passes the data through. We then return a new Observable (i.e. the http
      // Observable) which replaces the previous one in the Observable chain.
      exhaustMap((user) => {
        if (!user) {
          // Do not attach token for login or signup (alteratively could check url)
          return next.handle(request);
        }
        const authRequest = request.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(authRequest);
      })
    );
  }
}
