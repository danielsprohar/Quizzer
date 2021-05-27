import { TestBed } from '@angular/core/testing';

import { AssessmentFormService } from './assessment-form.service';

describe('AssessmentFormService', () => {
  let service: AssessmentFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssessmentFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
