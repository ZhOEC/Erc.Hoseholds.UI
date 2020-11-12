import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingPointPaymentsComponent } from './accounting-point-payments.component';

describe('AccountingPointPaymentsComponent', () => {
  let component: AccountingPointPaymentsComponent;
  let fixture: ComponentFixture<AccountingPointPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountingPointPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingPointPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
