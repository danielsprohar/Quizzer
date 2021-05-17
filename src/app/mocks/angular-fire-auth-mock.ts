import { of } from 'rxjs'

export const angularFireAuthSpy = jasmine.createSpyObj('AngularFireAuth', {
  user: of({}),
  currentUser: Promise.resolve({}),
  signInWithPopup: Promise.resolve(),
  signInWithEmailAndPassword: Promise.resolve(),
  createUserWithEmailAndPassword: Promise.resolve(),
})
