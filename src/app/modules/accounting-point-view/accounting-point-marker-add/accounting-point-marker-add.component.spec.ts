/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddMarkerModalComponent } from './accounting-point-marker-add.component';

describe('AddMarkerModalComponent', () => {
  let component: AddMarkerModalComponent;
  let fixture: ComponentFixture<AddMarkerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMarkerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMarkerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
