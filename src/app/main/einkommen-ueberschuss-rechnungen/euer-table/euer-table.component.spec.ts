import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EuerTableComponent } from './euer-table.component';

describe('EuerTableComponent', () => {
  let component: EuerTableComponent;
  let fixture: ComponentFixture<EuerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EuerTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EuerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
