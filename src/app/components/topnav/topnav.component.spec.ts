import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { authServiceSpy } from 'src/app/modules/auth/mocks/auth-service-mock';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { MaterialDesignModule } from 'src/app/theme/material-design/material-design.module';

import { TopnavComponent } from './topnav.component';

describe('TopnavComponent', () => {
  let component: TopnavComponent;
  let fixture: ComponentFixture<TopnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopnavComponent ],
      imports: [RouterTestingModule, MaterialDesignModule],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceSpy
        },
        {
          provide: AngularFireAuth,
          useValue: 'angularFireAuthSpy'
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
