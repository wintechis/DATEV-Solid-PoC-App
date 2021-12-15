import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EinkommenUeberschussRechnungenComponent } from './einkommen-ueberschuss-rechnungen.component';

describe('EinkommenUeberschussRechnungComponent', () => {
  let component: EinkommenUeberschussRechnungenComponent;
  let fixture: ComponentFixture<EinkommenUeberschussRechnungenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EinkommenUeberschussRechnungenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EinkommenUeberschussRechnungenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
