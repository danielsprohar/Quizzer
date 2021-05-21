import { TestBed } from '@angular/core/testing';

import { QuestionsResolver } from './questions.resolver';

describe('QuestionsResolver', () => {
  let resolver: QuestionsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(QuestionsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
