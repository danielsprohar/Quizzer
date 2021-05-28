import { Injectable } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Question, QuestionType } from 'src/app/models/question'
import { QuestionOption } from 'src/app/models/question-option'
import { Quiz } from 'src/app/models/quiz'
import { QuizFormService } from '../../quizzes/services/quiz-form.service'
import { Assessment } from '../models/assessment'
import { AssessmentOption } from '../models/assessment-option'
import { AssessmentQuestion } from '../models/assessment-question'
import { multipleChoiceValidator } from '../validators/multiple-choice-validator'

@Injectable({
  providedIn: 'root',
})
export class AssessmentFormService {
  constructor(
    private readonly fb: FormBuilder,
    private readonly qfs: QuizFormService
  ) {}

  /**
   * Creates a new instance of a `FormGroup` for an assessment.
   * @param questions The quiz's questions
   * @returns A new instance of a `FormGroup`
   */
  instance(quiz: Quiz): FormGroup {
    const form = this.fb.group({
      quizId: this.fb.control(quiz.id),
      name: this.fb.control(quiz.name),
      subject: this.fb.control(quiz.subject),
      grade: this.fb.control(''),
      correctQuestions: this.fb.control(''),
      totalQuestions: this.fb.control(quiz.questions?.length),
      questions: this.toQuestionAssessmentFormArray(quiz.questions!),
    })
    return form
  }

  // =========================================================================
  // Forms to Models
  // =========================================================================

  toQuizAssessmentOptions(options: FormArray): AssessmentOption[] {
    return options.controls.map(
      (control) =>
        new AssessmentOption({
          isSelected: control.get('isSelected')?.value,
          text: control.get('text')?.value,
        })
    )
  }

  /**
   * Converts the given question form into a `QuizAssessmentQuestion`
   * @param questionForm
   * @returns
   */
  toQuizAssessmentQuestion(questionForm: FormGroup): AssessmentQuestion {
    const question = new AssessmentQuestion({
      questionId: questionForm.get('questionId')?.value,
      type: questionForm.get('questionType')?.value as QuestionType,
    })

    if (question.type === 'short answer' || question.type === 'paragraph') {
      const userInputText = questionForm.get('userInputText')?.value
      question.userInputText = userInputText
      return question
    }
    if (question.type === 'dropdown') {
      question.selectedOption = questionForm.get('selectedOption')?.value
    }

    question.options = this.toQuizAssessmentOptions(
      questionForm.get('options') as FormArray
    )

    return question
  }

  /**
   * Converts the given FormArray of question forms
   * into an array of type `QuizAssessmentQuestion`
   * @param questionForms
   * @returns
   */
  toQuizAssessmentQuestions(
    questionForms: FormArray
  ): AssessmentQuestion[] {
    return questionForms.controls.map((control) =>
      this.toQuizAssessmentQuestion(control as FormGroup)
    )
  }

  /**
   * Converts the given assessment form into a `QuizAssessment`
   * @param assessmentForm
   * @returns A new instance of a `QuizAssessment`
   */
  toQuizAssessment(assessmentForm: FormGroup): Assessment {
    return new Assessment({
      quizId: assessmentForm.get('quizId')?.value,
      name: assessmentForm.get('name')?.value,
      subject: assessmentForm.get('subject')?.value,
      questions: this.toQuizAssessmentQuestions(
        assessmentForm.get('questions') as FormArray
      ),
    })
  }

  // =========================================================================
  // Models to Forms
  // =========================================================================

  /**
   * Converts the given options into a `FormArray`.
   * @param options
   * @returns
   */
  toQuestionOptionFormArray(options: QuestionOption[]): FormArray {
    return this.fb.array(
      options.map((option) => this.qfs.toOptionFormGroup(option))
    )
  }

  /**
   * Creates a new instance of a `FormGroup`: setting its
   * initial values with the `Question` model.   *
   * @param question The `Question` model
   * @returns A new instance of a `FormGroup`
   */
  toQuestionAssessmentFormGroup(question: Question): FormGroup {
    if (question.type === 'short answer' || question.type === 'paragraph') {
      return this.fb.group({
        questionId: question.id,
        questionType: question.type,
        userInputText: this.fb.control('', [
          Validators.required,
          Validators.maxLength(4096),
        ]),
      })
    }
    if (question.type === 'dropdown') {
      return this.fb.group({
        questionId: question.id,
        questionType: question.type,
        selectedOption: this.fb.control(null, [Validators.required]),
        options: this.toQuestionOptionFormArray(question.options!),
      })
    }
    return this.fb.group(
      {
        questionId: question.id,
        questionType: question.type,
        options: this.toQuestionOptionFormArray(question.options!),
      },
      { validators: multipleChoiceValidator }
    )
  }

  /**
   * Converts the given array of type `Question` into an
   * array of type`FormGroup`.
   * @param questions The `Question` models.
   * @returns A new array of type`FormGroup`.
   */
  toQuestionAssessmentFormArray(questions: Question[]): FormArray {
    return this.fb.array(
      questions.map((question) => this.toQuestionAssessmentFormGroup(question))
    )
  }
}
