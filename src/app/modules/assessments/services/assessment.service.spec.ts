import { TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { quizServiceSpy } from '../../quizzes/mocks/quiz-service-mock'
import { QuizFormService } from '../../quizzes/services/quiz-form.service'
import { QuizService } from '../../quizzes/services/quiz.service'
import { AssessmentService } from './assessment.service'

describe('AssessmentService', () => {
  let service: AssessmentService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        QuizFormService,
        {
          provide: QuizService,
          useValue: quizServiceSpy,
        },
      ],
    })
    service = TestBed.inject(AssessmentService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
