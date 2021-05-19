import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { questionTypes as QuestionTypes } from 'src/app/models/question'

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
})
export class QuestionFormComponent implements OnInit {
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

  constructor(private readonly fb: FormBuilder) {}

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

  print() {
    for (let ctrl of this.options.controls) {
      console.log(ctrl.value)
    }

    console.log(this.type.value)
  }
}
