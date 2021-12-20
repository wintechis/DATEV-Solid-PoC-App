import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBuchungDialogComponent } from './add-buchung-dialog.component';

describe('AddBuchungDialogComponent', () => {
  let component: AddBuchungDialogComponent;
  let fixture: ComponentFixture<AddBuchungDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBuchungDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBuchungDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
