import { TestBed } from '@angular/core/testing';

import { CoronaVirusMonitorService } from './corona-virus-monitor.service';

describe('CoronaVirusMonitorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoronaVirusMonitorService = TestBed.get(CoronaVirusMonitorService);
    expect(service).toBeTruthy();
  });
});
