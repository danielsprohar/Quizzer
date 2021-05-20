import { Injectable } from '@angular/core'
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms'
import { Question, QuestionType } from 'src/app/models/question'
import { QuestionOption } from 'src/app/models/question-option'

@Injectable()
export class QuestionControlService {
  constructor(private readonly fb: FormBuilder) {}

  newOptionsFormGroup() {
    return this.fb.group({
      isAnswer: this.fb.control(false, []),
      text: this.fb.control('', [
        Validators.required,
        Validators.maxLength(2048),
      ]),
    })
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
    })

    if (options?.type === 'multiple choice' || options?.type === 'dropdown') {
      const options = this.fb.array([this.newOptionsFormGroup()])
      form.addControl('options', options)
    }

    return form
  }

  toQuestion(questionForm: AbstractControl) {
    const f = questionForm
    const question = new Question({
      text: f.get('text')?.value,
      type: f.get('type')?.value,
      hint: f.get('hint')?.value,
      explanation: f.get('explanation')?.value,
      imageURL: f.get('imageURL')?.value,
      imageCaption: f.get('imageCaption')?.value,
    })
    const options = f.get('options') as FormArray
    if (options) {
      question.options = this.toQuestionOptions(options)
    }

    return question
  }

  toQuestions(questions: FormArray) {
    const arr = []
    for (let ctrl of questions.controls) {
      arr.push(this.toQuestion(ctrl))
    }

    return arr
  }

  toQuestionOptions(options: FormArray) {
    const opts = []
    for (let opt of options.controls) {
      opts.push(
        new QuestionOption({
          text: opt.value,
          // TODO: Get this value
          isAnswer: opt.get('isAnswer')?.value,
        })
      )
    }

    return opts
  }
}
