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
import { mergeMap } from 'rxjs/operators'
import { Collections } from 'src/app/constants/collections'
import { CacheService } from 'src/app/services/cache.service'
import { Assessment } from '../models/assessment'

@Injectable({
  providedIn: 'root',
})
export class AssessmentResolver implements Resolve<Assessment> {
  constructor(
    private readonly cache: CacheService,
    private readonly router: Router,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
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
        mergeMap((snapshot) => {
          if (snapshot) {
            return of(snapshot.data() as Assessment)
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
    const cachedAssessment = this.cache.getAssessment()
    if (cachedAssessment) {
      return of(cachedAssessment)
    }

    const assessmentId = route.paramMap.get('id')
    if (!assessmentId) {
      this.router.navigate(['/quizzes'])
      return EMPTY
    }

    return this.afAuth.user.pipe(
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