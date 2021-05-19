import { QuestionOption } from './question-option'
import firebase from 'firebase/app'

export const questionTypes = [
  'short answer',
  'paragraph',
  'multiple choice',
  'checkboxes',
  'dropdown',
]

export type QuestionType =
  | 'short answer'
  | 'paragraph'
  | 'multiple choice'
  | 'checkboxes'
  | 'dropdown'

export class Question {
  id: string
  text: string
  type: QuestionType
  hint: string
  explanation: string
  isAttempted: boolean
  isCorrect: any
  /**
   * The `downloadUrl` returned by Firebase Storage.
   *
   * @usageNotes
   * Use with a `img` element or css `background-image` rule
   */
  imageURL: string
  /**
   * The path where this image is located within Firebase Storage
   */
  imagePath: string
  dateSubmitted: Date
  options: QuestionOption[]
  createdOn: firebase.firestore.Timestamp
  modifiedOn: firebase.firestore.Timestamp

  constructor(fields?: {
    id?: number
    text?: string
    type?: QuestionType
    hint?: string
    explanation?: string
    isAttempted?: boolean
    isCorrect?: any
    imageURL?: string
    imagePath?: string
    dateSubmitted?: Date
    options?: QuestionOption[]
    createdOn?: firebase.firestore.Timestamp
    modifiedOn?: firebase.firestore.Timestamp
  }) {
    if (fields) {
      Object.assign(this, fields)
    }
  }
}
