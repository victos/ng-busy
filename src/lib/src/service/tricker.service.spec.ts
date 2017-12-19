import { TestBed, inject } from '@angular/core/testing';

import { TrackerService } from './tracker.service';

describe('LibService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrackerService]
    });
  });

  it('should create service', inject([TrackerService], (service: TrackerService) => {
    expect(service).toBeTruthy();
  }));


});
