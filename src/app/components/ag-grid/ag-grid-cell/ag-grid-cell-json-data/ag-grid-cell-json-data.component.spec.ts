/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AgGridCellJsonDataComponent } from './ag-grid-cell-json-data.component';

describe('AgGridCellJsonDataComponent', () => {
  let component: AgGridCellJsonDataComponent;
  let fixture: ComponentFixture<AgGridCellJsonDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgGridCellJsonDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridCellJsonDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
