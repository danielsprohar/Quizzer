import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import { EMPTY, Observable, of } from 'rxjs'
import { first, mergeMap } from 'rxjs/operators'
import { Collections } from 'src/app/constants/collections'
import { Assessment } from '../models/assessment'

@Injectable({
  providedIn: 'root',
})
export class QuizAssessmentResolver implements Resolve<Assessment> {
  constructor(
    private readonly router: Router,
    private readonly firestore: AngularFirestore,
    private readonly afAuth: AngularFireAuth
  ) {}

  // =========================================================================

  private fetchAssessment(
    userId: string,
    assessmentId: string
  ): Observable<Assessment> {
    return this.firestore
      .collection(Collections.USERS)
      .doc(userId)
      .collection(Collections.ASSESSMENTS)
      .doc<Assessment>(assessmentId)
      .get()
      .pipe(
        first(),
        mergeMap((snapshot) => {
          const assessment = snapshot.data() as Assessment
          if (assessment) {
            return of(assessment)
          }
          this.router.navigate(['/quizzes'])
          return EMPTY
        })
      )
  }

  // =========================================================================

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Assessment> {
    const assessmentId = route.paramMap.get('id')
    if (!assessmentId) {
      this.router.navigate(['/quizzes'])
      return EMPTY
    }

    return this.afAuth.user.pipe(
      first(),
      mergeMap((currentUser) => {
        if (!currentUser) {
          this.router.navigate(['/quizzes'])
          return EMPTY
        }
        return this.fetchAssessment(currentUser.uid, assessmentId)
      })
    )
  }
}
