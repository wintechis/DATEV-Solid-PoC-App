import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthBuchungenDialogComponent } from './auth-buchungen-dialog.component';

describe('AuthBuchungenDialogComponent', () => {
  let component: AuthBuchungenDialogComponent;
  let fixture: ComponentFixture<AuthBuchungenDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthBuchungenDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthBuchungenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
