import { QuestionOption } from './question-option'
import firebase from 'firebase/app'

export const questionTypes = [
  'short answer',
  'paragraph',
  'multiple choice',
  'dropdown',
]

export const multipleOptionsType = [
  'multiple choice',
  'dropdown',
]

export type QuestionType =
  | 'short answer'
  | 'paragraph'
  | 'multiple choice'
  | 'dropdown'

export class Question {
  id: string
  text: string
  type: QuestionType
  hint: string
  explanation: string
  isAttempted: boolean
  isCorrect: any
  imageURL: string
  imageCaption: string
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
    imageCaption?: string
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
