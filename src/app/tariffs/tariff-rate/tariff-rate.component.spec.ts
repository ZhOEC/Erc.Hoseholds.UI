import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TariffRateComponent } from './tariff-rate.component';

describe('TariffRateComponent', () => {
  let component: TariffRateComponent;
  let fixture: ComponentFixture<TariffRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TariffRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TariffRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
