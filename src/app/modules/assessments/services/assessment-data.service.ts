import { Injectable } from '@angular/core'
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Collections } from 'src/app/constants/collections'
import { QuizAssessment } from '../models/quiz-assessment'
import firebase from 'firebase/app'

@Injectable({
  providedIn: 'root',
})
export class AssessmentDataService {
  constructor(private readonly firestore: AngularFirestore) {}

  add(
    userId: string,
    assessment: QuizAssessment
  ): Promise<DocumentReference<firebase.firestore.DocumentData>> {
    return this.firestore
      .collection(Collections.USERS)
      .doc(userId)
      .collection(Collections.ASSESSMENTS)
      .add(JSON.parse(JSON.stringify(assessment)))
  }

  get(userId: string, assessmentId: string): Observable<QuizAssessment> {
    return this.firestore
      .collection(Collections.USERS)
      .doc(userId)
      .collection(Collections.ASSESSMENTS)
      .doc<QuizAssessment>(assessmentId)
      .get()
      .pipe(
        map((snapshot) => {
          const assessment = snapshot.data() as QuizAssessment
          assessment.id = snapshot.id
          return assessment
        })
      )
  }

  getAll(userId: string): Observable<QuizAssessment[]> {
    return this.firestore
      .collection(Collections.USERS)
      .doc(userId)
      .collection(Collections.ASSESSMENTS)
      .get()
      .pipe(
        map((snapshot) =>
          snapshot.docs.map((doc) => {
            const assessment = doc.data() as QuizAssessment
            assessment.id = doc.id
            return assessment
          })
        )
      )
  }
}
