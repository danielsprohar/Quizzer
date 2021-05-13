import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { Collections } from 'src/app/constants/collections';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | null | undefined>;
  redirectUrl: string = '';

  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly afs: AngularFirestore
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs
            .doc<User>(`${Collections.USERS}/${user.uid}`)
            .valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  /**
   * Gets the user id of the currently logged in user.
   * @returns The currently signed-in user id (or null).
   */
  async getUserIDAsync(): Promise<string | null> {
    // https://github.com/angular/angularfire/issues/2378
    const user = await this.afAuth.authState.pipe(first()).toPromise();
    return user?.uid ?? null;
  }

  /**
   * Creates a new user document in the `Users` collection.
   * @param user The user information
   */
  addUser(user: User): Promise<void> {
    return this.afs
      .doc<User>(`${Collections.USERS}/${user.uid}`)
      .set({ ...user });
  }

  /**
   * Updates the `lastSignInTime` attribute in the User document
   * that is associated with the given `userId`.
   * @param userID The user id
   * @param lastSignInTime The last time this user signed in
   */
  updateUser(userID: string, lastSignInTime: string): Promise<void> {
    return this.afs.doc<User>(`${Collections.USERS}/${userID}`).update({
      lastSignInTime,
    });
  }

  /**
   * Builds a new application user.
   * @param firebaseUser The user information provided by the Firebase Authentication service.
   */
  buildUser(firebaseUser: firebase.User): User {
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      lastSignInTime: firebaseUser.metadata.lastSignInTime,
    };
  }

  /**
   * Open a popup to let the user sign in with their Google account.
   * @returns User credentials
   */
  signInWithGoogle(): Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  /**
   * Sign in an existing application user via email and password.
   * @param email The user's email.
   * @param password The user's password.
   * @returns Returns an object with the user model and the auth credential.
   */
  signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  /**
   * Create a new application user with email and password.
   * @param email The user's email
   * @param password The user's password
   * @returns Returns an object with the user model and the auth credential.
   */
  signUpWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  /**
   * Sign the current user out of the application.
   */
  signOut(): void {
    this.afAuth.signOut();
  }
}
