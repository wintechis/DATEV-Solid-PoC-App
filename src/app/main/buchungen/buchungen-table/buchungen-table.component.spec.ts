import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuchungenTableComponent } from './buchungen-table.component';

describe('BuchungenTableComponent', () => {
  let component: BuchungenTableComponent;
  let fixture: ComponentFixture<BuchungenTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuchungenTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuchungenTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
