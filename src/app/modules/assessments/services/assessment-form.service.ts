import { Injectable } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Question } from 'src/app/models/question'
import { QuestionOption } from 'src/app/models/question-option'
import { QuizFormService } from '../../quizzes/services/quiz-form.service'

@Injectable({
  providedIn: 'root',
})
export class AssessmentFormService {
  constructor(
    private readonly fb: FormBuilder,
    private readonly qfs: QuizFormService
  ) {}

  /**
   * Creates a new instance of a `FormGroup` whose
   * only child control is a `FormArray` constructed from
   * the given questions.
   * @param questions The quiz's questions
   * @returns A new instance of a `FormGroup`
   */
  instance(questions: Question[]): FormGroup {
    const form = this.fb.group({
      questions: this.fb.array(this.toQuestionAssessmentFormGroups(questions)),
    })
    return form
  }

  /**
   * Converts the given options into a `FormArray`.
   * @param options
   * @returns
   */
  toOptionsFormGroups(options: QuestionOption[]): FormGroup[] {
    const forms: FormGroup[] = []
    options.forEach((option) => forms.push(this.qfs.toOptionFormGroup(option)))
    return forms
  }

  toQuestionAssessmentFormGroup(question: Question): FormGroup {
    if (question.type === 'short answer' || question.type === 'paragraph') {
      return this.fb.group({
        userSubmissionText: this.fb.control('', [
          Validators.required,
          Validators.maxLength(4096),
        ]),
      })
    }
    if (question.type === 'dropdown' && question.options) {
      return this.fb.group({
        selectInput: this.fb.control('', [
          Validators.required,
          Validators.maxLength(4096),
        ]),
      })
    }
    return this.fb.group({
      options: this.fb.array(this.toOptionsFormGroups(question.options!)),
    })
  }

  toQuestionAssessmentFormGroups(questions: Question[]): FormGroup[] {
    const questionFormGroups: FormGroup[] = []
    questions.forEach((question) => {
      questionFormGroups.push(this.toQuestionAssessmentFormGroup(question))
    })
    return questionFormGroups
  }
}
