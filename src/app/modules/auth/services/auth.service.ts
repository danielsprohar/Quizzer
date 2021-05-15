import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Collections } from 'src/app/constants/collections';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  redirectUrl: string = '';

  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly afs: AngularFirestore
  ) {}

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
   * Builds a new application user.
   * @param firebaseUser The user information provided by the Firebase Authentication service.
   */
  buildApplicationUser(firebaseUser: firebase.User): User {
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      lastSignInTime: firebaseUser.metadata.lastSignInTime,
    };
  }

  /**
   * Gets the user id of the currently logged in user.
   * @returns The currently signed-in user id (or null).
   */
  async getUserIdAsync(): Promise<string | null> {
    const user = await this.afAuth.currentUser;
    return user?.uid ?? null;
  }

  /**
   * Returns the `User` that is currently logged in.
   * @returns The user that is currently logged in (or `null`);
   */
  getCurrentUser(): Observable<firebase.User | null> {
    return this.afAuth.user;
  }

  /**
   *
   * @returns `true` if a user is currently logged in, otherwise `false`.
   */
  isUserSignedIn(): Observable<boolean> {
    return this.afAuth.user.pipe(map((user) => (user ? true : false)));
  }

  /**
   * Updates the `lastSignInTime` attribute in the User document
   * that is associated with the given `userId`.
   * @param userID The user id
   * @param lastSignInTime The last time this user signed in
   */
  setUserLastSignInTime(userID: string, lastSignInTime: string): Promise<void> {
    return this.afs.doc<User>(`${Collections.USERS}/${userID}`).update({
      lastSignInTime,
    });
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
