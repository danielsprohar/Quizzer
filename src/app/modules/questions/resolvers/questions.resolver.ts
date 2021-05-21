import { Injectable } from '@angular/core'
import {
  AngularFirestore,
  QueryDocumentSnapshot,
} from '@angular/fire/firestore'
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router'
import { EMPTY, Observable, of } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { Collections } from 'src/app/constants/collections'
import { Question } from 'src/app/models/question'

@Injectable({
  providedIn: 'root',
})
export class QuestionsResolver implements Resolve<Question[]> {
  constructor(
    private readonly router: Router,
    private readonly afs: AngularFirestore
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Question[]> {
    const quizId = route.paramMap.get('id')!
    return this.afs
      .collection(Collections.QUIZZES)
      .doc(quizId)
      .collection<Question>(Collections.QUIZ_QUESTIONS)
      .get()
      .pipe(
        mergeMap((snapshot) => {
          if (snapshot) {
            return of(this.toQuestions(snapshot.docs))
          } else {
            this.router.navigate(['/quizzes'])
            return EMPTY
          }
        })
      )
  }

  private toQuestions(
    snapshots: QueryDocumentSnapshot<Question>[]
  ): Question[] {
    const questions = []

    for (let snapshot of snapshots) {
      const question = snapshot.data() as Question
      question.id = snapshot.id
      questions.push(question)
    }

    return questions
  }
}
