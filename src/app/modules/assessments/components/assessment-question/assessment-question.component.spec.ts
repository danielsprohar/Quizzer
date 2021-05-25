import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { assessmentServiceSpy } from '../../mocks/assessment-service-mock'
import { AssessmentService } from '../../services/assessment.service'
import { AssessmentQuestionComponent } from './assessment-question.component'

describe('AssessmentQuestionComponent', () => {
  let component: AssessmentQuestionComponent
  let fixture: ComponentFixture<AssessmentQuestionComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessmentQuestionComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: AssessmentService,
          useValue: assessmentServiceSpy,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentQuestionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
