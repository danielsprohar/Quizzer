import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { QuizFormService } from './quiz-form.service';

describe('QuizFormService', () => {
  let service: QuizFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule]
    });
    service = TestBed.inject(QuizFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
