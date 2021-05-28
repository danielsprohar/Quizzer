import { QuestionType } from 'src/app/models/question'
import { AssessmentOption as AssessmentOption } from './assessment-option'

export class AssessmentQuestion {
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
  options?: AssessmentOption[]

  constructor(fields: {
    questionId: string
    type: QuestionType
    idCorrect?: boolean
    selectedOption?: string
    userInputText?: string
    options?: AssessmentOption[]
  }) {
    Object.assign(this, fields)
  }

  isMultipleChoice(): boolean {
    return this.type === 'dropdown' || this.type === 'multiple choice'
  }
}
