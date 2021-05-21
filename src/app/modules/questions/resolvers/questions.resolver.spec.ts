import { TestBed } from '@angular/core/testing'
import { AngularFirestore } from '@angular/fire/firestore'
import { angularFirestoreSpy } from 'src/app/mocks/angular-firestore-mock'

import { QuestionsResolver } from './questions.resolver'

describe('QuestionsResolver', () => {
  let resolver: QuestionsResolver

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AngularFirestore,
          useValue: angularFirestoreSpy,
        },
      ],
    })
    resolver = TestBed.inject(QuestionsResolver)
  })

  it('should be created', () => {
    expect(resolver).toBeTruthy()
  })
})
