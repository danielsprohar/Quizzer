import { QuestionType } from 'src/app/models/question'
import { QuizAssessmentOption } from './quiz-assessment-option'

export class QuizAssessmentQuestion {
  questionId: string
  type: QuestionType
  isCorrect?: boolean
  /**
   * The user's input for a "short answer" or "paragraph" type question.
   */
  userInputText?: string
  /**
   * The user's selected option for a "dropdown" question.
   */
  selectedOption?: string
  /**
   * The user's selected options for a "multiple choice" question.
   */
  options?: QuizAssessmentOption[]

  constructor(fields: {
    questionId: string
    type: QuestionType
    idCorrect?: boolean
    selectedOption?: string
    userInputText?: string
    options?: QuizAssessmentOption[]
  }) {
    Object.assign(this, fields)
  }

  isMultipleChoice(): boolean {
    return this.type === 'dropdown' || this.type === 'multiple choice'
  }
}
