import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { RouterTestingModule } from '@angular/router/testing'
import { userServiceSpy } from 'src/app/mocks/user-service-mock'
import { quizServiceSpy } from 'src/app/modules/quizzes/mocks/quiz-service-mock'
import { QuizService } from 'src/app/modules/quizzes/services/quiz.service'
import { SnackbarService } from 'src/app/services/snackbar.service'
import { UserService } from 'src/app/services/user.service'
import { quizAssessmentServiceSpy } from '../../mocks/assessment-service-mock'
import { AssessmentService } from '../../services/assessment.service'
import { AssessmentComponent } from './assessment.component'

describe('QuizAssessmentComponent', () => {
  let component: AssessmentComponent
  let fixture: ComponentFixture<AssessmentComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessmentComponent],
      imports: [RouterTestingModule, MatSnackBarModule],
      providers: [
        SnackbarService,
        {
          provide: AssessmentService,
          useValue: quizAssessmentServiceSpy,
        },
        {
          provide: UserService,
          useValue: userServiceSpy
        },
        {
          provide: QuizService,
          useValue: quizServiceSpy,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
