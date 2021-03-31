import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExemptionCategyListComponent } from './exemption-categy-list.component';

describe('ExemptionCategyListComponent', () => {
  let component: ExemptionCategyListComponent;
  let fixture: ComponentFixture<ExemptionCategyListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExemptionCategyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExemptionCategyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
