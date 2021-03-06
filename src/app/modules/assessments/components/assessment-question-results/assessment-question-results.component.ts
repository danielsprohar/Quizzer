import { Component, Input, OnInit } from '@angular/core'
import { Question } from 'src/app/models/question'
import { AssessmentQuestion } from '../../models/assessment-question'

@Component({
  selector: 'app-assessment-question-results',
  templateUrl: './assessment-question-results.component.html',
  styleUrls: ['./assessment-question-results.component.scss'],
})
export class AssessmentQuestionResultsComponent implements OnInit {
  @Input() question: Question
  @Input() assessmentQuestion: AssessmentQuestion
  isMultipleChoice = true

  constructor() {}

  ngOnInit(): void {
    this.isMultipleChoice =
      this.question.type === 'multiple choice' ||
      this.question.type === 'dropdown'
  }

  isOptionCorrect(index: number): boolean {
    if (!Array.isArray(this.question.options)) {
      throw new Error('Question options are not defined')
    }
    return this.question.options[index].isAnswer
  }

  isUserSelectedOption(index: number): boolean {
    const assessmentOptions = this.assessmentQuestion.options
    const options = this.question.options
    if (!Array.isArray(assessmentOptions)) {
      throw new Error('Assessment options are not defined')
    }
    if (!Array.isArray(options)) {
      throw new Error('Question options are not defined')
    }
    const expectedOptionText = options[index].text.toUpperCase()
    const i = assessmentOptions.findIndex(
      (ao) => ao.isSelected && ao.text.toUpperCase() === expectedOptionText
    )
    return i !== -1
  }
}
