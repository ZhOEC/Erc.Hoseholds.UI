import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountingPointInvoicesComponent } from './accounting-point-invoices.component';

describe('AccountingPointInvoicesComponent', () => {
  let component: AccountingPointInvoicesComponent;
  let fixture: ComponentFixture<AccountingPointInvoicesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountingPointInvoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingPointInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
