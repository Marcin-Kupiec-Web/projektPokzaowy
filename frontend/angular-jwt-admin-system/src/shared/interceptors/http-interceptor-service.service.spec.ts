import { TestBed } from '@angular/core/testing';

import { HttpInterceptorService } from './http-interceptor-service.service';

describe('HttpInterceptorServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpInterceptorService = TestBed.get(HttpInterceptorService);
    expect(service).toBeTruthy();
  });
});
