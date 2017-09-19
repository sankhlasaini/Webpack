import { TestBed, inject } from '@angular/core/testing';

import { GovtDataService } from './govt-data.service';

describe('GovtDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GovtDataService]
    });
  });

  it('should be created', inject([GovtDataService], (service: GovtDataService) => {
    expect(service).toBeTruthy();
  }));
});
