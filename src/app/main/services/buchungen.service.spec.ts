import { TestBed } from '@angular/core/testing';

import { BuchungenService } from './buchungen.service';

describe('BuchungenService', () => {
  let service: BuchungenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuchungenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
