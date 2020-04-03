import { TestBed } from '@angular/core/testing';

import { RapidApiInterceptor } from './rapid-api.interceptor';

describe('RapidApiInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RapidApiInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RapidApiInterceptor = TestBed.inject(RapidApiInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
