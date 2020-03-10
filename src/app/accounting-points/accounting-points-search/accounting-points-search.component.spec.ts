import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountingPointsSearchComponent } from './accounting-points-search.component';

describe('AccountingPointsSearchComponent', () => {
  let component: AccountingPointsSearchComponent;
  let fixture: ComponentFixture<AccountingPointsSearchComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountingPointsSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountingPointsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
