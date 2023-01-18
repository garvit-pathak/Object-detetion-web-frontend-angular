import { TestBed } from '@angular/core/testing';

import { OnlyAnonymousGuard } from './only-anonymous.guard';

describe('OnlyAnonymousGuard', () => {
  let guard: OnlyAnonymousGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OnlyAnonymousGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
