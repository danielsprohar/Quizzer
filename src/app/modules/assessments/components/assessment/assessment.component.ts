import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { Question } from 'src/app/models/question'
import { Quiz } from 'src/app/models/quiz'
import { AppStateService } from 'src/app/services/app-state.service'
import { CacheService } from 'src/app/services/cache.service'
import { SnackbarService } from 'src/app/services/snackbar.service'
import { UserService } from 'src/app/services/user.service'
import { Assessment } from '../../models/assessment'
import { AssessmentService } from '../../services/assessment.service'

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss'],
})
export class AssessmentComponent implements OnInit, OnDestroy {
  private subscription: Subscription
  quiz: Quiz

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly assessmentService: AssessmentService,
    private readonly snackbar: SnackbarService,
    private readonly appState: AppStateService,
    private readonly userService: UserService,
    private readonly cache: CacheService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe((data) => {
      if (data.quiz && data.questions) {
        this.quiz = data.quiz as Quiz
        this.quiz.questions = data.questions as Question[]
      }
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  // =========================================================================
  // Event Handlers
  // =========================================================================

  submit() {
    this.appState.isLoading(true)

    this.assessmentService
      .assess(this.quiz)
      .then((assessment: Assessment) => {
        this.cache.setAssessment(assessment)
        return this.userService.addAssessment(assessment)
      })
      .then((doc) => {
        this.cache.setQuiz(this.quiz)
        this.snackbar.success("Done! Let's see how you did.")
        this.router.navigate(['assessments', doc.id, 'summary'])
      })
      .catch((err) => {
        this.snackbar.warn('Uh oh. Something went wrong :/')
        this.cache.setAssessment(null)
        this.cache.setQuiz(null)
        console.error(err)
      })
      .finally(() => this.appState.isLoading(false))
  }
}
