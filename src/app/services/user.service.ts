import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import { Collections } from '../constants/collections'
import { Assessment } from '../modules/assessments/models/assessment'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly firestore: AngularFirestore
  ) {}

  async addAssessment(assessment: Assessment) {
    const user = await this.afAuth.currentUser
    if (!user) throw new Error('No user is signed in')
    return this.firestore
      .collection(Collections.USERS)
      .doc(user.uid)
      .collection(Collections.ASSESSMENTS)
      .add(JSON.parse(JSON.stringify(assessment)))
  }
}
