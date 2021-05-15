import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { authServiceSpy } from 'src/app/modules/auth/mocks/auth-service-mock';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { AppThemeService } from 'src/app/services/app-theme.service';
import { MaterialDesignModule } from 'src/app/theme/material-design/material-design.module';

import { SidenavComponent } from './sidenav.component';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidenavComponent],
      imports: [RouterTestingModule, MaterialDesignModule],
      providers: [
        AppThemeService,
        {
          provide: AuthService,
          useValue: authServiceSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
