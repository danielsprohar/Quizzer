import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { matchingPasswordsValidator } from '../../validators/matching-passwords';
import { RegexValidator } from '../../validators/regex-validator';
import firebase from 'firebase/app';
import { FirebaseAuthErrorCode } from '../../constants/firebase-auth-error-code';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  authErrorMessage: string;

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        email: [
          '',
          [Validators.required, Validators.maxLength(128), Validators.email],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
            Validators.pattern(RegexValidator.PASSWORD),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: [matchingPasswordsValidator],
        // run the validators when the currently focused field loses focus
        updateOn: 'blur',
      }
    );
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

  get confirmPassword(): AbstractControl {
    return this.form.get('confirmPassword')!;
  }

  getEmailError(): string {
    if (this.email.hasError('pattern')) {
      return 'Invalid email format';
    }
    return this.email.hasError('required') ? 'Email is required' : '';
  }

  getConfirmPasswordError(): string {
    return this.password.hasError('incongruentPasswords')
      ? 'Passwords do not match'
      : '';
  }

  // =========================================================================
  // Facilitators
  // =========================================================================

  private handleUserCredential(
    userCredential: Promise<firebase.auth.UserCredential>
  ): void {
    userCredential
      .then((response) => {
        const appUser = this.authService.buildUser(response.user!);

        this.authService
          .addUser(appUser)
          .then(() => console.log('Added: New user'))
          // An a error with Firebase Firestore
          .catch((err) => console.error(err))
          .finally(() => this.router.navigate(['/dashboard']));
      })
      .catch((err) => {
        // An a with Firebase Authentication
        this.handleError(err);
      });
  }

  /**
   * Renders a user friendly error message to the UI for invalid authentication requests.
   * @param authError The error message returned from the server.
   */
  private handleError(authError: any): void {
    switch (authError.code) {
      case FirebaseAuthErrorCode.EMAIL_ALREADY_IN_USE:
        this.authErrorMessage = authError.message;
        break;
      case FirebaseAuthErrorCode.INVALID_EMAIL:
        this.authErrorMessage = authError.message;
        break;
      case FirebaseAuthErrorCode.OPERATION_NOT_ALLOWED:
        break;
      case FirebaseAuthErrorCode.WEAK_PASSWORD:
        this.authErrorMessage = authError.message;
        break;
      default:
        break;
    }
  }

  // =========================================================================
  // Event handlers
  // =========================================================================

  /**
   * Create a new user account with the given email and password.
   */
  signUpWithEmailAndPassword(): void {
    if (this.form.valid) {
      const email = (this.email.value as string).trim();
      const password = this.password.value as string;

      this.handleUserCredential(
        this.authService.signUpWithEmailAndPassword(email, password)
      );
    }
  }

  /**
   * Open a dialog to let the user sign up with Google.
   */
  signUpWithGoogle(): void {
    this.handleUserCredential(this.authService.signInWithGoogle());
  }
}
