import { Injectable } from '@angular/core'
import { FormArray, FormGroup } from '@angular/forms'
import { Question } from 'src/app/models/question'
import { QuestionOption } from 'src/app/models/question-option'
import { QuizService } from '../../quizzes/services/quiz.service'
import { Assessment } from '../models/assessment'
import { AssessmentOption } from '../models/assessment-option'
import { AssessmentQuestion } from '../models/assessment-question'
import { AssessmentFormService } from './assessment-form.service'

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  constructor(
    private readonly quizService: QuizService,
    private readonly afs: AssessmentFormService
  ) {}

  /**
   *
   * @param assessmentOptions
   * @param options
   * @returns `true` if the user selected the correct options; otherwise `false`
   */
  private assessMultipleChoiceOptions(
    assessmentOptions: AssessmentOption[],
    options: QuestionOption[]
  ): boolean {
    return (
      options.map(
        (option, index) =>
          option.isAnswer && assessmentOptions[index].isSelected
      ).length > 0
    )
  }

  /**
   *
   * @param selectedOptionText The user selected option
   * @param options The question options
   * @returns `true` if the user selected the correct option; otherwise `false`
   */
  private assessDropdownSelectedOption(
    selectedOptionText: string,
    options: QuestionOption[]
  ): boolean {
    const i = options.findIndex((option) => option.text === selectedOptionText)
    return i !== -1
  }

  /**
   *
   * @param userInput
   * @param expectedInput
   * @returns `true` if the user's response is correct; otherwise `false`
   */
  private assessUserInputText(
    userInput: string,
    expectedInput: string
  ): boolean {
    // TODO: Replace with a Document Distance algorithm
    const actual = userInput.replace(/\s/g, '').toLowerCase()
    const expected = expectedInput.replace(/\s/g, '').toLowerCase()
    return actual === expected
  }

  /**
   *
   * @param assessmentQuestions
   * @param questions
   * @returns The number of questions the user answered correctly.
   */
  private assessQuestions(
    assessmentQuestions: AssessmentQuestion[],
    questions: Question[]
  ): AssessmentQuestion[] {
    if (assessmentQuestions.length !== questions.length) {
      throw new Error(
        'user submitted questions are not the same length as the quiz questions'
      )
    }

    assessmentQuestions.forEach((assessmentQuestion, index) => {
      if (assessmentQuestion.type === 'multiple choice') {
        assessmentQuestion.isCorrect = this.assessMultipleChoiceOptions(
          assessmentQuestion.options!,
          questions[index].options!
        )
      } else if (assessmentQuestion.type === 'dropdown') {
        assessmentQuestion.isCorrect = this.assessDropdownSelectedOption(
          assessmentQuestion.selectedOption!,
          questions[index].options!
        )
      } else {
        assessmentQuestion.isCorrect = this.assessUserInputText(
          assessmentQuestion.userInputText!,
          questions[index].explanation!
        )
      }
    })

    return assessmentQuestions
  }

  // =========================================================================

  async assess(assessmentForm: FormGroup): Promise<Assessment> {
    const quizId = assessmentForm.get('quizId')?.value
    const questions = await this.quizService.getQuestions(quizId).toPromise()
    const assessmentQuestions = this.afs.toQuizAssessmentQuestions(
      assessmentForm.get('questions') as FormArray
    )

    const assessment = this.afs.toQuizAssessment(assessmentForm)
    assessment.questions = this.assessQuestions(assessmentQuestions, questions)
    assessment.grade = this.calcGrade(assessment.questions)
    return assessment
  }

  // =========================================================================

  private calcGrade(assessmentQuestions: AssessmentQuestion[]): number {
    const correct = assessmentQuestions.filter((q) => q.isCorrect).length
    const total = assessmentQuestions.length
    const grade = (correct / total) * 100
    const floorGrade = Math.floor(grade)
    const remainder = grade - floorGrade
    return remainder >= 0.5 ? Math.ceil(grade) : floorGrade
  }
}
