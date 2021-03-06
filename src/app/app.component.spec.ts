import { TestBed } from '@angular/core/testing'
import { AngularFireAuth } from '@angular/fire/auth'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component'
import { angularFireAuthSpy } from './mocks/angular-fire-auth-mock'
import { authServiceSpy } from './modules/auth/mocks/auth-service-mock'
import { AuthService } from './modules/auth/services/auth.service'
import { MaterialDesignModule } from './theme/material-design/material-design.module'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialDesignModule,
        NoopAnimationsModule,
      ],
      declarations: [AppComponent],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceSpy,
        },
        {
          provide: AngularFireAuth,
          useValue: angularFireAuthSpy,
        },
      ],
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })
})
