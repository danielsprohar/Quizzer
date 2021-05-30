import { Component, OnDestroy, OnInit } from '@angular/core'
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import {
  QuestionType,
  QuestionAttributeConstraints,
} from 'src/app/models/question'
import { QuizFormService } from 'src/app/modules/quizzes/services/quiz-form.service'
import { AppStateService } from 'src/app/services/app-state.service'
import { SnackbarService } from 'src/app/services/snackbar.service'
import { QuestionService } from '../../services/question.service'

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss'],
})
export class EditQuestionComponent implements OnInit, OnDestroy {
  private subscription: Subscription
  readonly textMaxLength = QuestionAttributeConstraints.TEXT_MAX_LENGTH
  readonly hintMaxLength = QuestionAttributeConstraints.HINT_MAX_LENGTH
  readonly explanationMaxLength = QuestionAttributeConstraints.EXPLANATION_MAX_LENGTH
  quizId: string
  form: FormGroup

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly qfs: QuizFormService,
    private readonly snackbar: SnackbarService,
    private questionService: QuestionService,
    private readonly appState: AppStateService
  ) {}

  ngOnInit(): void {
    this.quizId = this.route.snapshot.paramMap.get('quizId')!
    this.subscription = this.route.data.subscribe(
      (data) => (this.form = this.qfs.toQuestionFormGroup(data.question))
    )
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  // =========================================================================
  // Getters
  // =========================================================================

  get text(): AbstractControl {
    return this.form.get('text') as AbstractControl
  }

  get hint(): AbstractControl {
    return this.form.get('hint') as AbstractControl
  }

  get explanation(): AbstractControl {
    return this.form.get('explanation') as AbstractControl
  }

  get type(): AbstractControl {
    return this.form.get('type') as AbstractControl
  }

  get options(): FormArray {
    return this.form.get('options') as FormArray
  }

  getOptionIsAnswerControl(index: number) {
    return this.options.at(index).get('isAnswer') as FormControl
  }

  getOptionControl(index: number) {
    return this.options.at(index).get('text') as FormControl
  }

  // =========================================================================
  // Facilitators
  // =========================================================================

  isMultipleChoiceQuestion(): boolean {
    const type: QuestionType = this.type.value
    return type === 'multiple choice' || type === 'dropdown'
  }

  // =========================================================================
  // Event Handlers
  // =========================================================================

  addOption(): void {
    this.options.push(this.qfs.toOptionFormGroup())
  }

  deleteOption(index: number): void {
    this.options.removeAt(index)
  }

  async save(): Promise<void> {
    const question = this.qfs.toQuestion(this.form)
    this.appState.isLoading(true)

    try {
      await this.questionService.update(this.quizId, question)
      this.snackbar.success('Saved!')
      this.router.navigate(['/quizzes', this.quizId, 'details'])
    } catch (error) {
      this.snackbar.warn('Uh oh. Something went wrong :/')
      console.error(error.message)
    } finally {
      this.appState.isLoading(false)
    }
  }
}
