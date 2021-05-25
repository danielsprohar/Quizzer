import firebase from 'firebase/app'
import { Question } from 'src/app/models/question'

export interface UserSubmittedQuestion {
  id: string
  text: string
  type: string
  /**
   * The explanation/answer for a "short answer" or "paragraph" type question.
   */
  explanation?: string
  /**
   * Indicates if the user got this question correct.
   */
  isCorrect: boolean
  /**
   * The user's input for a "short answer" or "paragraph" type question.
   */
  userInputText?: string
  /**
   * The user's selected options for a "multiple choice" question.
   */
  userSelectedOptions?: string[]
}

export interface UserSubmittedQuiz {
  id: string
  name: string
  subject: string
  grade: number
}

export class Assessment {
  quiz: UserSubmittedQuiz
  questions: UserSubmittedQuestion[]
  createdOn: firebase.firestore.Timestamp
  correctQuestions: number
  totalQuestions: number

  constructor(quiz: UserSubmittedQuiz, questions: UserSubmittedQuestion[]) {
    this.quiz = quiz
    this.questions = questions
    this.createdOn = firebase.firestore.Timestamp.fromDate(new Date())
    this.totalQuestions = questions.length
    this.correctQuestions = this.calcQuestionsCorrect(questions)
  }

  private calcQuestionsCorrect(userSubmittedQuestions: UserSubmittedQuestion[]) {
    return userSubmittedQuestions.filter((quesiton) => quesiton.isCorrect).length
  }
}
