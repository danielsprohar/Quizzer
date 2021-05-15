export const authServiceSpy = jasmine.createSpyObj('AuthService', [
  'addUser',
  'buildApplicationUser',
  'getUserIdAsync',
  'getCurrentUser',
  'isUserSignedIn',
  'setUserLastSignInTime',
  'signInWithEmailAndPassword',
  'signInWithGoogle',
  'signUpWithEmailAndPassword',
  'signOut',
  'updateUser',
]);
