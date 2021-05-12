export interface User {
  uid: string | null;
  email: string | null;
  photoURL: string | null;
  displayName: string | null;
  lastSignInTime?: string | null;
}
