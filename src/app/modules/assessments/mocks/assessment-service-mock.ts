import {
  Assessment,
  UserSubmittedQuestion,
  UserSubmittedQuiz,
} from '../models/assessment'

export const assessmentServiceSpy = jasmine.createSpyObj('AssessmentService', {
  assessMultipleChoice: () => {},
  assessWrittenResponse: () => {},
  assessQuestions: jasmine.createSpy('assessQuestions'),
  assess: Promise.resolve({} as Assessment),
  buildAssessment: {} as Assessment,
  buildUserSubmittedQuiz: {} as UserSubmittedQuiz,
  buildUserSelectedOptions: jasmine.createSpy('buildUserSelectedOptions'),
  buildUserSubmittedQuestions: [] as UserSubmittedQuestion[],
  calcGrade: jasmine.createSpy('calcGrade'),
  toOptionsFormArray: [],
})
