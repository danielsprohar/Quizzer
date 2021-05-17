import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AngularFireAuth } from '@angular/fire/auth'
import { RouterTestingModule } from '@angular/router/testing'
import { angularFireAuthSpy } from 'src/app/mocks/angular-fire-auth-mock'
import { userServiceSpy } from 'src/app/mocks/user-service-mock'
import { UserService } from 'src/app/services/user.service'
import { MaterialDesignModule } from 'src/app/theme/material-design/material-design.module'
import { QuizzesComponent } from './quizzes.component'

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
          provide: UserService,
          useValue: userServiceSpy,
        },
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
