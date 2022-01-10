import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthEuerDialogComponent } from './auth-euer-dialog.component';

describe('AuthEuerDialogComponent', () => {
  let component: AuthEuerDialogComponent;
  let fixture: ComponentFixture<AuthEuerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthEuerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthEuerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
