import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { questionTypes as QuestionTypes } from 'src/app/models/question'
import { QuestionControlService } from '../../services/question-control.service'

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
  @Input() form: FormGroup
  @Output() questionDeleted = new EventEmitter<number>()

  constructor(
    private readonly fb: FormBuilder,
    private readonly qcs: QuestionControlService
  ) {}

  ngOnInit(): void {
    if (!this.form) {
      // Create a new question for an existing Quiz
      this.form = this.fb.group({
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
    return this.form.get('text')!
  }

  get type() {
    return this.form.get('type')!
  }

  get hint() {
    return this.form.get('hint')!
  }

  get explanation() {
    return this.form.get('explanation')!
  }

  get imageURL() {
    return this.form.get('imageURL')!
  }

  get imagePath() {
    return this.form.get('imagePath')!
  }

  get options() {
    return this.form.get('options') as FormArray
  }

  // =========================================================================
  // Event handlers
  // =========================================================================

  changeQuestionType(newType: string) {
    if (!this.multipleChoiceTypes.includes(newType)) {
      this.options.clear()
    }
  }

  addImage(): void {}

  duplicateQuestion(): void {}

  deleteQuestion(): void {
    this.questionDeleted.emit(this.index)
  }

  addOption() {
    this.options.push(
      this.fb.control('', [Validators.required, Validators.maxLength(4096)])
    )
  }

  deleteOption(index: number) {
    this.options.removeAt(index)
  }
}
