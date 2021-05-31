import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import { EMPTY, Observable, of } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { Collections } from 'src/app/constants/collections'
import { Quiz } from 'src/app/models/quiz'

@Injectable({
  providedIn: 'root',
})
export class QuizResolver implements Resolve<Quiz> {
  constructor(
    private readonly firestore: AngularFirestore,
    private readonly router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Quiz> {
    const quizId =
      route.paramMap.get('quizId')! || route.parent?.paramMap.get('quizId')!

    return this.firestore
      .collection(Collections.QUIZZES)
      .doc<Quiz>(quizId)
      .get()
      .pipe(
        mergeMap((doc) => {
          if (doc.data()) {
            const quiz = doc.data() as Quiz
            quiz.id = doc.id
            return of(quiz)
          }
          this.router.navigate(['/quizzes'])
          return EMPTY
        })
      )
  }
}
