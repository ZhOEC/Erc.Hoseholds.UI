import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseExemptionComponent } from './close-exemption.component';

describe('CloseExemptionComponent', () => {
  let component: CloseExemptionComponent;
  let fixture: ComponentFixture<CloseExemptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseExemptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseExemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
