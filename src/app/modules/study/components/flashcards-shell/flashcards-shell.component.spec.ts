import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsShellComponent } from './flashcards-shell.component';

describe('FlashcardsShellComponent', () => {
  let component: FlashcardsShellComponent;
  let fixture: ComponentFixture<FlashcardsShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashcardsShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardsShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
