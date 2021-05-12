export class User {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  lastSignInTime: string;

  constructor(fields?: {
    uid?: string;
    displayName?: string;
    email?: string;
    photoURL?: string;
    lastSignInTime?: string;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
