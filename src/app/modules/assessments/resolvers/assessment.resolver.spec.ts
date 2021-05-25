import { TestBed } from '@angular/core/testing'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import { RouterTestingModule } from '@angular/router/testing'
import { angularFireAuthSpy } from 'src/app/mocks/angular-fire-auth-mock'
import { angularFirestoreSpy } from 'src/app/mocks/angular-firestore-mock'

import { AssessmentResolver } from './assessment.resolver'

describe('AssessmentResolver', () => {
  let resolver: AssessmentResolver

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
    resolver = TestBed.inject(AssessmentResolver)
  })

  it('should be created', () => {
    expect(resolver).toBeTruthy()
  })
})
