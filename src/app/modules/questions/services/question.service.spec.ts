import { TestBed } from '@angular/core/testing'
import { AngularFirestore } from '@angular/fire/firestore'
import { angularFirestoreSpy } from 'src/app/mocks/angular-firestore-mock'

import { QuestionService } from './question.service'

describe('QuestionService', () => {
  let service: QuestionService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AngularFirestore,
          useValue: angularFirestoreSpy,
        },
      ],
    })
    service = TestBed.inject(QuestionService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
