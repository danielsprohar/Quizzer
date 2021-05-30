export enum OptionAttributeContraints {
  TEXT_MAX_LENGTH = 1024
}

export class QuestionOption {
  text: string
  isAnswer: boolean
  isSelected = false

  constructor(fields?: {
    text?: string
    isAnswer?: boolean
    isSelected?: boolean
  }) {
    if (fields) {
      Object.assign(this, fields)
    }
  }
}
