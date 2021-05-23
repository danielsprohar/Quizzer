import { Injectable } from '@angular/core'
import { FormArray, FormGroup } from '@angular/forms'
import { Question } from 'src/app/models/question'
import { QuestionOption } from 'src/app/models/question-option'
import { Quiz } from 'src/app/models/quiz'
import { QuizFormService } from '../../quizzes/services/quiz-form.service'
import { QuizService } from '../../quizzes/services/quiz.service'

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  constructor(
    private readonly quizService: QuizService,
    private readonly qfs: QuizFormService
  ) {}

  /**
   * A helper function to compare strings
   * when sorting an array of strings.
   * @param a
   * @param b
   * @returns -1 if a < b; 1 if a > b; otherwise 0 (equal)
   */
  private stringComparator(a: string, b: string): number {
    const strA = a.toUpperCase()
    const strB = b.toUpperCase()
    if (strA < strB) {
      return -1
    }
    if (strA > strB) {
      return 1
    }
    // Must be equal
    return 0
  }

  /**
   * Assesses a question of type: multiple choice, checkboxes, or drowdown.
   * @param actual The user submitted question
   * @param expected The question that was fetched from the database
   * after the user submitted the quiz
   */
  private assessMultipleChoice(actual: Question, expected: Question) {
    const correctAnswerChoices = expected.options.filter(
      (option) => option.isAnswer
    )

    const selectedAnswerChoices = actual.options.filter(
      (option) => option.isChecked
    )

    if (selectedAnswerChoices.length !== correctAnswerChoices.length) {
      actual.isCorrect = false
    }

    correctAnswerChoices.sort((a, b) => this.stringComparator(a.text, b.text))
    selectedAnswerChoices.sort((a, b) => this.stringComparator(a.text, b.text))

    let isCorrect = true
    for (let selectedOption of selectedAnswerChoices) {
      if (!selectedOption.isChecked) {
        isCorrect = false
        break
      }
    }

    actual.isCorrect = isCorrect
  }

  /**
   * Assesses a question of type: short answer, paragraph
   * @param actual The user submitted question.
   * @param expected The quesiton that was fetched from the database
   * after the user submitted the quiz.
   */
  private assessWrittenResponse(actual: Question, expected: Question) {
    actual.isCorrect =
      actual.userSubmissionText === expected.explanation ? true : false
  }

  /**
   * Assess the user submitted questions with the questions stored in
   * the database.
   * @param actual The user submitted questions.
   * @param expected The questions that were fetched from the database
   * after the user submitted the quiz.
   */
  private assessQuestions(actual: Question[], expected: Question[]) {
    if (actual.length !== expected.length) {
      throw new Error('Actual and expected are not the same length')
    }

    actual.forEach((question, i) => {
      if (question.type === 'paragraph' || question.type === 'short answer') {
        this.assessWrittenResponse(question, expected[i])
      } else {
        this.assessMultipleChoice(question, expected[i])
      }
    })
  }

  async assess(quiz: Quiz) {
    if (!quiz.id) throw new Error('Quiz id is null')
    if (!quiz.questions) throw new Error('Questions are not defined')

    const expectedQuestions = await this.quizService
      .getQuestions(quiz.id)
      .toPromise()

    this.assessQuestions(quiz.questions!, expectedQuestions)
    this.calcGrade(quiz)
    return quiz
  }

  private calcGrade(quiz: Quiz) {
    if (!quiz.questions) throw new Error('Questions are not defined')
    const total = quiz.questions.length
    let correct = 0
    for (let question of quiz.questions) {
      if (question.isCorrect) {
        correct++
      }
    }
    const grade = (correct / total) * 100
    const floorGrade = Math.floor(grade)
    const remainder = grade - floorGrade
    quiz.grade = remainder >= 0.5 ? Math.ceil(grade) : floorGrade
  }

  updateQuestion(questionId: string, options: QuestionOption[]) {
    // TODO: Update a question while taking an assessment
  }

  /**
   * Converts the given options into a `FormArray`.
   * @param options
   * @returns
   */
  toOptionsFormArray(options: QuestionOption[]): FormArray {
    const forms: FormGroup[] = []
    for (let option of options) {
      forms.push(this.qfs.toOptionFormGroup(option))
    }

    return new FormArray(forms)
  }
}
