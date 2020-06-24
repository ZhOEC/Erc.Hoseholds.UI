import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingPointInvoicesComponent } from './accounting-point-invoices.component';

describe('AccountingPointInvoicesComponent', () => {
  let component: AccountingPointInvoicesComponent;
  let fixture: ComponentFixture<AccountingPointInvoicesComponent>;

  beforeEach(async(() => {
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
