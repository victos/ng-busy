import { TestBed, inject } from '@angular/core/testing';

import { BusyService } from './busy.service';

describe('LibService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusyService]
    });
  });

  it('should create service', inject([BusyService], (service: BusyService) => {
    expect(service).toBeTruthy();
  }));

});
