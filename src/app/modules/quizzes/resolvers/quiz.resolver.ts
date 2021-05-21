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
    private readonly afs: AngularFirestore,
    private readonly router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Quiz> {
    const id = route.paramMap.get('id')!
    return this.afs
      .collection(Collections.QUIZZES)
      .doc<Quiz>(id)
      .get()
      .pipe(
        mergeMap((doc) => {
          if (doc.data()) {
            const quiz = doc.data() as Quiz
            quiz.id = doc.id
            return of(quiz)
          } else {
            this.router.navigate(['/quizzes'])
            return EMPTY
          }
        })
      )
  }
}
