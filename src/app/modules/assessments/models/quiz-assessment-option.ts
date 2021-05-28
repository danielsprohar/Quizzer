export class QuizAssessmentOption {
  isSelected: boolean
  text: string

  constructor(fields: { isSelected: boolean; text: string }) {
    Object.assign(this, fields)
  }
}
