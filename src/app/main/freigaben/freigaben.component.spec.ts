import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreigabenComponent } from './freigaben.component';

describe('FreigabenComponent', () => {
  let component: FreigabenComponent;
  let fixture: ComponentFixture<FreigabenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreigabenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreigabenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
