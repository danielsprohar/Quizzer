import { TestBed } from '@angular/core/testing'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import { RouterTestingModule } from '@angular/router/testing'
import { angularFireAuthSpy } from 'src/app/mocks/angular-fire-auth-mock'
import { angularFirestoreSpy } from 'src/app/mocks/angular-firestore-mock'

import { QuizAssessmentResolver } from './assessment.resolver'

describe('QuizAssessmentResolver', () => {
  let resolver: QuizAssessmentResolver

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: AngularFirestore,
          useValue: angularFirestoreSpy,
        },
        {
          provide: AngularFireAuth,
          useValue: angularFireAuthSpy,
        },
      ],
    })
    resolver = TestBed.inject(QuizAssessmentResolver)
  })

  it('should be created', () => {
    expect(resolver).toBeTruthy()
  })
})
