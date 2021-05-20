import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { ImageService } from 'src/app/services/image.service'
import { MaterialDesignModule } from 'src/app/theme/material-design/material-design.module'
import { QuestionControlService } from '../../services/question-control.service'
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
        QuestionControlService,
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
