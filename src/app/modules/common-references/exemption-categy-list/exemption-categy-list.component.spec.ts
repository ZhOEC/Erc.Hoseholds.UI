import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemptionCategyListComponent } from './exemption-categy-list.component';

describe('ExemptionCategyListComponent', () => {
  let component: ExemptionCategyListComponent;
  let fixture: ComponentFixture<ExemptionCategyListComponent>;

  beforeEach(async(() => {
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
