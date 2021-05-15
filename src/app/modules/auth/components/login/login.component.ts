import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { User } from 'src/app/models/user';
import { AppStateService } from 'src/app/services/app-state.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  user?: User;
  hide = true;
  invalidLoginAttempt = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly appState: AppStateService
  ) {}

  // =========================================================================
  // Lifecycle hooks
  // =========================================================================

  ngOnInit() {
    this.form = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.maxLength(255), Validators.email],
      ],
      password: ['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  // =========================================================================
  // Getters
  // =========================================================================

  get email(): AbstractControl {
    return this.form.get('email')!;
  }

  get password(): AbstractControl {
    return this.form.get('password')!;
  }

  getEmailError() {
    return this.email?.hasError('pattern') ? 'Invalid email format' : '';
  }

  getPasswordError() {
    return this.password?.hasError('required') ? 'Password is required' : '';
  }

  // =========================================================================
  // Event handlers
  // =========================================================================

  private handleUserCredential(
    userCredential: Promise<firebase.auth.UserCredential>
  ): void {
    userCredential
      .then((res: firebase.auth.UserCredential) => {
        if (!res.user || !res.user.metadata.lastSignInTime) {
          throw new Error('Response body is empty');
        }

        this.authService
          .setUserLastSignInTime(res.user.uid, res.user.metadata.lastSignInTime)
          .then(() => console.log('Logged in'))
          .catch((error) => console.error(error));
      })
      // TODO: handle error
      .catch((error) => console.error(error))
      .finally(() =>
        this.router.navigate([this.authService.redirectUrl || '/'])
      );
  }

  /**
   * Let the user sign in with their Google account.
   */
  signInWithGoogle(): void {
    this.handleUserCredential(this.authService.signInWithGoogle());
  }

  /**
   * Let the user sign in with their email and password.
   */
  signInWithEmailAndPassword(): void {
    if (this.form?.invalid) {
      return;
    }
    this.appState.isLoading(true);

    const email = this.email?.value as string;
    const password = this.password?.value as string;
    if (!email || !password) {
      return;
    }

    this.authService
      .signInWithEmailAndPassword(email, password)
      .then((res: firebase.auth.UserCredential) => {
        if (!res.user || !res.user.metadata.lastSignInTime) {
          throw new Error('Response body is empty');
        }

        this.authService.setUserLastSignInTime(
          res.user.uid,
          res.user.metadata.lastSignInTime
        );
      })
      .catch((err) => {
        this.invalidLoginAttempt = true;
        console.error(err);
      })
      .finally(() => {
        this.appState.isLoading(false);
        this.router.navigate([this.authService.redirectUrl || '/']);
      });
  }
}
