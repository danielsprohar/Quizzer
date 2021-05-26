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
    if (
      this.question &&
      this.userSubmittedQuestion &&
      Array.isArray(this.question.options)
    ) {
      this.isMultipleChoice =
        this.question.options && this.question.options.length > 0
    }
  }

  isOptionCorrect(index: number): boolean {
    if (!Array.isArray(this.question.options)) {
      throw new Error('Question options are not defined')
    }
    return this.question.options[index].isAnswer
  }

  isUserSelectedOption(index: number): boolean {
    const userSelectedOptions = this.userSubmittedQuestion.userSelectedOptions
    if (!Array.isArray(userSelectedOptions)) {
      throw new Error('User selected options are not defined')
    }
    if (!Array.isArray(this.question.options)) {
      throw new Error('Question options are not defined')
    }
    const expected = this.question.options[index].text.toUpperCase()
    const i = userSelectedOptions.findIndex(
      (opt) => opt.toUpperCase() === expected
    )
    return i !== -1
  }
}
