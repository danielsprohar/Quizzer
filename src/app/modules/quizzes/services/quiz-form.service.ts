import { Injectable } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { QuestionType, Question } from 'src/app/models/question'
import { QuestionOption } from 'src/app/models/question-option'
import { Quiz } from 'src/app/models/quiz'

@Injectable({
  providedIn: 'root',
})
export class QuizFormService {
  constructor(private readonly fb: FormBuilder) {}
  /**
   * Creates a new `FormGroup` for a `Question` model.
   * @param options The options to apply to the `FormGroup`.
   * @returns A new instance of a `FormGroup`.
   */
  newQuestionFormGroup(options?: { type: QuestionType }): FormGroup {
    const form = this.fb.group({
      text: this.fb.control('', [
        Validators.required,
        Validators.maxLength(4096),
      ]),
      type: this.fb.control(options ? options?.type : 'multiple choice', [
        Validators.required,
      ]),
      hint: this.fb.control('', [Validators.maxLength(4096)]),
      explanation: this.fb.control('', [Validators.maxLength(4096)]),
      imageURL: this.fb.control(''),
      imageCaption: this.fb.control('', [Validators.maxLength(1024)]),
    })

    if (options?.type === 'multiple choice' || options?.type === 'dropdown') {
      const options = this.fb.array([
        this.toOptionFormGroup(new QuestionOption()),
      ])
      form.addControl('options', options)
    }

    return form
  }

  /**
   * Converts a question model to a `FormGroup`.
   * @param question The question model.
   * @returns A new instance of a `FormGroup`.
   */
  toQuestionFormGroup(question: Question): FormGroup {
    const form = this.fb.group({
      text: question.text,
      type: question.type,
      hint: question.hint,
      explanation: question.explanation,
      imageURL: question.imageURL,
      imageCaption: question.imageCaption,
    })

    const options: FormGroup[] = []
    question.options.forEach((opt) => {
      options.push(this.toOptionFormGroup(opt))
    })

    if (options.length > 0) {
      form.addControl('options', this.fb.array(options))
    }

    return form
  }

  toQuestion(questionForm: AbstractControl): Question {
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

  toQuestions(questions: FormArray): Question[] {
    const arr: Question[] = []
    for (let ctrl of questions.controls) {
      arr.push(this.toQuestion(ctrl))
    }

    return arr
  }

  toQuestionOptions(options: FormArray): QuestionOption[] {
    const opts: QuestionOption[] = []
    for (let opt of options.controls) {
      opts.push(
        new QuestionOption({
          text: opt.get('text')?.value,
          isAnswer: opt.get('isAnswer')?.value,
        })
      )
    }

    return opts
  }

  /**
   * Converts the given `QuestionOption` model to a `FormGroup`
   * whose values are set with the values of the model's attributes.
   * @param option An option in a multiple choice question.
   * @returns A new instance of a `FormGroup`.
   */
  toOptionFormGroup(option?: QuestionOption): FormGroup {
    return this.fb.group({
      isAnswer: this.fb.control(option ? option.isAnswer : false, [
        Validators.required,
      ]),
      text: this.fb.control(option ? option.text : '', [
        Validators.required,
        Validators.maxLength(2048),
      ]),
    })
  }

  /**
   * Converts a `Quiz` model to a `FormGroup`.
   * @param quiz The quiz model.
   * @returns A new instance of a `FormGroup`.
   */
  toQuizFormGroup(quiz?: Quiz): FormGroup {
    return this.fb.group({
      name: this.fb.control(quiz ? quiz.name : '', [
        Validators.required,
        Validators.maxLength(2048),
      ]),
      description: this.fb.control(quiz ? quiz.description : '', [
        Validators.maxLength(4096),
      ]),
      subject: this.fb.control(quiz ? quiz.subject : '', [Validators.required]),
      visibility: this.fb.control(quiz ? quiz.description : 'public', [
        Validators.required,
      ]),
      questions: this.fb.array([]),
    })
  }
}
