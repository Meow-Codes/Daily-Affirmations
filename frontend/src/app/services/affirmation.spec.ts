import { TestBed } from '@angular/core/testing';

import { Affirmation } from './affirmation';

describe('Affirmation', () => {
  let service: Affirmation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Affirmation);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
