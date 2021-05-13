/**
 * All the error codes that are associated with Firebase Authentication:
 * `createUserWithEmailAndPassword(email, password)`
 *
 * @see https://firebase.google.com/docs/reference/js/firebase.auth.Auth.html#create-user-with-email-and-password
 */
export enum FirebaseAuthErrorCode {
  /**
   * Thrown if there already exists an account with the given email address.
   */
  EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use',

  /**
   * Thrown if the email address is not valid.
   */
  INVALID_EMAIL = 'auth/invalid-email',

  /**
   * Thrown if email/password accounts are not enabled.
   * Enable email/password accounts in the Firebase Console, under the Auth tab.
   */
  OPERATION_NOT_ALLOWED = 'auth/operation-not-allowed',

  /**
   * Thrown if the password is not strong enough.
   */
  WEAK_PASSWORD = 'auth/weak-password',
}
