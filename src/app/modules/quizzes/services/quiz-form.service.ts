import { Injectable } from '@angular/core'
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms'
import { Question } from 'src/app/models/question'
import { QuestionOption } from 'src/app/models/question-option'
import { Quiz } from 'src/app/models/quiz'
import { multipleChoiceValidator } from '../../assessments/validators/multiple-choice-validator'

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
  instance(): FormGroup {
    const form = this.fb.group({
      id: this.fb.control(undefined),
      text: this.fb.control('', [
        Validators.required,
        Validators.maxLength(4096),
      ]),
      type: this.fb.control('multiple choice', [Validators.required]),
      hint: this.fb.control('', [Validators.maxLength(4096)]),
      explanation: this.fb.control('', [Validators.maxLength(4096)]),
      imageURL: this.fb.control('', [Validators.maxLength(4096)]),
      imageCaption: this.fb.control('', [Validators.maxLength(1024)]),
      options: this.fb.array([this.toOptionFormGroup(new QuestionOption())]),
    })

    return form
  }

  toQuestion(questionForm: AbstractControl): Question {
    const f = questionForm
    const question = new Question({
      id: f.get('id')?.value,
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

  toQuestions(questionsFormArray: FormArray): Question[] {
    const questions: Question[] = []
    questionsFormArray.controls.forEach((control) =>
      questions.push(this.toQuestion(control))
    )
    return questions
  }

  toQuestionOptions(optionsFormArray: FormArray): QuestionOption[] {
    const options: QuestionOption[] = []
    optionsFormArray.controls.forEach((control) =>
      options.push(
        new QuestionOption({
          text: control.get('text')?.value,
          isAnswer: control.get('isAnswer')?.value,
        })
      )
    )

    return options
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
      isSelected: this.fb.control(option ? option.isSelected : false),
      text: this.fb.control(option ? option.text : '', [
        Validators.required,
        Validators.maxLength(2048),
      ]),
    })
  }

  /**
   * Converts a question model to a `FormGroup`.
   * @param question The question model.
   * @returns A new instance of a `FormGroup`.
   */
  toQuestionFormGroup(question: Question): FormGroup {
    const form = this.fb.group({
      id: this.fb.control(question.id),
      text: this.fb.control(question.text, [Validators.maxLength(4096)]),
      type: this.fb.control(question.type),
      hint: this.fb.control(question.hint, [Validators.maxLength(4096)]),
      explanation: this.fb.control(question.explanation, [
        Validators.maxLength(4096),
      ]),
      imageURL: this.fb.control(question.imageURL),
      imageCaption: this.fb.control(question.imageCaption),
    })

    if (question.options) {
      const options = question.options.map((option) =>
        this.toOptionFormGroup(option)
      )
      form.addControl('options', this.fb.array(options))
      form.setValidators(multipleChoiceValidator)
    }

    return form
  }

  toQuestionFormArray(questions: Question[]): FormArray {
    const forms: FormGroup[] = []
    if (questions) {
      const questionsFormGroups: FormGroup[] = []
      questions.forEach((question) =>
        questionsFormGroups.push(this.toQuestionFormGroup(question))
      )
    }
    return this.fb.array([forms])
  }

  /**
   * Converts a `Quiz` model to a `FormGroup`.
   * @param quiz The quiz model.
   * @returns A new instance of a `FormGroup`.
   */
  toQuizFormGroup(quiz?: Quiz): FormGroup {
    const form = this.fb.group({
      id: this.fb.control(quiz ? quiz.id : ''),
      name: this.fb.control(quiz ? quiz.name : '', [
        Validators.required,
        Validators.maxLength(2048),
      ]),
      description: this.fb.control(quiz ? quiz.description : '', [
        Validators.maxLength(4096),
      ]),
      subject: this.fb.control(quiz ? quiz.subject : '', [Validators.required]),
      visibility: this.fb.control(quiz ? quiz.visibility : 'private', [
        Validators.required,
      ]),
      questions: this.fb.array([]),
    })

    if (quiz && quiz.questions) {
      const questionFormArray = this.toQuestionFormArray(quiz.questions)
      if (questionFormArray.length > 0) {
        form.setControl('questions', questionFormArray)
      }
    }

    return form
  }
}
