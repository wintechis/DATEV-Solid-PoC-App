import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEuerDialogComponent } from './add-euer-dialog.component';

describe('AddEuerDialogComponent', () => {
  let component: AddEuerDialogComponent;
  let fixture: ComponentFixture<AddEuerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEuerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEuerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
