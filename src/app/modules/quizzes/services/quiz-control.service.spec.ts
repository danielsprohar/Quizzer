import { TestBed } from '@angular/core/testing';

import { QuizControlService } from './quiz-control.service';

describe('QuizControlService', () => {
  let service: QuizControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
