import { Injectable } from '@angular/core'
import {
  AngularFirestore,
  QueryDocumentSnapshot,
} from '@angular/fire/firestore'
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Collections } from 'src/app/constants/collections'
import { Question } from 'src/app/models/question'

@Injectable({
  providedIn: 'root',
})
export class QuestionsResolver implements Resolve<Question[]> {
  constructor(private readonly firestore: AngularFirestore) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Question[]> {
    const quizId =
      route.paramMap.get('quizId')! || route.parent?.paramMap.get('quizId')!
    return this.firestore
      .collection(Collections.QUIZZES)
      .doc(quizId)
      .collection<Question>(Collections.QUIZ_QUESTIONS)
      .get()
      .pipe(map((snapshot) => this.toQuestions(snapshot.docs)))
  }

  private toQuestions(
    snapshots: QueryDocumentSnapshot<Question>[]
  ): Question[] {
    return snapshots.map((snapshot) => {
      const question = snapshot.data() as Question
      question.id = snapshot.id
      return question
    })
  }
}
