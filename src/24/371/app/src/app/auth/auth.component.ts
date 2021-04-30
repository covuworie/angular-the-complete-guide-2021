import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import {
  SignUpResponseData,
  AuthService,
  LoginResponseData,
} from './auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild('authForm') authForm: NgForm;
  isLoginMode = true;
  isLoading = false;
  error = '';
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;

  private closeSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.errorMessage;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }

    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    let authObservable:
      | Observable<LoginResponseData | HttpErrorResponse>
      | Observable<SignUpResponseData | HttpErrorResponse>;

    this.isLoading = true;
    if (this.isLoginMode) {
      this.store.dispatch(new AuthActions.LoginStart({ email, password }));
    } else {
      authObservable = this.authService.signup(email, password);
    }

    this.authForm.reset();
  }

  onCloseModal() {
    this.error = '';
  }

  ngOnDestroy() {
    if (!this.closeSubscription) {
      return;
    }
    // Not really sure why we also unsubscribe here when we seem to have done it below
    this.closeSubscription.unsubscribe();
  }

  private showErrorAlert(message: string) {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear(); // clears all components rendered before in this place

    const alertComponentRef = hostViewContainerRef.createComponent(
      alertComponentFactory
    );
    alertComponentRef.instance.message = message;
    this.closeSubscription = alertComponentRef.instance.close.subscribe(() => {
      this.closeSubscription.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
