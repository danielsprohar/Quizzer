import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentQuestionResultsComponent } from './assessment-question-results.component';

describe('QuestionAssessmentResultsComponent', () => {
  let component: AssessmentQuestionResultsComponent;
  let fixture: ComponentFixture<AssessmentQuestionResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentQuestionResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentQuestionResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
