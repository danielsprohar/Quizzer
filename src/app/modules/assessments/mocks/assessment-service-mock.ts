import {
  QuizAssessment,
} from '../models/quiz-assessment'

export const quizAssessmentServiceSpy = jasmine.createSpyObj('AssessmentService', {
  assessMultipleChoice: () => {},
  assessWrittenResponse: () => {},
  assessQuestions: jasmine.createSpy('assessQuestions'),
  assess: Promise.resolve({} as QuizAssessment),
  buildAssessment: {} as QuizAssessment,
  buildUserSubmittedQuiz: {} as UserSubmittedQuiz,
  buildUserSelectedOptions: jasmine.createSpy('buildUserSelectedOptions'),
  buildUserSubmittedQuestions: [] as UserSubmittedQuestion[],
  calcGrade: jasmine.createSpy('calcGrade'),
  toOptionsFormArray: [],
})
