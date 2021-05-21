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
  newQuestionFormGroup(): FormGroup {
    const form = this.fb.group({
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

    // if (options?.type !== 'multiple choice' || options?.type !== 'dropdown') {
    //   const options = this.fb.array([
    //     this.toOptionFormGroup(new QuestionOption()),
    //   ])
    //   form.addControl('options', options)
    // }

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

    const optionsFormGroups: FormGroup[] = []
    if (question.options) {
      for (let option of question.options) {
        optionsFormGroups.push(this.toOptionFormGroup(option))
      }

      if (optionsFormGroups.length > 0) {
        form.addControl('options', this.fb.array(optionsFormGroups))
      }
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

  toQuestions(questionsFormArray: FormArray): Question[] {
    const questions: Question[] = []
    for (let ctrl of questionsFormArray.controls) {
      questions.push(this.toQuestion(ctrl))
    }

    return questions
  }

  toQuestionOptions(optionsFormArray: FormArray): QuestionOption[] {
    const options: QuestionOption[] = []
    for (let opt of optionsFormArray.controls) {
      options.push(
        new QuestionOption({
          text: opt.get('text')?.value,
          isAnswer: opt.get('isAnswer')?.value,
        })
      )
    }

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
    const form = this.fb.group({
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

    if (quiz && quiz.questions) {
      const questionsFormGroups: FormGroup[] = []
      for (let question of quiz.questions) {
        questionsFormGroups.push(this.toQuestionFormGroup(question))
      }
      if (questionsFormGroups.length > 0) {
        form.setControl('questions', this.fb.array(questionsFormGroups))
      }
    }

    return form
  }
}
