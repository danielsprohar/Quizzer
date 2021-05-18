import { Component, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/modules/auth/services/auth.service'
import { QuestionControlService } from 'src/app/modules/questions/services/question-control.service'

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss'],
})
export class CreateQuizComponent implements OnInit {
  readonly userId: string
  form: FormGroup

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly auth: AuthService,
    private readonly qcs: QuestionControlService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: this.fb.control(''),
      description: this.fb.control(''),
      subject: this.fb.control(''),
      visibility: this.fb.control(''),
      questions: this.fb.array([]),
    })
  }

  // =========================================================================
  // Getters
  // =========================================================================

  get name() {
    return this.form.get('name')
  }

  get description() {
    return this.form.get('description')
  }

  get subject() {
    return this.form.get('subject')
  }

  get visibility() {
    return this.form.get('visibility')
  }

  get questions() {
    return this.form.get('questions')! as FormArray
  }

  // =========================================================================
  // Event Handlers
  // =========================================================================

  addQuestion() {
    this.questions.push(
      this.qcs.newQuestionFormGroup({ type: 'multiple choice' })
    )
  }

  deleteQuestion(index: number) {
    this.questions.removeAt(index)
  }
}
