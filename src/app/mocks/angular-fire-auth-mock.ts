export const angularFireAuthSpy = jasmine.createSpyObj('AngularFireAuth', [
  'user',
  'currentUser',
  'signInWithPopup',
  'signInWithEmailAndPassword',
  'createUserWithEmailAndPassword',
]);