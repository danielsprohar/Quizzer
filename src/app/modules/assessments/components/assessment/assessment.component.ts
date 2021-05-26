import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { Question } from 'src/app/models/question'
import { Quiz } from 'src/app/models/quiz'
import { AuthService } from 'src/app/modules/auth/services/auth.service'
import { AppStateService } from 'src/app/services/app-state.service'
import { CacheService } from 'src/app/services/cache.service'
import { SnackbarService } from 'src/app/services/snackbar.service'
import { UserService } from 'src/app/services/user.service'
import { AssessmentDataService } from '../../services/assessment-data.service'
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
    private readonly auth: AuthService,
    private readonly assessmentDataService: AssessmentDataService,
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

  async submit() {
    try {
      const userId = await this.auth.getUserIdAsync()
      if (!userId) {
        this.router.navigate(['/login'])
        return
      }

      this.appState.isLoading(true)
      const assessment = await this.assessmentService.assess(this.quiz)
      this.cache.setAssessment(assessment)

      const docRef = await this.assessmentDataService.add(userId, assessment)
      this.snackbar.success("Done! Let's see how you did.")
      this.router.navigate(['assessments', docRef.id, 'summary'])
    } catch (error) {
      this.snackbar.warn('Uh oh. Something went wrong :/')
      this.cache.setAssessment(null)
      this.cache.setQuiz(null)
      console.error(error)
    } finally {
      this.appState.isLoading(false)
    }
  }
}
