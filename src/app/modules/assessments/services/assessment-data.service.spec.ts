import { TestBed } from '@angular/core/testing'
import { AngularFirestore } from '@angular/fire/firestore'
import { angularFirestoreSpy } from 'src/app/mocks/angular-firestore-mock'
import { AssessmentDataService } from './assessment-data.service'

describe('AssessmentDataService', () => {
  let service: AssessmentDataService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AngularFirestore,
          useValue: angularFirestoreSpy,
        },
      ],
    })
    service = TestBed.inject(AssessmentDataService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
