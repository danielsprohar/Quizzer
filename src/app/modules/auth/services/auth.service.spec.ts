import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

const angularFireAuthSpy = jasmine.createSpyObj('AngularFireAuth', [
  'user',
  'currentUser',
  'signInWithPopup',
  'signInWithEmailAndPassword',
  'createUserWithEmailAndPassword',
]);

const angularFirestoreSpy = jasmine.createSpyObj('AngularFirestore', [
  'collection',
  'doc',
]);

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule],
      providers: [
        {
          provide: AngularFireAuth,
          useValue: angularFireAuthSpy,
        },
        {
          provide: AngularFirestore,
          useValue: angularFirestoreSpy,
        },
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
