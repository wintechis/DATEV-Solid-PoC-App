import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OidcDialogComponent } from './oidc-dialog.component';

describe('OidcDialogComponent', () => {
  let component: OidcDialogComponent;
  let fixture: ComponentFixture<OidcDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OidcDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OidcDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
