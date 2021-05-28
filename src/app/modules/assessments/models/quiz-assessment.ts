import firebase from 'firebase/app'
import { QuizAssessmentQuestion } from './quiz-assessment-question'

export class QuizAssessment {
  id?: string
  quizId: string
  name: string
  subject: string
  correctQuestions: number
  grade: number
  createdOn: firebase.firestore.Timestamp
  questions: QuizAssessmentQuestion[]

  constructor(fields: {
    quizId: string
    name: string
    subject: string
    questions: QuizAssessmentQuestion[]
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
