import { TestBed } from '@angular/core/testing';

import { PrebuiltService } from './prebuilt.service';

describe('PrebuiltService', () => {
  let service: PrebuiltService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrebuiltService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
