import { Component, Input, OnInit } from '@angular/core'
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms'
import { Question } from 'src/app/models/question'
import { AssessmentService } from '../../services/assessment.service'

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @Input() question: Question
  form: FormGroup

  constructor(
    private readonly assessment: AssessmentService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.question && this.question.options) {
      this.form = this.fb.group({
        userSubmissionText: this.fb.control('', [Validators.maxLength(4096)]),
        selectInput: this.fb.control(''),
        options: this.assessment.toOptionsFormArray(this.question.options),
      })
    } else if (this.question) {
      this.form = this.fb.group({
        userSubmissionText: this.fb.control('', [Validators.maxLength(4096)]),
        selectInput: this.fb.control(''),
      })
    }
  }

  // =========================================================================
  // Getters
  // =========================================================================

  get userSubmissionText() {
    return this.form.get('userSubmissionText')!
  }

  get selectInput() {
    return this.form.get('selectInput')!
  }

  get options() {
    return this.form?.get('options')! as FormArray
  }

  getOptionIsCheckedControl(index: number) {
    return this.options.at(index).get('isChecked') as FormControl
  }

  getOptionControl(index: number) {
    return this.options.at(index).get('text') as FormControl
  }

  // =========================================================================
  // Facilitators
  // =========================================================================

  isMultipleChoiceQuestion(): boolean {
    const questionType = this.question.type
    return questionType === 'multiple choice' ? true : false
  }

  // =========================================================================
  // Event handlers
  // =========================================================================

  /**
   * Updated the selected option for a "dropdown" question type.
   */
  updateUserSelectInput() {
    const options = this.question.options
    const selectedOption = options.find(
      (option) => option.text === this.selectInput.value
    )
    if (selectedOption) {
      selectedOption.isChecked = true
      options
        .filter((option) => option.text !== selectedOption.text)
        .forEach((otherOption) => (otherOption.isChecked = false))
    }
  }

  /**
   * Updates the user submission text for a "paragraph" or
   * "short answer" question type.
   * @param controlName The control name
   */
  updateUserSubmissionText(controlName: string) {
    const ctrl = this.form.get(controlName)
    this.question.userSubmissionText = ctrl?.value
  }

  // =========================================================================
  // Multiple choice
  // =========================================================================

  private updateSelectedOption(index: number) {
    const selectedOption = this.question.options[index]
    if (selectedOption) {
      selectedOption.isChecked = !selectedOption.isChecked
    }
  }

  toggleMultipleChoiceSelection(index: number) {
    const ctrl = this.getOptionIsCheckedControl(index)
    ctrl.setValue(!(ctrl.value as boolean))
    this.updateSelectedOption(index)
  }
}
