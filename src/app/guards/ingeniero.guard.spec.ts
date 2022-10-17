import { TestBed } from '@angular/core/testing';

import { IngenieroGuard } from './ingeniero.guard';

describe('IngenieroGuard', () => {
  let guard: IngenieroGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IngenieroGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
