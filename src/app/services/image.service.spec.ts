import { TestBed } from '@angular/core/testing'
import { AngularFireStorage } from '@angular/fire/storage'

import { ImageService } from './image.service'

describe('ImageService', () => {
  let service: ImageService
  let mockStorage = jasmine.createSpyObj('AngularFireStorage', [
    'upload',
    'refFromURL',
  ])
  // TODO: mock image service

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AngularFireStorage,
          useValue: mockStorage,
        },
      ],
    })
    service = TestBed.inject(ImageService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
