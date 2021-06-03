export class Flashcard {
  term: string
    definition: string
    questionId?: string
    quizId?: string

  constructor(props?: {
    term: string
    definition: string
    questionId?: string
    quizId?: string
  }) {
    if (props) {
      Object.assign(this, props)
    }
  }
}
