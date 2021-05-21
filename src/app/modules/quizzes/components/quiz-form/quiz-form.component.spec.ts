import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AngularFirestore } from '@angular/fire/firestore'
import { ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { angularFirestoreSpy } from 'src/app/mocks/angular-firestore-mock'
import { authServiceSpy } from 'src/app/modules/auth/mocks/auth-service-mock'
import { AuthService } from 'src/app/modules/auth/services/auth.service'
import { MaterialDesignModule } from 'src/app/theme/material-design/material-design.module'
import { QuizFormService } from '../../services/quiz-form.service'
import { QuizFormComponent } from './quiz-form.component'

describe('QuizFormComponent', () => {
  let component: QuizFormComponent
  let fixture: ComponentFixture<QuizFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizFormComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        MaterialDesignModule,
        NoopAnimationsModule,
      ],
      providers: [
        QuizFormService,
        {
          provide: AngularFirestore,
          useValue: angularFirestoreSpy,
        },
        {
          provide: AuthService,
          useValue: authServiceSpy,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
