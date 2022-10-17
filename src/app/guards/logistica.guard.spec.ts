import { TestBed } from '@angular/core/testing';

import { LogisticaGuard } from './logistica.guard';

describe('LogisticaGuard', () => {
  let guard: LogisticaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LogisticaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
