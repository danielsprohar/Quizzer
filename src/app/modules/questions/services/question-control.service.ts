import { Injectable } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Question, QuestionType } from 'src/app/models/question'

@Injectable()
export class QuestionControlService {
  constructor(private readonly fb: FormBuilder) {}

  toFormGroup(question: Question) {
    // TODO: Create a FormGroup for a Question model.
  }

  /**
   * Creates a new `FormGroup` for a `Question` model.
   * @param options The options to apply to the `FormGroup`.
   * @returns A new instance of a `FormGroup`.
   */
  newQuestionFormGroup(options?: { type: QuestionType }) {
    const form = this.fb.group({
      text: this.fb.control('', [
        Validators.required,
        Validators.maxLength(4096),
      ]),
      type: this.fb.control(options ? options?.type : '', [
        Validators.required,
      ]),
      hint: this.fb.control('', [Validators.maxLength(4096)]),
      explanation: this.fb.control('', [Validators.maxLength(4096)]),
      imageURL: this.fb.control(''),
      imagePath: this.fb.control(''),
    })

    if (options?.type === 'multiple choice' || options?.type === 'checkboxes') {
      const options = this.fb.array([this.fb.control('')])
      form.addControl('options', options)
    }

    return form
  }
}
