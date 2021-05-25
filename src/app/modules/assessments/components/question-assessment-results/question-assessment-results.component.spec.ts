import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAssessmentResultsComponent } from './question-assessment-results.component';

describe('QuestionAssessmentResultsComponent', () => {
  let component: QuestionAssessmentResultsComponent;
  let fixture: ComponentFixture<QuestionAssessmentResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionAssessmentResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionAssessmentResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
