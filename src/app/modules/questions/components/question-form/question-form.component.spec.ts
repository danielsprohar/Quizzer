import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { QuizFormService } from 'src/app/modules/quizzes/services/quiz-form.service'
import { ImageService } from 'src/app/services/image.service'
import { MaterialDesignModule } from 'src/app/theme/material-design/material-design.module'
import { QuestionFormComponent } from './question-form.component'

describe('QuestionFormComponent', () => {
  let component: QuestionFormComponent
  let fixture: ComponentFixture<QuestionFormComponent>
  let mockImageService = jasmine.createSpyObj('ImageService', [
    'addImage',
    'deleteImage',
  ])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionFormComponent],
      imports: [
        ReactiveFormsModule,
        MaterialDesignModule,
        NoopAnimationsModule,
      ],
      providers: [
        QuizFormService,
        {
          provide: ImageService,
          useValue: mockImageService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
