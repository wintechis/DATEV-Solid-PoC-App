import { TestBed } from '@angular/core/testing';

import { EUeRService } from './euer.service';

describe('EUeRService', () => {
  let service: EUeRService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EUeRService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
