import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
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

  form: FormGroup

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      text: this.fb.control(''),
      type: this.fb.control(''),
      hint: this.fb.control(''),
      explanation: this.fb.control(''),
      imageURL: this.fb.control(''),
      imagePath: this.fb.control(''),
    })
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

  // =========================================================================
  // Event handlers
  // =========================================================================

  addImage(): void {}

  duplicateQuestion(): void {}

  deleteQuestion(): void {}
}
