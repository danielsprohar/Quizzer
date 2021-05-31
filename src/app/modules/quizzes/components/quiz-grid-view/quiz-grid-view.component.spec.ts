import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizGridViewComponent } from './quiz-grid-view.component';

describe('QuizGridViewComponent', () => {
  let component: QuizGridViewComponent;
  let fixture: ComponentFixture<QuizGridViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizGridViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
