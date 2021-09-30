import { TestBed } from '@angular/core/testing';

import { MFileManagerService } from './m-file-manager.service';

describe('MFileManagerService', () => {
  let service: MFileManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MFileManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
