import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { RouterTestingModule } from '@angular/router/testing'
import { quizServiceSpy } from 'src/app/modules/quizzes/mocks/quiz-service-mock'
import { QuizService } from 'src/app/modules/quizzes/services/quiz.service'
import { SnackbarService } from 'src/app/services/snackbar.service'
import { AssessmentSummaryComponent } from './assessment-summary.component'

describe('AssessmentSummaryComponent', () => {
  let component: AssessmentSummaryComponent
  let fixture: ComponentFixture<AssessmentSummaryComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessmentSummaryComponent],
      imports: [RouterTestingModule, MatSnackBarModule],
      providers: [
        SnackbarService,
        {
          provide: QuizService,
          useValue: quizServiceSpy,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentSummaryComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
