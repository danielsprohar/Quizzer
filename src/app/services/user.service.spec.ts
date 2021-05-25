import { TestBed } from '@angular/core/testing'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import { angularFireAuthSpy } from '../mocks/angular-fire-auth-mock'
import { angularFirestoreSpy } from '../mocks/angular-firestore-mock'

import { UserService } from './user.service'

describe('UserService', () => {
  let service: UserService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AngularFireAuth,
          useValue: angularFireAuthSpy,
        },
        {
          provide: AngularFirestore,
          useValue: angularFirestoreSpy
        }
      ],
    })
    service = TestBed.inject(UserService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
