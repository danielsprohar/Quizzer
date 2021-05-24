import firebase from 'firebase/app'

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

  constructor(quiz: UserSubmittedQuiz, questions: UserSubmittedQuestion[]) {
    this.quiz = quiz
    this.questions = questions
    this.createdOn = firebase.firestore.Timestamp.fromDate(new Date())
  }
}
