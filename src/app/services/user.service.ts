import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly firestore: AngularFirestore
  ) {}

}
