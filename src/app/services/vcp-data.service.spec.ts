import { TestBed, inject } from '@angular/core/testing';

import { VcpDataService } from './vcp-data.service';

describe('VcpDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VcpDataService]
    });
  });

  it('should be created', inject([VcpDataService], (service: VcpDataService) => {
    expect(service).toBeTruthy();
  }));
});
