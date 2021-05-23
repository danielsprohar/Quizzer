export class QuestionOption {
  text: string
  isAnswer: boolean
  isChecked = false

  constructor(fields?: {
    text?: string
    isAnswer?: boolean
    isChecked?: boolean
  }) {
    if (fields) {
      Object.assign(this, fields)
    }
  }
}
