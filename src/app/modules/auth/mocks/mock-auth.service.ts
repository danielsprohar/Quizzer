import firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';

interface MockAdditionalUserInfo {
  isNewUser: boolean;
  profile: Object | null;
  providedId: string;
  username?: string | null;
}

interface MockAuthCredential {
  providerId: string;
  signInMethod: string;
}

interface UserCredential {
  additionalUserInfo: MockAdditionalUserInfo;
  credential: MockAuthCredential;
  operationType: 'signIn' | 'link' | 'reauthenticate';
  user: firebase.User;
}

const authCredentialStub = {
  providerId: 'google.com',
  signInMethod: 'password',
};

export class MockAuthService {
  redirectUrl = '';

  isUserSignedIn(): Observable<boolean> {
    return of(true);
  }

  addUser(user: User): Promise<void> {
    return new Promise(() => user);
  }


  signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    // https://firebase.google.com/docs/reference/js/firebase.auth#usercredential
    const userCredential = {
      additionalUserInfo: null,
      credential: null,
      operationType: 'signIn',
      user: null,
    };

    return new Promise((resolve, reject) => userCredential);
  }

  signInWithGoogle() {}

  updateUser(uid: string, lastSignInTime: string): Promise<void> {
    const user = {
      uid: '1',
      displayName: 'Alice',
    };

    return new Promise(() => {
      user;
    });
  }
}
