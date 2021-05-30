import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import { EMPTY, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Collections } from 'src/app/constants/collections'
import { Question } from 'src/app/models/question'

@Injectable({
  providedIn: 'root',
})
export class QuestionDetailsResolver implements Resolve<Question> {
  constructor(
    private readonly router: Router,
    private readonly firestore: AngularFirestore
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Question> {
    const quizId = route.paramMap.get('quizId')
    const questionId = route.paramMap.get('questionId')

    if (!quizId) {
      this.router.navigate(['/quizzes'])
      return EMPTY
    }

    if (!questionId) {
      this.router.navigate(['/quizzes', quizId, 'details'])
      return EMPTY
    }

    return this.firestore
      .collection(Collections.QUIZZES)
      .doc(quizId)
      .collection<Question>(Collections.QUIZ_QUESTIONS)
      .doc(questionId)
      .get()
      .pipe(
        map((snapshot) => {
          const question = snapshot.data() as Question
          question.id = snapshot.id
          return question
        })
      )
  }
}
