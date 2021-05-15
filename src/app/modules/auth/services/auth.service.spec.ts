import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { angularFireAuthSpy } from 'src/app/mocks/angular-fire-auth-mock';
import { angularFirestoreSpy } from 'src/app/mocks/angular-firestore-mock';
import { AuthService } from './auth.service';

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
