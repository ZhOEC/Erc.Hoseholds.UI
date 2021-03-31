import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BranchOfficePeriodsComponent } from './branch-office-periods.component';

describe('BranchOfficePeriodsComponent', () => {
  let component: BranchOfficePeriodsComponent;
  let fixture: ComponentFixture<BranchOfficePeriodsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchOfficePeriodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchOfficePeriodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
