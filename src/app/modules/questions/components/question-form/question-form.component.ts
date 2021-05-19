import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { questionTypes as QuestionTypes } from 'src/app/models/question'
import { ImageService } from 'src/app/services/image.service'

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
})
export class QuestionFormComponent implements OnInit {
  readonly multipleChoiceTypes = ['multiple choice', 'checkboxes', 'dropdown']
  readonly questionTypes = QuestionTypes
  readonly questionTypeIcons = [
    'short_text',
    'subject',
    'adjust',
    'checklist',
    'arrow_drop_down',
  ]

  @Input() index: number
  @Input() questionForm: FormGroup
  @Output() questionDeleted = new EventEmitter<number>()
  @Output() questionDuplicated = new EventEmitter<FormGroup>()

  constructor(
    private readonly fb: FormBuilder,
    private readonly is: ImageService
  ) {}

  ngOnInit(): void {
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
        imagePath: this.fb.control(''),
      })
    }
    // else: set form fields
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

  get imagePath() {
    return this.questionForm.get('imagePath')!
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

  addImage() {}

  addOption() {
    this.options.push(
      this.fb.control('', [Validators.required, Validators.maxLength(4096)])
    )
  }

  deleteImage() {}

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
      imagePath: this.fb.control(this.imagePath.value),
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
}
