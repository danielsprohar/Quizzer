import { TestBed } from '@angular/core/testing';

import { QuestionDetailsResolver } from './question-details.resolver';

describe('QuestionDetailsResolver', () => {
  let resolver: QuestionDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(QuestionDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
