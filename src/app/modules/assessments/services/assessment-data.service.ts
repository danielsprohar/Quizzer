import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Collections } from 'src/app/constants/collections'
import { Assessment } from '../models/assessment'

@Injectable({
  providedIn: 'root',
})
export class AssessmentDataService {
  constructor(private readonly firestore: AngularFirestore) {}

  add(userId: string, assessment: Assessment) {
    return this.firestore
      .collection(Collections.USERS)
      .doc(userId)
      .collection(Collections.ASSESSMENTS)
      .add(JSON.parse(JSON.stringify(assessment)))
  }

  get(userId: string, assessmentId: string): Observable<Assessment> {
    return this.firestore
      .collection(Collections.USERS)
      .doc(userId)
      .collection(Collections.ASSESSMENTS)
      .doc<Assessment>(assessmentId)
      .get()
      .pipe(
        map((snapshot) => {
          const assessment = snapshot.data() as Assessment
          assessment.id = snapshot.id
          return assessment
        })
      )
  }

  getAll(userId: string): Observable<Assessment[]> {
    return this.firestore
      .collection(Collections.USERS)
      .doc(userId)
      .collection(Collections.ASSESSMENTS)
      .get()
      .pipe(
        map((snapshot) =>
          snapshot.docs.map((doc) => {
            const assessment = doc.data() as Assessment
            assessment.id = doc.id
            return assessment
          })
        )
      )
  }
}
