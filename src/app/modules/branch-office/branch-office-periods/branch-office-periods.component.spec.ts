import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchOfficePeriodsComponent } from './branch-office-periods.component';

describe('BranchOfficePeriodsComponent', () => {
  let component: BranchOfficePeriodsComponent;
  let fixture: ComponentFixture<BranchOfficePeriodsComponent>;

  beforeEach(async(() => {
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
