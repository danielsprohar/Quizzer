import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AngularFireAuth } from '@angular/fire/auth'
import { RouterTestingModule } from '@angular/router/testing'
import { angularFireAuthSpy } from 'src/app/mocks/angular-fire-auth-mock'
import { MaterialDesignModule } from 'src/app/theme/material-design/material-design.module'
import { quizServiceSpy } from './mocks/quiz-service-mock'
import { QuizzesComponent } from './quizzes.component'
import { QuizService } from './services/quiz.service'

describe('QuizzesComponent', () => {
  let component: QuizzesComponent
  let fixture: ComponentFixture<QuizzesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizzesComponent],
      imports: [MaterialDesignModule, RouterTestingModule],
      providers: [
        {
          provide: AngularFireAuth,
          useValue: angularFireAuthSpy,
        },
        {
          provide: QuizService,
          useValue: quizServiceSpy
        }
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
