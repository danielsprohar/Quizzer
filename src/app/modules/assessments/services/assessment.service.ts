import { Injectable } from '@angular/core'
import { FormArray, FormGroup } from '@angular/forms'
import { Question } from 'src/app/models/question'
import { QuestionOption } from 'src/app/models/question-option'
import { Quiz } from 'src/app/models/quiz'
import { QuizFormService } from '../../quizzes/services/quiz-form.service'
import { QuizService } from '../../quizzes/services/quiz.service'
import {
  Assessment,
  UserSubmittedQuestion,
  UserSubmittedQuiz,
} from '../models/assessment'

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  constructor(
    private readonly quizService: QuizService,
    private readonly qfs: QuizFormService
  ) {}

  /**
   * Assesses a question of type: multiple choice, checkboxes, or drowdown.
   * @param actual The user submitted question
   * @param expected The question that was fetched from the database
   * after the user submitted the quiz
   */
  private assessMultipleChoice(actual: Question, expected: Question): void {
    const expectedChoices = expected.options.filter((option) => option.isAnswer)
    const actualChoices = actual.options.filter((option) => option.isChecked)

    actual.isCorrect =
      actualChoices.length === expectedChoices.length
        ? actualChoices
            .map((q) => q.isChecked && q.isAnswer)
            .reduce((prev, cur) => prev && cur)
        : false
  }

  /**
   * Assesses a question of type: short answer, paragraph
   * @param actual The user submitted question.
   * @param expected The quesiton that was fetched from the database
   * after the user submitted the quiz.
   */
  private assessWrittenResponse(actual: Question, expected: Question): void {
    // TODO: Add a Document Distance algorithm
    actual.isCorrect =
      actual.userSubmissionText?.toUpperCase().trim() ===
      expected.explanation?.toUpperCase().trim()
  }

  /**
   * Assess the user submitted questions with the questions stored in
   * the database.
   * @param actual The user submitted questions.
   * @param expected The questions that were fetched from the database
   * after the user submitted the quiz.
   */
  private assessQuestions(actual: Question[], expected: Question[]): void {
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

  // =========================================================================

  async assess(quiz: Quiz): Promise<Assessment> {
    if (!quiz.id) throw new Error('Quiz id is null')
    if (!quiz.questions) throw new Error('Questions are not defined')

    const expectedQuestions = await this.quizService
      .getQuestions(quiz.id)
      .toPromise()

    this.assessQuestions(quiz.questions!, expectedQuestions)
    quiz.grade = this.calcGrade(quiz.questions)
    return this.buildAssessment(quiz)
  }

  // =========================================================================

  private buildAssessment(quiz: Quiz): Assessment {
    if (!quiz.questions) throw new Error('Questions are undefined')
    return new Assessment(
      this.buildUserSubmittedQuiz(quiz),
      this.buildUserSubmittedQuestions(quiz.questions)
    )
  }

  // =========================================================================

  private buildUserSubmittedQuiz(quiz: Quiz): UserSubmittedQuiz {
    if (!quiz.id) throw new Error('Quiz ID is undefined')
    if (!quiz.grade) throw new Error('Quiz grade is undefined')
    return {
      id: quiz.id,
      name: quiz.name,
      subject: quiz.subject,
      grade: quiz.grade,
    }
  }

  // =========================================================================

  private buildUserSelectedOptions(question: Question): string[] | undefined {
    if (!question.options) return undefined
    if (question.options.length === 0) return undefined
    return question.options
      .filter((option) => option.isChecked)
      .map((option) => option.text)
  }

  // =========================================================================

  private buildUserSubmittedQuestions(
    questions: Question[]
  ): UserSubmittedQuestion[] {
    return questions.map(
      (question) =>
        ({
          id: question.id,
          text: question.text,
          type: question.type,
          explanation: question.explanation,
          isCorrect: question.isCorrect,
          userInputText: question.userSubmissionText,
          userSelectedOptions: this.buildUserSelectedOptions(question),
        } as UserSubmittedQuestion)
    )
  }

  // =========================================================================

  private calcGrade(questions: Question[]): number {
    if (!questions) throw new Error('Questions are not defined')
    const total = questions.length
    const correct = questions.filter((q) => q.isCorrect).length
    const grade = (correct / total) * 100
    const floorGrade = Math.floor(grade)
    const remainder = grade - floorGrade
    return remainder >= 0.5 ? Math.ceil(grade) : floorGrade
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
