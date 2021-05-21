import { of } from 'rxjs'

export const quizServiceSpy = jasmine.createSpyObj('QuizService', {
  add: Promise.resolve(),
  delete: {},
  get: of({}),
  getAll: of([]),
  getQuestions: of([]),
  updated: Promise.resolve(),
})
