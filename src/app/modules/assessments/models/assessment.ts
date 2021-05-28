import firebase from 'firebase/app'
import { AssessmentQuestion } from './assessment-question'

export class Assessment {
  id?: string
  quizId: string
  name: string
  subject: string
  correctQuestions: number
  grade: number
  createdOn: firebase.firestore.Timestamp
  questions: AssessmentQuestion[]

  constructor(fields: {
    quizId: string
    name: string
    subject: string
    questions: AssessmentQuestion[]
    correctQuestions?: number
    grade?: number
  }) {
    this.quizId = fields.quizId
    this.name = fields.name
    this.subject = fields.subject
    this.questions = fields.questions
    this.createdOn = firebase.firestore.Timestamp.fromDate(new Date())
  }
}
