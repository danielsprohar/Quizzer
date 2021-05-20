import { Question } from './question'
import firebase from 'firebase/app'

export enum QuizVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export type Visibility = 'private' | 'public'

export class Quiz {
  name: string
  subject: string
  numberOfQuestions: number
  visibility: Visibility
  editors: string[]
  ownerId: string
  id?: string
  questions?: Question[]
  description?: string
  grade?: number
  dateSubmitted?: firebase.firestore.Timestamp
  createdOn?: firebase.firestore.Timestamp
  modifiedOn?: firebase.firestore.Timestamp

  constructor(fields?: {
    name: string
    subject: string
    numberOfQuestions: number
    visibility: Visibility
    editors: string[]
    ownerId: string
    id?: string
    questions?: Question[]
    description?: string
    grade?: number
    dateSubmitted?: firebase.firestore.Timestamp
    createdOn?: firebase.firestore.Timestamp
    modifiedOn?: firebase.firestore.Timestamp
  }) {
    Object.assign(this, fields)
  }
}
