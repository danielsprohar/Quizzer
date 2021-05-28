import { Injectable } from '@angular/core'
import { FormArray, FormGroup } from '@angular/forms'
import { Question } from 'src/app/models/question'
import { QuestionOption } from 'src/app/models/question-option'
import { QuizService } from '../../quizzes/services/quiz.service'
import { QuizAssessment } from '../models/quiz-assessment'
import { QuizAssessmentOption } from '../models/quiz-assessment-option'
import { QuizAssessmentQuestion } from '../models/quiz-assessment-question'
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
    assessmentOptions: QuizAssessmentOption[],
    options: QuestionOption[]
  ): boolean {
    return options
      .map(
        (option, index) =>
          option.isAnswer && assessmentOptions[index].isSelected
      )
      .reduce((prev, cur) => prev && cur)
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
    const actual = userInput.replace(' ', '').toLowerCase()
    const expected = expectedInput.replace(' ', '').toLowerCase()
    // TODO: Replace with a Document Distance algorithm
    console.log('actual', actual)
    console.log('expected', expected)
    return actual === expected
  }

  /**
   *
   * @param assessmentQuestions
   * @param questions
   * @returns The number of questions the user answered correctly.
   */
  private assessQuestions(
    assessmentQuestions: QuizAssessmentQuestion[],
    questions: Question[]
  ): number {
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

    return assessmentQuestions.filter((question) => question.isCorrect).length
  }

  // =========================================================================

  async assessQuiz(assessmentForm: FormGroup): Promise<QuizAssessment> {
    const quizId = assessmentForm.get('quizId')?.value
    const questions = await this.quizService.getQuestions(quizId).toPromise()

    const userSubmittedQuestions = this.afs.toQuizAssessmentQuestions(
      assessmentForm.get('questions') as FormArray
    )

    const assessment = this.afs.toQuizAssessment(assessmentForm)
    assessment.correctQuestions = this.assessQuestions(
      userSubmittedQuestions,
      questions
    )

    assessment.grade = this.calcGrade(
      assessment.correctQuestions,
      questions.length
    )
    return assessment
  }

  // =========================================================================

  private calcGrade(correct: number, total: number): number {
    const grade = (correct / total) * 100
    const floorGrade = Math.floor(grade)
    const remainder = grade - floorGrade
    return remainder >= 0.5 ? Math.ceil(grade) : floorGrade
  }
}
