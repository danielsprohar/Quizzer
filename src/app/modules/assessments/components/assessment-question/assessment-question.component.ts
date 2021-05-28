import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormControl, FormGroup } from '@angular/forms'
import { Question } from 'src/app/models/question'

@Component({
  selector: 'app-assessment-question',
  templateUrl: './assessment-question.component.html',
  styleUrls: ['./assessment-question.component.scss'],
})
export class AssessmentQuestionComponent implements OnInit {
  @Input() question: Question
  @Input() questionForm: FormGroup

  constructor() {}

  ngOnInit(): void {}

  // =========================================================================
  // Getters
  // =========================================================================

  get userInputText() {
    return this.questionForm.get('userInputText')!
  }

  get selectedOption() {
    return this.questionForm.get('selectedOption')!
  }

  get options() {
    return this.questionForm?.get('options')! as FormArray
  }

  getOptionIsSelectedControl(index: number) {
    return this.options.at(index).get('isSelected') as FormControl
  }

  // =========================================================================
  // Facilitators
  // =========================================================================

  private updateSelectedOption(index: number) {
    if (!Array.isArray(this.question.options)) {
      throw new Error('Question options are not defined')
    }
    if (index < 0 || index >= this.question.options.length) {
      throw new Error('Index out of bounds')
    }
    const selectedOption = this.question.options[index]
    selectedOption.isSelected = !selectedOption.isSelected
  }

  // =========================================================================
  // Event handlers
  // =========================================================================

  stopPropagation(event: Event): void {
    event.stopPropagation()
  }

  toggleMultipleChoiceSelection(index: number) {
    const ctrl = this.getOptionIsSelectedControl(index)
    ctrl.setValue(!(ctrl.value as boolean))
    this.updateSelectedOption(index)
  }

  updateDropdownSelection(text: string) {
    if (!Array.isArray(this.question.options)) {
      throw new Error('Question options are not defined')
    }

    this.options.controls.forEach((control) =>
      control.get('isSelected')?.setValue(false)
    )

    const i = this.question.options.findIndex((o) => o.text === text)
    const ctrl = this.getOptionIsSelectedControl(i)
    ctrl.setValue(!(ctrl.value as boolean))
  }
}
