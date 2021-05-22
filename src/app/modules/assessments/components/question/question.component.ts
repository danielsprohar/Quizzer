import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { Question } from 'src/app/models/question'
import { QuizFormService } from 'src/app/modules/quizzes/services/quiz-form.service'
import { AppStateService } from 'src/app/services/app-state.service'
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
    private readonly appState: AppStateService,
    private readonly qfs: QuizFormService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.question && this.question.options) {
      this.form = new FormGroup({
        input: this.fb.control(''),
        selectInput: this.fb.control(''),
        options: this.assessment.toOptionsFormArray(this.question.options),
      })
    }
  }

  // =========================================================================
  // Getters
  // =========================================================================

  get input() {
    return this.form.get('input')!
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

  isMultipleChoiceQuestion() {
    const questionType = this.question.type
    return questionType === 'multiple choice' ? true : false
  }
  
  // =========================================================================
  // Event handlers
  // =========================================================================

  toggleIsAnswer(index: number) {
    const ctrl = this.getOptionIsCheckedControl(index)
    ctrl.setValue(!(ctrl.value as boolean))
  }
}
