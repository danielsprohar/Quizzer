import { Component, Input, OnInit } from '@angular/core'
import { Question } from 'src/app/models/question'
import { UserSubmittedQuestion } from '../../models/assessment'

@Component({
  selector: 'app-assessment-question-results',
  templateUrl: './assessment-question-results.component.html',
  styleUrls: ['./assessment-question-results.component.scss'],
})
export class AssessmentQuestionResultsComponent implements OnInit {
  @Input() question: Question
  @Input() userSubmittedQuestion: UserSubmittedQuestion
  isMultipleChoice = true

  constructor() {}

  ngOnInit(): void {
    if (this.question && this.userSubmittedQuestion) {
      this.isMultipleChoice =
        this.question.options && this.question.options.length > 0
    }
  }

  isOptionCorrect(index: number) {
    const options = this.userSubmittedQuestion.userSelectedOptions
    if (!options) return false
    if (options.length === 0) return false
    if (index < 0 || index >= options.length) return false
    const expectedOptionText = this.question.options[index].text.toUpperCase()
    const actualOptionText = options[index].toUpperCase()
    return expectedOptionText === actualOptionText
  }

  isUserSelection(index: number) {
    const userSelectedOptions = this.userSubmittedQuestion.userSelectedOptions
    if (!userSelectedOptions) return false
    if (userSelectedOptions.length === 0) return false
    const expected = this.question.options[index].text.toUpperCase()
    const actual = userSelectedOptions[index]?.toUpperCase() || ''
    return actual === expected
  }
}
