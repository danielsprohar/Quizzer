import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormArray, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { Question } from 'src/app/models/question'
import { Quiz } from 'src/app/models/quiz'
import { AuthService } from 'src/app/modules/auth/services/auth.service'
import { AppStateService } from 'src/app/services/app-state.service'
import { SnackbarService } from 'src/app/services/snackbar.service'
import { AssessmentDataService } from '../../services/assessment-data.service'
import { AssessmentFormService } from '../../services/assessment-form.service'
import { AssessmentService } from '../../services/assessment.service'

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss'],
})
export class AssessmentComponent implements OnInit, OnDestroy {
  private subscription: Subscription
  assessmentForm: FormGroup
  quiz: Quiz

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly snackbar: SnackbarService,
    private readonly appState: AppStateService,
    private readonly auth: AuthService,
    private readonly assessmentService: AssessmentService,
    private readonly ads: AssessmentDataService,
    private readonly afs: AssessmentFormService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe((data) => {
      if (data.quiz && data.questions) {
        this.quiz = data.quiz as Quiz
        this.quiz.questions = data.questions as Question[]
        this.assessmentForm = this.afs.instance(this.quiz)
      }
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  // =========================================================================
  // Getters
  // =========================================================================

  get questions(): FormArray {
    return this.assessmentForm.get('questions') as FormArray
  }

  getQuestionFormGroup(index: number): FormGroup {
    const questionFormGroup = this.questions.at(index) as FormGroup
    return questionFormGroup
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
      const assessment = await this.assessmentService.assess(
        this.assessmentForm
      )

      const docRef = await this.ads.add(userId, assessment)
      this.snackbar.success("Done! Let's see how you did.")
      this.router.navigate(['assessments', docRef.id, 'summary'])
    } catch (error) {
      this.snackbar.warn('Uh oh. Something went wrong :/')
      console.error(error)
    } finally {
      this.appState.isLoading(false)
    }
  }
}
