import { Component, Input, OnInit } from '@angular/core'
import { Question } from 'src/app/models/question'
import { UserSubmittedQuestion } from '../../models/assessment'

@Component({
  selector: 'app-question-assessment-results',
  templateUrl: './question-assessment-results.component.html',
  styleUrls: ['./question-assessment-results.component.scss'],
})
export class QuestionAssessmentResultsComponent implements OnInit {
  @Input() question: Question
  @Input() userSubmittedQuestion: UserSubmittedQuestion
  isMultipleChoice = true

  constructor() {}

  ngOnInit(): void {
    if (this.question) {
      this.isMultipleChoice =
        this.question.options && this.question.options.length > 0
    }
  }

  isOptionCorrect(index: number) {
    const option = this.question.options[index]
    return option.isAnswer && option.isChecked
  }

  isUserSelection(index: number) {
    if (!this.userSubmittedQuestion.userSelectedOptions) return false
    const expected = this.question.options[index].text.toUpperCase()
    const actual =
      this.userSubmittedQuestion.userSelectedOptions[index].toUpperCase()
    return actual === expected
  }
}
