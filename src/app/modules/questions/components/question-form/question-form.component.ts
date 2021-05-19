import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'
import { finalize } from 'rxjs/operators'
import { questionTypes as QuestionTypes } from 'src/app/models/question'
import { AppStateService } from 'src/app/services/app-state.service'
import { ImageService } from 'src/app/services/image.service'

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
})
export class QuestionFormComponent implements OnInit, OnDestroy {
  private addImageSubscription: Subscription

  readonly multipleChoiceTypes = ['multiple choice', 'checkboxes', 'dropdown']
  readonly questionTypes = QuestionTypes
  readonly questionTypeIcons = [
    'short_text',
    'subject',
    'adjust',
    'checklist',
    'arrow_drop_down',
  ]

  @Input() questionForm: FormGroup
  @Input() quizId: string
  @Input() index: number
  @Output() questionDeleted = new EventEmitter<number>()
  @Output() questionDuplicated = new EventEmitter<FormGroup>()
  hasCaption: boolean = false

  constructor(
    private readonly fb: FormBuilder,
    private readonly is: ImageService,
    private readonly appState: AppStateService
  ) {}

  ngOnInit() {
    if (!this.questionForm) {
      // Create a new question for an existing Quiz
      this.questionForm = this.fb.group({
        text: this.fb.control('', [
          Validators.required,
          Validators.maxLength(4096),
        ]),
        type: this.fb.control('multiple choice', [Validators.required]),
        hint: this.fb.control('', [Validators.maxLength(4096)]),
        explanation: this.fb.control('', [Validators.maxLength(4096)]),
        imageURL: this.fb.control(''),
        imageCaption: this.fb.control(''),
      })
    }
    // TODO: else, we are  editing a Question: thus, set form fields
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
    return this.questionForm.get('options') as FormArray
  }

  // =========================================================================
  // Event handlers
  // =========================================================================

  changeQuestionType(newQuestionType: string) {
    if (!this.multipleChoiceTypes.includes(newQuestionType)) {
      this.options.clear()
    }
  }

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

  addOption() {
    this.options.push(
      this.fb.control('', [Validators.required, Validators.maxLength(4096)])
    )
  }

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

  deleteQuestion() {
    this.questionDeleted.emit(this.index)
  }

  deleteOption(index: number) {
    this.options.removeAt(index)
  }

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

  toggleImageCaption() {
    this.hasCaption = !this.hasCaption
    this.imageCaption.setValue('')
  }
}
