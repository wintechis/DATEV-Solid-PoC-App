import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreigabenTableComponent } from './freigaben-table.component';

describe('FreigabenTableComponent', () => {
  let component: FreigabenTableComponent;
  let fixture: ComponentFixture<FreigabenTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreigabenTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreigabenTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
