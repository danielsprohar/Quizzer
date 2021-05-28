import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Question } from 'src/app/models/question'
import { QuizService } from 'src/app/modules/quizzes/services/quiz.service'
import { SnackbarService } from 'src/app/services/snackbar.service'
import { Assessment } from '../../models/assessment'

@Component({
  selector: 'app-assessment-summary',
  templateUrl: './assessment-summary.component.html',
  styleUrls: ['./assessment-summary.component.scss'],
})
export class AssessmentSummaryComponent implements OnInit, OnDestroy {
  private routeDataSubscription: Subscription
  assessment: Assessment
  questions$: Observable<Question[]>

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private quizService: QuizService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.routeDataSubscription = this.route.data.subscribe(
      (data) => {
        if (data.assessment) {
          this.assessment = data.assessment as Assessment
          this.questions$ = this.quizService
            .getQuestions(this.assessment.quizId)
            // .pipe(
            //   tap((questions) => {
            //     console.log(questions)
            //   })
            // )
        }
      },
      (err) => {
        console.error(err)
        this.snackbar.warn('Uh oh. Something went wrong :/')
        this.router.navigate(['/quizzes'])
      }
    )
  }

  ngOnDestroy(): void {
    if (this.routeDataSubscription) {
      this.routeDataSubscription.unsubscribe()
    }
  }

  getUserSubmittedQuestion(index: number) {
    return this.assessment.questions[index]
  }
}
