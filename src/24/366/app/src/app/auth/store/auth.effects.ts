import { Actions, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';

export class AuthEffects {
  // Only continue in this observable chain if the action we are reacting
  // to is of this type. We can add multiple actions as parameters. Other
  // actions do not trigger this effect.
  authLogin = this.actions$.pipe(ofType(AuthActions.LOGIN_START));

  constructor(private actions$: Actions) {}
}
