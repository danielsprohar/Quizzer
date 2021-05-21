import { TestBed } from '@angular/core/testing'
import { AngularFirestore } from '@angular/fire/firestore'
import { RouterTestingModule } from '@angular/router/testing'
import { angularFirestoreSpy } from 'src/app/mocks/angular-firestore-mock'

import { QuizResolver } from './quiz.resolver'

describe('QuizResolver', () => {
  let resolver: QuizResolver

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: AngularFirestore,
          useValue: angularFirestoreSpy,
        },
      ],
    })
    resolver = TestBed.inject(QuizResolver)
  })

  it('should be created', () => {
    expect(resolver).toBeTruthy()
  })
})
