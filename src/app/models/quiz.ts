import { Question } from './question'
import firebase from 'firebase/app'

export enum QuizVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export type Visibility = 'private' | 'public'

export class Quiz {
  id: string
  name: string
  description: string
  subject: string
  numberOfQuestions: number
  grade: number
  visibility: Visibility = 'private'
  dateSubmitted: firebase.firestore.Timestamp
  questions: Question[]
  editors: string[]
  ownerId: string
  createdOn: firebase.firestore.Timestamp
  modifiedOn: firebase.firestore.Timestamp

  constructor(fields?: {
    id?: string
    name?: string
    description: string
    subject?: string
    numberOfQuestions?: number
    grade?: number
    visibility?: Visibility
    dateSubmitted?: firebase.firestore.Timestamp
    questions?: Question[]
    editors?: string[]
    ownerId?: string
    createdOn?: firebase.firestore.Timestamp
    modifiedOn?: firebase.firestore.Timestamp
  }) {
    Object.assign(this, fields)
  }
}
