import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private store: Store<fromApp.AppState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('auth').pipe(
      // Take 1 value from the observable and then immediately unsubscribe
      // to avoid rerunning the logic in the guard unneccesarily
      take(1),
      map((authState) => authState.user),
      map((user) => {
        const isAuthenticated = !!user;
        if (isAuthenticated) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })
    );
  }
}
