import { TestBed } from '@angular/core/testing';

import { AccountingPointDetailService } from './accounting-point-detail.service';

describe('AccountingPointDetailService', () => {
  let service: AccountingPointDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountingPointDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
