import { TestBed } from '@angular/core/testing';

import { TariffRateService } from './tariff-rate.service';

describe('TariffRateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TariffRateService = TestBed.get(TariffRateService);
    expect(service).toBeTruthy();
  });
});
