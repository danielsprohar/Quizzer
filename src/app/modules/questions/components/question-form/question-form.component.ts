import { animate, state, style, transition, trigger } from '@angular/animations'
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms'
import { Subscription } from 'rxjs'
import {
  questionTypes as QuestionTypes,
  isMultipleChoiceQuestion as IsMultipleChoiceQuestion
} from 'src/app/models/question'
import { QuizFormService } from 'src/app/modules/quizzes/services/quiz-form.service'
import { AppStateService } from 'src/app/services/app-state.service'
import { ImageService } from 'src/app/services/image.service'

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
  animations: [
    trigger('removeCard', [
      state('exists', style({})),
      state(
        'removed',
        style({
          marginLeft: '-110%',
          marginRight: '110%',
        })
      ),
      transition('exists => removed', [animate('0.25s')]),
    ]),
  ],
})
export class QuestionFormComponent implements OnInit, OnDestroy {
  private addImageSubscription: Subscription

  readonly isMultipleChoiceQuestion = IsMultipleChoiceQuestion
  readonly questionTypes = QuestionTypes

  @Input() questionForm: FormGroup
  @Input() quizId: string
  @Input() index: number

  @Output() questionDeleted = new EventEmitter<number>()
  @Output() questionDuplicated = new EventEmitter<FormGroup>()

  hasCaption: boolean = false
  isRemoved: boolean = false

  constructor(
    private readonly fb: FormBuilder,
    private readonly is: ImageService,
    private readonly qfs: QuizFormService,
    private readonly appState: AppStateService
  ) {}

  ngOnInit() {
    if (!this.questionForm) {
      // Create a new question for an existing Quiz
      this.questionForm = this.qfs.instance()
    }
  }

  ngOnDestroy() {
    if (this.addImageSubscription) {
      this.addImageSubscription.unsubscribe()
    }
  }

  // =========================================================================
  // Getters
  // =========================================================================

  get text() {
    return this.questionForm.get('text')!
  }

  get type() {
    return this.questionForm.get('type')!
  }

  get hint() {
    return this.questionForm.get('hint')!
  }

  get explanation() {
    return this.questionForm.get('explanation')!
  }

  get imageURL() {
    return this.questionForm.get('imageURL')!
  }

  get imageCaption() {
    return this.questionForm.get('imageCaption')!
  }

  get options() {
    return this.questionForm?.get('options')! as FormArray
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

  toggleIsAnswer(index: number) {
    const ctrl = this.getOptionIsAnswerControl(index)
    ctrl.setValue(!(ctrl.value as boolean))
  }

  // =========================================================================
  // Event handlers
  // =========================================================================

  changeQuestionType(newQuestionType: string) {
    if (!this.isMultipleChoiceQuestion(newQuestionType)) {
      this.options.clear()
    }
  }

  // =========================================================================
  
  addImage(fileList: FileList) {
    if (!this.quizId || !fileList || fileList.length === 0) {
      return
    }
    const image = fileList.item(0)
    if (!image) {
      return
    }
    this.appState.isLoading(true)
    this.addImageSubscription = this.is
      .addImage(image, this.quizId)
      .snapshotChanges()
      .subscribe((res) => {
        if (res) {
          res.ref
            .getDownloadURL()
            .then((url) => this.imageURL.setValue(url))
            // TODO: Create a Notification service to display an error message to the user
            .catch((err) => console.error(err))
            .finally(() => this.appState.isLoading(false))
        }
      })
  }

  // =========================================================================

  addOption() {
    this.options.push(this.qfs.toOptionFormGroup())
  }

  // =========================================================================

  deleteImage() {
    this.appState.isLoading(true)
    this.is
      .deleteImage(this.imageURL.value)
      .then(() => {
        console.log('Image removed')
        this.imageURL.setValue('')
      })
      .finally(() => this.appState.isLoading(false))
  }

  // =========================================================================

  async deleteQuestion() {
    this.isRemoved = true
    await new Promise((resolve) => setTimeout(resolve, 2000))
    this.questionDeleted.emit(this.index)
  }

  // =========================================================================

  deleteOption(index: number) {
    this.options.removeAt(index)
  }

  // =========================================================================

  duplicateQuestion() {
    const form = this.fb.group({
      text: this.fb.control(this.text.value, [
        Validators.required,
        Validators.maxLength(4096),
      ]),
      type: this.fb.control(this.type.value, [Validators.required]),
      hint: this.fb.control(this.hint.value, [Validators.maxLength(4096)]),
      explanation: this.fb.control(this.explanation.value, [
        Validators.maxLength(4096),
      ]),
      imageURL: this.fb.control(this.imageURL.value),
    })

    if (this.options.length > 0) {
      const questionOptions = this.fb.array([])
      for (let ctrl of this.options.controls) {
        questionOptions.push(ctrl)
      }
      form.addControl('options', questionOptions)
    }

    this.questionDuplicated.emit(form)
  }

  // =========================================================================

  toggleImageCaption() {
    this.hasCaption = !this.hasCaption
    this.imageCaption.setValue('')
  }
}
