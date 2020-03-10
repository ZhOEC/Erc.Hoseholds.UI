import { TestBed } from '@angular/core/testing';

import { AccountingPointsService } from './accounting-points.service';

describe('AccountingPointsService', () => {
  let service: AccountingPointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountingPointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
