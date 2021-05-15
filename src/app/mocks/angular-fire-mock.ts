import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';

export class AngularFireAuthMock extends AngularFireAuth {
  user: Observable<firebase.User> = new Observable(() => {});
}
